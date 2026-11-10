// Check every external source URL in data.js. No dependencies.
globalThis.window = {};
await import("../assets/js/data.js");
const { ENTRIES } = globalThis.window.EAI_DATA;
const urls = [...new Set(ENTRIES.flatMap(entry => (entry.links || []).map(link => link.url)))];
const queue = urls.slice();
const results = [];
async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers: method === "GET" ? { Range: "bytes=0-1024", "User-Agent": "EAI-Wiki-Link-Check/0.1" } : { "User-Agent": "EAI-Wiki-Link-Check/0.1" }
      });
      clearTimeout(timer);
      if (res.ok || res.status === 206 || res.status === 403) {
        results.push({ url, status: res.status, ok: res.ok || res.status === 206 });
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
for (const item of results) console.log(`${item.ok ? "OK  " : "FAIL"} ${String(item.status).padEnd(4)} ${item.url}`);
console.log(`\n${results.filter(item => item.ok).length}/${results.length} links reachable.`);
if (results.some(item => !item.ok)) process.exitCode = 1;
