/*
  OPTIONAL COPY-DETERRENT SCRIPT for public preview chapters only.
  Add <script src="copy-deterrent.js" defer></script> before </body> on
  the novel preview pages, after uploading this file.

  IMPORTANT: This only discourages casual copying. It cannot prevent screenshots,
  browser developer tools, or retrieval of publicly delivered page source.
  Do not use this as a substitute for keeping paid chapters off public pages.
*/
(() => {
  "use strict";

  const reader = document.querySelector(".reader-content, .chapter-mount, #chapterMount");
  if (!reader) return;

  reader.addEventListener("contextmenu", (event) => {
    if (event.target.closest("input, textarea, [contenteditable='true']")) return;
    event.preventDefault();
  });

  reader.addEventListener("copy", (event) => {
    event.preventDefault();
  });

  reader.addEventListener("cut", (event) => {
    event.preventDefault();
  });

  // Limit text selection in the reader only; do not disable the whole website.
  reader.classList.add("copy-deterrent-enabled");
})();
