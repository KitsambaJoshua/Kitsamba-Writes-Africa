/*
  Reader-only deterrent against casual copying. This is not DRM: screenshots,
  developer tools, and publicly delivered HTML/source remain accessible.
  Keep paid chapters on a private, authenticated backend for real protection.
*/
(() => {
  "use strict";
  const selectors = ["#chapterMount", ".reader-content", ".chapter-mount", "article.chapter"];
  const attach = (reader) => {
    if (reader.dataset.copyDeterrentAttached === "true") return;
    reader.dataset.copyDeterrentAttached = "true";
    reader.classList.add("copy-deterrent-enabled");
    reader.addEventListener("contextmenu", (event) => {
      if (!event.target.closest("input, textarea, [contenteditable='true'], a, button")) event.preventDefault();
    });
    reader.addEventListener("copy", (event) => event.preventDefault());
    reader.addEventListener("cut", (event) => event.preventDefault());
  };
  const scan = (root=document) => selectors.forEach(selector => root.querySelectorAll(selector).forEach(attach));
  scan();
  const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === 1) { if (node.matches && selectors.some(selector => node.matches(selector))) attach(node); scan(node); }
  })));
  observer.observe(document.documentElement, {childList:true, subtree:true});
})();
