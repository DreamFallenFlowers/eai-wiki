# EAI Wiki · 具身智能开放知识库

一个可直接发布到 GitHub Pages 的具身智能 Wiki。它把领域地图、论文/系统/概念词条、阅读路径、知识网络、公开讨论和「不用写代码」的贡献表单放在同一个静态站点里。

- **9 个领域**：VLA、世界模型、策略学习、灵巧操作、导航移动、人形机器人、仿真与 Sim2Real、具身感知、数据与评测
- **27 个深度词条**：论文 / 系统 / 概念 / 数据集 / 基准
- **3 条阅读路径**：从入门到前沿，每条都可点击跳转
- **可搜索、可筛选、可收藏**：`Ctrl/Cmd + K` 全局搜索
- **公开评论**：通过 Giscus + GitHub Discussions（本地预览有仅本机可见的测试模式）
- **社区贡献**：站内表单生成 GitHub Issue；附带 Issue Forms、PR 模板和编辑规范
- **零构建、零依赖**：原生 HTML / CSS / JavaScript，推送即可部署

![EAI Wiki preview](docs/preview.png)

---

## 本地预览

```bash
# 任选一种：
node scripts/serve.mjs 4173
# 打开 http://127.0.0.1:4173

# 或
python -m http.server 4173
```

站点没有构建步骤。直接双击 `index.html` 也能打开大部分功能，但本地评论、剪贴板等能力在不同浏览器下可能受限，建议用本地服务器预览。

---

## 发布到 GitHub Pages

### 1. 创建仓库并推送

```bash
git init
git add .
git commit -m "chore: initial EAI Wiki"
git branch -M main
git remote add origin https://github.com/<your-name>/eai-wiki.git
git push -u origin main
```

> GitHub Pages 对公开仓库免费；私有仓库需要符合 GitHub 当前的 Pages 套餐要求。

### 2. 启用 Pages

在仓库 **Settings → Pages → Build and deployment** 中把 Source 设为 **GitHub Actions**。

仓库已包含 [`.github/workflows/pages.yml`](.github/workflows/pages.yml)，推送到 `main` 后会自动部署。站点地址通常为：

```text
https://<your-name>.github.io/eai-wiki/
```

如果仓库名本身就是 `<your-name>.github.io`，则地址为 `https://<your-name>.github.io/`。

部署完成后，建议把 `index.html` 中的 `og:image` 改成完整绝对地址（例如 `https://<your-name>.github.io/eai-wiki/assets/img/og-cover.png`），这样社交平台才能正确抓取分享封面。也可以顺手补上 `<link rel="canonical">` 与 `og:url`。

### 3. 配置仓库地址（通常不用改）

站点会自动从 `*.github.io` 地址推断 `owner/repo`，因此使用默认的 GitHub Pages 域名时，`assets/js/config.js` 里的 `repo` 可以留空。

只有以下情况需要手动填写：

```js
window.EAI_CONFIG = {
  repo: "your-name/eai-wiki",
  // ...
};
```

- 使用自定义域名
- 在非 GitHub Pages 环境下部署
- 自动推断结果不符合实际仓库

填写后，页头的 GitHub 链接、Issue 表单、编辑入口和 Discussions 链接都会自动指向该仓库。

### 4. 接入公开评论（推荐，约 3 分钟）

本地预览里的评论只保存在当前浏览器。要让所有访客共享讨论，需要配置 Giscus：

