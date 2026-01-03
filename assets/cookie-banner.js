/* ForgeMotion Systems — cookie banner (v2.3.41)
   Robust:
   - Works even if banner HTML is missing (injects it)
   - Uses event delegation (button can be created later)
   - Stores consent in localStorage when available; falls back to a 365d cookie
   - Language derived from <html lang="">
*/
(function () {
  const KEY = "forgemotion_cookies_accepted_v1";

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, val) {
    try { window.localStorage.setItem(key, val); return true; } catch (e) { return false; }
  }

  function getCookie(name) {
    try {
      const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()\[\]\\\/\+^]/g, "\\$&") + "=([^;]*)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }
  function setCookie(name, value, days) {
    try {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
    } catch (e) {}
  }

  function isAccepted() {
    return storageGet(KEY) === "1" || getCookie(KEY) === "1";
  }

  function getLang() {
    return (document.documentElement.getAttribute("lang") || "en").toLowerCase();
  }

  function ensureBannerExists() {
    let banner = document.getElementById("cookieBanner");
    if (banner) return banner;

    // Minimal injection (keeps styling consistent with existing HTML)
    banner = document.createElement("div");
    banner.id = "cookieBanner";
    banner.className = "hidden fixed inset-x-0 bottom-0 p-4";
    banner.style.zIndex = "9999";
    banner.innerHTML = `
      <div class="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur px-5 py-4 text-white shadow-lg">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-sm text-white/80 leading-relaxed">
            <span data-en="We use cookies to ensure basic site functionality and to improve your experience. " data-pl="Używamy plików cookies, aby zapewnić podstawowe działanie strony i poprawić komfort korzystania. ">
              We use cookies to ensure basic site functionality and to improve your experience.
            </span>
            <a class="underline hover:text-white" href="/en/cookies.html" data-en="Learn more." data-pl="Dowiedz się więcej.">Learn more.</a>
          </div>
          <div class="flex gap-2 sm:justify-end">
            <button id="cookieAcceptBtn" type="button" class="rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90">
              <span data-en="Accept" data-pl="Akceptuję">Accept</span>
            </button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(banner);
    return banner;
  }

  function applyBannerI18n(banner) {
    const lang = getLang();
    const isPL = lang.startsWith("pl");
    banner.querySelectorAll("[data-en][data-pl]").forEach((el) => {
      el.textContent = isPL ? el.getAttribute("data-pl") : el.getAttribute("data-en");
    });

    // Update cookies info link for PL version
    const more = banner.querySelector('a[href="/en/cookies.html"]');
    if (more) more.setAttribute("href", isPL ? "/pl/cookies.html" : "/en/cookies.html");
  }

  function showBanner() {
    const banner = ensureBannerExists();
    applyBannerI18n(banner);
    banner.style.zIndex = "9999";
    banner.classList.remove("hidden");
  }

  function hideBanner() {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.classList.add("hidden");
  }

  function accept() {
    const ok = storageSet(KEY, "1");
    if (!ok) setCookie(KEY, "1", 365);
    else setCookie(KEY, "1", 365); // keep a cookie too (covers restricted storage modes)
    hideBanner();
  }

  function init() {
    if (isAccepted()) {
      hideBanner();
      return;
    }
    showBanner();
  }

  // Init when DOM is ready (covers non-defer inclusion)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Event delegation: works even if banner is injected later
  document.addEventListener("click", function (e) {
    const btn = e.target && e.target.closest ? e.target.closest("#cookieAcceptBtn") : null;
    if (!btn) return;
    e.preventDefault();
    accept();
  }, true);
})();