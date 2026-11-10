// Validate the editable content graph. No dependencies.
// Usage: node scripts/validate-content.mjs
globalThis.window = {};
await import("../assets/js/data.js");
const { DOMAINS, ENTRIES, PATHS, TYPE_LABELS } = globalThis.window.EAI_DATA;

const errors = [];
const warnings = [];
const domainIds = new Set();
const entryIds = new Set();
const requiredEntryFields = ["id", "domain", "type", "title", "subtitle", "year", "venue", "org", "authors", "tags", "tldr", "why", "intro", "method", "evidence", "limits", "links"];

for (const domain of DOMAINS) {
  if (domainIds.has(domain.id)) errors.push(`duplicate domain id: ${domain.id}`);
  domainIds.add(domain.id);
}
for (const entry of ENTRIES) {
  if (entryIds.has(entry.id)) errors.push(`duplicate entry id: ${entry.id}`);
  entryIds.add(entry.id);
}

for (const domain of DOMAINS) {
  for (const key of ["id", "num", "name", "en", "short", "accent", "tint", "tagline", "description", "question", "topics", "intro", "milestones", "related"]) {
    if (domain[key] === undefined) errors.push(`domain ${domain.id}: missing ${key}`);
  }
  for (const related of domain.related || []) {
    if (!domainIds.has(related)) errors.push(`domain ${domain.id}: unknown related domain "${related}"`);
  }
  for (const milestone of domain.milestones || []) {
    if (milestone.entry && !entryIds.has(milestone.entry)) errors.push(`domain ${domain.id}: unknown milestone entry "${milestone.entry}"`);
  }
}

for (const entry of ENTRIES) {
  for (const key of requiredEntryFields) {
    if (entry[key] === undefined) errors.push(`entry ${entry.id}: missing ${key}`);
  }
  if (!domainIds.has(entry.domain)) errors.push(`entry ${entry.id}: unknown domain "${entry.domain}"`);
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

for (const path of PATHS) {
  for (const step of path.steps || []) {
    if (!entryIds.has(step)) errors.push(`path ${path.id}: unknown entry "${step}"`);
  }
}

const typeCounts = Object.fromEntries(Object.keys(TYPE_LABELS).map(type => [type, ENTRIES.filter(entry => entry.type === type).length]));
console.log(`Domains: ${DOMAINS.length}`);
console.log(`Entries: ${ENTRIES.length}`);
console.log(`Types: ${JSON.stringify(typeCounts)}`);
console.log(`Paths: ${PATHS.length}`);
for (const domain of DOMAINS) {
  console.log(`  ${domain.num} ${domain.name}: ${ENTRIES.filter(entry => entry.domain === domain.id).length} entries`);
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
