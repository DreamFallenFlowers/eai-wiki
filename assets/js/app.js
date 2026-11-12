/* EAI Wiki — client application
 * No framework, no build step. Routes are hash-based, content lives in data.js.
 */
(() => {
  "use strict";

  const { DOMAINS, ENTRIES, PATHS, RESOURCES, TYPE_LABELS } = window.EAI_DATA;
  const CFG = window.EAI_CONFIG || {};

  const app = document.getElementById("main");
  const header = document.getElementById("site-header");
  const domainById = new Map(DOMAINS.map(d => [d.id, d]));
  const entryById = new Map(ENTRIES.map(e => [e.id, e]));
  const entriesByDomain = new Map(DOMAINS.map(d => [d.id, []]));
  const entriesByRoute = new Map();
  DOMAINS.forEach(domain => {
    (domain.routes || []).forEach(route => {
      entriesByRoute.set(`${domain.id}:${route.id}`, []);
    });
  });
  ENTRIES.forEach(entry => {
    if (entriesByDomain.has(entry.domain)) entriesByDomain.get(entry.domain).push(entry);
    const key = `${entry.domain}:${entry.route}`;
    if (entriesByRoute.has(key)) entriesByRoute.get(key).push(entry);
  });
  entriesByDomain.forEach(list => list.sort(sortByYearDesc));
  entriesByRoute.forEach(list => list.sort((a, b) => a.year - b.year || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, "en")));

  const TOTAL_ROUTES = DOMAINS.reduce((sum, domain) => sum + (domain.routes || []).length, 0);

  const NODE_LABELS = {
    navigation: "导航",
    manipulation: "操作",
    "loco-manipulation": "移动操作",
    hardware: "硬件",
    control: "控制",
    simulation: "仿真器",
    data: "数据评测"
  };

  const TYPE_ORDER = ["paper", "system", "concept", "dataset", "benchmark"];

  const state = {
    route: { name: "home" },
    catalog: { q: "", type: "all", domain: "all", route: "all", sort: "featured", bookmarksOnly: false },
    search: { items: [], selected: 0, query: "" },
    graphDomain: "manipulation",
    mobileOpen: false,
    citationText: "",
    bookmarks: loadBookmarks()
  };

  /* ------------------------------------------------------------- utilities */

  const ESCAPE_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ESCAPE_MAP[ch]);
  }

  function safeUrl(url) {
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
    } catch (_) { /* noop */ }
    return "#";
  }

  function sortByYearDesc(a, b) {
    return b.year - a.year || a.title.localeCompare(b.title);
  }

  function byId(id) {
    return entryById.get(id) || null;
  }

  function domainOf(entry) {
    return domainById.get(entry.domain);
  }

  function routeInfo(domain, routeId) {
    return (domain?.routes || []).find(route => route.id === routeId) || null;
  }

  function routeOf(entry) {
    return routeInfo(domainOf(entry), entry.route);
  }

  function routeHref(domain, route) {
    return `#/route/${domain.id}/${route.id}`;
  }

  function routeEntries(domainId, routeId) {
    return entriesByRoute.get(`${domainId}:${routeId}`) || [];
  }

  function resourcesForDomain(domainId) {
    return RESOURCES.filter(resource => resource.domains.includes(domainId));
  }

  function externalResourceCount() {
    return RESOURCES.filter(resource => !resource.entryId).length;
  }

  function padded(number) {
    return String(number).padStart(2, "0");
  }

  function typeLabel(type) {
    return TYPE_LABELS[type] || type;
  }

  function typeChip(type) {
    return `<span class="type-chip type-chip--${esc(type)}">${esc(typeLabel(type))}</span>`;
  }

  function readTime(entry) {
    const chunks = [entry.tldr, entry.why, ...(entry.intro || [])];
    (entry.method || []).forEach(item => chunks.push(item.title, item.text));
    (entry.evidence || []).forEach(item => chunks.push(item.label, item.text || ""));
    (entry.limits || []).forEach(item => chunks.push(item));
    const chars = chunks.join("").length;
    return Math.max(3, Math.ceil(chars / 380));
  }

  function formatDate(value) {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${y}.${m}.${d}`;
  }

  function formatCommentDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
    }).format(date);
  }

  function readableInk(hex) {
    const value = String(hex).replace("#", "");
    if (value.length !== 6) return "#f2efe6";
    const channels = [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16) / 255);
    const [r, g, b] = channels.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.46 ? "#141414" : "#f6f1e5";
  }

  function countDomainEntries(id) {
    return (entriesByDomain.get(id) || []).length;
  }

  function allTags(limit = 0) {
    const counts = new Map();
    ENTRIES.forEach(entry => (entry.tags || []).forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1)));
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(item => item[0]);
    return limit ? sorted.slice(0, limit) : sorted;
  }

  function loadBookmarks() {
    try {
      return new Set(JSON.parse(localStorage.getItem("eai-wiki:bookmarks") || "[]"));
    } catch (_) {
      return new Set();
    }
  }

  function saveBookmarks() {
    try {
      localStorage.setItem("eai-wiki:bookmarks", JSON.stringify([...state.bookmarks]));
    } catch (_) { /* localStorage may be unavailable */ }
  }

  async function copyText(text, message = "已复制到剪贴板") {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      showToast(message);
      return true;
    } catch (_) {
      showToast("复制失败，请手动选择文本");
      return false;
    }
  }

  let toastTimer = null;
  function showToast(message) {
    const region = document.getElementById("toast-region");
    if (!region) return;
    region.innerHTML = `<div class="toast"><span class="toast-dot"></span><span>${esc(message)}</span></div>`;
    region.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      region.classList.remove("is-visible");
      setTimeout(() => { region.innerHTML = ""; }, 220);
    }, 3300);
  }

  /* --------------------------------------------------------------- site meta */

  function detectRepo() {
    if (CFG.repo && !/your-|example|owner\/repo/i.test(CFG.repo)) return CFG.repo.replace(/^\/|\/$/g, "");
    const host = window.location.hostname;
    if (host.endsWith(".github.io")) {
      const owner = host.split(".")[0];
      const first = window.location.pathname.split("/").filter(Boolean)[0];
      const repo = first && !first.includes(".") ? first : `${owner}.github.io`;
      return `${owner}/${repo}`;
    }
    return "";
  }

  const REPO = detectRepo();
  const REPO_URL = REPO ? `https://github.com/${REPO}` : "";
  const BRANCH = "main";

  function repoFileUrl(path) {
    return REPO ? `${REPO_URL}/blob/${BRANCH}/${path}` : path;
  }

  function discussionUrl() {
    if (CFG.links && CFG.links.discussions) return CFG.links.discussions;
    return REPO ? `${REPO_URL}/discussions` : "";
  }

  function issueUrl(title, body) {
    if (!REPO) return "";
    return `${REPO_URL}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  }

  function isLocalPreview() {
    const host = window.location.hostname;
    return window.location.protocol === "file:" ||
      host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host === "[::1]";
  }

  function commentsConfigReady() {
    const comments = CFG.comments || {};
    return Boolean(REPO && comments.repoId && comments.categoryId && !/your-/.test(comments.repoId));
  }

  /* ------------------------------------------------------------------ icons */

  const DOMAIN_ICONS = {
    navigation: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2"/><path d="m30 18-4.2 8.1L18 30l4.2-8.1L30 18Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>`,
    manipulation: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 7v13m-8-8v8a8 8 0 0 0 16 0v-8M16 25v8m16-8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15 33h18v5H15z" stroke="currentColor" stroke-width="2"/><path d="M20 25v8m8-8v8" stroke="currentColor" stroke-width="2"/></svg>`,
    "loco-manipulation": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="10" r="5" stroke="currentColor" stroke-width="2"/><path d="M24 15v15m-9-10 9 4 9-4M24 30l-7 11m7-11 7 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    hardware: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 39V23h10v8h8V15h10v24" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 23v-7h16v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="20" cy="39" r="2" fill="currentColor"/><circle cx="38" cy="39" r="2" fill="currentColor"/></svg>`,
    control: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2"/><path d="M24 14v10l7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11v8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    simulation: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m24 7 15 8.5v17L24 41 9 32.5v-17L24 7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m9 15.5 15 8.7 15-8.7M24 24.2V41" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>`,
    data: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 37V24m9 13V14m9 23V28m9 9V8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M6 41h36" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="14" r="2.5" fill="currentColor"/></svg>`
  };

  function arrowIcon() {
    return `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function smallArrow() {
    return `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  /* ------------------------------------------------------------- components */

  function miniGraphMarkup() {
    const width = 100;
    const height = 100;
    const cx = 50;
    const cy = 50;
    const positions = DOMAINS.map((domain, index) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / DOMAINS.length);
      return {
        domain,
        x: cx + Math.cos(angle) * 41,
        y: cy + Math.sin(angle) * 39
      };
    });
    const edges = positions.map(({ x, y }) => `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}" />`).join("");
    return `
      <div class="mini-network" aria-hidden="true">
        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <g class="mini-lines">${edges}</g>
          <circle cx="${cx}" cy="${cy}" r="10.5" class="mini-core-line" />
        </svg>
        <span class="mini-core"><b>EAI</b><i>WIKI</i></span>
        ${positions.map(({ domain, x, y }) => `
          <span class="mini-node" style="left:${x}%;top:${y}%;--node-color:${domain.accent}">
            <i></i>${esc(domain.short)}
          </span>`).join("")}
      </div>`;
  }

  function pathCard(path, index) {
    const steps = path.steps.map(id => byId(id)).filter(Boolean);
    return `
      <article class="path-card reveal" style="--delay:${index * 70}ms">
        <div class="path-card-top">
          <span class="path-label">${esc(path.label)}</span>
          <span class="path-level">${esc(path.level)}</span>
        </div>
        <h3>${esc(path.title)}</h3>
        <p class="path-desc">${esc(path.description)}</p>
        <ol class="path-steps">
          ${steps.map((entry, stepIndex) => `
            <li>
              <a href="#/entry/${entry.id}">
                <span class="path-step-num">${padded(stepIndex + 1)}</span>
                <span class="path-step-title">${esc(entry.title)}</span>
                <span class="path-step-domain">${esc(domainOf(entry).short)}</span>
                ${smallArrow()}
              </a>
            </li>`).join("")}
        </ol>
        <div class="path-foot">
          <span>${esc(path.duration)}</span>
          <span>${steps.length} 个停靠点</span>
        </div>
      </article>`;
  }

  /* ------------------------------------------------------------------- home */

  function renderHome() {
    return `
    <div class="view view--home">
      <section class="hero hero--cards wrap">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow reveal">
            <span class="eyebrow-dot"></span>
            COMMUNITY-EDITED WIKI / SEED EDITION ${esc(CFG.version || "0.2")}
          </p>
          <h1 class="hero-title reveal" style="--delay:50ms">
            <span>让具身智能</span>
            <em>有迹可循。</em>
          </h1>
          <p class="hero-lede reveal" style="--delay:110ms">
            一个由研究者、工程师和好奇的人共同维护的具身智能开放知识库。
            先看七大领域，再沿技术路线走到具体论文——让每个概念都有出处，每次争论都有上下文。
          </p>
          <button class="hero-search reveal" style="--delay:160ms" type="button" data-open-search>
            <span class="hero-search-icon">${smallSearchIcon()}</span>
            <span class="hero-search-placeholder">搜索领域、技术路线、论文或资源</span>
            <span class="hero-search-hint">按 <kbd>Ctrl K</kbd> 开始</span>
            <span class="hero-search-arrow">${smallArrow()}</span>
          </button>
        </div>

        <div class="domain-grid">
          ${DOMAINS.map(domainCard).join("")}
        </div>
      </section>
    </div>`;
  }

  function heroArt() {
    const positions = ["one", "two", "three", "four", "five", "six", "seven"];
    const nodes = DOMAINS.map((domain, index) => ({
      icon: padded(index + 1),
      title: domain.name,
      sub: domain.short,
      cls: `loop-node--${positions[index]}`
    }));
    return `
      <div class="hero-art reveal" style="--delay:150ms" role="img" aria-label="具身智能研究地图：导航、操作、移动操作、硬件、控制、仿真器与数据评测">
        <div class="art-topline">
          <span>FIG. 01 / RESEARCH ATLAS</span>
          <span class="art-live"><i></i>LIVE INDEX</span>
        </div>
        <div class="art-canvas">
          <svg class="orbit-svg" viewBox="0 0 620 620" fill="none" aria-hidden="true">
            <defs>
              <pattern id="art-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" stroke="rgba(242,239,230,.075)" stroke-width="1"/>
              </pattern>
              <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ff4b1f" stop-opacity=".25"/>
                <stop offset="100%" stop-color="#ff4b1f" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="620" height="620" fill="url(#art-grid)"/>
            <circle cx="310" cy="310" r="235" stroke="rgba(242,239,230,.2)" stroke-dasharray="2 10"/>
            <circle cx="310" cy="310" r="172" stroke="rgba(242,239,230,.13)"/>
            <circle cx="310" cy="310" r="96" fill="url(#core-glow)"/>
            <path d="M310 75v56M310 489v56M75 310h56M489 310h56" stroke="rgba(242,239,230,.38)"/>
            <path d="m114 114 40 40m312 312 40 40m0-392-40 40M154 466l-40 40" stroke="rgba(242,239,230,.22)"/>
            <circle cx="310" cy="75" r="4" fill="#ff4b1f"/>
            <circle cx="545" cy="310" r="4" fill="#c8ff3d"/>
            <circle cx="310" cy="545" r="4" fill="#f2efe6"/>
            <circle cx="75" cy="310" r="4" fill="#f2efe6"/>
            <path d="M310 310 492 195M310 310 492 425M310 310 128 425M310 310 128 195" stroke="rgba(242,239,230,.2)"/>
          </svg>
          <div class="loop-core">
            <span class="core-index">EAI / 000</span>
            <strong>领域<br>→ 论文</strong>
            <span class="core-sub">${TOTAL_ROUTES} ROUTES INSIDE</span>
          </div>
          ${nodes.map(node => `
            <div class="loop-node ${node.cls}">
              <span class="loop-node-index">${node.icon}</span>
              <b>${node.title}</b>
              <small>${node.sub}</small>
            </div>`).join("")}
          <span class="art-axis art-axis--top">Y / ROUTES</span>
          <span class="art-axis art-axis--bottom">X / EVIDENCE</span>
          <span class="art-coord">31.2304° N<br>121.4737° E</span>
        </div>
        <div class="art-foot">
          <span>${DOMAINS.map(domain => domain.short).join(" / ")}</span>
          <span>${ENTRIES.length} ENTRIES · ${TOTAL_ROUTES} ROUTES</span>
        </div>
      </div>`;
  }

  function marqueeItems() {
    const items = ["NAVIGATION", "MANIPULATION", "LOCO-MANIPULATION", "SIMULATION", "DATA & EVALUATION", "VLA", "WAM", "CODE AS POLICY", "EMBODIED HARNESS", "SIM2REAL"];
    return `<div class="marquee-group">${items.map((item, index) => `<span>${item}</span><i aria-hidden="true">${index % 3 === 0 ? "✳" : index % 3 === 1 ? "+" : "→"}</i>`).join("")}</div>`;
  }

  function smallSearchIcon() {
    return `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.6" cy="8.6" r="5.4" stroke="currentColor" stroke-width="1.6"/><path d="m12.8 12.8 3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }

  function domainCard(domain, index) {
    const count = countDomainEntries(domain.id);
    const resourceCount = resourcesForDomain(domain.id).length;
    const routeCount = domain.routes.length;
    const isFeature = Boolean(domain.feature);
    const style = `--accent:${domain.accent};--tint:${domain.tint};--delay:${index * 40}ms;`;
    if (isFeature) {
      return `
        <article class="domain-card domain-card--feature reveal" data-domain="${domain.id}" style="${style}">
          <a href="#/domain/${domain.id}" aria-label="进入${esc(domain.name)}领域">
            <div class="dc-top">
              <span class="dc-num">${domain.num}</span>
              <span class="dc-icon">${DOMAIN_ICONS[domain.id]}</span>
              <span class="dc-arrow">${arrowIcon()}</span>
            </div>
            <div class="dc-feature-body">
              <div class="dc-feature-copy">
                <p class="dc-en">${esc(domain.en)}</p>
                <h3>${esc(domain.name)}</h3>
                <p class="dc-tagline">${esc(domain.tagline)}</p>
                <div class="dc-pipeline" aria-hidden="true">
                  <span>IL</span><i>×</i><span>RL</span><i>→</i><span>VLA</span><i>→</i><span>WAM</span>
                </div>
              </div>
              <div class="dc-watermark" aria-hidden="true">MANIP</div>
            </div>
            <div class="dc-feature-route-list">
              ${domain.routes.map((route, routeIndex) => `<span><b>${padded(routeIndex + 1)}</b>${esc(route.name)}</span>`).join("")}
            </div>
            <div class="dc-feature-foot">
              <span class="dc-count">${routeCount} 条路线 · ${count} 个词条 · ${resourceCount} 个资源 <i>↗</i></span>
            </div>
          </a>
        </article>`;
    }
    return `
      <article class="domain-card reveal" data-domain="${domain.id}" style="${style}">
        <a href="#/domain/${domain.id}" aria-label="进入${esc(domain.name)}领域">
          <div class="dc-top">
            <span class="dc-num">${domain.num}</span>
            <span class="dc-icon">${DOMAIN_ICONS[domain.id]}</span>
            <span class="dc-arrow">${arrowIcon()}</span>
          </div>
          <div class="dc-body">
            <p class="dc-en">${esc(domain.en)}</p>
            <h3>${esc(domain.name)}</h3>
            <p class="dc-description">${esc(domain.description)}</p>
            <div class="dc-route-list">${domain.routes.map(route => `<span>${esc(route.name)}</span>`).join("")}</div>
          </div>
          <div class="dc-foot">
            <span class="dc-count">${routeCount} 条路线 · ${count} 个词条 <i>↗</i></span>
          </div>
        </a>
      </article>`;
  }

  /* ------------------------------------------------------------------ catalog */

  function catalogTypeCounts() {
    const counts = { all: ENTRIES.length };
    TYPE_ORDER.forEach(type => { counts[type] = ENTRIES.filter(entry => entry.type === type).length; });
    return counts;
  }

  function filterCatalogEntries() {
    const { q, type, domain, route, sort, bookmarksOnly } = state.catalog;
    let list = ENTRIES.slice();
    if (bookmarksOnly) list = list.filter(entry => state.bookmarks.has(entry.id));
    if (type !== "all") list = list.filter(entry => entry.type === type);
    if (domain !== "all") list = list.filter(entry => entry.domain === domain);
    if (route !== "all") list = list.filter(entry => entry.route === route);
    if (q.trim()) {
      const query = q.trim().toLowerCase();
      list = list.filter(entry => {
        const domainInfo = domainOf(entry);
        const route = routeOf(entry);
        return [
          entry.title, entry.subtitle, entry.tldr, entry.org, entry.venue,
          entry.year, ...(entry.tags || []), domainInfo.name, domainInfo.en, domainInfo.short,
          route?.name || "", route?.en || ""
        ].join(" ").toLowerCase().includes(query);
      });
    }
    if (sort === "latest") {
      list.sort(sortByYearDesc);
    } else if (sort === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title, "en"));
    } else {
      list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year || a.title.localeCompare(b.title, "en"));
    }
    return list;
  }

  function entryCardMarkup(entry, index = 0) {
    const domain = domainOf(entry);
    const route = routeOf(entry);
    return `
      <a class="entry-card" href="#/entry/${entry.id}" style="--accent:${domain.accent};--tint:${domain.tint};--delay:${Math.min(index, 8) * 35}ms">
        <div class="entry-card-top">
          ${typeChip(entry.type)}
          <span class="entry-year">${entry.year}</span>
        </div>
        <div class="entry-card-heading">
          <p class="entry-card-domain">${domain.num} / ${esc(domain.short)} <span>·</span> ${esc(route?.name || "")}</p>
          <h3>${esc(entry.title)}</h3>
          <p class="entry-card-sub">${esc(entry.subtitle)}</p>
        </div>
        <p class="entry-card-tldr">${esc(entry.tldr)}</p>
        <div class="entry-card-tags">
          ${(entry.tags || []).slice(0, 3).map(tag => `<span>${esc(tag)}</span>`).join("")}
        </div>
        <div class="entry-card-foot">
          <span>${readTime(entry)} 分钟阅读</span>
          <span class="entry-card-arrow">${arrowIcon()}</span>
        </div>
      </a>`;
  }

  function entryGridMarkup(list, emptyMessage = "没有匹配的词条。换个关键词，或者清空筛选。", emptyAction = "") {
    if (!list.length) {
      return `<div class="empty-state">
        <span class="empty-mark">∅</span>
        <h3>这里暂时是空的。</h3>
        <p>${esc(emptyMessage)}</p>
        ${emptyAction || `<a class="button button--dark" href="#/contribute">贡献一个词条 ${smallArrow()}</a>`}
      </div>`;
    }
    return `<div class="entry-grid">${list.map(entryCardMarkup).join("")}</div>`;
  }

  function catalogTableMarkup(list, emptyMessage = "没有匹配的词条。换个关键词，或者清空筛选。", emptyAction = "") {
    if (!list.length) {
      return `<div class="wiki-empty catalog-empty">${emptyMessage}${emptyAction ? `<div class="catalog-empty-action">${emptyAction}</div>` : ""}</div>`;
    }
    return `
      <table class="wikitable catalog-wikitable">
        <thead>
          <tr><th>词条</th><th>类型</th><th>领域 / 路线</th><th>年份</th><th>概要</th></tr>
        </thead>
        <tbody>
          ${list.map(entry => {
            const domain = domainOf(entry);
            const route = routeOf(entry);
            return `<tr class="catalog-row">
              <td><a href="#/entry/${entry.id}">${esc(entry.title)}</a><br><span class="wiki-table-sub">${esc(entry.subtitle)}</span></td>
              <td>${esc(typeLabel(entry.type))}</td>
              <td><a href="#/domain/${domain.id}">${esc(domain.name)}</a> / <a href="${routeHref(domain, route)}">${esc(route.name)}</a></td>
              <td>${entry.year}</td>
              <td class="wiki-table-text">${esc(entry.tldr)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>`;
  }

  function renderCatalog() {
    const typeCounts = catalogTypeCounts();
    const initialList = filterCatalogEntries();
    const history = REPO
      ? `<a class="wiki-tab" href="${REPO_URL}/commits/${BRANCH}/assets/js/data.js" target="_blank" rel="noopener">历史</a>`
      : `<span class="wiki-tab is-disabled" title="发布到 GitHub 后可查看编辑历史">历史</span>`;
    return `
      <div class="view view--article view--catalog-wiki">
        <div class="wiki-skin">
          <div class="wiki-tabbar">
            <div class="wiki-tabbar-inner">
              <a class="wiki-tabbar-brand" href="#/"><span class="wiki-tabbar-mark">E</span><span>EAI Wiki</span></a>
              <nav class="wiki-tabs" aria-label="页面命名空间">
                <a class="wiki-tab is-active" href="#/entries">索引</a>
                <button class="wiki-tab" type="button" data-wiki-discuss data-discuss-title="词条库" data-discuss-url="#/entries">讨论</button>
                <a class="wiki-tab" href="#/contribute">编辑</a>
                ${history}
              </nav>
              <div class="wiki-tabbar-right">
                <button class="wiki-tabbar-link" type="button" data-open-search>搜索</button>
                <a class="wiki-tabbar-link" href="#/">首页</a>
                <a class="wiki-tabbar-link" href="#/graph">知识网络</a>
              </div>
            </div>
          </div>

          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              <nav class="wiki-toc-box" aria-label="本页目录">
                <div class="wiki-toc-heading">目录</div>
                <ol>
                  <li><button type="button" data-scroll-target="catalog-index">索引与筛选</button></li>
                  <li><button type="button" data-scroll-target="catalog-scope">收录范围</button></li>
                  <li><button type="button" data-scroll-target="catalog-contribute">贡献</button></li>
                </ol>
              </nav>
              <div class="wiki-tools">
                <div class="wiki-tools-head">工具</div>
                <a href="#/">首页</a>
                <a href="#/graph">知识网络</a>
                <a href="#/contribute">共建指南</a>
                <button type="button" data-print-page>可打印版</button>
                <button type="button" data-copy-permalink>永久链接</button>
                <a href="${repoFileUrl("assets/js/data.js")}" target="_blank" rel="noopener">查看源数据</a>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">词条库</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                当前索引 ${ENTRIES.length} 个词条，跨 ${DOMAINS.length} 个领域、${TOTAL_ROUTES} 条技术路线。最后修订 ${formatDate(CFG.updated || "2026-11-11")}。
              </div>
              <div class="wiki-hatnote">本页是全部条目的索引。具体工作请进入词条页；领域、路线与讨论页可从各条目顶部标签进入。</div>

              <div class="wiki-lead-layout">
                <div class="wiki-lead">
                  <p><strong>词条库</strong>是 EAI Wiki 的条目索引，收录论文、系统、概念、数据集与 benchmark。每条记录都归属于一个研究领域和一条技术路线。</p>
                  <p>索引按类型、领域、技术路线和关键词筛选。这里不是论文排行榜；词条的技术判断、证据与边界仍以各自页面为准。</p>
                </div>
                ${articleInfobox("词条库", [
                  ["类型", "全站索引"],
                  ["词条", `${ENTRIES.length} 个`],
                  ["研究领域", `${DOMAINS.length} 个`],
                  ["技术路线", `${TOTAL_ROUTES} 条`],
                  ["资源", `${RESOURCES.length} 个`],
                  ["状态", '<span class="wiki-status-dot"></span>持续更新']
                ])}
              </div>

              <details class="wiki-mobile-toc">
                <summary>目录</summary>
                <ol>
                  <li><button type="button" data-scroll-target="catalog-index">索引与筛选</button></li>
                  <li><button type="button" data-scroll-target="catalog-scope">收录范围</button></li>
                  <li><button type="button" data-scroll-target="catalog-contribute">贡献</button></li>
                </ol>
              </details>

              <section class="wiki-section" id="catalog-index">
                <div class="wiki-section-heading">
                  <h2>索引与筛选</h2>
                </div>
                <div class="catalog-wiki-toolbar">
                  <div class="filter-row" role="group" aria-label="按类型筛选">
                    <button class="filter-chip ${state.catalog.type === "all" ? "is-active" : ""}" type="button" data-catalog-type="all">
                      全部 <span>${typeCounts.all}</span>
                    </button>
                    ${TYPE_ORDER.map(type => `
                      <button class="filter-chip ${state.catalog.type === type ? "is-active" : ""}" type="button" data-catalog-type="${type}">
                        ${typeLabel(type)} <span>${typeCounts[type] || 0}</span>
                      </button>`).join("")}
                  </div>
                  <div class="catalog-wiki-controls">
                    <label class="catalog-search">
                      <span class="sr-only">搜索词条</span>
                      ${smallSearchIcon()}
                      <input id="catalog-search" type="search" value="${esc(state.catalog.q)}" placeholder="筛选词条…" autocomplete="off" spellcheck="false">
                    </label>
                    <label class="select-wrap">
                      <span class="sr-only">按领域筛选</span>
                      <select id="catalog-domain">
                        <option value="all">全部领域</option>
                        ${DOMAINS.map(domain => `<option value="${domain.id}" ${state.catalog.domain === domain.id ? "selected" : ""}>${esc(domain.name)}</option>`).join("")}
                      </select>
                      <span class="select-arrow">⌄</span>
                    </label>
                    <label class="select-wrap select-wrap--route">
                      <span class="sr-only">按技术路线筛选</span>
                      <select id="catalog-route">
                        <option value="all">全部路线</option>
                        ${DOMAINS.map(domain => `<optgroup label="${esc(domain.name)}">${domain.routes.map(route => `<option value="${route.id}" ${state.catalog.route === route.id ? "selected" : ""}>${esc(route.name)}</option>`).join("")}</optgroup>`).join("")}
                      </select>
                      <span class="select-arrow">⌄</span>
                    </label>
                    <label class="select-wrap">
                      <span class="sr-only">排序方式</span>
                      <select id="catalog-sort">
                        <option value="featured" ${state.catalog.sort === "featured" ? "selected" : ""}>推荐排序</option>
                        <option value="latest" ${state.catalog.sort === "latest" ? "selected" : ""}>最新年份</option>
                        <option value="az" ${state.catalog.sort === "az" ? "selected" : ""}>标题 A–Z</option>
                      </select>
                      <span class="select-arrow">⌄</span>
                    </label>
                  </div>
                </div>

                <div class="catalog-meta">
                  <p id="catalog-count" aria-live="polite">显示 ${initialList.length} / ${ENTRIES.length} 个词条</p>
                  <div class="catalog-meta-actions">
                    <button class="text-button ${state.catalog.bookmarksOnly ? "is-active" : ""}" type="button" id="catalog-bookmarks" aria-pressed="${state.catalog.bookmarksOnly}">
                      本机收藏 <span id="catalog-bookmark-count">${state.bookmarks.size}</span>
                    </button>
                    <button class="text-button" type="button" id="catalog-reset">重置筛选 ↗</button>
                  </div>
                </div>
                <div id="catalog-results">${catalogTableMarkup(initialList)}</div>
                <p class="wiki-source-note">表内「概要」来自词条的 tldr；完整技术描述、证据与来源见各自条目。</p>
              </section>

              <section class="wiki-section" id="catalog-scope">
                <div class="wiki-section-heading">
                  <h2>收录范围</h2>
                </div>
                <ul class="wiki-list">
                  <li><strong>论文 / 系统：</strong>有明确方法、实验或系统实现的工作。</li>
                  <li><strong>概念：</strong>持续被使用的技术概念、范式或系统层。</li>
                  <li><strong>数据 / 平台 / 基准：</strong>可被复用的数据、仿真环境、硬件平台与评测协议。</li>
                </ul>
                <p class="wiki-source-note">收录不代表 endorsement；编辑会优先保留有一手来源、能说明边界的条目。</p>
              </section>

              <section class="wiki-section" id="catalog-contribute">
                <div class="wiki-section-heading">
                  <h2>贡献</h2>
                </div>
                <p>这张索引并不完整。发现缺失的工作、错误的归位或过时的数据，可以使用条目页的「编辑」标签，或直接提交新词条。</p>
                <p><a class="wiki-button" href="#/contribute">阅读共建指南</a> <button class="wiki-button wiki-button--primary" type="button" data-open-contribute>贡献一个词条</button></p>
              </section>

              ${articleCategories([
                { label: "具身智能", href: "#/" },
                { label: "索引", href: "#/entries" },
                { label: "全部词条", href: "#/entries" }
              ])}
              ${articleFooter()}
            </main>
          </div>
        </div>
      </div>`;
  }

  function renderCatalogResults() {
    const results = document.getElementById("catalog-results");
    if (!results) return;
    const list = filterCatalogEntries();
    const emptyMessage = state.catalog.bookmarksOnly
      ? "还没有本机收藏。打开任意词条，点击「收藏」，它就会出现在这里。收藏只保存在当前浏览器。"
      : "没有匹配的词条。换个关键词，或者清空筛选。";
    const emptyAction = state.catalog.bookmarksOnly
      ? `<button class="button button--dark" type="button" data-catalog-show-all>显示全部词条 ${smallArrow()}</button>`
      : "";
    results.innerHTML = catalogTableMarkup(list, emptyMessage, emptyAction);
    const count = document.getElementById("catalog-count");
    if (count) count.textContent = `显示 ${list.length} / ${ENTRIES.length} 个词条`;
    document.querySelectorAll("[data-catalog-type]").forEach(button => {
      button.classList.toggle("is-active", button.dataset.catalogType === state.catalog.type);
    });
    const bookmarkFilter = document.getElementById("catalog-bookmarks");
    if (bookmarkFilter) {
      bookmarkFilter.classList.toggle("is-active", state.catalog.bookmarksOnly);
      bookmarkFilter.setAttribute("aria-pressed", String(state.catalog.bookmarksOnly));
      const bookmarkCount = document.getElementById("catalog-bookmark-count");
      if (bookmarkCount) bookmarkCount.textContent = state.bookmarks.size;
    }
  }

  /* ------------------------------------------------------------------- domain */

  function wikiPageHref(pageType, domain, route, entry) {
    if (pageType === "entry") return `#/entry/${entry.id}`;
    if (pageType === "route") return routeHref(domain, route);
    return `#/domain/${domain.id}`;
  }

  function wikiEditHref(pageType, domainId, routeId, entryId, section = "") {
    const base = pageType === "entry"
      ? `#/edit/entry/${entryId}`
      : pageType === "route"
        ? `#/edit/route/${domainId}/${routeId}`
        : `#/edit/domain/${domainId}`;
    return section && section !== "整页" ? `${base}?section=${encodeURIComponent(section)}` : base;
  }

  function wikiTalkHref(pageType, domainId, routeId, entryId) {
    if (pageType === "entry") return `#/talk/entry/${entryId}`;
    if (pageType === "route") return `#/talk/route/${domainId}/${routeId}`;
    return `#/talk/domain/${domainId}`;
  }

  function wikiEditLink(pageType, domainId, routeId, section, entryId = "") {
    return `<a class="wiki-section-edit" href="${wikiEditHref(pageType, domainId, routeId, entryId, section)}">编辑</a>`;
  }

  function articleTabs(pageType, domain, route, entry = null, active = "article") {
    const pageHash = wikiPageHref(pageType, domain, route, entry);
    const talkHash = entry
      ? wikiTalkHref("entry", domain.id, route.id, entry.id)
      : route
        ? wikiTalkHref("route", domain.id, route.id, "")
        : wikiTalkHref("domain", domain.id, "", "");
    const editHash = entry
      ? wikiEditHref("entry", domain.id, route.id, entry.id)
      : route
        ? wikiEditHref("route", domain.id, route.id, "")
        : wikiEditHref("domain", domain.id, "", "");
    const history = REPO
      ? `<a class="wiki-tab" href="${REPO_URL}/commits/${BRANCH}/assets/js/data.js" target="_blank" rel="noopener">历史</a>`
      : `<span class="wiki-tab is-disabled" title="发布到 GitHub 后可查看编辑历史">历史</span>`;
    return `
      <div class="wiki-tabbar">
        <div class="wiki-tabbar-inner">
          <a class="wiki-tabbar-brand" href="#/"><span class="wiki-tabbar-mark">E</span><span>EAI Wiki</span></a>
          <nav class="wiki-tabs" aria-label="页面命名空间">
            <a class="wiki-tab ${active === "article" ? "is-active" : ""}" href="${pageHash}">条目</a>
            <a class="wiki-tab ${active === "talk" ? "is-active" : ""}" href="${talkHash}">讨论</a>
            <a class="wiki-tab ${active === "edit" ? "is-active" : ""}" href="${editHash}">编辑</a>
            ${history}
          </nav>
          <div class="wiki-tabbar-right">
            <button class="wiki-tabbar-link" type="button" data-open-search>搜索</button>
            <a class="wiki-tabbar-link" href="#/entries">全部条目</a>
            ${route ? `<a class="wiki-tabbar-link" href="#/domain/${domain.id}">返回领域</a>` : `<a class="wiki-tabbar-link" href="#/">返回首页</a>`}
          </div>
        </div>
      </div>`;
  }

  function articleToc(items) {
    return `
      <nav class="wiki-toc-box" aria-label="本页目录">
        <div class="wiki-toc-heading">目录</div>
        <ol>
          ${items.map(item => `<li><button type="button" data-scroll-target="${item.id}">${esc(item.label)}</button></li>`).join("")}
        </ol>
      </nav>`;
  }

  function articleInfobox(title, rows) {
    return `
      <aside class="wiki-infobox">
        <div class="wiki-infobox-title">${esc(title)}</div>
        <table>
          <tbody>
            ${rows.map(row => `<tr><th scope="row">${esc(row[0])}</th><td>${row[1]}</td></tr>`).join("")}
          </tbody>
        </table>
      </aside>`;
  }

  function articleCategories(items) {
    return `<div class="wiki-categories"><strong>分类：</strong>${items.map(item => `<a href="${item.href}">${esc(item.label)}</a>`).join(" · ")}</div>`;
  }

  function articleFooter() {
    const history = REPO ? ` <a href="${REPO_URL}/commits/${BRANCH}/assets/js/data.js" target="_blank" rel="noopener">编辑历史</a>。` : "";
    return `
      <div class="wiki-article-footer">
        <p>本页面最后修订于 ${formatDate(CFG.updated || "2026-11-11")}。<span class="wiki-footer-dot">·</span>由 EAI Wiki 社区维护。${history}</p>
        <p>文字内容采用 <a href="LICENSE-CONTENT.md">CC BY-SA 4.0</a>；代码采用 <a href="LICENSE">MIT</a>。引用前请核对原始来源。</p>
      </div>`;
  }

  function openPageDiscussion(title, pageHash) {
    const pageUrl = `${window.location.origin}${window.location.pathname}${pageHash}`;
    const body = `### 讨论页面
${title} (${pageUrl})

### 你想讨论什么
（请写清楚是针对定义、证据、路线归位还是工程实践；尽量附一手来源。）

### 当前理解 / 反例
`;
    const link = issueUrl(`[讨论] ${title}`, body);
    if (link) {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      showToast("已打开 GitHub 讨论 Issue");
    } else {
      copyText(body, "讨论模板已复制；发布站点后会打开 GitHub Issue");
    }
  }

  function wikiIdentity(domain, route, entry) {
    const type = entry ? "entry" : route ? "route" : "domain";
    const title = entry ? entry.title : route ? route.name : domain.name;
    const articleHref = wikiPageHref(type, domain, route, entry);
    return {
      type,
      domain,
      route,
      entry,
      title,
      articleHref,
      talkHref: wikiTalkHref(type, domain.id, route?.id || "", entry?.id || ""),
      editHref: wikiEditHref(type, domain.id, route?.id || "", entry?.id || ""),
      commentStorageKey: entry ? entry.id : route ? `route/${domain.id}/${route.id}` : `domain/${domain.id}`,
      commentTerm: entry ? `entry/${entry.id}` : route ? `route/${domain.id}/${route.id}` : `domain/${domain.id}`
    };
  }

  function wikiSectionOptions(identity) {
    const { type, domain, route, entry } = identity;
    if (type === "route") {
      const routeWhole = [
        `# ${route.name}`,
        route.summary,
        "## 路线导读",
        ...(route.lead || []),
        ...(route.sections || []).map(section => `## ${section.title}\n${(section.body || []).join("\n\n")}${section.bullets?.length ? `\n\n${section.bullets.map(item => `- ${item}`).join("\n")}` : ""}`),
        "## 实践清单",
        ...(route.practice || []).map(item => `- ${item}`)
      ].join("\n\n");
      return [
        { value: "整页", source: routeWhole },
        { value: "路线导读", source: (route.lead || []).join("\n\n") },
        ...(route.sections || []).map(section => ({
          value: section.title,
          source: [...(section.body || []), ...(section.bullets || []).map(item => `- ${item}`)].join("\n\n")
        })),
        { value: "实践清单", source: (route.practice || []).map(item => `- ${item}`).join("\n") },
        { value: "路线上的工作", source: routeEntries(domain.id, route.id).map(item => `- ${item.title}（${item.year}，${item.venue}）：${item.tldr}`).join("\n") },
        { value: "参见", source: (domain.routes || []).filter(item => item.id !== route.id).map(item => `- ${item.name}：${item.summary}`).join("\n") },
        { value: "参考资料", source: routeEntries(domain.id, route.id).flatMap(item => (item.links || []).map(link => `${item.title} · ${link.label}：${link.url}`)).join("\n") }
      ];
    }
    if (type === "entry") {
      const entryWhole = [
        `# ${entry.title}`,
        entry.tldr,
        entry.why,
        "## 它解决什么问题",
        ...(entry.intro || []),
        "## 核心机制",
        ...(entry.method || []).map(item => `### ${item.title}\n${item.text}`),
        "## 关键证据",
        ...(entry.evidence || []).map(item => `- ${item.label}：${item.value}。${item.text}`),
        "## 边界与开放问题",
        ...(entry.limits || []).map(item => `- ${item}`)
      ].join("\n\n");
      return [
        { value: "整页", source: entryWhole },
        { value: "它解决什么问题", source: (entry.intro || []).join("\n\n") },
        { value: "核心机制", source: (entry.method || []).map(item => `### ${item.title}\n${item.text}`).join("\n\n") },
        { value: "关键证据", source: (entry.evidence || []).map(item => `- ${item.label}：${item.value}。${item.text}`).join("\n") },
        { value: "边界与开放问题", source: (entry.limits || []).map(item => `- ${item}`).join("\n") },
        { value: "参见", source: (entry.related || []).map(id => byId(id)).filter(Boolean).map(item => `- ${item.title}：${item.subtitle}`).join("\n") },
        { value: "参考资料", source: (entry.links || []).map(link => `- ${link.label}：${link.url}`).join("\n") }
      ];
    }
    const resources = resourcesForDomain(domain.id);
    const domainWhole = [
      `# ${domain.name}`,
      domain.description,
      ...(domain.intro || []),
      "## 技术路线",
      ...domain.routes.map(item => `### ${item.name}\n${item.question}\n${item.summary}`),
      "## 数据、平台与基准",
      ...resources.map(item => `- ${typeLabel(item.type)} · ${item.name}（${item.year}）：${item.summary}`),
      "## 开放问题",
      ...(domain.openProblems || []).map(item => `- ${item}`)
    ].join("\n\n");
    return [
      { value: "整页", source: domainWhole },
      { value: "领域导读", source: [...(domain.intro || []), domain.readingGuide || ""].filter(Boolean).join("\n\n") },
      { value: "技术路线", source: domain.routes.map(item => `- ${item.name}（${item.en}）：${item.question}；${routeEntries(domain.id, item.id).length} 个词条。`).join("\n") },
      { value: "数据、平台与基准", source: resources.map(item => `- ${typeLabel(item.type)} · ${item.name}（${item.year}）：${item.summary} ${item.url}`).join("\n") },
      { value: "开放问题", source: (domain.openProblems || []).map(item => `- ${item}`).join("\n") },
      { value: "参见", source: (domain.related || []).map(id => domainById.get(id)).filter(Boolean).map(item => `- ${item.name}：${item.description}`).join("\n") }
    ];
  }

  function markdownLite(text) {
    const inline = value => esc(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/_([^_]+)_/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    const lines = String(text || "").split(/\r?\n/);
    const html = [];
    let listOpen = false;
    const closeList = () => { if (listOpen) { html.push("</ul>"); listOpen = false; } };
    lines.forEach(line => {
      if (/^###\s+/.test(line)) { closeList(); html.push(`<h4>${inline(line.replace(/^###\s+/, ""))}</h4>`); }
      else if (/^##\s+/.test(line)) { closeList(); html.push(`<h3>${inline(line.replace(/^##\s+/, ""))}</h3>`); }
      else if (/^#\s+/.test(line)) { closeList(); html.push(`<h3>${inline(line.replace(/^#\s+/, ""))}</h3>`); }
      else if (/^[-*]\s+/.test(line)) {
        if (!listOpen) { html.push("<ul>"); listOpen = true; }
        html.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      } else if (!line.trim()) {
        closeList();
      } else {
        closeList();
        html.push(`<p>${inline(line)}</p>`);
      }
    });
    closeList();
    return html.join("");
  }

  function resourceMarkup(resource) {
    const entry = resource.entryId ? byId(resource.entryId) : null;
    const href = entry ? `#/entry/${entry.id}` : safeUrl(resource.url);
    const external = !entry;
    return `
      <a class="resource-card" href="${href}" ${external ? 'target="_blank" rel="noopener"' : ""} style="--resource-accent:${entry ? domainOf(entry).accent : "var(--orange)"}">
        <div class="resource-top">
          <span class="resource-type">${resource.type === "dataset" ? "DATASET" : resource.type === "benchmark" ? "BENCHMARK" : "PLATFORM"}</span>
          <span class="resource-year">${resource.year}</span>
          <span class="resource-link-icon">${external ? arrowIcon() : "↗"}</span>
        </div>
        <h4>${esc(resource.name)}</h4>
        <p>${esc(resource.summary)}</p>
        <div class="resource-foot">
          <span>${esc(resource.scale)}</span>
          <span>${entry ? "站内词条" : "外部资源"}</span>
        </div>
      </a>`;
  }

  function renderDomain(domain) {
    const entries = entriesByDomain.get(domain.id) || [];
    const resources = resourcesForDomain(domain.id);

    const tocItems = [
      { id: "domain-routes", label: "技术路线" },
      { id: "domain-resources", label: "数据、平台与基准" },
      { id: "domain-open-problems", label: "开放问题" },
      { id: "domain-see-also", label: "参见" }
    ];
    const infoboxRows = [
      ["类型", "研究领域"],
      ["编号", domain.num],
      ["英文名", esc(domain.en)],
      ["技术路线", `${domain.routes.length} 条`],
      ["词条", `${entries.length} 个`],
      ["资源", `${resources.length} 个`],
      ["相邻领域", (domain.related || []).map(id => domainById.get(id)).filter(Boolean).map(item => `<a href="#/domain/${item.id}">${esc(item.name)}</a>`).join("、")],
      ["状态", '<span class="wiki-status-dot"></span>种子领域 · 待审校']
    ];
    const resourceRows = resources.map(resource => {
      const href = resource.entryId ? `#/entry/${resource.entryId}` : safeUrl(resource.url);
      const external = !resource.entryId;
      return `<tr>
        <td>${typeLabel(resource.type)}</td>
        <td><a href="${href}" ${external ? 'target="_blank" rel="noopener"' : ""}>${esc(resource.name)}</a>${external ? ' <span class="wiki-external">↗</span>' : ""}</td>
        <td>${resource.year}</td>
        <td>${esc(resource.scale)}</td>
        <td>${esc(resource.summary)}</td>
      </tr>`;
    }).join("");

    return `
      <div class="view view--article" style="--accent:${domain.accent};--tint:${domain.tint}">
        <div class="wiki-skin">
          ${articleTabs("domain", domain, null)}
          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              ${articleToc(tocItems)}
              <div class="wiki-tools">
                <div class="wiki-tools-head">工具</div>
                <a href="#/">链入页面</a>
                ${REPO ? `<a href="${REPO_URL}/commits/${BRANCH}/assets/js/data.js" target="_blank" rel="noopener">相关更改</a>` : '<span class="wiki-tool-disabled" title="发布后可用">相关更改</span>'}
                <button type="button" data-print-page>可打印版</button>
                <button type="button" data-copy-permalink>永久链接</button>
                <a href="${repoFileUrl("assets/js/data.js")}" target="_blank" rel="noopener">查看源数据</a>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">${esc(domain.name)}</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                此领域页由社区维护，路线划分与开放问题仍待领域编辑审校。最后修订 ${formatDate(CFG.updated || "2026-11-11")}。
              </div>
              <div class="wiki-hatnote">本页是研究领域条目。具体的论文、系统、硬件平台与数据见下文；阅读技术细节请进入各条<strong>技术路线</strong>。</div>

              <div class="wiki-lead-layout">
                <div class="wiki-lead">
                  <p><strong>${esc(domain.name)}</strong>（${esc(domain.en)}）是具身智能研究中的一级领域。${esc(domain.description)}</p>
                  ${(domain.intro || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
                  ${domain.readingGuide ? `<p class="wiki-reading-guide"><strong>阅读提示：</strong>${esc(domain.readingGuide)}</p>` : ""}
                </div>
                ${articleInfobox(domain.name, infoboxRows)}
              </div>

              <details class="wiki-mobile-toc">
                <summary>目录</summary>
                <ol>${tocItems.map(item => `<li><button type="button" data-scroll-target="${item.id}">${esc(item.label)}</button></li>`).join("")}</ol>
              </details>

              <section class="wiki-section" id="domain-routes">
                <div class="wiki-section-heading">
                  <h2>技术路线</h2>
                  ${wikiEditLink("domain", domain.id, "", "技术路线")}
                </div>
                <table class="wikitable">
                  <thead><tr><th>编号</th><th>技术路线</th><th>核心问题</th><th>词条</th></tr></thead>
                  <tbody>
                    ${domain.routes.map((route, index) => `
                      <tr>
                        <td>${padded(index + 1)}</td>
                        <td><a href="${routeHref(domain, route)}">${esc(route.name)}</a><br><span class="wiki-table-sub">${esc(route.en)}</span></td>
                        <td>${esc(route.question)}</td>
                        <td>${routeEntries(domain.id, route.id).length}</td>
                      </tr>`).join("")}
                  </tbody>
                </table>
              </section>

              <section class="wiki-section" id="domain-resources">
                <div class="wiki-section-heading">
                  <h2>数据、平台与基准</h2>
                  ${wikiEditLink("domain", domain.id, "", "数据、平台与基准")}
                </div>
                <table class="wikitable">
                  <thead><tr><th>类型</th><th>名称</th><th>年份</th><th>规模</th><th>说明</th></tr></thead>
                  <tbody>${resourceRows || '<tr><td colspan="5" class="wiki-empty">这个领域还没有收录数据、平台或 benchmark。</td></tr>'}</tbody>
                </table>
                <p class="wiki-source-note">资源可跨领域复用；同一数据集、硬件平台或 benchmark 可能同时出现在多个领域页。标有 ↗ 的链接会离开站内。</p>
              </section>

              <section class="wiki-section" id="domain-open-problems">
                <div class="wiki-section-heading">
                  <h2>开放问题</h2>
                  ${wikiEditLink("domain", domain.id, "", "开放问题")}
                </div>
                <ul class="wiki-list">
                  ${(domain.openProblems || []).map(problem => `<li>${esc(problem)}</li>`).join("")}
                </ul>
                <p class="wiki-source-note">这一节由编辑维护，代表当前社区认为重要但尚未解决的问题，不是论文结论。</p>
              </section>

              <section class="wiki-section" id="domain-see-also">
                <div class="wiki-section-heading">
                  <h2>参见</h2>
                </div>
                <ul class="wiki-list">
                  ${(domain.related || []).map(id => domainById.get(id)).filter(Boolean).map(item => `<li><a href="#/domain/${item.id}">${esc(item.name)}</a>：相邻研究领域，存在交叉的数据、系统或评测问题。</li>`).join("")}
                  <li><a href="#/entries">全部词条</a>：跨领域浏览论文、系统、概念、数据集与 benchmark。</li>
                  <li><a href="#/graph">知识网络</a>：查看七个领域之间的连接。</li>
                </ul>
              </section>

              ${articleCategories([
                { label: "具身智能", href: "#/" },
                { label: domain.name, href: `#/domain/${domain.id}` },
                { label: "研究领域", href: "#/entries" }
              ])}
              ${articleFooter()}
            </main>
          </div>
        </div>
      </div>`;
  }

  /* -------------------------------------------------------------------- route */

  function renderRoutePage(domain, route) {
    const items = routeEntries(domain.id, route.id);
    const relatedRoutes = domain.routes.filter(item => item.id !== route.id);
    const resources = resourcesForDomain(domain.id);
    const sections = route.sections || [];
    const references = [];
    const seenReferences = new Set();
    items.forEach(entry => {
      (entry.links || []).forEach(link => {
        if (seenReferences.has(link.url)) return;
        seenReferences.add(link.url);
        references.push({ entry, link });
      });
    });
    const tocItems = [
      ...sections.map((section, index) => ({ id: `route-section-${index}`, label: section.title })),
      { id: "route-practice", label: "实践清单" },
      { id: "route-works", label: "路线上的工作" },
      { id: "route-see-also", label: "参见" },
      { id: "route-references", label: "参考资料" }
    ];
    const infoboxRows = [
      ["类型", "技术路线"],
      ["父领域", `<a href="#/domain/${domain.id}">${esc(domain.name)}</a>`],
      ["英文名", esc(route.en)],
      ["词条", `${items.length} 个`],
      ["领域资源", `${resources.length} 个`],
      ["代表工作", items.slice(0, 3).map(entry => `<a href="#/entry/${entry.id}">${esc(entry.title)}</a>`).join("、") || "待补充"],
      ["状态", '<span class="wiki-status-dot"></span>种子条目 · 待审校'],
      ["最后修订", formatDate(CFG.updated || "2026-11-11")]
    ];
    const sectionBlocks = sections.map((section, index) => `
      <section class="wiki-section" id="route-section-${index}">
        <div class="wiki-section-heading">
          <h2>${esc(section.title)}</h2>
          ${wikiEditLink("route", domain.id, route.id, section.title)}
        </div>
        ${(section.body || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
        ${section.bullets?.length ? `<ul class="wiki-list">${section.bullets.map(bullet => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}
      </section>`).join("");

    return `
      <div class="view view--article" style="--accent:${domain.accent};--tint:${domain.tint}">
        <div class="wiki-skin">
          ${articleTabs("route", domain, route)}
          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              ${articleToc(tocItems)}
              <div class="wiki-tools">
                <div class="wiki-tools-head">工具</div>
                <a href="#/domain/${domain.id}">链入页面</a>
                ${REPO ? `<a href="${REPO_URL}/commits/${BRANCH}/assets/js/data.js" target="_blank" rel="noopener">相关更改</a>` : '<span class="wiki-tool-disabled" title="发布后可用">相关更改</span>'}
                <button type="button" data-print-page>可打印版</button>
                <button type="button" data-copy-permalink>永久链接</button>
                <a href="${repoFileUrl("assets/js/data.js")}" target="_blank" rel="noopener">查看源数据</a>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">${esc(route.name)}</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                此条目由社区维护，技术判断仍待领域编辑审校。最后修订 ${formatDate(CFG.updated || "2026-11-11")}。
              </div>
              <div class="wiki-hatnote">本页是「${esc(domain.name)}」领域的技术路线条目。关于具体模型、系统、硬件来源与数据，见 <a href="#route-works">路线上的工作</a>。</div>

              <div class="wiki-lead-layout">
                <div class="wiki-lead">
                  <p><strong>${esc(route.name)}</strong>（${esc(route.en)}）是「${esc(domain.name)}」领域中的一条技术路线。${esc(route.summary)}</p>
                  ${(route.lead || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
                </div>
                ${articleInfobox(route.name, infoboxRows)}
              </div>

              <details class="wiki-mobile-toc">
                <summary>目录</summary>
                <ol>${tocItems.map(item => `<li><button type="button" data-scroll-target="${item.id}">${esc(item.label)}</button></li>`).join("")}</ol>
              </details>

              ${sectionBlocks}

              <section class="wiki-section" id="route-practice">
                <div class="wiki-section-heading">
                  <h2>实践清单</h2>
                  ${wikiEditLink("route", domain.id, route.id, "实践清单")}
                </div>
                <ul class="wiki-list">
                  ${(route.practice || []).map(item => `<li>${esc(item)}</li>`).join("")}
                </ul>
              </section>

              <section class="wiki-section" id="route-works">
                <div class="wiki-section-heading">
                  <h2>路线上的工作</h2>
                  ${wikiEditLink("route", domain.id, route.id, "路线上的工作")}
                </div>
                <table class="wikitable wiki-works-table">
                  <thead><tr><th>年份</th><th>工作</th><th>类型</th><th>发表</th><th>概要</th></tr></thead>
                  <tbody>
                    ${items.map(entry => `
                      <tr>
                        <td>${entry.year}</td>
                        <td><a href="#/entry/${entry.id}">${esc(entry.title)}</a></td>
                        <td>${esc(typeLabel(entry.type))}</td>
                        <td>${esc(entry.venue)}</td>
                        <td class="wiki-table-text">${esc(entry.tldr)}</td>
                      </tr>`).join("")}
                  </tbody>
                </table>
                ${items.length ? "" : '<p class="wiki-empty">这条路线还没有词条。欢迎补充。</p>'}
                <p class="wiki-more-note">这里只列路线上的代表工作。更多论文、系统与数据集可以使用 <button class="wiki-inline-button" type="button" data-open-search>站内搜索</button>，或浏览 <a href="#/entries">全部词条</a>。</p>
              </section>

              <section class="wiki-section" id="route-see-also">
                <div class="wiki-section-heading">
                  <h2>参见</h2>
                </div>
                <ul class="wiki-list">
                  <li><a href="#/domain/${domain.id}">${esc(domain.name)}领域</a>：本路线所属的研究领域。</li>
                  ${relatedRoutes.slice(0, 4).map(item => `<li><a href="${routeHref(domain, item)}">${esc(item.name)}</a>：同领域的另一条技术路线。</li>`).join("")}
                </ul>
              </section>

              <section class="wiki-section" id="route-references">
                <div class="wiki-section-heading">
                  <h2>参考资料</h2>
                </div>
                ${references.length ? `<ol class="wiki-references">
                  ${references.map(({ entry, link }) => `<li>
                    <a href="${safeUrl(link.url)}" target="_blank" rel="noopener">${esc(entry.title)} · ${esc(link.label)}</a>
                  </li>`).join("")}
                </ol>` : '<p class="wiki-empty">这条路线还没有收录参考资料。</p>'}
                <p class="wiki-source-note">本页的二手概述由社区编辑；引用前请回到原始论文、代码或官方文档核对。</p>
              </section>

              ${articleCategories([
                { label: "具身智能", href: "#/" },
                { label: domain.name, href: `#/domain/${domain.id}` },
                { label: route.name, href: routeHref(domain, route) },
                { label: "技术路线", href: "#/entries" }
              ])}
              ${articleFooter()}
            </main>
          </div>
        </div>
      </div>`;
  }

  /* -------------------------------------------------------------------- entry */

  function primarySource(entry) {
    const links = entry.links || [];
    return links.find(link => /论文|paper/i.test(link.label)) ||
      links.find(link => /博客|blog|文档|项目/i.test(link.label)) ||
      links[0] || null;
  }

  function plainCitation(entry) {
    const source = primarySource(entry);
    return `${entry.authors}. ${entry.title}: ${entry.subtitle}. ${entry.venue}, ${entry.year}.${source ? ` ${source.url}` : ""}`;
  }

  function bibtexCitation(entry) {
    const source = primarySource(entry);
    const key = `eaiwiki_${entry.id.replace(/-/g, "_")}_${entry.year}`;
    return `@misc{${key},
  title  = {${entry.title}: ${entry.subtitle}},
  author = {${entry.authors}},
  year   = {${entry.year}},
  note   = {${entry.venue}. EAI Wiki entry — verify metadata against the original publication.}${source ? `,\n  url    = {${source.url}}` : ""}
}`;
  }

  function entryCommentsMarkup(page, options = {}) {
    const storageKey = page.commentStorageKey || page.id;
    const compact = Boolean(options.compact);
    let main;
    if (commentsConfigReady()) {
      main = `<div class="giscus-shell">
        <div id="giscus-container" data-entry-id="${storageKey}">
          <div class="comment-loading"><span class="loading-mark"></span><p>正在载入 GitHub Discussions…</p></div>
        </div>
      </div>`;
    } else if (isLocalPreview()) {
      const comments = readLocalComments(storageKey);
      main = `
        <div class="local-preview-note">
          <span class="preview-dot"></span>
          <div>
            <strong>本地预览模式</strong>
            <p>评论只保存在当前浏览器，不会同步给其他人。发布到 GitHub Pages 并接入 Giscus 后，这里会变成真正的公开讨论区。</p>
          </div>
          <a href="${esc(repoFileUrl("GISCUS_SETUP.md"))}" target="_blank" rel="noopener">查看接入说明 ↗</a>
        </div>
        <div class="local-comments" id="local-comments">
          <div class="comment-count-row">
            <span class="mono">LOCAL THREAD / ${padded(comments.length)}</span>
            <span>仅本机可见</span>
          </div>
          <div id="local-comment-list">${localCommentsMarkup(comments)}</div>
          <form class="comment-form" id="local-comment-form" novalidate>
            <input type="hidden" name="entryId" value="${storageKey}">
            <div class="comment-form-row">
              <label>昵称
                <input type="text" name="name" maxlength="40" required placeholder="怎么称呼你？" value="${esc(getSavedCommentName())}">
              </label>
            </div>
            <label>补充、质疑或复现经验
              <textarea name="text" rows="4" maxlength="1600" required placeholder="写下你的判断，也写下依据。"></textarea>
            </label>
            <div class="comment-form-foot">
              <p>评论仅保存在本机。请勿填写敏感信息。</p>
              <button class="button button--dark" type="submit">发表评论 ${smallArrow()}</button>
            </div>
          </form>
        </div>`;
    } else {
      main = `<div class="comment-setup">
        <span class="comment-setup-mark">DISCUSS / SETUP NEEDED</span>
        <h3>评论区还没有接入。</h3>
        <p>维护者需要启用 GitHub Discussions 并完成 Giscus 配置。完成后，每个页面都会自动拥有一个公开、可订阅的讨论串。</p>
        <div class="comment-setup-actions">
          <a class="button button--dark" href="${esc(repoFileUrl("GISCUS_SETUP.md"))}" target="_blank" rel="noopener">查看 3 分钟接入说明 ${smallArrow()}</a>
          <a class="button button--outline" href="${esc(issueUrl(`[讨论] ${page.title}`, `我想补充关于 ${page.title} 的讨论：\n\n`)) || "#/contribute"}" ${REPO ? 'target="_blank" rel="noopener"' : ""}>先在 Issues 中补充 ↗</a>
        </div>
      </div>`;
    }

    return `
      <section class="discussion ${compact ? "discussion--compact" : ""}" id="discussion">
        ${compact ? "" : `<div class="discussion-head">
          <div>
            <p class="eyebrow">TALK PAGE / DISCUSSION</p>
            <h2>讨论</h2>
          </div>
          <p class="discussion-sub">关于本条目的问题、复现经验、补充引用或不同意见，都欢迎留在这里。请区分事实与判断，并尽量附上出处。</p>
        </div>`}
        ${main}
      </section>`;
  }

  function renderEntry(entry) {
    const domain = domainOf(entry);
    const route = routeOf(entry);
    const siblings = routeEntries(entry.domain, entry.route);
    const index = siblings.findIndex(item => item.id === entry.id);
    const previous = index > 0 ? siblings[index - 1] : siblings[siblings.length - 1];
    const next = index < siblings.length - 1 ? siblings[index + 1] : siblings[0];
    const related = (entry.related || []).map(byId).filter(Boolean).slice(0, 4);
    const sources = entry.links || [];
    const type = typeLabel(entry.type);
    const tocItems = [
      { id: "entry-intro", label: "它解决什么问题" },
      { id: "entry-method", label: "核心机制" },
      { id: "entry-evidence", label: "关键证据" },
      { id: "entry-limits", label: "边界与开放问题" },
      { id: "entry-related", label: "参见" },
      { id: "entry-references", label: "参考资料" }
    ];
    const infoboxRows = [
      ["类型", esc(type)],
      ["领域", `<a href="#/domain/${domain.id}">${esc(domain.name)}</a>`],
      ["技术路线", `<a href="${routeHref(domain, route)}">${esc(route.name)}</a>`],
      ["年份", String(entry.year)],
      ["发表", esc(entry.venue)],
      ["机构", esc(entry.org)],
      ["作者", esc(entry.authors)],
      ["来源", `${sources.length} 个一手入口`],
      ["状态", '<span class="wiki-status-dot"></span>种子词条 · 待审校']
    ];
    const savedBookmark = state.bookmarks.has(entry.id);

    return `
      <div class="view view--article" style="--accent:${domain.accent};--tint:${domain.tint}">
        <div class="wiki-skin">
          ${articleTabs("entry", domain, route, entry)}
          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              ${articleToc(tocItems)}
              <div class="wiki-tools">
                <div class="wiki-tools-head">工具</div>
                <a href="${routeHref(domain, route)}">链入页面</a>
                <button type="button" data-cite="${entry.id}">引用此页</button>
                <button type="button" class="wiki-tool-action ${savedBookmark ? "is-bookmarked" : ""}" data-bookmark="${entry.id}" aria-pressed="${savedBookmark}" title="收藏仅保存在当前浏览器"><span>${savedBookmark ? "已收藏" : "收藏"}</span></button>
                <button type="button" data-share="${entry.id}">分享</button>
                <button type="button" data-print-page>可打印版</button>
                <button type="button" data-copy-permalink>永久链接</button>
                <a href="${repoFileUrl("assets/js/data.js")}" target="_blank" rel="noopener">查看源数据</a>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">${esc(entry.title)}</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                此条目由社区维护，所述证据以作者报告为准。最后修订 ${formatDate(CFG.updated || "2026-11-11")} · 约 ${readTime(entry)} 分钟阅读。
              </div>
              <div class="wiki-hatnote">本条目介绍一个具体${esc(type)}。关于其所处的技术路线，见 <a href="${routeHref(domain, route)}">${esc(route.name)}</a>。</div>

              <div class="wiki-lead-layout">
                <div class="wiki-lead">
                  <p><strong>${esc(entry.title)}</strong>（${esc(entry.subtitle)}）是「${esc(domain.name)} / ${esc(route.name)}」方向上的${esc(type)}，${entry.year} 年由 ${esc(entry.org)} 发布。${esc(entry.tldr)}</p>
                  <p>${esc(entry.why)}</p>
                </div>
                ${articleInfobox(entry.title, infoboxRows)}
              </div>

              <details class="wiki-mobile-toc">
                <summary>目录</summary>
                <ol>${tocItems.map(item => `<li><button type="button" data-scroll-target="${item.id}">${esc(item.label)}</button></li>`).join("")}</ol>
              </details>

              <section class="wiki-section" id="entry-intro">
                <div class="wiki-section-heading">
                  <h2>它解决什么问题</h2>
                  ${wikiEditLink("entry", domain.id, route.id, "它解决什么问题", entry.id)}
                </div>
                ${(entry.intro || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
              </section>

              <section class="wiki-section" id="entry-method">
                <div class="wiki-section-heading">
                  <h2>核心机制</h2>
                  ${wikiEditLink("entry", domain.id, route.id, "核心机制", entry.id)}
                </div>
                ${(entry.method || []).map(item => `<h3 class="wiki-subheading">${esc(item.title)}</h3><p>${esc(item.text)}</p>`).join("")}
              </section>

              <section class="wiki-section" id="entry-evidence">
                <div class="wiki-section-heading">
                  <h2>关键证据</h2>
                  ${wikiEditLink("entry", domain.id, route.id, "关键证据", entry.id)}
                </div>
                <table class="wikitable">
                  <thead><tr><th>指标</th><th>结果</th><th>说明 / 评测条件</th></tr></thead>
                  <tbody>
                    ${(entry.evidence || []).map(item => `<tr><td>${esc(item.label)}</td><td><strong>${esc(item.value)}</strong></td><td>${esc(item.text)}</td></tr>`).join("")}
                  </tbody>
                </table>
                <p class="wiki-source-note">数字与结论摘自作者报告。独立复现前，请把论文中的评测条件一并阅读。</p>
              </section>

              <section class="wiki-section" id="entry-limits">
                <div class="wiki-section-heading">
                  <h2>边界与开放问题</h2>
                  ${wikiEditLink("entry", domain.id, route.id, "边界与开放问题", entry.id)}
                </div>
                <ul class="wiki-list">
                  ${(entry.limits || []).map(limit => `<li>${esc(limit)}</li>`).join("")}
                </ul>
              </section>

              <section class="wiki-section" id="entry-related">
                <div class="wiki-section-heading">
                  <h2>参见</h2>
                  ${wikiEditLink("entry", domain.id, route.id, "继续阅读", entry.id)}
                </div>
                <ul class="wiki-list wiki-see-also">
                  ${related.map(item => {
                    const itemDomain = domainOf(item);
                    const itemRoute = routeOf(item);
                    return `<li><a href="#/entry/${item.id}">${esc(item.title)}</a> — ${esc(item.subtitle)}（${esc(itemDomain.name)} / ${esc(itemRoute?.name || "")}）</li>`;
                  }).join("")}
                </ul>
              </section>

              <section class="wiki-section" id="entry-references">
                <div class="wiki-section-heading">
                  <h2>参考资料</h2>
                </div>
                ${sources.length ? `<ol class="wiki-references">
                  ${sources.map(link => `<li><a href="${safeUrl(link.url)}" target="_blank" rel="noopener">${esc(link.label)}：${esc(entry.title)}</a></li>`).join("")}
                </ol>` : '<p class="wiki-empty">本条目还没有登记一手来源。</p>'}
                <p class="wiki-source-note">本页是社区编辑的二手概述，不是原作者审定版本。引用请以论文、代码或官方文档为准。</p>
              </section>

              ${articleCategories([
                { label: "具身智能", href: "#/" },
                { label: domain.name, href: `#/domain/${domain.id}` },
                { label: route.name, href: routeHref(domain, route) },
                { label: type, href: `#/entries` },
                { label: `${entry.year} 年`, href: `#/entries` }
              ])}
              ${articleFooter()}
            </main>
          </div>
        </div>

        <nav class="entry-pagination wrap" aria-label="相邻词条">
          ${previous ? `
            <a class="pagination-card pagination-card--prev" href="#/entry/${previous.id}">
              <span>← 上一篇 / ${esc(route.name)}</span>
              <strong>${esc(previous.title)}</strong>
            </a>` : ""}
          ${next ? `
            <a class="pagination-card pagination-card--next" href="#/entry/${next.id}">
              <span>下一篇 / ${esc(route.name)} →</span>
              <strong>${esc(next.title)}</strong>
            </a>` : ""}
        </nav>
      </div>`;
  }

  function renderEditPage(route) {
    const identity = wikiIdentity(route.domain, route.route || null, route.entry || null);
    const options = wikiSectionOptions(identity);
    const selected = options.find(item => item.value === route.section) || options[0];
    const current = options.find(item => item.value === selected.value) || options[0];
    return `
      <div class="view view--article" style="--accent:${identity.domain.accent};--tint:${identity.domain.tint}">
        <div class="wiki-skin">
          ${articleTabs(identity.type, identity.domain, identity.route, identity.entry, "edit")}
          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              <div class="wiki-tools wiki-edit-help">
                <div class="wiki-tools-head">编辑帮助</div>
                <p>编辑的是提案，不是线上正文。</p>
                <ul>
                  <li>一手来源优先</li>
                  <li>区分事实与判断</li>
                  <li>写清适用边界</li>
                  <li>提交后由编辑核对</li>
                </ul>
              </div>
              <div class="wiki-tools">
                <div class="wiki-tools-head">页面工具</div>
                <a href="${identity.articleHref}">返回条目</a>
                <a href="${identity.talkHref}">讨论页</a>
                <a href="${repoFileUrl("assets/js/data.js")}" target="_blank" rel="noopener">查看源数据</a>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">编辑 ${esc(identity.title)}</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                您正在编辑「${esc(identity.title)}」的 ${esc(selected.value)} 部分。保存会生成一个公开编辑提案，不会直接覆盖线上正文。
              </div>
              <div class="wiki-edit-notice">
                <strong>提案模式</strong>
                <p>请只修改你能够核对的文本。提交后会生成 GitHub Issue，编辑会检查来源、语气与结构后再合并。</p>
              </div>

              <form class="wiki-edit-page-form" id="wiki-edit-page-form" novalidate
                data-page-type="${identity.type}"
                data-domain-id="${identity.domain.id}"
                data-route-id="${identity.route?.id || ""}"
                data-entry-id="${identity.entry?.id || ""}"
                data-article-href="${identity.articleHref}">
                <div class="wiki-edit-scope">
                  <label>编辑范围
                    <select id="wiki-edit-section">
                      ${options.map(item => `<option value="${esc(item.value)}" ${item.value === selected.value ? "selected" : ""}>${esc(item.value)}</option>`).join("")}
                    </select>
                  </label>
                  <span>切换章节会重新载入编辑页。</span>
                </div>

                <div class="wiki-editor-toolbar" aria-label="编辑工具栏">
                  <button type="button" data-edit-wrap="**" title="粗体">B</button>
                  <button type="button" data-edit-wrap="_" title="斜体"><em>I</em></button>
                  <button type="button" data-edit-insert="## " title="二级标题">H2</button>
                  <button type="button" data-edit-insert="- " title="列表">• 列表</button>
                  <button type="button" data-edit-insert="[链接文字](https://)" title="链接">链接</button>
                  <button type="button" data-edit-insert="&#96;代码&#96;" title="行内代码">&lt;/&gt;</button>
                </div>
                <textarea class="wiki-edit-textarea" id="wiki-edit-textarea" name="content" rows="18" required>${esc(current.source)}</textarea>
                <div class="wiki-editor-preview" id="wiki-editor-preview" hidden></div>

                <div class="wiki-edit-fields">
                  <label><span>编辑摘要 <em>*</em></span>
                    <input type="text" name="summary" id="wiki-edit-summary" maxlength="160" required placeholder="例如：补充 π0.5 的训练数据配方；修正路线归位">
                  </label>
                  <label>依据与参考链接
                    <textarea name="sources" rows="3" maxlength="3000" placeholder="论文、代码、官方文档或可复现实验记录。优先一手来源。"></textarea>
                  </label>
                  <div class="wiki-edit-fields-row">
                    <label>署名 / GitHub 昵称
                      <input type="text" name="contributor" maxlength="60" value="${esc(getSavedCommentName())}" placeholder="可选">
                    </label>
                    <label>AI 参与
                      <select name="ai">
                        <option value="未使用 AI">未使用 AI</option>
                        <option value="AI 辅助润色 / 翻译">AI 辅助润色 / 翻译</option>
                        <option value="AI 辅助起草，已核对事实">AI 辅助起草，已核对事实</option>
                      </select>
                    </label>
                  </div>
                </div>

                <p class="wiki-edit-disclaimer">提交即表示你同意文字以 CC BY-SA 4.0 发布。请勿提交版权不明的长段原文、论文图片或敏感数据。</p>
                <div class="wiki-edit-actions">
                  <div>
                    <button class="wiki-button" type="button" data-edit-preview>显示预览</button>
                    <button class="wiki-button" type="button" data-edit-copy>复制提案</button>
                  </div>
                  <div>
                    <a class="wiki-button wiki-button--quiet" href="${identity.articleHref}">取消</a>
                    <button class="wiki-button wiki-button--primary" type="submit">保存更改</button>
                  </div>
                </div>
                <p class="wiki-edit-status" id="wiki-edit-status">保存会生成公开 GitHub Issue；本地预览会复制提案。</p>
              </form>
              ${articleFooter()}
            </main>
          </div>
        </div>
      </div>`;
  }

  function buildWikiEditDraft(identity, section, summary, content, sources, contributor, ai) {
    const pageUrl = `${window.location.origin}${window.location.pathname}${identity.articleHref}`;
    return `### 页面
${identity.title} (${pageUrl})

### 编辑范围
${section}

### 编辑摘要
${summary}

### 建议内容
${content}

### 依据与参考
${sources || "（未填写）"}

### 署名
${contributor || "匿名 / 待联系"}

### AI 参与
${ai}

---
*由 EAI Wiki 编辑页生成。请确认所有引用真实可访问。*`;
  }

  function setupEditPage(route) {
    const form = document.getElementById("wiki-edit-page-form");
    if (!form) return;
    const identity = wikiIdentity(route.domain, route.route || null, route.entry || null);
    const textarea = document.getElementById("wiki-edit-textarea");
    const preview = document.getElementById("wiki-editor-preview");
    const sectionSelect = document.getElementById("wiki-edit-section");
    const status = document.getElementById("wiki-edit-status");
    const initialContent = textarea?.value || "";

    form.querySelectorAll("[data-edit-wrap]").forEach(button => {
      button.addEventListener("click", () => {
        if (!textarea) return;
        const marker = button.dataset.editWrap;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = textarea.value.slice(start, end);
        const replacement = `${marker}${selected || "文字"}${marker}`;
        textarea.setRangeText(replacement, start, end, "end");
        textarea.focus();
        if (!selected) textarea.setSelectionRange(start + marker.length, start + marker.length + 2);
      });
    });

    form.querySelectorAll("[data-edit-insert]").forEach(button => {
      button.addEventListener("click", () => {
        if (!textarea) return;
        const insertion = button.dataset.editInsert;
        textarea.setRangeText(insertion, textarea.selectionStart, textarea.selectionEnd, "end");
        textarea.focus();
      });
    });

    form.querySelector("[data-edit-preview]")?.addEventListener("click", event => {
      if (!preview) return;
      const willShow = preview.hidden;
      if (willShow && textarea) preview.innerHTML = markdownLite(textarea.value);
      preview.hidden = !willShow;
      event.currentTarget.textContent = willShow ? "隐藏预览" : "显示预览";
    });

    const buildDraft = () => {
      const data = new FormData(form);
      return buildWikiEditDraft(
        identity,
        sectionSelect?.value || "整页",
        String(data.get("summary") || "").trim() || "（未填写编辑摘要）",
        String(data.get("content") || "").trim(),
        String(data.get("sources") || "").trim(),
        String(data.get("contributor") || "").trim(),
        String(data.get("ai") || "").trim()
      );
    };

    form.querySelector("[data-edit-copy]")?.addEventListener("click", () => {
      if (!form.reportValidity()) return;
      copyText(buildDraft(), "编辑提案已复制");
    });

    sectionSelect?.addEventListener("change", () => {
      const next = sectionSelect.value;
      if (textarea && textarea.value.trim() !== initialContent.trim() && !window.confirm("切换编辑范围会丢失未提交的修改。继续吗？")) {
        sectionSelect.value = route.section || "整页";
        return;
      }
      const target = wikiEditHref(identity.type, identity.domain.id, identity.route?.id || "", identity.entry?.id || "", next);
      window.location.hash = target;
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const draft = buildDraft();
      const section = sectionSelect?.value || "整页";
      const link = issueUrl(`[编辑] ${identity.title} / ${section}`, draft);
      if (link) {
        window.open(link, "_blank", "noopener");
        if (status) status.textContent = "已打开 GitHub Issue，请确认后提交。";
        showToast("已打开 GitHub 编辑提案");
      } else {
        copyText(draft, "编辑提案已复制；发布站点后会打开 GitHub Issue");
        if (status) status.textContent = "仓库尚未配置：编辑提案已复制。";
      }
    });
  }

  function renderTalkPage(route) {
    const identity = wikiIdentity(route.domain, route.route || null, route.entry || null);
    const target = {
      id: identity.commentStorageKey,
      title: identity.title,
      commentStorageKey: identity.commentStorageKey,
      commentTerm: identity.commentTerm
    };
    return `
      <div class="view view--article" style="--accent:${identity.domain.accent};--tint:${identity.domain.tint}">
        <div class="wiki-skin">
          ${articleTabs(identity.type, identity.domain, identity.route, identity.entry, "talk")}
          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              <div class="wiki-tools">
                <div class="wiki-tools-head">讨论页工具</div>
                <a href="${identity.articleHref}">返回条目</a>
                <a href="${identity.editHref}">编辑条目</a>
                <button type="button" data-print-page>可打印版</button>
                <button type="button" data-copy-permalink>永久链接</button>
              </div>
              <div class="wiki-tools wiki-talk-rules">
                <div class="wiki-tools-head">讨论规范</div>
                <p>讨论条目内容，不讨论贡献者个人。</p>
                <p>请签名、给出依据，并区分事实与判断。</p>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">讨论:${esc(identity.title)}</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                这是「${esc(identity.title)}」的讨论页。请围绕条目内容、来源与路线归位展开讨论。
              </div>
              <div class="wiki-talk-banner">
                <strong>讨论页不是论坛</strong>
                <p>这里用于协调条目编辑：补充来源、指出错误、讨论范围与归位。与条目无关的观点请放到个人页面或 GitHub Discussions。</p>
                <button class="wiki-button" type="button" data-wiki-discuss data-discuss-title="${esc(identity.title)}" data-discuss-url="${esc(identity.articleHref)}">在 GitHub 发起讨论</button>
              </div>

              <section class="wiki-talk-thread">
                <div class="wiki-section-heading">
                  <h2>讨论串</h2>
                  <span class="wiki-section-tag">TALK / OPEN THREAD</span>
                </div>
                ${entryCommentsMarkup(target, { compact: true })}
              </section>
              ${articleFooter()}
            </main>
          </div>
        </div>
      </div>`;
  }

  /* ----------------------------------------------------------------- comments */

  function readLocalComments(entryId) {
    try {
      const all = JSON.parse(localStorage.getItem("eai-wiki:local-comments") || "{}");
      return Array.isArray(all[entryId]) ? all[entryId] : [];
    } catch (_) {
      return [];
    }
  }

  function saveLocalComments(entryId, comments) {
    try {
      const all = JSON.parse(localStorage.getItem("eai-wiki:local-comments") || "{}");
      all[entryId] = comments.slice(-60);
      localStorage.setItem("eai-wiki:local-comments", JSON.stringify(all));
    } catch (_) { /* storage unavailable */ }
  }

  function getSavedCommentName() {
    try {
      return localStorage.getItem("eai-wiki:comment-name") || "";
    } catch (_) {
      return "";
    }
  }

  function localCommentsMarkup(comments) {
    if (!comments.length) {
      return `<div class="comment-empty">
        <span>还没有评论。</span>
        <p>成为第一个留下判断和依据的人。</p>
      </div>`;
    }
    return comments.map(comment => {
      const initial = (comment.name || "?").trim().slice(0, 1).toUpperCase();
      return `
        <article class="comment-item">
          <span class="comment-avatar" aria-hidden="true">${esc(initial)}</span>
          <div class="comment-content">
            <div class="comment-meta"><strong>${esc(comment.name)}</strong><span>${formatCommentDate(comment.createdAt)}</span><span class="local-chip">本机</span></div>
            <p>${esc(comment.text)}</p>
          </div>
        </article>`;
    }).join("");
  }

  function setupComments(page) {
    const storageKey = page.commentStorageKey || page.id;
    const form = document.getElementById("local-comment-form");
    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const text = String(data.get("text") || "").trim();
        if (!name || !text) {
          showToast("昵称和评论都不能为空");
          return;
        }
        const comments = readLocalComments(storageKey);
        comments.push({
          id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
          name: name.slice(0, 40),
          text: text.slice(0, 1600),
          createdAt: new Date().toISOString()
        });
        saveLocalComments(storageKey, comments);
        try { localStorage.setItem("eai-wiki:comment-name", name.slice(0, 40)); } catch (_) { /* noop */ }
        const list = document.getElementById("local-comment-list");
        if (list) list.innerHTML = localCommentsMarkup(comments);
        const count = document.querySelector(".comment-count-row .mono");
        if (count) count.textContent = `LOCAL THREAD / ${padded(comments.length)}`;
        form.querySelector("textarea").value = "";
        showToast("评论已保存在本机预览中");
      });
      return;
    }

    if (!commentsConfigReady()) return;
    const container = document.getElementById("giscus-container");
    if (!container || container.dataset.loaded === "true") return;
    const comments = CFG.comments || {};
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs = {
      "data-repo": REPO,
      "data-repo-id": comments.repoId,
      "data-category": comments.category || "Announcements",
      "data-category-id": comments.categoryId,
      "data-mapping": comments.mapping || "specific",
      "data-term": `eai-wiki/${page.commentTerm || `entry/${page.id}`}`,
      "data-strict": comments.strict || "0",
      "data-reactions-enabled": comments.reactionsEnabled || "1",
      "data-emit-metadata": comments.emitMetadata || "0",
      "data-input-position": comments.inputPosition || "top",
      "data-theme": comments.theme || "light",
      "data-lang": comments.lang || "zh-CN",
      "data-loading": "lazy"
    };
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    container.innerHTML = "";
    container.dataset.loaded = "true";
    container.appendChild(script);
  }

  /* ------------------------------------------------------------------- graph */

  const GRAPH_ABBR = {
    navigation: "NAV",
    manipulation: "MAN",
    "loco-manipulation": "LOCO",
    hardware: "HW",
    control: "CTRL",
    simulation: "SIM",
    data: "DATA"
  };

  function graphPositions() {
    const cx = 450;
    const cy = 338;
    return DOMAINS.map((domain, index) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / DOMAINS.length);
      return {
        domain,
        x: cx + Math.cos(angle) * 305,
        y: cy + Math.sin(angle) * 248,
        cx,
        cy
      };
    });
  }

  function graphSvgMarkup() {
    const selected = state.graphDomain;
    const positions = graphPositions();
    const byDomainId = new Map(positions.map(position => [position.domain.id, position]));
    const pairKeys = new Set();
    let relatedLines = "";
    DOMAINS.forEach(domain => {
      (domain.related || []).forEach(otherId => {
        if (!domainById.has(otherId) || otherId === domain.id) return;
        const key = [domain.id, otherId].sort().join("--");
        if (pairKeys.has(key)) return;
        pairKeys.add(key);
        const a = byDomainId.get(domain.id);
        const b = byDomainId.get(otherId);
        const active = selected === domain.id || selected === otherId;
        relatedLines += `<line class="graph-rel-line ${active ? "is-active" : ""}" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"/>`;
      });
    });

    return `
      <svg class="graph-svg" viewBox="0 0 900 680" role="group" aria-label="具身智能领域知识网络，共 ${DOMAINS.length} 个领域节点">
        <defs>
          <pattern id="graph-grid" width="45" height="45" patternUnits="userSpaceOnUse">
            <path d="M45 0H0V45" fill="none" stroke="rgba(242,239,230,.055)" stroke-width="1"/>
          </pattern>
          <radialGradient id="graph-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff4b1f" stop-opacity=".19"/>
            <stop offset="100%" stop-color="#ff4b1f" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="900" height="680" fill="url(#graph-grid)"/>
        <circle cx="450" cy="338" r="255" fill="url(#graph-halo)"/>
        <circle cx="450" cy="338" r="248" fill="none" stroke="rgba(242,239,230,.12)" stroke-dasharray="3 11"/>
        <circle cx="450" cy="338" r="305" fill="none" stroke="rgba(242,239,230,.07)" stroke-dasharray="1 9"/>
        ${relatedLines}
        <g class="graph-spokes">
          ${positions.map(position => `<line x1="450" y1="338" x2="${position.x.toFixed(1)}" y2="${position.y.toFixed(1)}"/>`).join("")}
        </g>
        <g class="graph-center">
          <circle cx="450" cy="338" r="72" fill="#f2efe6"/>
          <text x="450" y="330" class="graph-center-title" text-anchor="middle">EAI</text>
          <text x="450" y="349" class="graph-center-sub" text-anchor="middle">OPEN WIKI</text>
          <text x="450" y="367" class="graph-center-micro" text-anchor="middle">${TOTAL_ROUTES} ROUTES</text>
        </g>
        ${positions.map(position => {
          const d = position.domain;
          const ink = readableInk(d.accent);
          const active = selected === d.id;
          return `
            <g class="graph-node ${active ? "is-selected" : ""}" transform="translate(${position.x.toFixed(1)} ${position.y.toFixed(1)})"
               data-graph-domain="${d.id}" tabindex="0" role="button" aria-label="选择${esc(d.name)}领域" aria-pressed="${active}">
              ${active ? `<circle class="node-active-ring" r="67" fill="none" stroke="${d.accent}" stroke-width="1.5" stroke-dasharray="3 5"/>` : ""}
              <circle class="node-disc" r="56" fill="${d.accent}" stroke="${active ? "#f2efe6" : "rgba(242,239,230,.36)"}" stroke-width="${active ? 2 : 1}"/>
              <text y="-9" class="graph-node-index" text-anchor="middle" fill="${ink}">${d.num}</text>
              <text y="12" class="graph-node-abbr" text-anchor="middle" fill="${ink}">${GRAPH_ABBR[d.id]}</text>
              <circle cy="-28" r="3" fill="${ink}" opacity=".7"/>
              <text y="82" class="graph-node-label" text-anchor="middle">${NODE_LABELS[d.id]}</text>
              <text y="99" class="graph-node-count" text-anchor="middle">${d.routes.length} ROUTES · ${countDomainEntries(d.id)} ENTRIES</text>
            </g>`;
        }).join("")}
        <g class="graph-legend">
          <circle cx="32" cy="625" r="4" fill="#f2efe6"/>
          <text x="43" y="629">领域节点</text>
          <line x1="118" y1="625" x2="146" y2="625" stroke="rgba(242,239,230,.35)" stroke-dasharray="3 4"/>
          <text x="155" y="629">跨领域关联</text>
          <text x="722" y="629" class="graph-coord">LAT 31.23 / LON 121.47</text>
        </g>
      </svg>`;
  }

  function graphPanelMarkup(domain) {
    const related = (domain.related || []).map(id => domainById.get(id)).filter(Boolean);
    return `
      <div class="graph-panel-top">
        <span class="graph-panel-index">${domain.num}</span>
        <span class="mono">SELECTED DOMAIN</span>
        <span class="graph-panel-count">${domain.routes.length} ROUTES</span>
      </div>
      <p class="graph-panel-en">${esc(domain.en)} / ${esc(domain.short)}</p>
      <h2>${esc(domain.name)}</h2>
      <p class="graph-panel-desc">${esc(domain.description)}</p>
      <div class="graph-panel-question">
        <span>THE BIG QUESTION</span>
        <p>${esc(domain.question)}</p>
      </div>
      <div class="graph-panel-routes">
        <span class="mono">TECH ROUTES</span>
        ${domain.routes.map((route, index) => `
          <a href="${routeHref(domain, route)}">
            <span class="graph-route-index">${padded(index + 1)}</span>
            <span>${esc(route.name)}</span>
            <small>${routeEntries(domain.id, route.id).length}</small>
            <i>${arrowIcon()}</i>
          </a>`).join("")}
      </div>
      <div class="graph-panel-related">
        <span class="mono">ADJACENT</span>
        <div>
          ${related.map(item => `<button type="button" data-graph-domain="${item.id}" style="--accent:${item.accent}">${esc(item.name)}</button>`).join("")}
        </div>
      </div>
      <a class="graph-panel-cta" href="#/domain/${domain.id}">进入领域地图 ${smallArrow()}</a>`;
  }

  function renderGraph() {
    const selected = domainById.get(state.graphDomain) || DOMAINS[0];
    return `
      <div class="view view--graph">
        <section class="graph-hero wrap">
          <nav class="breadcrumbs" aria-label="面包屑">
            <a href="#/">EAI WIKI</a><span>/</span><span>KNOWLEDGE GRAPH</span>
          </nav>
          <div class="page-hero-grid">
            <div class="page-hero-title">
              <p class="eyebrow">04 / KNOWLEDGE GRAPH</p>
              <h1>知识网络<em>Graph</em></h1>
            </div>
            <div class="page-hero-aside">
              <p>七个领域不是并列的抽屉，领域内部也不是平铺的论文列表。选中一个节点，沿技术路线进入具体工作。</p>
              <div class="graph-summary">
                <div><strong>${padded(DOMAINS.length)}</strong><span>领域节点</span></div>
                <div><strong>${padded(TOTAL_ROUTES)}</strong><span>技术路线</span></div>
                <div><strong>${padded(ENTRIES.length)}</strong><span>词条入口</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="graph-section wrap" id="graph-explorer">
          <div class="graph-quicknav" role="group" aria-label="选择领域">
            ${DOMAINS.map(domain => `
              <button type="button" data-graph-domain="${domain.id}" class="${domain.id === selected.id ? "is-active" : ""}" aria-pressed="${domain.id === selected.id}">
                <span style="background:${domain.accent}"></span>${esc(domain.name)}
              </button>`).join("")}
          </div>
          <div class="graph-layout">
            <div class="graph-canvas-card">
              <div class="graph-card-head">
                <div><span class="mono">FIG. 03 / DOMAIN ADJACENCY</span><span class="graph-card-sub">点击节点查看领域</span></div>
                <span class="graph-drag-hint">左右滑动 / 拖动浏览 →</span>
              </div>
              <div class="graph-canvas-scroll">${graphSvgMarkup()}</div>
              <div class="graph-card-foot">
                <span>SELECT A NODE TO EXPLORE ROUTES</span>
                <span>N = ${DOMAINS.length} / R = ${TOTAL_ROUTES}</span>
              </div>
            </div>
            <aside class="graph-panel" id="graph-panel" aria-live="polite">
              ${graphPanelMarkup(selected)}
            </aside>
          </div>
        </section>

        <section class="graph-cta wrap">
          <div>
            <p class="eyebrow">NO SINGLE ENTRY POINT</p>
            <h2>从任意一个节点开始，<br><em>都能走到问题的中心。</em></h2>
          </div>
          <div class="graph-cta-actions">
            <button class="button button--dark" type="button" data-open-search>搜索一个概念 ${smallArrow()}</button>
            <a class="button button--outline" href="#/entries">查看全部词条</a>
          </div>
        </section>
      </div>`;
  }

  function selectGraphDomain(domainId) {
    const domain = domainById.get(domainId);
    if (!domain) return;
    state.graphDomain = domainId;
    const panel = document.getElementById("graph-panel");
    if (panel) panel.innerHTML = graphPanelMarkup(domain);
    document.querySelectorAll(".graph-node").forEach(node => {
      const active = node.dataset.graphDomain === domainId;
      node.classList.toggle("is-selected", active);
      node.setAttribute("aria-pressed", String(active));
      const existing = node.querySelector(".node-active-ring");
      if (active && !existing) {
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("class", "node-active-ring");
        ring.setAttribute("r", "67");
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", domain.accent);
        ring.setAttribute("stroke-width", "1.5");
        ring.setAttribute("stroke-dasharray", "3 5");
        node.insertBefore(ring, node.firstChild);
      } else if (!active && existing) {
        existing.remove();
      }
      const disc = node.querySelector(".node-disc");
      if (disc) disc.setAttribute("stroke", active ? "#f2efe6" : "rgba(242,239,230,.36)");
    });
    document.querySelectorAll(".graph-quicknav [data-graph-domain]").forEach(button => {
      const active = button.dataset.graphDomain === domainId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  /* -------------------------------------------------------------- contribute */

  function renderContribute() {
    const template = `## 词条名称
（例如：Diffusion Policy）

## 所属领域
${DOMAINS.map(domain => domain.name).join(" / ")}

## 技术路线
从该领域已有的路线中选择；如果是新路线，请说明它和现有路线的关系。

## 类型
论文 / 系统 / 概念 / 数据集 / 基准

## 一句话概述
它解决什么问题？用一句人话说明。

## 为什么重要
它在领域中的位置，改变了什么，或连接了哪些原本分离的问题。

## 核心机制
2–4 个关键设计，每个 2–3 句。

## 关键证据
作者报告的最重要数字、实验或定性结果。注明评测条件。

## 边界与开放问题
失败模式、未解决的假设、可能的误读。

## 原始链接
论文 / 项目页 / 代码 / 官方博客。请使用一手来源。

## 参考与延伸
你实际读过并推荐的材料。`;
    const history = REPO
      ? `<a class="wiki-tab" href="${REPO_URL}/commits/${BRANCH}/assets/js/data.js" target="_blank" rel="noopener">历史</a>`
      : `<span class="wiki-tab is-disabled" title="发布到 GitHub 后可查看编辑历史">历史</span>`;
    return `
      <div class="view view--article view--contribute-wiki">
        <div class="wiki-skin">
          <div class="wiki-tabbar">
            <div class="wiki-tabbar-inner">
              <a class="wiki-tabbar-brand" href="#/"><span class="wiki-tabbar-mark">E</span><span>EAI Wiki</span></a>
              <nav class="wiki-tabs" aria-label="页面命名空间">
                <a class="wiki-tab is-active" href="#/contribute">指南</a>
                <button class="wiki-tab" type="button" data-wiki-discuss data-discuss-title="共建指南" data-discuss-url="#/contribute">讨论</button>
                <button class="wiki-tab" type="button" data-open-contribute>编辑</button>
                ${history}
              </nav>
              <div class="wiki-tabbar-right">
                <button class="wiki-tabbar-link" type="button" data-open-search>搜索</button>
                <a class="wiki-tabbar-link" href="#/entries">全部条目</a>
                <a class="wiki-tabbar-link" href="#/">首页</a>
              </div>
            </div>
          </div>

          <div class="wiki-skin-grid">
            <aside class="wiki-side">
              <nav class="wiki-toc-box" aria-label="本页目录">
                <div class="wiki-toc-heading">目录</div>
                <ol>
                  <li><button type="button" data-scroll-target="contribute-ways">参与方式</button></li>
                  <li><button type="button" data-scroll-target="contribute-rules">写作底线</button></li>
                  <li><button type="button" data-scroll-target="contribute-process">从想法到合并</button></li>
                  <li><button type="button" data-scroll-target="contribute-template">词条模板</button></li>
                  <li><button type="button" data-scroll-target="contribute-faq">常见问题</button></li>
                </ol>
              </nav>
              <div class="wiki-tools">
                <div class="wiki-tools-head">工具</div>
                <a href="#/">首页</a>
                <a href="#/entries">词条库</a>
                <a href="#/graph">知识网络</a>
                <button type="button" data-print-page>可打印版</button>
                <button type="button" data-copy-permalink>永久链接</button>
                <a href="${repoFileUrl("CONTRIBUTING.md")}" target="_blank" rel="noopener">完整规范</a>
              </div>
            </aside>

            <main class="wiki-article-body">
              <h1 class="wiki-title">共建指南</h1>
              <div class="wiki-site-sub">出自 EAI Wiki，开放的具身智能百科</div>
              <div class="wiki-statusline">
                <span class="wiki-status-dot"></span>
                帮助页 · 最后修订 ${formatDate(CFG.updated || "2026-11-11")} · 编辑提案进入 GitHub 审校
              </div>
              <div class="wiki-hatnote">本页说明如何编辑条目、发起讨论和提交新词条。它不是投稿模板，而是这个 Wiki 的编辑规范。</div>

              <section class="contribute-invitation" aria-labelledby="contribute-invitation-title">
                <p class="eyebrow">OPEN CALL / 致每一位同行者</p>
                <h2 id="contribute-invitation-title">你读过的论文，<br><em>不该只停在浏览器里。</em></h2>
                <p>具身智能的知识散落在论文、代码、实验记录和一次次失败的复现里。每一个被你看懂、又被你讲清楚的细节，都可能成为另一个人的起点。</p>
                <p>不必一次写完。补一个被忽略的限制、纠正一个数字、贴一条能跑通的复现记录，都是在这张地图上留下坐标。</p>
                <div class="contribute-invitation-actions">
                  <button class="wiki-button wiki-button--primary" type="button" data-open-contribute>写下第一个词条</button>
                  <button class="wiki-button" type="button" data-open-search>找一页来编辑</button>
                </div>
                <p class="contribute-invitation-sign">EAI Wiki · 由读者写成，也写给下一位读者</p>
              </section>

              <div class="wiki-lead-layout">
                <div class="wiki-lead">
                  <p><strong>EAI Wiki</strong> 是一个关于具身智能的开放知识库。它按研究领域、技术路线与具体工作组织，而不是按时间堆叠论文摘要。</p>
                  <p>你可以只修一个数字，也可以补一整条路线。最重要的不是写得长，而是写清楚：它解决了什么、证据在哪里、边界是什么。</p>
                </div>
                ${articleInfobox("共建指南", [
                  ["页面类型", "帮助 / 编辑规范"],
                  ["参与方式", "评论 · 编辑 · 新词条"],
                  ["预计时间", "单次提案 &lt; 10 分钟"],
                  ["编辑入口", '<a href="#/edit/domain/manipulation">领域编辑页</a>'],
                  ["许可", "文字 CC BY-SA 4.0 · 代码 MIT"],
                  ["状态", '<span class="wiki-status-dot"></span>持续维护']
                ])}
              </div>

              <details class="wiki-mobile-toc">
                <summary>目录</summary>
                <ol>
                  <li><button type="button" data-scroll-target="contribute-ways">参与方式</button></li>
                  <li><button type="button" data-scroll-target="contribute-rules">写作底线</button></li>
                  <li><button type="button" data-scroll-target="contribute-process">从想法到合并</button></li>
                  <li><button type="button" data-scroll-target="contribute-template">词条模板</button></li>
                  <li><button type="button" data-scroll-target="contribute-faq">常见问题</button></li>
                </ol>
              </details>

              <section class="wiki-section" id="contribute-ways">
                <div class="wiki-section-heading"><h2>参与方式</h2></div>
                <table class="wikitable">
                  <thead><tr><th>方式</th><th>适合做什么</th><th>入口</th></tr></thead>
                  <tbody>
                    <tr>
                      <td><strong>评论</strong></td>
                      <td>提问、补充引用、贴复现结果，或指出一个被忽略的限制。评论由 GitHub Discussions 承载。</td>
                      <td><button class="wiki-inline-button" type="button" data-open-contribute data-intent="comment">写一条补充</button></td>
                    </tr>
                    <tr>
                      <td><strong>编辑页面</strong></td>
                      <td>补充技术定义、机制、失败模式或来源。编辑提案会记录页面、章节、正文与依据。</td>
                      <td><a href="#/edit/domain/manipulation">试试编辑「操作」领域</a></td>
                    </tr>
                    <tr>
                      <td><strong>新词条</strong></td>
                      <td>用一个参考模板写一篇论文、系统或概念，并把它放进正确的领域与技术路线。</td>
                      <td><button class="wiki-inline-button" type="button" data-open-contribute>开始写词条</button></td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section class="wiki-section" id="contribute-rules">
                <div class="wiki-section-heading"><h2>写作底线</h2></div>
                <ol class="wiki-list">
                  <li><strong>一手来源优先。</strong>引用论文、官方项目页或作者博客；不要把二手解读当作证据。</li>
                  <li><strong>区分事实与判断。</strong>「论文报告了 46.9% 提升」是事实；「这是目前最好的方法」是判断，需要说明范围与依据。</li>
                  <li><strong>把边界写清楚。</strong>失败模式、评测条件、未验证的假设，至少和成功结果一样重要。</li>
                  <li><strong>AI 可以辅助，不能替你负责。</strong>允许 AI 起草或润色，但必须人工核对事实、数字、作者与链接，并在提案中披露。</li>
                </ol>
              </section>

              <section class="wiki-section" id="contribute-process">
                <div class="wiki-section-heading"><h2>从想法到合并</h2></div>
                <ol class="wiki-list">
                  <li><strong>填写提案。</strong>编辑现有页面，或提交一个新词条；写清页面、章节、技术内容与依据。</li>
                  <li><strong>公开讨论。</strong>编辑与社区会在 Issue 中提出补充、质疑与格式建议。</li>
                  <li><strong>编辑审校。</strong>核对来源、补齐结构、统一术语；必要时会请你提供更具体的证据。</li>
                  <li><strong>合并发布。</strong>内容进入页面与索引，讨论记录保留在 GitHub，可回溯、可回滚。</li>
                </ol>
              </section>

              <section class="wiki-section" id="contribute-template">
                <div class="wiki-section-heading">
                  <h2>词条模板（参考）</h2>
                  <button class="wiki-button" type="button" data-copy-template>复制模板</button>
                </div>
                <p class="wiki-source-note"><strong>模板仅供参考，不需要完全遵循这个格式。</strong>可以根据词条类型删减、合并或新增章节；哪怕只写一段有来源的判断，也比为了填满格式而编造更有价值。</p>
                <pre class="code-block" id="entry-template"><code>${esc(template)}</code></pre>
              </section>

              <section class="wiki-section" id="contribute-faq">
                <div class="wiki-section-heading"><h2>常见问题</h2></div>
                <div class="faq-list">
                  <details>
                    <summary>我不是研究者，也可以贡献吗？<span>+</span></summary>
                    <p>可以。工程复现、部署踩坑、数据采集经验、对某条结论的质疑，都是这个 wiki 缺少的知识。只要给出可核对的依据。</p>
                  </details>
                  <details>
                    <summary>可以推荐自己的工作吗？<span>+</span></summary>
                    <p>可以，但请如实披露作者身份，并避免把「被接收」写成「被证明」。编辑会重点检查证据与边界。</p>
                  </details>
                  <details>
                    <summary>页面上的「编辑」会直接改线上内容吗？<span>+</span></summary>
                    <p>不会。站点是静态的，编辑提案会生成一个公开 GitHub Issue，由编辑核对来源后合并。这样每一次技术修改都有讨论记录，也可以被回滚。</p>
                  </details>
                  <details>
                    <summary>为什么一定要用 GitHub？<span>+</span></summary>
                    <p>GitHub 提供了公开、可追溯、可 fork 的协作记录。你不需要会写代码；所有操作都可以在网页上完成。</p>
                  </details>
                  <details>
                    <summary>评论和词条有什么区别？<span>+</span></summary>
                    <p>评论是观点与讨论，词条是经过编辑的稳定摘要。好的评论可以被提炼进词条，原始讨论仍保留在 GitHub Discussions 中。</p>
                  </details>
                  <details>
                    <summary>内容可以转载吗？<span>+</span></summary>
                    <p>除特别注明外，文字内容采用 CC BY-SA 4.0，代码采用 MIT。转载请署名并保持相同许可。论文图表与第三方素材的版权归原作者所有。</p>
                  </details>
                </div>
              </section>

              ${articleCategories([
                { label: "具身智能", href: "#/" },
                { label: "帮助", href: "#/contribute" },
                { label: "编辑规范", href: "#/contribute" }
              ])}
              ${articleFooter()}
            </main>
          </div>
        </div>
      </div>`;
  }

  function renderNotFound(route) {
    return `
      <div class="view view--notfound">
        <section class="notfound wrap">
          <p class="eyebrow">404 / LOST IN LATENT SPACE</p>
          <h1>这个节点<br><em>还没有连上。</em></h1>
          <p>你要找的页面不存在，可能已被重命名，也可能还在某个人的 Issue 里。回到已知的世界，或者直接把它写出来。</p>
          <div class="notfound-actions">
            <a class="button button--dark" href="#/">回到领域地图 ${smallArrow()}</a>
            <a class="button button--outline" href="#/entries">浏览词条库</a>
            <button class="button button--outline" type="button" data-open-search>搜索一下</button>
          </div>
          <span class="notfound-path">${esc(route.raw || "unknown")}</span>
        </section>
      </div>`;
  }

  /* ------------------------------------------------------------------ search */

  const SEARCH_DOCS = [
    ...DOMAINS.map(domain => ({
      kind: "domain",
      id: domain.id,
      title: domain.name,
      subtitle: `${domain.en} · ${domain.tagline}`,
      href: `#/domain/${domain.id}`,
      meta: `${domain.routes.length} 条路线 · ${countDomainEntries(domain.id)} 个词条`,
      year: 2026,
      domainName: domain.name,
      haystack: [domain.name, domain.en, domain.short, domain.description, domain.tagline, domain.question, ...(domain.intro || []), ...(domain.openProblems || []), ...domain.routes.flatMap(route => [route.name, route.en, ...route.tags])].join(" ").toLowerCase()
    })),
    ...DOMAINS.flatMap(domain => domain.routes.map(route => ({
      kind: "route",
      id: `${domain.id}:${route.id}`,
      title: route.name,
      subtitle: `${domain.name} · ${route.en}`,
      href: routeHref(domain, route),
      meta: `${routeEntries(domain.id, route.id).length} 个词条`,
      year: 2026,
      domainName: domain.name,
      haystack: [
        domain.name, route.name, route.en, route.summary, route.question, ...route.tags,
        ...(route.lead || []),
        ...(route.sections || []).flatMap(section => [section.title, ...(section.body || []), ...(section.bullets || [])]),
        ...(route.practice || [])
      ].join(" ").toLowerCase()
    }))),
    ...ENTRIES.map(entry => {
      const domain = domainOf(entry);
      const route = routeOf(entry);
      return {
        kind: "entry",
        id: entry.id,
        title: entry.title,
        subtitle: entry.subtitle,
        href: `#/entry/${entry.id}`,
        meta: `${typeLabel(entry.type)} · ${entry.year}`,
        year: entry.year,
        type: entry.type,
        domainName: domain.name,
        haystack: [
          entry.title, entry.subtitle, entry.tldr, entry.org, entry.authors, entry.venue,
          entry.year, entry.id, ...(entry.tags || []), domain.name, domain.en, domain.short,
          route?.name || "", route?.en || ""
        ].join(" ").toLowerCase()
      };
    }),
    ...RESOURCES.filter(resource => !resource.entryId).map(resource => {
      const domainNames = resource.domains.map(id => domainById.get(id)?.name).filter(Boolean).join(" / ");
      return {
        kind: "resource",
        id: resource.id,
        title: resource.name,
        subtitle: resource.summary,
        href: resource.url,
        external: true,
        meta: `${typeLabel(resource.type)} · ${resource.year}`,
        year: resource.year,
        type: resource.type,
        domainName: domainNames,
        haystack: [resource.name, resource.summary, resource.scale, typeLabel(resource.type), domainNames].join(" ").toLowerCase()
      };
    })
  ];

  function searchScore(doc, query) {
    const q = query.toLowerCase().trim();
    if (!q) return 0;
    const title = doc.title.toLowerCase();
    let score = 0;
    if (title === q) score += 120;
    if (title.startsWith(q)) score += 55;
    if (title.includes(q)) score += 35;
    if (doc.id.toLowerCase() === q) score += 80;
    if (doc.haystack.includes(q)) score += 12;
    const tokens = q.split(/\s+/).filter(Boolean);
    if (!tokens.every(token => doc.haystack.includes(token))) return 0;
    tokens.forEach(token => {
      if (title.includes(token)) score += 15;
      if (doc.subtitle.toLowerCase().includes(token)) score += 8;
    });
    if (doc.kind === "entry") score += 2;
    return score;
  }

  function runSearch(query) {
    return SEARCH_DOCS
      .map(doc => ({ doc, score: searchScore(doc, query) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || b.doc.year - a.doc.year)
      .slice(0, 14)
      .map(item => item.doc);
  }

  function searchResultMarkup(doc, index, selected) {
    const isDomain = doc.kind === "domain";
    const isRoute = doc.kind === "route";
    const isResource = doc.kind === "resource";
    const kindLabel = isDomain ? "领域" : isRoute ? "路线" : isResource ? typeLabel(doc.type) : typeLabel(doc.type);
    return `
      <a class="search-result ${selected ? "is-selected" : ""}" href="${doc.href}" ${doc.external ? 'target="_blank" rel="noopener"' : ""} data-search-index="${index}" id="search-result-${index}">
        <span class="search-result-kind ${isDomain ? "is-domain" : ""} ${isRoute ? "is-route" : ""} ${isResource ? "is-resource" : ""}">${kindLabel}</span>
        <span class="search-result-copy">
          <strong>${esc(doc.title)}</strong>
          <small>${esc(doc.subtitle)}</small>
        </span>
        <span class="search-result-meta">${esc(doc.meta)}</span>
        <span class="search-result-domain">${esc(isDomain ? "DOMAIN" : doc.domainName)}</span>
        <span class="search-result-arrow">${arrowIcon()}</span>
      </a>`;
  }

  function searchSuggestionsMarkup() {
    const popular = ["openvla", "pi0", "genie-3", "diffusion-policy", "groot-n1"].map(byId).filter(Boolean);
    return `
      <div class="search-suggestions">
        <div class="search-section-label"><span>POPULAR ENTRIES</span><span>FROM THE INDEX</span></div>
        <div class="search-result-list">
          ${popular.map((entry, index) => {
            const domain = domainOf(entry);
            const doc = {
              kind: "entry",
              type: entry.type,
              title: entry.title,
              subtitle: entry.subtitle,
              href: `#/entry/${entry.id}`,
              meta: `${typeLabel(entry.type)} · ${entry.year}`,
              domainName: domain.name
            };
            return searchResultMarkup(doc, index, false);
          }).join("")}
        </div>
        <div class="search-section-label search-section-label--domains"><span>DOMAINS</span><span>${DOMAINS.length} AREAS / ${TOTAL_ROUTES} ROUTES</span></div>
        <div class="search-domain-grid">
          ${DOMAINS.map(domain => `<a href="#/domain/${domain.id}" style="--accent:${domain.accent}"><span>${domain.num}</span>${esc(domain.name)}</a>`).join("")}
        </div>
      </div>`;
  }

  function renderSearch(query) {
    state.search.query = query;
    const resultsNode = document.getElementById("search-results");
    const countNode = document.getElementById("search-count");
    const totalNode = document.getElementById("search-total");
    if (totalNode) totalNode.textContent = ENTRIES.length + externalResourceCount();
    if (!resultsNode) return;
    if (!query.trim()) {
      resultsNode.innerHTML = searchSuggestionsMarkup();
      countNode.textContent = "";
      state.search.items = [];
      state.search.selected = -1;
      return;
    }
    const results = runSearch(query);
    state.search.items = results;
    state.search.selected = results.length ? 0 : -1;
    countNode.textContent = `${results.length} 个结果`;
    if (!results.length) {
      resultsNode.innerHTML = `<div class="search-empty">
        <span class="search-empty-mark">∅</span>
        <h3>没有找到「${esc(query)}」</h3>
        <p>试试论文名、作者、领域、技术路线或更短的关键词。</p>
        <button class="button button--outline" type="button" data-open-contribute>把它作为一个新词条提出来 ${smallArrow()}</button>
      </div>`;
      return;
    }
    resultsNode.innerHTML = `<div class="search-result-list">${results.map((doc, index) => searchResultMarkup(doc, index, index === 0)).join("")}</div>`;
  }

  function moveSearchSelection(delta) {
    const items = state.search.items;
    if (!items.length) return;
    state.search.selected = (state.search.selected + delta + items.length) % items.length;
    document.querySelectorAll(".search-result").forEach((node, index) => {
      node.classList.toggle("is-selected", index === state.search.selected);
    });
    const active = document.getElementById(`search-result-${state.search.selected}`);
    if (active) {
      active.scrollIntoView({ block: "nearest" });
      const input = document.getElementById("search-input");
      if (input) input.setAttribute("aria-activedescendant", active.id);
    }
  }

  function openSearch() {
    const dialog = document.getElementById("search-dialog");
    if (!dialog) return;
    document.querySelectorAll("dialog[open]").forEach(openDialog => {
      if (openDialog !== dialog) openDialog.close();
    });
    closeMobileMenu();
    if (!dialog.open) dialog.showModal();
    syncBodyLock();
    const input = document.getElementById("search-input");
    if (input) {
      input.value = "";
      renderSearch("");
      requestAnimationFrame(() => input.focus());
    }
  }

  function closeSearch() {
    const dialog = document.getElementById("search-dialog");
    if (dialog && dialog.open) dialog.close();
    syncBodyLock();
  }

  /* ------------------------------------------------------------------ modals */

  function syncBodyLock() {
    const hasDialog = Boolean(document.querySelector("dialog[open]"));
    document.body.classList.toggle("is-locked", hasDialog || state.mobileOpen);
  }

  function closeAllDialogs() {
    document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
    syncBodyLock();
  }

  const INTENT_LABELS = { entry: "新词条", fix: "修订 / 纠错", comment: "讨论 / 补充" };

  function routeOptionsMarkup(domainId, selectedRoute = "") {
    const domain = domainById.get(domainId);
    if (!domain) return `<option value="">先选择领域</option>`;
    return `<option value="">待判断 / 新路线</option>${domain.routes
      .map(route => `<option value="${route.id}" ${route.id === selectedRoute ? "selected" : ""}>${esc(route.name)}</option>`)
      .join("")}`;
  }

  function openContribute(options = {}) {
    const dialog = document.getElementById("contribute-dialog");
    const shell = document.getElementById("contribute-shell");
    if (!dialog || !shell) return;
    closeAllDialogs();
    closeMobileMenu();

    const intent = options.intent || "entry";
    const entry = options.entry || null;
    const domainId = options.domain || entry?.domain || "all";
    const prefillRoute = options.route || entry?.route || "";
    const prefillName = entry?.title || "";
    const prefillLink = entry ? (primarySource(entry)?.url || "") : "";
    const prefillType = entry?.type || "paper";
    const titleText = intent === "fix" ? "修订一个词条" : intent === "comment" ? "留下一条补充" : "贡献一个词条";
    const lede = intent === "fix"
      ? "指出错误、补充遗漏，或者提供一个更好的解释。带上来源，编辑会核对后合并。"
      : intent === "comment"
        ? "评论、复现经验、补充引用，任何能让这个词条更可信的东西都欢迎。"
        : "不需要一次写完。先给出一句话的判断和一手来源，其他的可以在讨论里慢慢补。";

    shell.innerHTML = `
      <div class="form-head">
        <div>
          <span class="mono">${intent === "entry" ? "NEW ENTRY" : intent === "fix" ? "REVISION" : "DISCUSSION"} / CONTRIBUTE</span>
          <h2 id="contribute-modal-title">${titleText}</h2>
          <p>${lede}</p>
        </div>
        <button class="icon-close icon-close--dark" type="button" data-close-modal aria-label="关闭表单">ESC</button>
      </div>
      <div class="form-progress">
        <span class="is-current">01 填写</span><i></i><span>02 公开讨论</span><i></i><span>03 审校合并</span>
      </div>
      <form class="contribute-form" id="contribution-form" novalidate>
        <div class="field-grid field-grid--two">
          <label class="field">
            <span>贡献类型 <em>*</em></span>
            <select name="intent">
              <option value="entry" ${intent === "entry" ? "selected" : ""}>新词条</option>
              <option value="fix" ${intent === "fix" ? "selected" : ""}>修订 / 纠错</option>
              <option value="comment" ${intent === "comment" ? "selected" : ""}>讨论 / 补充</option>
            </select>
          </label>
          <label class="field">
            <span>词条名称 <em>*</em></span>
            <input name="name" type="text" required maxlength="120" value="${esc(prefillName)}" placeholder="例如：Diffusion Policy">
          </label>
        </div>
        <div class="field-grid field-grid--three">
          <label class="field">
            <span>所属领域 <em>*</em></span>
            <select name="domain" data-contribution-domain required>
              <option value="" ${domainId === "all" ? "selected" : ""} disabled>选择一个领域</option>
              ${DOMAINS.map(domain => `<option value="${domain.id}" ${domain.id === domainId ? "selected" : ""}>${esc(domain.name)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>技术路线</span>
            <select name="route" data-contribution-route>
              ${routeOptionsMarkup(domainId, prefillRoute)}
            </select>
          </label>
          <label class="field">
            <span>词条类型</span>
            <select name="entryType">
              ${TYPE_ORDER.map(type => `<option value="${type}" ${type === prefillType ? "selected" : ""}>${typeLabel(type)}</option>`).join("")}
            </select>
          </label>
        </div>
        <label class="field">
          <span>一句话概述 / 修改建议 <em>*</em></span>
          <textarea name="summary" rows="3" required maxlength="500" placeholder="它解决什么问题？你的补充或修正是什么？"></textarea>
        </label>
        <label class="field">
          <span>详细说明</span>
          <textarea name="detail" rows="4" maxlength="3000" placeholder="关键机制、证据、边界，或者你认为需要核对的地方。"></textarea>
        </label>
        <div class="field-grid field-grid--two">
          <label class="field">
            <span>主要链接</span>
            <input name="link" type="url" value="${esc(prefillLink)}" placeholder="https://arxiv.org/abs/…">
          </label>
          <label class="field">
            <span>你的 GitHub 昵称</span>
            <input name="contributor" type="text" maxlength="60" value="${esc(getSavedCommentName())}" placeholder="可选，便于署名">
          </label>
        </div>
        <label class="field">
          <span>参考与依据</span>
          <textarea name="refs" rows="2" maxlength="1600" placeholder="论文 / 项目页 / 复现代码链接。请使用一手来源。"></textarea>
        </label>
        <div class="form-disclaimer">
          <span>⌁</span>
          <p>提交会创建一个公开 GitHub Issue。请勿包含敏感信息。AI 辅助起草需在说明中注明；禁止编造引用。</p>
        </div>
        <div class="form-foot">
          <p class="form-foot-note" id="form-status">不需要会写代码。所有讨论都发生在 GitHub。</p>
          <div class="form-actions">
            <button class="button button--outline" type="button" data-copy-draft>复制草稿</button>
            <button class="button button--orange" type="submit">在 GitHub 提交 ${smallArrow()}</button>
          </div>
        </div>
      </form>`;

    const form = document.getElementById("contribution-form");
    const domainSelect = form.querySelector("[data-contribution-domain]");
    const routeSelect = form.querySelector("[data-contribution-route]");
    domainSelect?.addEventListener("change", () => {
      if (routeSelect) routeSelect.innerHTML = routeOptionsMarkup(domainSelect.value, "");
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const draft = buildContributionDraft(form);
      const name = form.elements.name.value.trim();
      const intentValue = form.elements.intent.value;
      const issueTitle = `[${INTENT_LABELS[intentValue] || "贡献"}] ${name}`;
      const link = issueUrl(issueTitle, draft);
      if (link) {
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        dialog.close();
        syncBodyLock();
        showToast("已打开 GitHub Issue，请确认后提交");
      } else {
        copyText(draft, "草稿已复制。发布站点后，这里会自动打开 GitHub Issue。");
        const status = document.getElementById("form-status");
        if (status) status.textContent = "仓库尚未配置：草稿已复制，请先发布到 GitHub Pages。";
      }
    });

    if (!dialog.open) dialog.showModal();
    syncBodyLock();
    requestAnimationFrame(() => {
      const first = form.querySelector("textarea[name='summary']");
      if (intent === "fix" && first) first.focus();
      else form.querySelector("input[name='name']")?.focus();
    });
  }

  function buildContributionDraft(form) {
    const data = new FormData(form);
    const value = key => String(data.get(key) || "").trim();
    const domain = domainById.get(value("domain"));
    const route = domain ? routeInfo(domain, value("route")) : null;
    const intent = value("intent");
    return `### 贡献类型
${INTENT_LABELS[intent] || intent}

### 词条名称
${value("name")}

### 所属领域
${domain ? domain.name : "待定"}

### 技术路线
${route ? route.name : "待判断 / 新路线"}

### 词条类型
${typeLabel(value("entryType"))}

### 一句话概述 / 修改建议
${value("summary")}

### 详细说明
${value("detail") || "（未填写）"}

### 主要链接
${value("link") || "（未填写）"}

### 参考与依据
${value("refs") || "（未填写）"}

### 贡献者
${value("contributor") || "匿名 / 待联系"}

---
*由 EAI Wiki 贡献表单生成。请确认所有引用真实、可访问；如使用 AI 辅助，请在此说明。*`;
  }

  function openCitation(entry) {
    const dialog = document.getElementById("citation-dialog");
    const shell = document.getElementById("citation-shell");
    if (!dialog || !shell) return;
    state.citationText = { plain: plainCitation(entry), bibtex: bibtexCitation(entry) };
    shell.innerHTML = `
      <div class="citation-head">
        <div>
          <span class="mono">CITE / ${esc(entry.title)}</span>
          <h2 id="citation-title">引用这条词条</h2>
          <p>自动生成，仅供起步。正式引用前，请核对原文的作者、会议与年份。</p>
        </div>
        <button class="icon-close icon-close--dark" type="button" data-close-modal aria-label="关闭">ESC</button>
      </div>
      <div class="citation-block">
        <div class="citation-block-head"><span>PLAIN TEXT</span><button class="text-button" type="button" data-citation-copy="plain">复制</button></div>
        <pre>${esc(state.citationText.plain)}</pre>
      </div>
      <div class="citation-block">
        <div class="citation-block-head"><span>BIBTEX</span><button class="text-button" type="button" data-citation-copy="bibtex">复制</button></div>
        <pre>${esc(state.citationText.bibtex)}</pre>
      </div>
      <div class="citation-foot">
        <span class="status-dot"></span>
        <span>种子词条，元数据待领域编辑核校。</span>
      </div>`;
    if (!dialog.open) dialog.showModal();
    syncBodyLock();
  }

  /* ------------------------------------------------------------------ router */

  function parseRoute() {
    const hash = window.location.hash;
    if (hash && !hash.startsWith("#/")) return null;
    const raw = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
    if (!raw) return { name: "home", raw: "/" };
    const [pathPart, queryPart] = raw.split("?");
    const query = new URLSearchParams(queryPart || "");
    const parts = pathPart.split("/").filter(Boolean);
    if (parts[0] === "entries" && !parts[1]) return { name: "catalog", raw };
    if ((parts[0] === "entry" || parts[0] === "entries") && parts[1]) {
      const entry = byId(decodeURIComponent(parts[1]));
      if (entry) return { name: "entry", entry, raw };
      return { name: "notfound", raw };
    }
    if (parts[0] === "domain" && parts[1]) {
      const domain = domainById.get(decodeURIComponent(parts[1]));
      if (domain) return { name: "domain", domain, raw };
      return { name: "notfound", raw };
    }
    if (parts[0] === "route" && parts[1] && parts[2]) {
      const domain = domainById.get(decodeURIComponent(parts[1]));
      const route = domain ? routeInfo(domain, decodeURIComponent(parts[2])) : null;
      if (domain && route) return { name: "route", domain, route, raw };
      return { name: "notfound", raw };
    }
    if (parts[0] === "graph" && !parts[1]) return { name: "graph", raw };
    if (parts[0] === "contribute" && !parts[1]) return { name: "contribute", raw };
    if (parts[0] === "edit" || parts[0] === "talk") {
      const name = parts[0];
      const section = query.get("section") || "";
      if (parts[1] === "domain" && parts[2]) {
        const domain = domainById.get(decodeURIComponent(parts[2]));
        if (domain) return { name, pageType: "domain", domain, section, raw };
      }
      if (parts[1] === "route" && parts[2] && parts[3]) {
        const domain = domainById.get(decodeURIComponent(parts[2]));
        const route = domain ? routeInfo(domain, decodeURIComponent(parts[3])) : null;
        if (domain && route) return { name, pageType: "route", domain, route, section, raw };
      }
      if (parts[1] === "entry" && parts[2]) {
        const entry = byId(decodeURIComponent(parts[2]));
        if (entry) {
          const domain = domainOf(entry);
          const route = routeOf(entry);
          return { name, pageType: "entry", domain, route, entry, section, raw };
        }
      }
      return { name: "notfound", raw };
    }
    return { name: "notfound", raw };
  }

  function routeMeta(route) {
    if (route.name === "home") {
      return {
        title: "EAI Wiki · 具身智能开放知识库",
        description: "EAI Wiki 是一个由社区共建的具身智能知识库：导航、操作、移动操作、硬件、控制、仿真器、数据与评测七大领域，按技术路线整理论文、数据集与 benchmark。"
      };
    }
    if (route.name === "catalog") {
      return { title: "词条库 · EAI Wiki", description: `浏览 ${ENTRIES.length} 个具身智能词条与 ${RESOURCES.length} 个数据、平台与基准，按 ${DOMAINS.length} 个领域和 ${TOTAL_ROUTES} 条技术路线组织。` };
    }
    if (route.name === "domain") {
      return { title: `${route.domain.name} · EAI Wiki`, description: route.domain.description };
    }
    if (route.name === "route") {
      return {
        title: `${route.route.name} · ${route.domain.name} · EAI Wiki`,
        description: `${route.route.summary} — ${routeEntries(route.domain.id, route.route.id).length} 个相关词条。`
      };
    }
    if (route.name === "entry") {
      return { title: `${route.entry.title} · EAI Wiki`, description: route.entry.tldr };
    }
    if (route.name === "edit") {
      const title = route.entry?.title || route.route?.name || route.domain.name;
      return { title: `编辑 ${title} · EAI Wiki`, description: `编辑「${title}」的 Wiki 条目，提交技术补充、来源与修订提案。` };
    }
    if (route.name === "talk") {
      const title = route.entry?.title || route.route?.name || route.domain.name;
      return { title: `讨论:${title} · EAI Wiki`, description: `关于「${title}」的讨论页：来源、技术判断与条目范围。` };
    }
    if (route.name === "graph") {
      return { title: "知识网络 · EAI Wiki", description: "以图的方式浏览导航、操作、移动操作、硬件、控制、仿真器与数据评测七个领域及其技术路线。" };
    }
    if (route.name === "contribute") {
      return { title: "共建指南 · EAI Wiki", description: "如何为 EAI Wiki 提交词条、提出修订与参与讨论。" };
    }
    return { title: "页面不存在 · EAI Wiki", description: "这个节点还没有连上。" };
  }

  function updateMeta(meta) {
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", meta.description);
  }

  function updateNav(route) {
    let active = "home";
    if (route.name === "catalog" || route.name === "domain" || route.name === "route" || route.name === "entry" || route.name === "edit" || route.name === "talk") active = "entries";
    if (route.name === "graph") active = "graph";
    if (route.name === "contribute") active = "contribute";
    document.querySelectorAll("[data-nav]").forEach(link => {
      const isActive = link.dataset.nav === active;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function renderRoute(route, options = {}) {
    if (!route) return;
    state.route = route;
    closeMobileMenu();
    let html = "";
    if (route.name === "home") html = renderHome();
    else if (route.name === "catalog") html = renderCatalog();
    else if (route.name === "domain") html = renderDomain(route.domain);
    else if (route.name === "route") html = renderRoutePage(route.domain, route.route);
    else if (route.name === "entry") html = renderEntry(route.entry);
    else if (route.name === "edit") html = renderEditPage(route);
    else if (route.name === "talk") html = renderTalkPage(route);
    else if (route.name === "graph") html = renderGraph();
    else if (route.name === "contribute") html = renderContribute();
    else html = renderNotFound(route);

    app.innerHTML = html;
    document.body.dataset.view = route.name;
    updateNav(route);
    updateMeta(routeMeta(route));
    hydrateRepoLinks();
    if (route.name === "talk") {
      const identity = wikiIdentity(route.domain, route.route || null, route.entry || null);
      setupComments({
        id: identity.commentStorageKey,
        title: identity.title,
        commentStorageKey: identity.commentStorageKey,
        commentTerm: identity.commentTerm
      });
    }
    if (route.name === "edit") setupEditPage(route);
    if (!options.keepScroll) window.scrollTo(0, 0);
    document.documentElement.classList.add("page-ready");
  }

  function hydrateRepoLinks() {
    document.querySelectorAll(".js-repo-link").forEach(link => {
      if (REPO) {
        link.href = REPO_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.href = "#/contribute";
        link.removeAttribute("target");
      }
    });
    document.querySelectorAll(".js-repo-file").forEach(link => {
      const file = link.dataset.file;
      if (!file) return;
      link.href = repoFileUrl(file);
      if (REPO) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
    document.querySelectorAll(".js-discussion-link").forEach(link => {
      const url = discussionUrl();
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.href = "#/contribute";
        link.dataset.noDiscussion = "true";
      }
    });
    document.querySelectorAll(".js-issue-choose").forEach(link => {
      if (REPO) {
        link.href = `${REPO_URL}/issues/new/choose`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.href = "#/contribute";
        link.dataset.noIssueChooser = "true";
      }
    });
  }

  /* ---------------------------------------------------------------- behavior */

  function isTypingTarget(target) {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.querySelector("[data-menu-toggle]");
    if (!menu || menu.hidden) {
      state.mobileOpen = false;
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      return;
    }
    menu.hidden = true;
    state.mobileOpen = false;
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    syncBodyLock();
  }

  function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.querySelector("[data-menu-toggle]");
    if (!menu || !toggle) return;
    const opening = menu.hidden;
    menu.hidden = !opening;
    state.mobileOpen = opening;
    toggle.setAttribute("aria-expanded", String(opening));
    syncBodyLock();
  }

  function toggleBookmark(entryId) {
    if (!byId(entryId)) return;
    if (state.bookmarks.has(entryId)) {
      state.bookmarks.delete(entryId);
      showToast("已从本机收藏中移除");
    } else {
      state.bookmarks.add(entryId);
      showToast("已收藏到本机");
    }
    saveBookmarks();
    document.querySelectorAll(`[data-bookmark="${entryId}"]`).forEach(button => {
      const active = state.bookmarks.has(entryId);
      button.classList.toggle("is-bookmarked", active);
      button.setAttribute("aria-pressed", String(active));
      const label = button.querySelector("span");
      if (label) label.textContent = active ? "已收藏" : "收藏";
    });
  }

  function shareEntry(entryId) {
    const entry = byId(entryId);
    if (!entry) return;
    const url = `${window.location.origin}${window.location.pathname}#/entry/${entry.id}`;
    copyText(url, "词条链接已复制");
  }

  function resetCatalog() {
    state.catalog = { q: "", type: "all", domain: "all", route: "all", sort: "featured", bookmarksOnly: false };
    const search = document.getElementById("catalog-search");
    const domain = document.getElementById("catalog-domain");
    const route = document.getElementById("catalog-route");
    const sort = document.getElementById("catalog-sort");
    if (search) search.value = "";
    if (domain) domain.value = "all";
    if (route) route.value = "all";
    if (sort) sort.value = "featured";
    renderCatalogResults();
  }

  function handleGlobalClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest(".skip-link")) {
      event.preventDefault();
      const main = document.getElementById("main");
      if (main) {
        main.focus({ preventScroll: true });
        main.scrollIntoView({ block: "start" });
      }
      return;
    }

    if (target.closest("[data-back-to-top]")) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (target.closest("[data-menu-toggle]")) {
      event.preventDefault();
      toggleMobileMenu();
      return;
    }

    if (target.closest("[data-open-search]")) {
      event.preventDefault();
      closeMobileMenu();
      openSearch();
      return;
    }

    if (target.closest("[data-close-search]")) {
      event.preventDefault();
      closeSearch();
      return;
    }

    if (target.closest("[data-close-modal]")) {
      event.preventDefault();
      const dialog = target.closest("dialog");
      if (dialog) dialog.close();
      syncBodyLock();
      return;
    }

    const wikiDiscussTrigger = target.closest("[data-wiki-discuss]");
    if (wikiDiscussTrigger) {
      event.preventDefault();
      openPageDiscussion(wikiDiscussTrigger.dataset.discussTitle || document.title, wikiDiscussTrigger.dataset.discussUrl || "#/");
      return;
    }

    const printTrigger = target.closest("[data-print-page]");
    if (printTrigger) {
      event.preventDefault();
      window.print();
      return;
    }

    const permalinkTrigger = target.closest("[data-copy-permalink]");
    if (permalinkTrigger) {
      event.preventDefault();
      copyText(window.location.href, "页面永久链接已复制");
      return;
    }

    const contributionTrigger = target.closest("[data-open-contribute], [data-issue]");
    if (contributionTrigger) {
      event.preventDefault();
      const fixEntryId = contributionTrigger.dataset.fixEntry;
      const fixDomainId = contributionTrigger.dataset.fixDomain;
      const prefillDomain = contributionTrigger.dataset.prefillDomain;
      const prefillRouteId = contributionTrigger.dataset.prefillRoute;
      let options = {};
      if (fixEntryId) options = { intent: "fix", entry: byId(fixEntryId), domain: byId(fixEntryId)?.domain, route: byId(fixEntryId)?.route };
      else if (fixDomainId) options = { intent: "fix", domain: fixDomainId };
      else if (prefillDomain) options = { intent: "entry", domain: prefillDomain, route: prefillRouteId };
      else if (contributionTrigger.dataset.intent) options = { intent: contributionTrigger.dataset.intent };
      else if (contributionTrigger.dataset.issue === "fix") options = { intent: "fix" };
      else options = { intent: "entry" };
      openContribute(options);
      return;
    }

    if (target.closest("[data-issue-choose]")) {
      if (!REPO) {
        event.preventDefault();
        openContribute({ intent: "entry" });
      }
      return;
    }

    if (target.closest(".js-repo-link") && !REPO) {
      event.preventDefault();
      showToast("发布到 GitHub Pages 后，这里会指向项目仓库");
      return;
    }

    if (target.closest(".js-discussion-link") && !discussionUrl()) {
      event.preventDefault();
      showToast("GitHub Discussions 将在仓库发布后开放");
      return;
    }

    const searchResult = target.closest("#search-results a");
    if (searchResult) {
      closeSearch();
      return;
    }

    const catalogType = target.closest("[data-catalog-type]");
    if (catalogType) {
      state.catalog.type = catalogType.dataset.catalogType;
      renderCatalogResults();
      return;
    }

    if (target.closest("#catalog-reset")) {
      resetCatalog();
      return;
    }

    if (target.closest("#catalog-bookmarks")) {
      state.catalog.bookmarksOnly = !state.catalog.bookmarksOnly;
      renderCatalogResults();
      return;
    }

    if (target.closest("[data-catalog-show-all]")) {
      state.catalog.bookmarksOnly = false;
      renderCatalogResults();
      return;
    }

    const tagJump = target.closest("[data-tag-jump]");
    if (tagJump) {
      event.preventDefault();
      state.catalog = { q: tagJump.dataset.tagJump, type: "all", domain: "all", route: "all", sort: "featured", bookmarksOnly: false };
      if (state.route.name === "catalog") {
        const input = document.getElementById("catalog-search");
        const domain = document.getElementById("catalog-domain");
        const route = document.getElementById("catalog-route");
        if (input) input.value = state.catalog.q;
        if (domain) domain.value = "all";
        if (route) route.value = "all";
        renderCatalogResults();
      } else {
        window.location.hash = "#/entries";
      }
      return;
    }

    const graphTarget = target.closest("[data-graph-domain]");
    if (graphTarget) {
      event.preventDefault();
      selectGraphDomain(graphTarget.dataset.graphDomain);
      return;
    }

    const bookmark = target.closest("[data-bookmark]");
    if (bookmark) {
      event.preventDefault();
      toggleBookmark(bookmark.dataset.bookmark);
      return;
    }

    const cite = target.closest("[data-cite]");
    if (cite) {
      event.preventDefault();
      const entry = byId(cite.dataset.cite);
      if (entry) openCitation(entry);
      return;
    }

    const citationCopy = target.closest("[data-citation-copy]");
    if (citationCopy) {
      event.preventDefault();
      const kind = citationCopy.dataset.citationCopy;
      if (state.citationText && state.citationText[kind]) copyText(state.citationText[kind], "引用已复制");
      return;
    }

    const share = target.closest("[data-share]");
    if (share) {
      event.preventDefault();
      shareEntry(share.dataset.share);
      return;
    }

    const scrollTarget = target.closest("[data-scroll-target]");
    if (scrollTarget) {
      event.preventDefault();
      const section = document.getElementById(scrollTarget.dataset.scrollTarget);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const copyTemplate = target.closest("[data-copy-template]");
    if (copyTemplate) {
      event.preventDefault();
      const template = document.getElementById("entry-template");
      if (template) copyText(template.innerText, "词条模板已复制");
      return;
    }

    const copyDraft = target.closest("[data-copy-draft]");
    if (copyDraft) {
      event.preventDefault();
      const form = document.getElementById("contribution-form");
      if (form) copyText(buildContributionDraft(form), "贡献草稿已复制");
      return;
    }

    if (target.closest("[data-open-contribute]")) {
      event.preventDefault();
      openContribute();
      return;
    }

    if (target.closest("[data-nav]") || target.closest(".primary-nav a")) closeMobileMenu();
  }

  function handleGlobalInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.id === "search-input") renderSearch(target.value);
    if (target.id === "catalog-search") {
      state.catalog.q = target.value;
      renderCatalogResults();
    }
  }

  function handleGlobalChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    if (target.id === "catalog-domain") {
      state.catalog.domain = target.value;
      state.catalog.route = "all";
      const route = document.getElementById("catalog-route");
      if (route) route.value = "all";
      renderCatalogResults();
    }
    if (target.id === "catalog-route") {
      state.catalog.route = target.value;
      renderCatalogResults();
    }
    if (target.id === "catalog-sort") {
      state.catalog.sort = target.value;
      renderCatalogResults();
    }
  }

  function handleGlobalKeydown(event) {
    const modifier = event.metaKey || event.ctrlKey;
    if (modifier && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (document.getElementById("search-dialog")?.open) closeSearch();
      else openSearch();
      return;
    }

    if (event.key === "/" && !isTypingTarget(event.target) && !document.querySelector("dialog[open]") && !state.mobileOpen) {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === "Escape" && state.mobileOpen) {
      closeMobileMenu();
      return;
    }

    const searchDialog = document.getElementById("search-dialog");
    if (searchDialog?.open && event.target instanceof Element && event.target.id === "search-input") {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveSearchSelection(1);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveSearchSelection(-1);
        return;
      }
      if (event.key === "Enter" && state.search.items.length && state.search.selected >= 0) {
        event.preventDefault();
        const selected = document.querySelector(".search-result.is-selected");
        if (selected) selected.click();
        return;
      }
    }

    if ((event.key === "Enter" || event.key === " ") && event.target instanceof Element) {
      const graphNode = event.target.closest(".graph-node");
      if (graphNode) {
        event.preventDefault();
        selectGraphDomain(graphNode.dataset.graphDomain);
      }
    }
  }

  function setupDialogs() {
    document.querySelectorAll("dialog").forEach(dialog => {
      dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener("close", syncBodyLock);
    });
  }

  function setupHeader() {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeMobileMenu();
    });
  }

  function initialize() {
    setupDialogs();
    setupHeader();
    hydrateRepoLinks();
    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("input", handleGlobalInput);
    document.addEventListener("change", handleGlobalChange);
    document.addEventListener("keydown", handleGlobalKeydown);
    window.addEventListener("hashchange", () => {
      const route = parseRoute();
      if (!route) return;
      closeAllDialogs();
      renderRoute(route);
    });
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/");
    }
    const route = parseRoute() || { name: "home", raw: "/" };
    renderRoute(route);
  }

  initialize();
})();

