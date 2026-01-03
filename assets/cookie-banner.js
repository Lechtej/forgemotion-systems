/* ForgeMotion Systems — cookie banner (v2.3.38)
   - Shows once per browser (localStorage)
   - Language derived from <html lang="">
*/
(function () {
  const KEY = "forgemotion_cookies_accepted_v1";
  const banner = document.getElementById("cookieBanner");
  const btn = document.getElementById("cookieAcceptBtn");

  if (!banner || !btn) return;

  const lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
  const isPL = lang.startsWith("pl");

  // Apply i18n for elements in banner only
  banner.querySelectorAll("[data-en][data-pl]").forEach((el) => {
    const txt = isPL ? el.getAttribute("data-pl") : el.getAttribute("data-en");
    if (txt) el.textContent = txt;
  });

  // Language-aware privacy link
  banner.querySelectorAll("[data-en-href][data-pl-href]").forEach((a) => {
    a.setAttribute("href", isPL ? a.getAttribute("data-pl-href") : a.getAttribute("data-en-href"));
  });

  function getCookie(name) {
    const escaped = name.replace(/[.$?*|{}()\[\]\\\/\+^]/g, "\\$&");
    const m = document.cookie.match(new RegExp("(?:^|; )" + escaped + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value) {
    // 365 days, Lax (works for a simple banner)
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }

  function hasConsent() {
    // Prefer localStorage, fallback to cookie
    try {
      if (localStorage.getItem(KEY)) return true;
    } catch (e) {
      /* ignore */
    }
    return getCookie(KEY) === "1";
  }

  if (!hasConsent()) {
    banner.classList.remove("hidden");
  }

  btn.addEventListener("click", function () {
    // Always hide immediately, even if storage is blocked.
    banner.classList.add("hidden");

    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {
      try { setCookie(KEY, "1"); } catch (e2) {}
    }
  });
})();
