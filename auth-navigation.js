/* Keep navigation account actions synchronized with Firebase sign-in state. */
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

function refreshAccountLinks(user) {
  document.querySelectorAll('a.kwa-login, a.account-nav-button, a[href="login.html"]').forEach(link => {
    if (link.closest('[aria-hidden="true"]')) return;
    if (!link.dataset.guestLabel) link.dataset.guestLabel = link.textContent.trim();
    if (user) {
      link.href = "settings.html";
      link.textContent = user.displayName || user.email?.split("@")[0] || "My Account";
      link.setAttribute("aria-label", "My Account and Settings");
    } else {
      link.href = "login.html";
      link.textContent = link.dataset.guestLabel;
      link.removeAttribute("aria-label");
    }
  });
}

onAuthStateChanged(auth, user => {
  refreshAccountLinks(user);
  document.documentElement.classList.toggle("kwa-signed-in", Boolean(user));
});
