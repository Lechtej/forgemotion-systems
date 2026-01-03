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

  try {
    if (!localStorage.getItem(KEY)) {
      banner.classList.remove("hidden");
    }
  } catch (e) {
    // If storage blocked, show banner but don't persist.
    banner.classList.remove("hidden");
  }

  btn.addEventListener("click", function () {
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    banner.classList.add("hidden");
  });
})();