1. 开启仓库的 Discussions，并安装 [giscus GitHub App](https://github.com/apps/giscus)。
2. 创建一个 **Announcements** 类型的分类（推荐名 `Announcements`）。
3. 按 [`GISCUS_SETUP.md`](GISCUS_SETUP.md) 获取 `repoId` 与 `categoryId`。
4. 填入 `assets/js/config.js`：

```js
comments: {
  provider: "giscus",
  repoId: "R_kgDO...",
  category: "Announcements",
  categoryId: "DIC_kwDO...",
  mapping: "specific",
  // ...
}
```

完成后刷新词条页，评论区会自动挂载 GitHub Discussions。每个词条使用独立的 discussion term。

### 5. 可选：自定义域名

1. 在仓库 **Settings → Pages → Custom domain** 中填写域名。
2. GitHub 会在部署分支生成 `CNAME`；如果你使用 Actions 部署，请在仓库根目录手动添加 `CNAME` 文件，内容为你的域名。
3. 在 `assets/js/config.js` 中显式填写 `repo`。
4. 把 `index.html` 中的 `og:image` 改为完整绝对 URL，例如 `https://wiki.example.com/assets/img/og-cover.png`。

---

## 编辑内容

站点的全部内容在 [`assets/js/data.js`](assets/js/data.js)，分成四个部分：

| 导出 | 用途 |
| --- | --- |
| `DOMAINS` | 领域卡片、领域详情、知识网络节点、筛选器 |
| `ENTRIES` | 词条卡片、词条详情、搜索索引、阅读路径 |
| `PATHS` | 首页阅读路径与顺序 |
| `TYPE_LABELS` | 类型标签的中文显示 |

### 添加一个词条

在 `ENTRIES` 里追加：

```js
{
  id: "your-entry-id",              // 唯一，用于 URL：#/entry/your-entry-id
  domain: "vla",                    // 必须是 DOMAINS 中已有的 id
  type: "paper",                    // paper | system | concept | dataset | benchmark
  title: "Paper Name",
  subtitle: "一句中文副标题",
  year: 2026,
  venue: "CoRL 2026",
  org: "Lab / Company",
  authors: "First Author 等",
  featured: false,
  tags: ["关键词", "关键词"],
  tldr: "一到三句话，说清楚它做了什么、凭什么值得读。",
  why: "它在领域中的位置，改变了什么。",
  intro: ["第一段导读", "第二段导读"],
  method: [
    { title: "关键设计一", text: "两到三句解释。" }
  ],
  evidence: [
    { value: "数字或标签", label: "证据标题", text: "说明评测条件。" }
  ],
  limits: ["边界一", "边界二"],
  related: ["openvla", "pi0"],      // 必须是已有词条的 id
  links: [
    { label: "论文", url: "https://arxiv.org/abs/..." },
    { label: "代码", url: "https://github.com/..." }
  ]
}
```

Word count 不是目标。一个可靠的词条至少应该让读者回答：**它解决什么问题、核心机制是什么、证据是什么、哪里还不可靠**。

### 添加一个领域

在 `DOMAINS` 里追加，并在 `related` 中使用有效领域 id。领域会自动出现在首页 bento 网格、知识网络、筛选器和共建页面。若领域数量很大，建议同时调整首页布局与 `NODE_LABELS`。

### 修改阅读路径

编辑 `PATHS` 里的 `steps` 数组，按顺序放词条 id 即可。

### 更新版本与日期

`assets/js/config.js` 中的 `version`、`edition`、`updated` 会用于页脚、词条更新时间和共建路线图。发布前记得修改。

---

## 贡献与评论

- 站内「贡献一个词条」表单会生成一个**公开 GitHub Issue**。
- 仓库自带两个 Issue Forms：新词条、修订建议。
- 评论通过 Giscus 落到 GitHub Discussions；每个词条独立讨论串。
- 本地预览的评论存在 `localStorage`，明确标记为「仅本机可见」，不会假装成公开评论。
- 详细规范见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。

### 审核原则

1. **一手来源优先**：论文、官方项目页、代码、作者博客。
2. **区分事实与判断**：数字需带评测条件；判断需给依据。
3. **把边界写清楚**：失败模式、未验证假设和 demo 剪辑同样重要。
4. **AI 辅助必须披露**：不得编造引用、作者、数字或评测结论。
5. **可操作地讨论**：批评工作，不攻击作者。

---

## 项目结构

```text
eai-wiki/
├── index.html                    # 单页应用外壳 + 静态页头/页脚/弹窗
├── 404.html                      # 静态 404 回退
├── assets/
│   ├── css/styles.css            # 视觉系统、响应式布局、动效
│   ├── js/config.js              # 仓库地址、Giscus、版本
│   ├── js/data.js                # 领域、词条、路径
│   ├── js/app.js                 # 路由、搜索、筛选、图谱、表单、评论
│   └── img/                      # 图标与社交封面
├── .github/
│   ├── workflows/pages.yml       # GitHub Pages 自动部署
│   ├── ISSUE_TEMPLATE/           # 新词条 / 修订表单
│   └── pull_request_template.md
├── scripts/
│   ├── serve.mjs                 # 零依赖本地预览服务器
│   ├── validate-content.mjs      # 校验词条 id / 关联 / 必填字段
│   ├── check-links.mjs           # 检查所有论文与项目链接
│   └── og-template.html          # 可重新渲染的社交封面模板
├── docs/preview.png              # README 预览图
├── GISCUS_SETUP.md               # 评论区接入说明
├── CONTRIBUTING.md               # 编辑与贡献规范
├── LICENSE                       # 代码：MIT
└── LICENSE-CONTENT.md            # 文字：CC BY-SA 4.0
```

### 路由

| URL | 页面 |
| --- | --- |
| `#/` | 首页 |
| `#/entries` | 全部词条与筛选 |
| `#/domain/:domainId` | 领域详情 |
| `#/entry/:entryId` | 词条详情 |
| `#/graph` | 知识网络 |
| `#/contribute` | 共建指南 |

由于是 hash 路由，GitHub Pages 不需要额外的 rewrite 规则。

---

## 维护工具

不需要安装依赖：

```bash
# 检查词条 id、领域、related、阅读路径和必填字段
node scripts/validate-content.mjs

# 检查 data.js 中所有论文/项目链接是否可达（需要联网）
node scripts/check-links.mjs
```

修改 `scripts/og-template.html` 后，可以用任意 1200×630 视口截图覆盖 `assets/img/og-cover.png`。站点本身不依赖这个模板。

GitHub Actions 只部署站点运行所需文件（排除 `scripts/`、`docs/`、`.github/` 等），不会把测试资料发布到线上。

---

## 设计说明

- **印刷感 + 技术感**：暖纸色、宋体大标题、等宽字标签、细网格和工业橙强调色。
- **没有外部字体和图片依赖**：离线可用，首次加载快，不依赖 Google Fonts 或图床。
- **响应式**：桌面为 12 栏 bento，移动端重排为单列；知识图谱在小屏可横向滚动。
- **无障碍**：跳转链接、语义标题、键盘可搜索、可视 focus、`prefers-reduced-motion` 支持、原生 `<dialog>`。
- **明确的种子状态**：内容标注为 AI 辅助起草、等待领域编辑审校。不把 demo 当权威。

如需调整品牌色，修改 `assets/css/styles.css` 顶部的 `:root` 变量即可。领域色来自 `data.js` 中的 `accent` / `tint`。

---

## 内容准确性与免责声明

这是一个**种子版**知识库。词条由 AI 辅助起草，仍需领域编辑逐条核对。站点中的数字、年份、作者与机构信息可能在后续版本中修订。

**引用或做工程决策前，请回到原始论文、代码和官方文档核对。** 站点内容不构成安全、合规或部署建议。

发现错误请提交 Issue，或直接提 PR。

---

## License

- **代码**：MIT，见 [`LICENSE`](LICENSE)
- **文字内容**：CC BY-SA 4.0，见 [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md)
- **论文图表、第三方素材**：版权归原作者，本站未内嵌论文图片

EAI Wiki 是一个社区项目，与任何被收录论文的作者、机构或公司无隶属关系。
