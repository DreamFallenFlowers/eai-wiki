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
    simulation: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m24 7 15 8.5v17L24 41 9 32.5v-17L24 7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m9 15.5 15 8.7 15-8.7M24 24.2V41" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>`,
    data: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 37V24m9 13V14m9 23V28m9 9V8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M6 41h36" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="14" r="2.5" fill="currentColor"/></svg>`
  };

  function arrowIcon() {
    return `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function smallArrow() {
    return `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function bookIcon() {
    return `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 3.5h10v14l-5-3-5 3v-14Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
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
    const domainsCount = padded(DOMAINS.length);
    const routesCount = padded(TOTAL_ROUTES);
    const entriesCount = padded(ENTRIES.length);
    const resourcesCount = padded(RESOURCES.length);
    const featPrimary = byId("openvla");
    const featDomain = domainOf(featPrimary);
    const featRoute = routeOf(featPrimary);
    const featuredList = ["pi0", "genie-3", "diffusion-policy", "groot-n1"].map(byId).filter(Boolean);
    const topTags = allTags(8);

    return `
    <div class="view view--home">
      <section class="hero wrap">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow reveal">
            <span class="eyebrow-dot"></span>
            COMMUNITY-MAINTAINED / SEED EDITION 0.1
          </p>
          <h1 class="hero-title reveal" style="--delay:50ms">
            <span>让具身智能</span>
            <em>有迹可循。</em>
          </h1>
          <p class="hero-lede reveal" style="--delay:110ms">
            一个由研究者、工程师和好奇的人共同维护的具身智能开放知识库。
            先看五大领域，再沿技术路线走到具体论文——让每个概念都有出处，每次争论都有上下文。
          </p>
          <button class="hero-search reveal" style="--delay:160ms" type="button" data-open-search>
            <span class="hero-search-icon">${smallSearchIcon()}</span>
            <span class="hero-search-placeholder">搜索领域、技术路线、论文或资源</span>
            <span class="hero-search-hint">按 <kbd>Ctrl K</kbd> 开始</span>
            <span class="hero-search-arrow">${smallArrow()}</span>
          </button>
          <div class="hero-trending reveal" style="--delay:210ms">
            <span>从这里开始</span>
            ${DOMAINS.map(domain => `<a href="#/domain/${domain.id}">${esc(domain.name)}</a>`).join("")}
          </div>
        </div>
        ${heroArt()}
      </section>

      <section class="stat-strip" aria-label="知识库概况">
        <div class="wrap stat-grid">
          <div class="stat reveal">
            <span class="stat-value">${domainsCount}</span>
            <span class="stat-label">个研究领域</span>
            <span class="stat-note">navigation → data</span>
          </div>
          <div class="stat reveal" style="--delay:50ms">
            <span class="stat-value">${routesCount}</span>
            <span class="stat-label">条技术路线</span>
            <span class="stat-note">领域内的研究分支</span>
          </div>
          <div class="stat reveal" style="--delay:100ms">
            <span class="stat-value">${entriesCount}</span>
            <span class="stat-label">个深度词条</span>
            <span class="stat-note">论文、系统与概念</span>
          </div>
          <div class="stat reveal" style="--delay:150ms">
            <span class="stat-value">${resourcesCount}</span>
            <span class="stat-label">个数据集与基准</span>
            <span class="stat-note">训练、评测与复现</span>
          </div>
        </div>
      </section>

      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
          ${marqueeItems()}
          ${marqueeItems()}
        </div>
      </div>

      <section class="section domains-section wrap" id="domains">
        <div class="section-head">
          <div>
            <p class="eyebrow">01 / RESEARCH AREAS</p>
            <h2 class="section-title">五个领域，<br><em>一张技术地图。</em></h2>
          </div>
          <div class="section-aside">
            <p>每个领域先拆成技术路线，再落到具体论文、系统与概念。每个领域另设常用的数据集与 benchmark，方便从「读论文」进入「做实验」。</p>
            <a class="text-link" href="#/entries">浏览全部 ${ENTRIES.length} 个词条 ${smallArrow()}</a>
          </div>
        </div>
        <div class="domain-grid">
          ${DOMAINS.map(domainCard).join("")}
        </div>
      </section>

      <section class="section featured-section">
        <div class="wrap">
          <div class="section-head">
            <div>
              <p class="eyebrow">02 / SELECTED ENTRIES</p>
              <h2 class="section-title">先读这些。<br><em>其余的，顺着引用走。</em></h2>
            </div>
            <div class="section-aside">
              <p>不是排行榜，而是一条有判断的入口。每篇词条都回答四个问题：它是什么、为什么重要、证据在哪、边界是什么。</p>
              <a class="text-link" href="#/entries">进入词条库 ${smallArrow()}</a>
            </div>
          </div>

          <div class="featured-layout">
            <a class="spotlight reveal" href="#/entry/${featPrimary.id}" style="--accent:${featDomain.accent}">
              <div class="spotlight-top">
                <span class="spotlight-kicker">SPOTLIGHT / ${padded(featPrimary.year)}</span>
                <span class="spotlight-type">${typeLabel(featPrimary.type)}</span>
              </div>
              <div class="spotlight-main">
                <div class="spotlight-copy">
                  <p class="spotlight-domain">${featDomain.num} / ${esc(featDomain.en)} · ${esc(featRoute.name)}</p>
                  <h3>${esc(featPrimary.title)}</h3>
                  <p class="spotlight-sub">${esc(featPrimary.subtitle)}</p>
                  <p class="spotlight-tldr">${esc(featPrimary.tldr)}</p>
                </div>
                <div class="spotlight-figure" aria-hidden="true">
                  <span class="figure-orbit figure-orbit--one"></span>
                  <span class="figure-orbit figure-orbit--two"></span>
                  <span class="figure-metric">7<span>B</span></span>
                  <span class="figure-caption">OPEN<br>WEIGHTS</span>
                  <span class="figure-cross">+</span>
                </div>
              </div>
              <div class="spotlight-foot">
                <span>${esc(featPrimary.venue)}</span>
                <span class="spotlight-cta">阅读词条 <i>${arrowIcon()}</i></span>
              </div>
            </a>

            <div class="featured-list reveal" style="--delay:80ms">
              <div class="featured-list-head">
                <span>ALSO WORTH YOUR TIME</span>
                <span>04 ENTRIES</span>
              </div>
              ${featuredList.map((entry, index) => {
                const domain = domainOf(entry);
                return `
                <a class="featured-row" href="#/entry/${entry.id}" style="--accent:${domain.accent}">
                  <span class="fr-index">${padded(index + 2)}</span>
                  <span class="fr-copy">
                    <span class="fr-meta">${esc(domain.short)} / ${esc(routeOf(entry).name)} · ${typeLabel(entry.type)}</span>
                    <strong>${esc(entry.title)}</strong>
                    <span class="fr-sub">${esc(entry.subtitle)}</span>
                  </span>
                  <span class="fr-year">${entry.year}</span>
                  <span class="fr-arrow">${arrowIcon()}</span>
                </a>`;
              }).join("")}
              <a class="featured-more" href="#/entries">
                <span>还有 ${ENTRIES.length - featuredList.length - 1} 个词条</span>
                <span>查看全部 ${smallArrow()}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section paths-section">
        <div class="wrap">
          <div class="section-head section-head--light">
            <div>
              <p class="eyebrow eyebrow--light">03 / GUIDED PATHS</p>
              <h2 class="section-title">别从信息流开始。<br><em>从一条路径开始。</em></h2>
            </div>
            <div class="section-aside">
              <p>三条为不同目标设计的阅读路线。每条路线都有先后顺序，也都可以随时岔开去读你感兴趣的引用。</p>
              <a class="text-link text-link--light" href="#/graph">看看它们如何相连 ${smallArrow()}</a>
            </div>
          </div>
          <div class="paths-grid">
            ${PATHS.map(pathCard).join("")}
          </div>
        </div>
      </section>

      <section class="section home-graph-section wrap">
        <div class="home-graph-copy">
          <p class="eyebrow">04 / CONNECTIONS</p>
          <h2 class="section-title">领域不是抽屉。<br><em>路线也不是。</em></h2>
          <p>导航会借操作的语义规划，移动操作依赖仿真与数据，评测又反过来定义什么叫「通用」。知识网络从五个领域展开，再带你进入领域内部的技术路线。</p>
          <div class="home-graph-stats">
            <div><strong>${DOMAINS.length}</strong><span>领域节点</span></div>
            <div><strong>${TOTAL_ROUTES}</strong><span>技术路线</span></div>
            <div><strong>${RESOURCES.length}</strong><span>数据 / 基准</span></div>
          </div>
          <a class="button button--dark" href="#/graph">进入知识网络 <span>${smallArrow()}</span></a>
        </div>
        <div class="home-graph-visual">
          ${miniGraphMarkup()}
          <div class="mini-caption">
            <span>FIG. 02 — DOMAIN ADJACENCY</span>
            <span>点击进入完整图谱 ↗</span>
          </div>
        </div>
      </section>

      <section class="editorial-band">
        <div class="wrap editorial-band-inner">
          <div class="editorial-label">
            <span class="eyebrow eyebrow--light">OUR EDITORIAL BAR</span>
            <span class="editorial-mark">✳</span>
          </div>
          <blockquote>“每条词条都要回答三件事：<br>它解决什么问题？证据是什么？<em>哪里还不可靠？</em>”</blockquote>
          <div class="editorial-meta">
            <span>AI 辅助起草 · 社区审校中</span>
            <a href="#/contribute">阅读编辑原则 ${smallArrow()}</a>
          </div>
        </div>
      </section>

      <section class="section home-tags-section wrap">
        <div class="section-head section-head--compact">
          <div>
            <p class="eyebrow">05 / BY TOPIC</p>
            <h2 class="section-title section-title--small">按主题漫游</h2>
          </div>
          <p class="section-aside section-aside--inline">不按领域，按你此刻好奇的东西。</p>
        </div>
        <div class="tag-cloud">
          ${topTags.map((tag, index) => `<a href="#/entries" data-tag-jump="${esc(tag)}" style="--tag-delay:${index * 25}ms">${esc(tag)}<span>↗</span></a>`).join("")}
          <a class="tag-cloud-more" href="#/entries">全部索引 ${smallArrow()}</a>
        </div>
      </section>
    </div>`;
  }

  function heroArt() {
    const positions = ["one", "two", "three", "four", "five"];
    const nodes = DOMAINS.map((domain, index) => ({
      icon: padded(index + 1),
      title: domain.name,
      sub: domain.short,
      cls: `loop-node--${positions[index]}`
    }));
    return `
      <div class="hero-art reveal" style="--delay:150ms" role="img" aria-label="具身智能研究地图：导航、操作、移动操作、仿真器与数据评测">
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
          <span>NAV / MANIP / LOCO / SIM / DATA</span>
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

  function renderCatalog() {
    const typeCounts = catalogTypeCounts();
    const initialList = filterCatalogEntries();
    return `
      <div class="view view--catalog">
        <section class="page-hero">
          <div class="wrap">
            <nav class="breadcrumbs" aria-label="面包屑">
              <a href="#/">EAI WIKI</a><span>/</span><span>INDEX</span>
            </nav>
            <div class="page-hero-grid">
              <div class="page-hero-title">
                <p class="eyebrow">INDEX / ALL ENTRIES</p>
                <h1>词条库<em>Index</em></h1>
              </div>
              <div class="page-hero-aside">
                <p>论文、系统、概念、数据集与基准。按五个研究领域和技术路线组织，用同一套模板写作，用同一套标准检验。</p>
                <div class="page-hero-count">
                  <strong>${padded(ENTRIES.length)}</strong>
                  <span>个词条<br>跨 ${DOMAINS.length} 个领域 / ${TOTAL_ROUTES} 条路线</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="catalog-section wrap">
          <div class="catalog-toolbar">
            <div class="filter-row" role="group" aria-label="按类型筛选">
              <button class="filter-chip ${state.catalog.type === "all" ? "is-active" : ""}" type="button" data-catalog-type="all">
                全部 <span>${typeCounts.all}</span>
              </button>
              ${TYPE_ORDER.map(type => `
                <button class="filter-chip ${state.catalog.type === type ? "is-active" : ""}" type="button" data-catalog-type="${type}">
                  ${typeLabel(type)} <span>${typeCounts[type] || 0}</span>
                </button>`).join("")}
            </div>
            <div class="catalog-tools">
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
          <div id="catalog-results">${entryGridMarkup(initialList)}</div>
        </section>

        <section class="catalog-community wrap">
          <div>
            <p class="eyebrow">MISSING SOMETHING?</p>
            <h2>这张索引并不完整。<br><em>它需要你的那一块。</em></h2>
          </div>
          <div>
            <p>一门新工作、一段复现经验、一条被忽略的失败结果，都可能让下一个人少走弯路。</p>
            <button class="button button--orange" type="button" data-open-contribute>提交一个新词条 ${smallArrow()}</button>
          </div>
        </section>
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
    results.innerHTML = entryGridMarkup(list, emptyMessage, emptyAction);
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

  function resourceMarkup(resource) {
    const entry = resource.entryId ? byId(resource.entryId) : null;
    const href = entry ? `#/entry/${entry.id}` : safeUrl(resource.url);
    const external = !entry;
    return `
      <a class="resource-card" href="${href}" ${external ? 'target="_blank" rel="noopener"' : ""} style="--resource-accent:${entry ? domainOf(entry).accent : "var(--orange)"}">
        <div class="resource-top">
          <span class="resource-type">${resource.type === "dataset" ? "DATASET" : "BENCHMARK"}</span>
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
    const related = (domain.related || []).map(id => domainById.get(id)).filter(Boolean);
    const resources = resourcesForDomain(domain.id);
    const datasets = resources.filter(resource => resource.type === "dataset");
    const benchmarks = resources.filter(resource => resource.type === "benchmark");
    return `
      <div class="view view--domain" style="--accent:${domain.accent};--tint:${domain.tint}">
        <section class="domain-hero" style="--accent:${domain.accent};--tint:${domain.tint}">
          <div class="wrap">
            <nav class="breadcrumbs breadcrumbs--on-tint" aria-label="面包屑">
              <a href="#/">EAI WIKI</a><span>/</span><a href="#/entries">词条库</a><span>/</span><span>${esc(domain.short)}</span>
            </nav>
            <div class="domain-hero-grid">
              <div class="domain-hero-title">
                <span class="domain-hero-num" aria-hidden="true">${domain.num}</span>
                <p class="domain-hero-en">${esc(domain.en)} / ${esc(domain.short)}</p>
                <h1>${esc(domain.name)}</h1>
                <p class="domain-hero-tagline">${esc(domain.tagline)}</p>
              </div>
              <div class="domain-question">
                <div class="domain-question-head">
                  <span>THE BIG QUESTION</span>
                  <span class="question-mark">?</span>
                </div>
                <p>${esc(domain.question)}</p>
                <button class="text-link" type="button" data-open-contribute data-prefill-domain="${domain.id}">补充这个问题 ${smallArrow()}</button>
              </div>
            </div>
            <div class="domain-hero-meta">
              <div class="domain-meta-item"><span>ROUTES</span><strong>${domain.routes.length}</strong></div>
              <div class="domain-meta-item"><span>ENTRIES</span><strong>${entries.length}</strong></div>
              <div class="domain-meta-item"><span>RESOURCES</span><strong>${resources.length}</strong></div>
              <div class="domain-meta-item"><span>UPDATED</span><strong>${formatDate(CFG.updated || "2026-11-10")}</strong></div>
              <div class="domain-topics-inline">
                ${domain.routes.map(route => `<span>${esc(route.name)}</span>`).join("")}
              </div>
            </div>
          </div>
        </section>

        <div class="wrap domain-body">
          <section class="domain-story">
            <div class="domain-story-main">
              <div class="entry-section-head">
                <span class="section-index">01</span>
                <h2>领域导读</h2>
              </div>
              <div class="prose prose--large">
                ${(domain.intro || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
              </div>
            </div>
            <aside class="domain-aside">
              <div class="aside-card">
                <div class="aside-card-head"><span>TECH ROUTES</span><span>${padded(domain.routes.length)}</span></div>
                <ol class="topic-list route-index-list">
                  ${domain.routes.map((route, index) => `
                    <li><span>${padded(index + 1)}</span><a href="${routeHref(domain, route)}">${esc(route.name)}</a><b>${routeEntries(domain.id, route.id).length}</b></li>`).join("")}
                </ol>
              </div>
              <div class="aside-note">
                <span class="mono">EDITOR'S NOTE</span>
                <p>领域导读由 AI 辅助起草，正在等待领域编辑审校。发现事实错误，请直接建议修订。</p>
                <button type="button" class="text-button" data-open-contribute data-fix-domain="${domain.id}">建议修订 ↗</button>
              </div>
            </aside>
          </section>

          <section class="domain-routes">
            <div class="entry-section-head">
              <span class="section-index">02</span>
              <h2>技术路线</h2>
              <span class="section-tag">${domain.routes.length} 条路线 / ${entries.length} 个词条</span>
            </div>
            <div class="route-grid">
              ${domain.routes.map((route, index) => {
                const routeItems = routeEntries(domain.id, route.id);
                return `
                  <article class="route-card" style="--delay:${index * 45}ms">
                    <a class="route-card-head" href="${routeHref(domain, route)}">
                      <span class="route-card-num">${padded(index + 1)}</span>
                      <span class="route-card-copy">
                        <small>${esc(route.en)}</small>
                        <strong>${esc(route.name)}</strong>
                      </span>
                      <span class="route-card-arrow">${arrowIcon()}</span>
                    </a>
                    <p class="route-card-desc">${esc(route.summary)}</p>
                    <div class="route-card-tags">${route.tags.map(tag => `<span>${esc(tag)}</span>`).join("")}</div>
                    <div class="route-card-entries">
                      <span class="route-card-label">REPRESENTATIVE</span>
                      ${routeItems.slice(0, 3).map(entry => `
                        <a href="#/entry/${entry.id}">
                          <span>${esc(entry.title)}</span>
                          <small>${entry.year}</small>
                        </a>`).join("")}
                      ${routeItems.length > 3 ? `<a class="route-card-more" href="${routeHref(domain, route)}">还有 ${routeItems.length - 3} 个词条 ${smallArrow()}</a>` : ""}
                    </div>
                    <div class="route-card-foot">
                      <span>${routeItems.length} 个词条</span>
                      <a href="${routeHref(domain, route)}">进入路线 ${smallArrow()}</a>
                    </div>
                  </article>`;
              }).join("")}
            </div>
          </section>

          <section class="domain-resources">
            <div class="entry-section-head">
              <span class="section-index">03</span>
              <h2>常用数据集与基准</h2>
              <span class="section-tag">${resources.length} 个资源</span>
            </div>
            <div class="resource-columns">
              <div class="resource-group">
                <div class="resource-group-head"><span>DATASETS</span><span>${padded(datasets.length)}</span></div>
                <div class="resource-list">
                  ${datasets.length ? datasets.map(resourceMarkup).join("") : `<p class="resource-empty">这个领域暂未整理独立数据集。</p>`}
                </div>
              </div>
              <div class="resource-group">
                <div class="resource-group-head"><span>BENCHMARKS</span><span>${padded(benchmarks.length)}</span></div>
                <div class="resource-list">
                  ${benchmarks.length ? benchmarks.map(resourceMarkup).join("") : `<p class="resource-empty">这个领域暂未整理独立 benchmark。</p>`}
                </div>
              </div>
            </div>
            <p class="resources-note">资源按领域交叉收录；同一个数据集可能同时服务于操作、仿真与数据路线。标注「站内词条」的条目可直接阅读详细导读。</p>
          </section>

          <section class="domain-next">
            <div class="domain-next-copy">
              <p class="eyebrow">ADJACENT FIELDS</p>
              <h2>从边界处，<br><em>长出新的问题。</em></h2>
            </div>
            <div class="related-domains">
              ${related.map(item => `
                <a class="related-domain-card" href="#/domain/${item.id}" style="--accent:${item.accent};--tint:${item.tint}">
                  <span class="rd-num">${item.num}</span>
                  <span class="rd-copy"><strong>${esc(item.name)}</strong><small>${esc(item.en)}</small></span>
                  <span class="rd-arrow">${arrowIcon()}</span>
                </a>`).join("")}
            </div>
          </section>

          <section class="domain-contribute">
            <div>
              <span class="mono">OPEN CALL / ${esc(domain.short)}</span>
              <h2>这个领域，还缺什么？</h2>
            </div>
            <div class="domain-contribute-actions">
              <p>一条路线、一篇漏掉的关键工作、一段复现经验，或者一个被高估的结论，都值得被写下来。</p>
              <div>
                <button class="button button--dark" type="button" data-open-contribute data-prefill-domain="${domain.id}">添加词条 ${smallArrow()}</button>
                <button class="button button--outline" type="button" data-open-contribute data-fix-domain="${domain.id}">提出修订</button>
              </div>
            </div>
          </section>
        </div>
      </div>`;
  }

  /* -------------------------------------------------------------------- route */

  function renderRoutePage(domain, route) {
    const items = routeEntries(domain.id, route.id);
    const relatedRoutes = domain.routes.filter(item => item.id !== route.id);
    return `
      <div class="view view--route" style="--accent:${domain.accent};--tint:${domain.tint}">
        <section class="route-hero">
          <div class="wrap">
            <nav class="breadcrumbs breadcrumbs--on-tint" aria-label="面包屑">
              <a href="#/">EAI WIKI</a><span>/</span><a href="#/domain/${domain.id}">${esc(domain.name)}</a><span>/</span><span>${esc(route.name)}</span>
            </nav>
            <div class="route-hero-grid">
              <div>
                <p class="domain-hero-en">${esc(domain.en)} / ${esc(route.en)}</p>
                <h1>${esc(route.name)}</h1>
                <p class="route-hero-summary">${esc(route.summary)}</p>
                <div class="route-hero-tags">${route.tags.map(tag => `<span>${esc(tag)}</span>`).join("")}</div>
              </div>
              <div class="route-question">
                <span class="mono">ROUTE QUESTION</span>
                <p>${esc(route.question)}</p>
                <a class="text-link" href="#/domain/${domain.id}">返回领域地图 ${smallArrow()}</a>
              </div>
            </div>
            <div class="route-hero-meta">
              <div class="domain-meta-item"><span>AREA</span><strong>${esc(domain.name)}</strong></div>
              <div class="domain-meta-item"><span>ENTRIES</span><strong>${items.length}</strong></div>
              <div class="domain-meta-item"><span>UPDATED</span><strong>${formatDate(CFG.updated || "2026-11-10")}</strong></div>
            </div>
          </div>
        </section>

        <div class="wrap route-body">
          <div class="route-main">
            <section class="domain-entries route-entries-section">
              <div class="entry-section-head">
                <span class="section-index">01</span>
                <h2>这条路线上的工作</h2>
                <span class="section-tag">按时间顺序 · 可继续补充</span>
              </div>
              ${entryGridMarkup(items, "这条路线还没有词条。你可以成为第一个补上它的人。")}
            </section>

            <div class="revision-note route-contribute-note">
              <div>
                <span class="mono">OPEN ROUTE</span>
                <p>路线本身也会被修订：可能新增一条分支，也可能把两篇工作重新归位。欢迎在 GitHub 中提出。</p>
              </div>
              <button class="button button--outline" type="button" data-open-contribute data-prefill-domain="${domain.id}" data-prefill-route="${route.id}">补充这条路线 ${smallArrow()}</button>
            </div>
          </div>

          <aside class="route-aside">
            <div class="aside-card">
              <div class="aside-card-head"><span>OTHER ROUTES / ${esc(domain.short)}</span><span>${padded(relatedRoutes.length)}</span></div>
              <div class="route-aside-list">
                ${relatedRoutes.map(item => `<a href="${routeHref(domain, item)}"><span>${esc(item.name)}</span><small>${routeEntries(domain.id, item.id).length} 个词条</small></a>`).join("")}
              </div>
            </div>
            <div class="aside-note">
              <span class="mono">HOW TO READ</span>
              <p>先把路线问题读一遍，再看代表工作的证据与边界。不要用一篇论文替代整条路线。</p>
              <a class="text-link" href="#/domain/${domain.id}">回到${esc(domain.name)}领域 ${smallArrow()}</a>
            </div>
          </aside>
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

  function bookmarkButton(entry, extraClass = "") {
    const active = state.bookmarks.has(entry.id);
    return `<button class="entry-action ${active ? "is-bookmarked" : ""} ${extraClass}" type="button" data-bookmark="${entry.id}" aria-pressed="${active}" title="收藏仅保存在当前浏览器">
      ${bookIcon()}<span>${active ? "已收藏" : "收藏"}</span>
    </button>`;
  }

  function entryCommentsMarkup(entry) {
    let main;
    if (commentsConfigReady()) {
      main = `<div class="giscus-shell">
        <div id="giscus-container" data-entry-id="${entry.id}">
          <div class="comment-loading"><span class="loading-mark"></span><p>正在载入 GitHub Discussions…</p></div>
        </div>
      </div>`;
    } else if (isLocalPreview()) {
      const comments = readLocalComments(entry.id);
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
            <input type="hidden" name="entryId" value="${entry.id}">
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
        <p>维护者需要启用 GitHub Discussions 并完成 Giscus 配置。完成后，每个词条都会自动拥有一个公开、可订阅的讨论串。</p>
        <div class="comment-setup-actions">
          <a class="button button--dark" href="${esc(repoFileUrl("GISCUS_SETUP.md"))}" target="_blank" rel="noopener">查看 3 分钟接入说明 ${smallArrow()}</a>
          <a class="button button--outline" href="${esc(issueUrl(`[讨论] ${entry.title}`, `我想补充关于 ${entry.title} 的讨论：\n\n`)) || "#/contribute"}" ${REPO ? 'target="_blank" rel="noopener"' : ""}>先在 Issues 中补充 ↗</a>
        </div>
      </div>`;
    }

    return `
      <section class="discussion" id="discussion">
        <div class="discussion-head">
          <div>
            <p class="eyebrow">DISCUSSION / OPEN THREAD</p>
            <h2>一起把它读透。</h2>
          </div>
          <p class="discussion-sub">对这篇工作的疑问、复现经验、补充引用，或不同意见，都欢迎留在这里。请区分事实与判断，并尽量附上出处。</p>
        </div>
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
    const first = primarySource(entry);
    const sourceButtons = [
      first ? `<a class="button button--dark" href="${safeUrl(first.url)}" target="_blank" rel="noopener">${esc(first.label)} ${smallArrow()}</a>` : "",
      ...sources.filter(link => link !== first).map(link => `<a class="button button--outline" href="${safeUrl(link.url)}" target="_blank" rel="noopener">${esc(link.label)} ↗</a>`)
    ].join("");

    return `
      <div class="view view--entry" style="--accent:${domain.accent};--tint:${domain.tint}">
        <section class="entry-hero wrap">
          <nav class="breadcrumbs" aria-label="面包屑">
            <a href="#/">EAI WIKI</a><span>/</span><a href="#/domain/${domain.id}">${esc(domain.name)}</a><span>/</span><a href="${routeHref(domain, route)}">${esc(route.name)}</a><span>/</span><span>${esc(entry.title)}</span>
          </nav>
          <header class="entry-header">
            <div class="entry-overline">
              ${typeChip(entry.type)}
              <a href="#/domain/${domain.id}">${domain.num} / ${esc(domain.name)}</a>
              <span>·</span>
              <a href="${routeHref(domain, route)}">${esc(route.name)}</a>
              <span>${entry.year}</span>
              <span class="entry-readtime">${readTime(entry)} 分钟阅读</span>
            </div>
            <h1>${esc(entry.title)}</h1>
            <p class="entry-subtitle">${esc(entry.subtitle)}</p>
            <p class="entry-deck">${esc(entry.tldr)}</p>
            <div class="entry-byline">
              <span>${esc(entry.org)}</span>
              <span class="dot-sep">·</span>
              <span>${esc(entry.venue)}</span>
              <span class="dot-sep">·</span>
              <span>更新于 ${formatDate(CFG.updated || "2026-11-10")}</span>
            </div>
            <div class="entry-actions">
              ${sourceButtons}
              <span class="action-divider" aria-hidden="true"></span>
              <button class="entry-action" type="button" data-cite="${entry.id}">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 4H4v12h12v-3M9 4h7v7M16 4 8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>引用</span>
              </button>
              ${bookmarkButton(entry)}
              <button class="entry-action" type="button" data-share="${entry.id}">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="15" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="15" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="m7.3 8.8 5.4-2.6M7.3 11.2l5.4 2.6" stroke="currentColor" stroke-width="1.5"/></svg>
                <span>分享</span>
              </button>
            </div>
          </header>
        </section>

        <div class="entry-body wrap">
          <div class="entry-layout">
            <article class="entry-main">
              <div class="why-card">
                <span class="why-label">WHY IT MATTERS</span>
                <p>${esc(entry.why)}</p>
              </div>

              <section class="entry-section" id="entry-intro">
                <div class="entry-section-head">
                  <span class="section-index">01</span>
                  <h2>它解决什么问题</h2>
                </div>
                <div class="prose prose--large">
                  ${(entry.intro || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
                </div>
              </section>

              <section class="entry-section" id="entry-method">
                <div class="entry-section-head">
                  <span class="section-index">02</span>
                  <h2>核心机制</h2>
                  <span class="section-tag">${(entry.method || []).length} 个关键设计</span>
                </div>
                <div class="method-grid">
                  ${(entry.method || []).map((item, itemIndex) => `
                    <article class="method-card">
                      <span class="method-num">${padded(itemIndex + 1)}</span>
                      <h3>${esc(item.title)}</h3>
                      <p>${esc(item.text)}</p>
                    </article>`).join("")}
                </div>
              </section>

              <section class="entry-section" id="entry-evidence">
                <div class="entry-section-head">
                  <span class="section-index">03</span>
                  <h2>关键证据</h2>
                  <span class="section-tag">来自原始工作</span>
                </div>
                <div class="evidence-grid">
                  ${(entry.evidence || []).map(item => `
                    <article class="evidence-card">
                      <strong class="evidence-value">${esc(item.value)}</strong>
                      <span class="evidence-label">${esc(item.label)}</span>
                      <p>${esc(item.text)}</p>
                    </article>`).join("")}
                </div>
                <p class="evidence-footnote">数字与结论摘自作者报告。独立复现前，请把论文中的评测条件一并阅读。</p>
              </section>

              <section class="entry-section" id="entry-limits">
                <div class="entry-section-head">
                  <span class="section-index">04</span>
                  <h2>边界与开放问题</h2>
                </div>
                <ul class="limits-list">
                  ${(entry.limits || []).map((limit, limitIndex) => `
                    <li><span>${padded(limitIndex + 1)}</span><p>${esc(limit)}</p></li>`).join("")}
                </ul>
              </section>

              <section class="entry-section" id="entry-related">
                <div class="entry-section-head">
                  <span class="section-index">05</span>
                  <h2>继续阅读</h2>
                </div>
                <div class="related-entry-grid">
                  ${related.map(item => {
                    const itemDomain = domainOf(item);
                    return `
                      <a class="related-entry-card" href="#/entry/${item.id}" style="--accent:${itemDomain.accent}">
                        <span class="related-entry-meta">${esc(itemDomain.short)} / ${esc(routeOf(item)?.name || "")} · ${typeLabel(item.type)}</span>
                        <strong>${esc(item.title)}</strong>
                        <span>${esc(item.subtitle)}</span>
                        <i>${arrowIcon()}</i>
                      </a>`;
                  }).join("")}
                </div>
                ${sources.length ? `
                  <div class="source-list">
                    <span class="mono">PRIMARY SOURCES</span>
                    ${sources.map(link => `<a href="${safeUrl(link.url)}" target="_blank" rel="noopener">${esc(link.label)} <span>${esc(new URL(link.url, location.href).hostname.replace(/^www\./, ""))} ↗</span></a>`).join("")}
                  </div>` : ""}
              </section>

              <div class="revision-note">
                <div>
                  <span class="mono">OPEN EDITING</span>
                  <p>这是一条持续演化的词条。发现错误、遗漏或更好的解释？直接提出修订，编辑会核对来源后合并。</p>
                </div>
                <button class="button button--outline" type="button" data-open-contribute data-fix-entry="${entry.id}">建议修订 ${smallArrow()}</button>
              </div>

              ${entryCommentsMarkup(entry)}
            </article>

            <aside class="entry-aside">
              <div class="fact-card">
                <div class="fact-card-head"><span>AT A GLANCE</span><span>${typeLabel(entry.type)}</span></div>
                <dl>
                  <div><dt>领域</dt><dd><a href="#/domain/${domain.id}">${domain.num} / ${esc(domain.name)}</a></dd></div>
                  <div><dt>路线</dt><dd><a href="${routeHref(domain, route)}">${esc(route.name)}</a></dd></div>
                  <div><dt>年份</dt><dd>${entry.year}</dd></div>
                  <div><dt>发表</dt><dd>${esc(entry.venue)}</dd></div>
                  <div><dt>机构</dt><dd>${esc(entry.org)}</dd></div>
                  <div><dt>作者</dt><dd>${esc(entry.authors)}</dd></div>
                  <div><dt>状态</dt><dd><span class="status-dot"></span>种子词条 · 待审校</dd></div>
                </dl>
                <div class="fact-actions">
                  <button type="button" class="text-button" data-open-contribute data-fix-entry="${entry.id}">建议修订</button>
                  <button type="button" class="text-button" data-cite="${entry.id}">复制引用</button>
                </div>
              </div>

              <nav class="toc-card" aria-label="本页目录">
                <span class="toc-title">ON THIS PAGE</span>
                <button type="button" data-scroll-target="entry-intro"><span>01</span>它解决什么问题</button>
                <button type="button" data-scroll-target="entry-method"><span>02</span>核心机制</button>
                <button type="button" data-scroll-target="entry-evidence"><span>03</span>关键证据</button>
                <button type="button" data-scroll-target="entry-limits"><span>04</span>边界与开放问题</button>
                <button type="button" data-scroll-target="entry-related"><span>05</span>继续阅读</button>
                <button type="button" data-scroll-target="discussion"><span>06</span>讨论</button>
              </nav>

              <div class="aside-disclaimer">
                <span class="mono">A NOTE ON SOURCES</span>
                <p>本词条是社区编辑内容，不是原作者审定版本。引用前请回到论文或官方项目页核对。</p>
                <a href="CONTRIBUTING.md" class="js-repo-file" data-file="CONTRIBUTING.md">阅读编辑规范 ↗</a>
              </div>
            </aside>
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

  function setupComments(entry) {
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
        const comments = readLocalComments(entry.id);
        comments.push({
          id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
          name: name.slice(0, 40),
          text: text.slice(0, 1600),
          createdAt: new Date().toISOString()
        });
        saveLocalComments(entry.id, comments);
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
      "data-term": `eai-wiki/entry/${entry.id}`,
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
              <p>五个领域不是并列的抽屉，领域内部也不是平铺的论文列表。选中一个节点，沿技术路线进入具体工作。</p>
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
    return `
      <div class="view view--contribute">
        <section class="contribute-hero">
          <div class="wrap">
            <nav class="breadcrumbs breadcrumbs--on-dark" aria-label="面包屑">
              <a href="#/">EAI WIKI</a><span>/</span><span>CONTRIBUTE</span>
            </nav>
            <div class="contribute-hero-grid">
              <div>
                <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span> OPEN CALL FOR CONTRIBUTORS</p>
                <h1>少一点搬运，<br><em>多一点判断。</em></h1>
                <p class="contribute-hero-lede">这不是一个把论文摘要贴在一起的站点。我们更想要你的选择：为什么这篇工作值得读，它的证据够不够，哪里可能是错的。</p>
                <div class="contribute-hero-actions">
                  <button class="button button--orange" type="button" data-open-contribute>贡献一个词条 ${smallArrow()}</button>
                  <a class="button button--ghost-light" href="${esc(REPO_URL ? `${REPO_URL}/issues/new/choose` : "#/contribute")}" ${REPO ? 'target="_blank" rel="noopener"' : ""} data-issue-choose>在 GitHub 提交 ↗</a>
                </div>
              </div>
              <div class="contribute-hero-card">
                <span class="mono">CONTRIBUTION / AT A GLANCE</span>
                <div class="contrib-stat"><strong>3</strong><span>种参与方式<br>评论 · 修订 · 新词条</span></div>
                <div class="contrib-stat"><strong>&lt; 10</strong><span>分钟完成<br>一次词条提名</span></div>
                <div class="contrib-stat"><strong>0</strong><span>行代码要求<br>会写字就够了</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="contribute-body wrap">
          <div class="contribute-intro">
            <p class="eyebrow">WHY A WIKI</p>
            <div class="prose prose--large">
              <p>具身智能的论文增长得比任何人的阅读速度都快。搜索结果给你的是「有哪些」，但很少回答「应该先读哪篇」「这个结果可信吗」「它和那篇工作到底是什么关系」。</p>
              <p>Wiki 的价值不在完整，而在<strong>有判断的连接</strong>：先把它放回领域的技术路线，再把路线放回它的问题史，最后把一句 demo 放回它的评测条件里。</p>
            </div>
          </div>

          <section class="ways-section">
            <div class="section-head section-head--compact">
              <div>
                <p class="eyebrow">WAYS IN</p>
                <h2 class="section-title section-title--small">三种参与方式</h2>
              </div>
              <p class="section-aside section-aside--inline">从最轻的一步开始，也可以直接补齐一个领域。</p>
            </div>
            <div class="ways-grid">
              <article class="way-card">
                <span class="way-num">01</span>
                <h3>留下一条评论</h3>
                <p>在任意词条下提问、补充引用、贴复现结果，或指出一个被忽略的限制。评论由 GitHub Discussions 承载，公开且可订阅。</p>
                <button class="text-link" type="button" data-open-contribute data-intent="comment">写一条补充 ${smallArrow()}</button>
              </article>
              <article class="way-card">
                <span class="way-num">02</span>
                <h3>建议一次修订</h3>
                <p>事实错误、过时的数字、缺失的关键工作、更好的解释。附上来源，编辑会核对后合并。你不需要自己改代码。</p>
                <button class="text-link" type="button" data-open-contribute data-intent="fix">提出修订 ${smallArrow()}</button>
              </article>
              <article class="way-card way-card--accent">
                <span class="way-num">03</span>
                <h3>贡献一个新词条</h3>
                <p>用统一模板写一篇论文、系统或概念，并把它放进正确的领域与技术路线。从一个清楚的「为什么重要」开始。</p>
                <button class="text-link" type="button" data-open-contribute>开始写词条 ${smallArrow()}</button>
              </article>
            </div>
          </section>

          <div class="guide-layout">
            <div class="guide-main">
              <section class="guide-section">
                <div class="entry-section-head">
                  <span class="section-index">01</span>
                  <h2>写作底线</h2>
                </div>
                <ol class="principle-list">
                  <li>
                    <span>01</span>
                    <div><h3>一手来源优先</h3><p>引用论文、官方项目页或作者博客，不把二手解读当证据。所有链接必须真实可访问。</p></div>
                  </li>
                  <li>
                    <span>02</span>
                    <div><h3>区分事实与判断</h3><p>「论文报告了 46.9% 提升」是事实；「这是目前最好的方法」是判断。判断可以写，但要标明依据。</p></div>
                  </li>
                  <li>
                    <span>03</span>
                    <div><h3>把边界写清楚</h3><p>失败模式、评测条件、未验证的假设，至少和成功结果一样重要。不要用 demo 视频替代证据。</p></div>
                  </li>
                  <li>
                    <span>04</span>
                    <div><h3>AI 可以辅助，不能替你负责</h3><p>允许 AI 辅助起草，但必须人工核对事实与引用，并在 Issue 中说明使用了 AI。禁止编造文献或作者。</p></div>
                  </li>
                </ol>
              </section>

              <section class="guide-section">
                <div class="entry-section-head">
                  <span class="section-index">02</span>
                  <h2>从想法到合并</h2>
                </div>
                <div class="process-grid">
                  <div class="process-step"><span>01</span><h3>填写表单</h3><p>写清名称、领域、一句话概述与一手来源。表单会自动生成 GitHub Issue。</p></div>
                  <div class="process-step"><span>02</span><h3>公开讨论</h3><p>编辑和社区会在 Issue 中提出补充、质疑与格式建议。这里没有匿名权威。</p></div>
                  <div class="process-step"><span>03</span><h3>编辑审校</h3><p>核对来源、补齐结构、统一术语。必要时会请你提供更具体的证据。</p></div>
                  <div class="process-step"><span>04</span><h3>合并发布</h3><p>词条进入词条库与领域页，自动获得讨论区，并出现在下一次更新记录中。</p></div>
                </div>
              </section>

              <section class="guide-section">
                <div class="entry-section-head">
                  <span class="section-index">03</span>
                  <h2>词条模板</h2>
                  <button class="text-button" type="button" data-copy-template>复制模板 ↗</button>
                </div>
                <pre class="code-block" id="entry-template"><code>${esc(template)}</code></pre>
                <p class="code-note">不需要逐项填满。宁可少写，也不要为了完整而编造。</p>
              </section>

              <section class="guide-section">
                <div class="entry-section-head">
                  <span class="section-index">04</span>
                  <h2>常见问题</h2>
                </div>
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
            </div>

            <aside class="guide-aside">
              <div class="aside-card">
                <div class="aside-card-head"><span>BEFORE YOU SUBMIT</span><span>CHECK</span></div>
                <ul class="check-list">
                  <li>一手来源链接可访问</li>
                  <li>领域与技术路线已归位</li>
                  <li>数字带有评测条件</li>
                  <li>事实与判断已区分</li>
                  <li>已说明 AI 参与程度</li>
                </ul>
              </div>
              <div class="aside-card">
                <div class="aside-card-head"><span>CONTENT LICENSE</span><span>CC</span></div>
                <p>文字：CC BY-SA 4.0<br>代码：MIT<br>论文图表：归原作者</p>
                <a class="text-link js-repo-file" href="LICENSE" data-file="LICENSE">阅读许可 ${smallArrow()}</a>
              </div>
              <div class="aside-card aside-card--dark">
                <span class="mono">START SMALL</span>
                <h3>不知道写什么？</h3>
                <p>从你最近读过的一篇论文开始。只补一个缺失的词条，或者修正一个你确定错了的数字。</p>
                <button class="button button--orange" type="button" data-open-contribute>打开贡献表单 ${smallArrow()}</button>
              </div>
            </aside>
          </div>

          <section class="roadmap">
            <div class="roadmap-head">
              <p class="eyebrow">ROADMAP / 2026</p>
              <h2>从种子版开始，<br><em>慢慢长成一张可信的地图。</em></h2>
            </div>
            <div class="roadmap-track">
              <div class="roadmap-item is-current">
                <span class="roadmap-phase">NOW / v0.1</span>
                <h3>种子发布</h3>
                <p>${DOMAINS.length} 个领域、${TOTAL_ROUTES} 条技术路线、${ENTRIES.length} 个基础词条与 ${RESOURCES.length} 个数据/基准资源。内容为 AI 辅助起草，等待领域编辑审校。</p>
                <span class="roadmap-status">进行中</span>
              </div>
              <div class="roadmap-item">
                <span class="roadmap-phase">NEXT / v0.5</span>
                <h3>领域审校</h3>
                <p>为每个领域建立编辑小组，逐条核对引用、补充遗漏工作，加入失败案例与复现记录。</p>
                <span class="roadmap-status">待开始</span>
              </div>
              <div class="roadmap-item">
                <span class="roadmap-phase">LATER / v1.0</span>
                <h3>可引用的公共知识</h3>
                <p>稳定引用格式、版本记录、同行评议标签，以及和会议/课程/中文社区的交叉链接。</p>
                <span class="roadmap-status">计划中</span>
              </div>
            </div>
          </section>

          <section class="contribute-final">
            <div>
              <span class="mono">YOUR TURN</span>
              <h2>把你知道的，<br>留给下一个人。</h2>
            </div>
            <div>
              <p>写一条评论也算。一个新词条也算。修正一个错误，可能比写一篇新文章更有价值。</p>
              <div class="contribute-final-actions">
                <button class="button button--orange" type="button" data-open-contribute>贡献一个词条 ${smallArrow()}</button>
                <a class="button button--outline js-repo-file" href="CONTRIBUTING.md" data-file="CONTRIBUTING.md">阅读完整规范 ↗</a>
              </div>
            </div>
          </section>
        </section>
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
      haystack: [domain.name, domain.en, domain.short, domain.description, domain.tagline, domain.question, ...domain.routes.flatMap(route => [route.name, route.en, ...route.tags])].join(" ").toLowerCase()
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
      haystack: [domain.name, route.name, route.en, route.summary, route.question, ...route.tags].join(" ").toLowerCase()
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
    const parts = raw.split("/").filter(Boolean);
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
    return { name: "notfound", raw };
  }

  function routeMeta(route) {
    if (route.name === "home") {
      return {
        title: "EAI Wiki · 具身智能开放知识库",
        description: "EAI Wiki 是一个由社区共建的具身智能知识库：导航、操作、移动操作、仿真器、数据与评测五大领域，按技术路线整理论文、数据集与 benchmark。"
      };
    }
    if (route.name === "catalog") {
      return { title: "词条库 · EAI Wiki", description: `浏览 ${ENTRIES.length} 个具身智能词条与 ${RESOURCES.length} 个数据集/基准，按 ${DOMAINS.length} 个领域和 ${TOTAL_ROUTES} 条技术路线组织。` };
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
    if (route.name === "graph") {
      return { title: "知识网络 · EAI Wiki", description: "以图的方式浏览导航、操作、移动操作、仿真器与数据评测五个领域及其技术路线。" };
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
    if (route.name === "catalog" || route.name === "domain" || route.name === "route" || route.name === "entry") active = "entries";
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
    else if (route.name === "graph") html = renderGraph();
    else if (route.name === "contribute") html = renderContribute();
    else html = renderNotFound(route);

    app.innerHTML = html;
    document.body.dataset.view = route.name;
    updateNav(route);
    updateMeta(routeMeta(route));
    hydrateRepoLinks();
    if (route.name === "entry") setupComments(route.entry);
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

