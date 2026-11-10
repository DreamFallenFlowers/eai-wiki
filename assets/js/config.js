/**
 * EAI Wiki — deployment configuration
 * ------------------------------------------------------------------
 * 1. Publish this folder to a GitHub repository and enable GitHub Pages.
 * 2. The owner/repo is detected automatically on *.github.io pages.
 *    For a custom domain (or local production builds), fill in `repo`.
 * 3. To enable comments, follow GISCUS_SETUP.md and fill in the IDs below.
 */
window.EAI_CONFIG = {
  // Example: "your-name/eai-wiki". Leave empty for automatic github.io detection.
  repo: "",

  // Community links shown around the site.
  links: {
    discussions: "", // defaults to https://github.com/<repo>/discussions
    contributing: "CONTRIBUTING.md",
    license: "LICENSE"
  },

  // Giscus comments are powered by GitHub Discussions.
  // Both IDs are required; see GISCUS_SETUP.md for a 3-minute setup.
  comments: {
    provider: "giscus",
    repoId: "",
    category: "Announcements",
    categoryId: "",
    mapping: "specific",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "light",
    lang: "zh-CN"
  },

  // Content shown as the editorial date. Keep in sync with your last curation pass.
  version: "0.2",
  edition: "SEED EDITION",
  updated: "2026-11-11"
};
