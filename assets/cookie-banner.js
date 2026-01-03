(function () {
  // Simple technical-cookie consent banner (no tracking)
  // Stores a single 1st-party cookie so the banner is not shown again.

  const KEY = "forgemotion_cookies_accepted_v1";
  const HIGH_Z = "2147483000"; // stay above any UI overlays

  function getCookie(name) {
    const pattern = "; " + document.cookie;
    const parts = pattern.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name +
      "=" +
      value +
      "; expires=" +
      d.toUTCString() +
      "; path=/; SameSite=Lax";
  }

  function hasConsent() {
    return getCookie(KEY) === "1";
  }

  function applyLangToLinks(banner) {
    // Best-effort: set correct Privacy Policy URL based on current path.
    const isPL = (location.pathname || "/").startsWith("/pl/");
    banner
      .querySelectorAll("[data-en-href][data-pl-href]")
      .forEach((a) => {
        a.setAttribute("href", isPL ? a.getAttribute("data-pl-href") : a.getAttribute("data-en-href"));
      });
  }

  function show(banner) {
    banner.style.zIndex = HIGH_Z;
    banner.style.pointerEvents = "auto";
    banner.classList.remove("hidden");
    banner.removeAttribute("aria-hidden");
    applyLangToLinks(banner);
  }

  function hide(banner) {
    banner.classList.add("hidden");
    banner.setAttribute("aria-hidden", "true");
  }

  function bind(banner) {
    const acceptBtn = banner.querySelector("#cookieAcceptBtn");
    const rejectBtn = banner.querySelector("#cookieRejectBtn");

    // Defensive: ensure banner stays clickable even if some overlay exists.
    banner.style.zIndex = HIGH_Z;
    banner.style.pointerEvents = "auto";
    if (acceptBtn) acceptBtn.style.pointerEvents = "auto";
    if (rejectBtn) rejectBtn.style.pointerEvents = "auto";

    if (acceptBtn) {
      acceptBtn.addEventListener(
        "click",
        () => {
          setCookie(KEY, "1", 180);
          hide(banner);
        },
        { capture: true }
      );
    }

    if (rejectBtn) {
      rejectBtn.addEventListener(
        "click",
        () => {
          // Still set a cookie to avoid showing the banner again (technical-only site).
          setCookie(KEY, "1", 180);
          hide(banner);
        },
        { capture: true }
      );
    }
  }

  function init() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;

    bind(banner);

    if (hasConsent()) {
      hide(banner);
      return;
    }

    show(banner);
  }

  // Run reliably whether the script is executed before or after DOMContentLoaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Fallback: in case the banner is injected late (e.g., header/footer async), retry once.
  setTimeout(init, 250);
})();
