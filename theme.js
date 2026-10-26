(() => {
  const KEY = "kitsamba-writes-theme";
  const root = document.documentElement;
  const getSaved = () => {
    try { return localStorage.getItem(KEY) === "light" ? "light" : "dark"; }
    catch (_) { return "dark"; }
  };
  function apply(theme) {
    const light = theme === "light";
    root.classList.toggle("kw-light", light);
    root.classList.toggle("kw-dark", !light);
    root.dataset.kwTheme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = light ? "#fbf7ef" : "#090909";
    const button = document.getElementById("kw-theme-toggle");
    if (button) {
      button.innerHTML = light ? "☾ <span>Dark</span>" : "☼ <span>Light</span>";
      button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    }
    try { localStorage.setItem(KEY, theme); } catch (_) {}
  }
  document.documentElement.classList.add(getSaved() === "light" ? "kw-light" : "kw-dark");
  document.addEventListener("DOMContentLoaded", () => {
    apply(getSaved());
    const button = document.getElementById("kw-theme-toggle");
    if (button) button.addEventListener("click", () => apply(root.classList.contains("kw-light") ? "dark" : "light"));
  });
})();