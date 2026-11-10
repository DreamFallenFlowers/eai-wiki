// Validate the editable content graph. No dependencies.
// Usage: node scripts/validate-content.mjs
globalThis.window = {};
await import("../assets/js/data.js");
const { DOMAINS, ENTRIES, PATHS, RESOURCES, TYPE_LABELS } = globalThis.window.EAI_DATA;

const errors = [];
const warnings = [];
const domainIds = new Set();
const routeIds = new Set();
const entryIds = new Set();
const resourceIds = new Set();
const requiredEntryFields = ["id", "domain", "route", "type", "title", "subtitle", "year", "venue", "org", "authors", "tags", "tldr", "why", "intro", "method", "evidence", "limits", "links"];

for (const domain of DOMAINS) {
  if (domainIds.has(domain.id)) errors.push(`duplicate domain id: ${domain.id}`);
  domainIds.add(domain.id);
}
for (const entry of ENTRIES) {
  if (entryIds.has(entry.id)) errors.push(`duplicate entry id: ${entry.id}`);
  entryIds.add(entry.id);
}
for (const resource of RESOURCES) {
  if (resourceIds.has(resource.id)) errors.push(`duplicate resource id: ${resource.id}`);
  resourceIds.add(resource.id);
}

for (const domain of DOMAINS) {
  for (const key of ["id", "num", "name", "en", "short", "accent", "tint", "tagline", "description", "question", "intro", "routes", "related"]) {
    if (domain[key] === undefined) errors.push(`domain ${domain.id}: missing ${key}`);
  }
  if (!Array.isArray(domain.routes) || domain.routes.length < 2) errors.push(`domain ${domain.id}: expected at least 2 routes`);
  for (const route of domain.routes || []) {
    if (!route.id || !route.name || !route.en || !route.summary || !route.question) errors.push(`domain ${domain.id}: incomplete route`);
    const key = `${domain.id}:${route.id}`;
    if (routeIds.has(key)) errors.push(`duplicate route key: ${key}`);
    routeIds.add(key);
  }
  for (const related of domain.related || []) {
    if (!domainIds.has(related)) errors.push(`domain ${domain.id}: unknown related domain "${related}"`);
  }
  const domainResources = RESOURCES.filter(resource => resource.domains.includes(domain.id));
  if (!domainResources.some(resource => resource.type === "dataset")) errors.push(`domain ${domain.id}: no dataset resource`);
  if (!domainResources.some(resource => resource.type === "benchmark")) errors.push(`domain ${domain.id}: no benchmark resource`);
}

for (const entry of ENTRIES) {
  for (const key of requiredEntryFields) {
    if (entry[key] === undefined) errors.push(`entry ${entry.id}: missing ${key}`);
  }
  if (!domainIds.has(entry.domain)) errors.push(`entry ${entry.id}: unknown domain "${entry.domain}"`);
  const domain = DOMAINS.find(item => item.id === entry.domain);
  if (domain && !domain.routes.some(route => route.id === entry.route)) {
    errors.push(`entry ${entry.id}: unknown route "${entry.route}" on domain ${entry.domain}`);
  }
  if (!TYPE_LABELS[entry.type]) errors.push(`entry ${entry.id}: unknown type "${entry.type}"`);
  if (!Array.isArray(entry.intro) || entry.intro.length < 1) errors.push(`entry ${entry.id}: intro must be a non-empty array`);
  if (!Array.isArray(entry.method) || entry.method.length < 2) errors.push(`entry ${entry.id}: expected at least 2 method items`);
  if (!Array.isArray(entry.limits) || entry.limits.length < 1) errors.push(`entry ${entry.id}: expected at least 1 limitation`);
  if (!Array.isArray(entry.links) || entry.links.length < 1) errors.push(`entry ${entry.id}: expected at least 1 source link`);
  for (const related of entry.related || []) {
    if (!entryIds.has(related)) errors.push(`entry ${entry.id}: unknown related entry "${related}"`);
  }
  for (const link of entry.links || []) {
    try {
      const url = new URL(link.url);
      if (!["http:", "https:"].includes(url.protocol)) errors.push(`entry ${entry.id}: non-http link ${link.url}`);
    } catch {
      errors.push(`entry ${entry.id}: malformed link ${link.url}`);
    }
    if (!link.label) warnings.push(`entry ${entry.id}: source link without label`);
  }
  if (entry.type === "paper" && !entry.links.some(link => /论文|paper/i.test(link.label))) {
    warnings.push(`entry ${entry.id}: paper entry has no obvious paper source`);
  }
  const text = [entry.tldr, entry.why, ...entry.intro, ...entry.limits].join(" ").length;
  if (text < 200) warnings.push(`entry ${entry.id}: short prose (${text} chars); check depth`);
}

for (const resource of RESOURCES) {
  if (!["dataset", "benchmark"].includes(resource.type)) errors.push(`resource ${resource.id}: invalid type "${resource.type}"`);
  if (!resource.name || !resource.summary || !resource.scale || !resource.year) errors.push(`resource ${resource.id}: incomplete metadata`);
  if (!Array.isArray(resource.domains) || !resource.domains.length) errors.push(`resource ${resource.id}: missing domains`);
  for (const domainId of resource.domains || []) {
    if (!domainIds.has(domainId)) errors.push(`resource ${resource.id}: unknown domain "${domainId}"`);
  }
  try {
    const url = new URL(resource.url);
    if (!["http:", "https:"].includes(url.protocol)) errors.push(`resource ${resource.id}: non-http link`);
  } catch {
    errors.push(`resource ${resource.id}: malformed url`);
  }
  if (resource.entryId && !entryIds.has(resource.entryId)) errors.push(`resource ${resource.id}: unknown entryId "${resource.entryId}"`);
}

for (const path of PATHS) {
  for (const step of path.steps || []) {
    if (!entryIds.has(step)) errors.push(`path ${path.id}: unknown entry "${step}"`);
  }
}

const typeCounts = Object.fromEntries(Object.keys(TYPE_LABELS).map(type => [type, ENTRIES.filter(entry => entry.type === type).length]));
console.log(`Domains: ${DOMAINS.length}`);
console.log(`Routes: ${routeIds.size}`);
console.log(`Entries: ${ENTRIES.length}`);
console.log(`Resources: ${RESOURCES.length}`);
console.log(`Types: ${JSON.stringify(typeCounts)}`);
console.log(`Paths: ${PATHS.length}`);
for (const domain of DOMAINS) {
  const resources = RESOURCES.filter(resource => resource.domains.includes(domain.id));
  console.log(`  ${domain.num} ${domain.name}: ${domain.routes.length} routes / ${ENTRIES.filter(entry => entry.domain === domain.id).length} entries / ${resources.length} resources`);
}
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  warnings.forEach(warning => console.log(`  - ${warning}`));
}
if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  errors.forEach(error => console.log(`  - ${error}`));
  process.exitCode = 1;
} else {
  console.log("\nContent graph is valid.");
}
