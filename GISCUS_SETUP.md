# 评论区接入：Giscus + GitHub Discussions

EAI Wiki 的公开评论由 [Giscus](https://giscus.app/) 承载。它把评论存进仓库的 GitHub Discussions，因此：

- 不需要数据库或服务器。
- 每条评论都有 GitHub 身份与公开记录。
- 每个词条是一个独立 discussion，可订阅、可搜索。
- 站点保持纯静态，可直接部署在 GitHub Pages。

**在完成下面的步骤之前，线上词条页会显示「评论区还没有接入」，本地预览则使用仅本机可见的测试评论。**

---

## 前置条件

- 仓库已推送到 GitHub，且为公开仓库（Giscus 需要公开读取 Discussions）。
- 你拥有仓库的 admin 权限。
- 站点已经能从 GitHub Pages 访问。
- 已在 `assets/js/config.js` 中正确配置仓库地址（GitHub Pages 默认域名通常可自动推断）。

---

## 第 1 步：开启 Discussions

1. 打开仓库 **Settings → General**。
2. 找到 **Features**，勾选 **Discussions**。
3. 进入仓库的 **Discussions** 标签页，确认功能已开启。

---

## 第 2 步：安装 Giscus App

1. 打开 <https://github.com/apps/giscus>。
2. 点击 **Install**。
3. 选择 **Only select repositories**，选中 EAI Wiki 仓库。
4. 确认安装。

---

## 第 3 步：创建讨论分类

1. 进入仓库 **Discussions**。
2. 点击分类旁的设置 / 新建分类。
3. 创建一个 **Announcements** 类型的分类，建议命名为 `Announcements`。
4. 记下分类名称。

> 为什么用 Announcements：只有维护者能新建 discussion，Giscus 会通过 App 权限创建评论串，可以避免公开仓库被随意开新帖。若你希望社区成员也能发起 discussion，可以用 **Open** 类型，但 Giscus 的 `data-strict="0"` 仍会把评论映射到对应讨论。

---

## 第 4 步：获取 `repoId` 和 `categoryId`

### 方式 A：用 GitHub CLI（推荐）

```bash
gh api graphql -f query='
{
  repository(owner: "YOUR_NAME", name: "eai-wiki") {
    id
    discussionCategories(first: 20) {
      nodes {
        id
        name
        slug
      }
    }
  }
}'
```

你会得到：

```json
{
  "data": {
    "repository": {
      "id": "R_kgDO...",
      "discussionCategories": {
        "nodes": [
          { "id": "DIC_kwDO...", "name": "Announcements", "slug": "announcements" }
        ]
      }
    }
  }
}
```

- `repository.id` → `repoId`
- 对应分类的 `id` → `categoryId`

### 方式 B：用 GitHub GraphQL Explorer

1. 打开 <https://docs.github.com/en/graphql/overview/explorer>。
2. 授权后运行上面的同一条查询。
3. 复制两个 ID。

### 方式 C：用 giscus.app 的配置器

打开 <https://giscus.app/zh-CN>，输入仓库名，按页面提示选择 Discussions 分类。页面底部会自动生成包含 `data-repo-id` 与 `data-category-id` 的 `<script>` 代码。把这两个值抄到配置里即可。

---

## 第 5 步：填写 `assets/js/config.js`

```js
window.EAI_CONFIG = {
  repo: "", // 使用 *.github.io 默认域名可留空；自定义域名请填写 "owner/repo"

  comments: {
    provider: "giscus",
    repoId: "R_kgDO...",
    category: "Announcements",
    categoryId: "DIC_kwDO...",
    mapping: "specific",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "light",
    lang: "zh-CN"
  }
};
```

### 字段说明

| 字段 | 说明 |
| --- | --- |
| `repoId` | 仓库的 GraphQL node ID，以 `R_` 开头 |
| `categoryId` | Discussions 分类 ID，以 `DIC_` 开头 |
| `category` | 分类名称，必须与 GitHub 中的名称一致 |
| `mapping` | 设为 `specific`，由站点提供每个词条的独立 term |
| `strict` | `0` 表示 term 不存在时创建新讨论 |
| `theme` | 目前默认 `light`；也可改为 `preferred_color_scheme` 或自定义 CSS URL |
| `lang` | `zh-CN` |

站点的 `data-term` 会写成 `eai-wiki/entry/<entry-id>`，因此不同词条不会串评论。

---

## 第 6 步：测试

1. 推送修改，等待 GitHub Actions 部署完成。
2. 打开任意词条页，例如 `#/entry/openvla`。
3. 应该看到 GitHub 登录按钮与评论区。
4. 用测试账号发一条评论，确认：
   - 仓库 Discussions 中出现了对应标题的讨论；
   - 刷新后评论仍在；
   - 另一个词条不会显示这条评论；
   - 移动端 iframe 宽度正常。

---

## 常见问题

### 评论区显示「尚未接入」

- 检查 `repoId` 与 `categoryId` 是否为空。
- 检查是否还有 `your-` 占位符。
- 检查仓库地址是否推断正确：打开开发者工具，搜索 `data-repo` 属性。
- 若使用自定义域名，必须在 `config.js` 中显式填写 `repo`。

### 评论区加载了，但发评论时报错

- 确认 Giscus App 已安装到**这个仓库**。
- 确认 Discussions 已开启。
- 确认分类存在且类型允许 Giscus 创建讨论。
- 尝试把 `category` 改为分类的准确名称（区分大小写不严格，但建议一致）。

### 每条词条都指向同一个 discussion

- 检查 `mapping` 是否为 `specific`。
- 检查页面生成的 iframe `src` 中是否有 `term=eai-wiki%2Fentry%2F...`。
- 清除浏览器缓存后重试。

### 想换评论系统

站点的评论挂载逻辑在 `assets/js/app.js` 的 `setupComments()`。可以替换为 Utterances、Waline、Supabase 等，但需要同步更新本地预览提示与本文档。

---

## 审核与隐私

- 评论存放在公开的 GitHub Discussions，受 GitHub 服务条款约束。
- 建议在仓库 `Settings → Moderation` 中配置敏感词与互动限制。
- 评论者需登录 GitHub；站点不会收集访客的评论数据。
- 本地预览评论只保存在 `localStorage`，不会上传，也不能作为公开讨论使用。
