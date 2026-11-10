// Check every external source URL in data.js. No dependencies.
globalThis.window = {};
await import("../assets/js/data.js");
const { ENTRIES, RESOURCES } = globalThis.window.EAI_DATA;
const urls = [...new Set([
  ...ENTRIES.flatMap(entry => (entry.links || []).map(link => link.url)),
  ...RESOURCES.map(resource => resource.url)
])];
const queue = urls.slice();
const results = [];
async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers: method === "GET" ? { Range: "bytes=0-1024", "User-Agent": "EAI-Wiki-Link-Check/0.1" } : { "User-Agent": "EAI-Wiki-Link-Check/0.1" }
      });
      clearTimeout(timer);
      if (res.ok || res.status === 206) {
        results.push({ url, status: res.status, ok: true });
        return;
      }
      if (res.status === 403) {
        results.push({ url, status: res.status, ok: true, blocked: true });
        return;
      }
    } catch (error) {
      if (method === "GET") results.push({ url, status: "ERR", ok: false, error: String(error).slice(0, 120) });
    }
  }
}
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const url = queue.shift();
    if (url) await check(url);
  }
});
await Promise.all(workers);
results.sort((a, b) => Number(a.ok) - Number(b.ok) || a.url.localeCompare(b.url));
for (const item of results) {
  const label = item.ok ? (item.blocked ? "WARN" : "OK  ") : "FAIL";
  console.log(`${label} ${String(item.status).padEnd(4)} ${item.url}${item.blocked ? "  (bot protection; link likely valid)" : ""}`);
}
console.log(`\n${results.filter(item => item.ok).length}/${results.length} links reachable.`);
if (results.some(item => !item.ok)) process.exitCode = 1;
