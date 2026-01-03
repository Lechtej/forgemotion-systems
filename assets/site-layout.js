/* /assets/site-layout.js
   Shared layout + i18n + meta + mobile menu + image modal + VIDEO modal + demos from videos.json
   + scrollspy (index) + smooth anchor scroll + GitHub Pages friendly /en/ /pl/ routing
   + corporate-safe hardening: robust fetch (timeout), safe scrollspy fallback, optional video section auto-hide
*/
(function () {
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGS = ["en", "pl"];
  // SEO strategy: keep a single canonical URL without language parameters.
  // Language is handled purely client-side (JS), so we avoid adding ?lang=...
  // to canonicals or internal product links.
  const USE_LANG_PARAM = false;

  const PRODUCT_LINKS = [
    { key: "6dof", href: "/products-6dof.html", label: { en: "6DOF", pl: "6DOF" } },
    { key: "3dof", href: "/products-3dof.html", label: { en: "3DOF / 2DOF", pl: "3DOF / 2DOF" } },
    { key: "mk14", href: "/products-mk14.html", label: { en: "MK14", pl: "MK14" } },
    { key: "belt", href: "/products-belt-tensioner.html", label: { en: "Belt tensioner", pl: "Napinacz pasów" } },
    { key: "acc", href: "/products-accessories.html", label: { en: "Accessories", pl: "Akcesoria" } },
  ];

  const SCROLLSPY_SECTIONS = ["hero", "products", "about", "contact"];

  // ---- utils ----
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function stripTrailingSlash(pathname) {
    return String(pathname || "").replace(/\/+$/, "") || "/";
  }

  function getPathLang(pathname) {
    const p = stripTrailingSlash(pathname);
    if (p === "/pl" || p.startsWith("/pl/")) return "pl";
    if (p === "/en" || p.startsWith("/en/")) return "en";
    return null;
  }

  function isIndexLikePath(pathname) {
    const p = stripTrailingSlash(pathname);
    if (p === "/" || p === "/index.html") return true;
    if (p === "/en" || p === "/pl") return true;
    return false;
  }

  function langBasePath(lang) {
    const safe = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    return `/${safe}/`;
  }

  function buildIndexUrl(lang, hash = "") {
    const base = langBasePath(lang);
    const h = hash ? (String(hash).startsWith("#") ? hash : `#${hash}`) : "";
    return `${base}${h}`;
  }

  function setMetaTag(key, content, attr = "name") {
    let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content || "");
  }

  function setCanonical(href) {
    let tag = document.head.querySelector('link[rel="canonical"]');
    if (!tag) {
      tag = document.createElement("link");
      tag.rel = "canonical";
      document.head.appendChild(tag);
    }
    tag.href = href || "";
  }

  function buildCanonicalForCurrent(lang) {
    const origin = window.location.origin;
    const path = stripTrailingSlash(window.location.pathname);
    if (isIndexLikePath(path) || getPathLang(path)) return `${origin}${langBasePath(lang)}`;
    return `${origin}${window.location.pathname}`;
  }

  // ---- global styles ----
  function ensureGlobalStyles(includeModal, includeVideoModal) {
    if (document.getElementById("siteLayoutStyles")) return;

    const style = document.createElement("style");
    style.id = "siteLayoutStyles";
    style.textContent = `
      html { scroll-padding-top: 90px; scroll-behavior: smooth; }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

      .fade-in { opacity: 0; transform: translateY(16px); animation: fadeInUp .9s forwards; }
      @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

      .nav-active { color: rgb(96 165 250) !important; } /* blue-400 */

      /* Fix anchors under fixed header */
      #videos { scroll-margin-top: 110px; }

      ${includeModal ? `
      .modal-hidden { display: none; }
      .modal-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.72); z-index: 60;
        display:flex; align-items:center; justify-content:center; padding:1rem;
      }
      .modal-panel {
        width:min(1100px, 96vw); max-height:90vh;
        background: rgba(17,24,39,0.96);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:1rem; overflow:hidden;
        box-shadow:0 20px 70px rgba(0,0,0,0.5);
        position:relative;
      }
      .modal-close{
        position:absolute; top:10px; right:10px;
        background: rgba(255,255,255,0.12);
        border:1px solid rgba(255,255,255,0.18);
        border-radius:999px; width:40px; height:40px;
        display:inline-flex; align-items:center; justify-content:center;
        cursor:pointer;
        z-index: 2;
      }
      .modal-close:hover{ background: rgba(255,255,255,0.18); }
      .modal-img-wrap{ padding:.75rem; }
      .modal-img{
        width:100%; height:auto; max-height: calc(90vh - 1.5rem);
        object-fit: contain; border-radius:.75rem; display:block;
      }
      .modal-hint{
        padding: 0 .95rem .95rem .95rem;
      }
      .modal-nav{
        position:absolute; top:50%; transform:translateY(-50%);
        width:44px; height:44px; border-radius:999px;
        background: rgba(255,255,255,0.12);
        border:1px solid rgba(255,255,255,0.18);
        display:inline-flex; align-items:center; justify-content:center;
        cursor:pointer; z-index:2; user-select:none;
      }
      .modal-nav:hover{ background: rgba(255,255,255,0.18); }
      .modal-nav-prev{ left:10px; }
      .modal-nav-next{ right:10px; }
      @media (max-width: 640px){ .modal-nav{ display:none; } }
      .modal-hint{
        color: rgba(255,255,255,0.75);
        font-size:.95rem; text-align:center;
      }
      .sr-only{
        position:absolute; width:1px; height:1px; padding:0; margin:-1px;
        overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
      }` : ``}

      ${includeVideoModal ? `
      .vmodal-hidden { display:none; }
      .vmodal-overlay {
        position: fixed; inset:0; background: rgba(0,0,0,0.76); z-index: 70;
        display:flex; align-items:center; justify-content:center; padding:1rem;
      }
      .vmodal-panel{
        width:min(1200px, 96vw);
        background: rgba(17,24,39,0.98);
        border:1px solid rgba(255,255,255,0.10);
        border-radius:1rem;
        overflow:hidden;
        box-shadow:0 20px 70px rgba(0,0,0,0.55);
        position:relative;
      }
      .vmodal-body{ padding: .75rem; }
      .vmodal-video{
        width:100%;
        height:auto;
        max-height: 75vh;
        display:block;
        border-radius: .75rem;
        background:#000;
      }
      .vmodal-title{
        padding: .9rem 1rem .25rem 1rem;
        color: rgba(255,255,255,0.92);
        font-weight: 600;
        font-size: 1.05rem;
        text-align:center;
      }` : ``}
    `;
    document.head.appendChild(style);
  }

  // ---- layout ----
  function renderHeader(lang) {
    const heroHref = buildIndexUrl(lang, "hero");
    const productsHref = buildIndexUrl(lang, "products");
    const aboutHref = buildIndexUrl(lang, "about");
    const contactHref = buildIndexUrl(lang, "contact");
    const logoHref = productsHref;

    return `
<header class="bg-gray-800/90 backdrop-blur border-b border-white/5 fixed top-0 left-0 right-0 w-full z-50 shadow-md">
  <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
    <a href="${escapeHtml(logoHref)}" class="flex items-center" aria-label="Go to products">
      <img src="/logo.png" alt="ForgeMotion Systems logo"
        class="w-auto object-contain shrink-0 h-[clamp(34px,4.5vw,64px)]" loading="eager" />
    </a>

    <div class="hidden md:flex items-center gap-8">
      <nav aria-label="Primary navigation">
        <ul class="flex items-center gap-8">
          <li><a href="${escapeHtml(heroHref)}" class="site-nav-link hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1" data-en="Home" data-pl="Strona główna"></a></li>
          <li><a href="${escapeHtml(productsHref)}" class="site-nav-link hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1" data-en="Products" data-pl="Produkty"></a></li>
          <li><a href="${escapeHtml(aboutHref)}" class="site-nav-link hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1" data-en="About" data-pl="O nas"></a></li>
          <li><a href="${escapeHtml(contactHref)}" class="site-nav-link hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1" data-en="Contact" data-pl="Kontakt"></a></li>
        </ul>
      </nav>

      <div class="flex items-center gap-2 text-sm">
        <button type="button" data-lang="en" class="lang-btn hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1">EN</button>
        <span class="text-gray-400">|</span>
        <button type="button" data-lang="pl" class="lang-btn hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1">PL</button>
      </div>
    </div>

    <div class="flex md:hidden items-center gap-3">
      <div class="flex items-center gap-2 text-sm">
        <button type="button" data-lang="en" class="lang-btn hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1">EN</button>
        <span class="text-gray-400">|</span>
        <button type="button" data-lang="pl" class="lang-btn hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded px-1">PL</button>
      </div>

      <button id="mobileMenuBtn" type="button"
        class="inline-flex items-center justify-center rounded p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
        aria-controls="mobileMenu" aria-expanded="false" aria-label="Open menu">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>

  <div id="mobileMenu" class="md:hidden hidden border-t border-white/5 bg-gray-800/95 backdrop-blur">
    <nav class="container mx-auto px-4 py-3" aria-label="Mobile navigation">
      <ul class="flex flex-col gap-2">
        <li><a href="${escapeHtml(heroHref)}" class="site-nav-link mobile-link block rounded px-3 py-2 hover:bg-white/10 hover:text-blue-400" data-en="Home" data-pl="Strona główna"></a></li>
        <li><a href="${escapeHtml(productsHref)}" class="site-nav-link mobile-link block rounded px-3 py-2 hover:bg-white/10 hover:text-blue-400" data-en="Products" data-pl="Produkty"></a></li>
        <li><a href="${escapeHtml(aboutHref)}" class="site-nav-link mobile-link block rounded px-3 py-2 hover:bg-white/10 hover:text-blue-400" data-en="About" data-pl="O nas"></a></li>
        <li><a href="${escapeHtml(contactHref)}" class="site-nav-link mobile-link block rounded px-3 py-2 hover:bg-white/10 hover:text-blue-400" data-en="Contact" data-pl="Kontakt"></a></li>
      </ul>
    </nav>
  </div>
</header>`;
  }

  function renderFooter(lang) {
    const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    const termsHref = safeLang === "pl"
      ? "/legal/terms-and-conditions-pl.html"
      : "/legal/terms-and-conditions-en.html";

    // NOTE: Links are absolute (start with /) to work on GitHub Pages and in local Live Server.
    return `
<footer class="bg-gray-900 border-t border-white/5">
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      <!-- Brand / intro -->
      <div>
        <a href="${escapeHtml(buildIndexUrl(safeLang, "products"))}" class="inline-flex items-center gap-3" aria-label="ForgeMotion Systems">
          <img src="/logo.png" alt="ForgeMotion Systems" class="h-10 w-auto object-contain" loading="lazy" />
        </a>
        <p class="mt-4 text-sm text-white/70" data-en="Professional motion platforms for racing and flight simulators."
           data-pl="Profesjonalne platformy ruchu do symulatorów wyścigowych i lotniczych."></p>
      </div>

      <!-- Products -->
      <div>
        <h3 class="text-sm font-semibold tracking-wide text-white" data-en="Products" data-pl="Produkty"></h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><a class="text-white/70 hover:text-white transition" href="/products-6dof.html">6DOF</a></li>
          <li><a class="text-white/70 hover:text-white transition" href="/products-3dof.html">3DOF / 2DOF</a></li>
          <li><a class="text-white/70 hover:text-white transition" href="/products-mk14.html">MK14</a></li>
          <li><a class="text-white/70 hover:text-white transition" href="/products-belt-tensioner.html" data-en="Belt tensioner" data-pl="Napinacz pasów"></a></li>
          <li><a class="text-white/70 hover:text-white transition" href="/products-accessories.html" data-en="Accessories" data-pl="Akcesoria"></a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="text-sm font-semibold tracking-wide text-white" data-en="Company" data-pl="Firma"></h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><a class="text-white/70 hover:text-white transition" href="${escapeHtml(buildIndexUrl(safeLang, "about"))}" data-en="About" data-pl="O nas"></a></li>
          <li><a class="text-white/70 hover:text-white transition" href="${escapeHtml(`/partners.html?lang=${safeLang}`)}" data-en="Partners" data-pl="Partnerzy"></a></li>
          <li><a class="text-white/70 hover:text-white transition" href="${escapeHtml(buildIndexUrl(safeLang, "products"))}" data-en="Product overview" data-pl="Przegląd produktów"></a></li>
        </ul>
      </div>

      <!-- Legal / contact -->
      <div>
        <h3 class="text-sm font-semibold tracking-wide text-white" data-en="Legal" data-pl="Formalności"></h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li>
            <a class="text-white/70 hover:text-white transition" href="${escapeHtml(termsHref)}"
               data-en="Terms & Conditions" data-pl="Regulamin"></a>
          </li>
          <li>
            <a class="text-white/70 hover:text-white transition" href="/assets/privacy.html"
               data-en="Privacy policy" data-pl="Polityka prywatności"></a>
          </li>
        </ul>

        <div class="mt-6 text-sm">
          <div class="text-white font-semibold" data-en="Contact" data-pl="Kontakt"></div>
          <a class="mt-2 inline-block text-white/70 hover:text-white transition" href="${escapeHtml(buildIndexUrl(safeLang, "lead"))}"
             data-en="Go to contact form" data-pl="Przejdź do formularza kontaktowego"></a>
        </div>

    </div>

    <div class="mt-10 border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
      <div class="text-xs text-white/55">© 2025 ForgeMotion Systems</div>
      <div class="text-xs text-white/55 flex items-center gap-4">
        <a class="hover:text-white transition" href="${escapeHtml(termsHref)}" data-en="Terms" data-pl="Regulamin"></a>
        <a class="hover:text-white transition" href="/assets/privacy.html" data-en="Privacy" data-pl="Prywatność"></a>
      </div>
    </div>
  </div>
</footer>`;
  }

  function renderModal() {
    return `
<div id="imgModal" class="modal-hidden" aria-hidden="true">
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="imgModalTitle">
    <div class="modal-panel">
      <button id="imgModalPrev" class="modal-nav modal-nav-prev" type="button" aria-label="Previous image">‹</button>
      <button id="imgModalNext" class="modal-nav modal-nav-next" type="button" aria-label="Next image">›</button>
      <button id="imgModalClose" class="modal-close" type="button" aria-label="Close image">
        <span aria-hidden="true">✕</span>
      </button>
      <h2 id="imgModalTitle" class="sr-only">Image preview</h2>
      <div class="modal-img-wrap"><img id="imgModalImg" class="modal-img" src="" alt=""></div>
      <div class="modal-hint" data-en="Tip: click outside the image or press ESC to close."
           data-pl="Wskazówka: kliknij poza zdjęciem lub naciśnij ESC, aby zamknąć."></div>
    </div>
  </div>
</div>`;
  }

  function renderVideoModal() {
    return `
<div id="vidModal" class="vmodal-hidden" aria-hidden="true">
  <div class="vmodal-overlay" role="dialog" aria-modal="true" aria-labelledby="vidModalTitle">
    <div class="vmodal-panel">
      <button id="vidModalClose" class="modal-close" type="button" aria-label="Close video">
        <span aria-hidden="true">✕</span>
      </button>
      <h2 id="vidModalTitle" class="vmodal-title">Video</h2>
      <div class="vmodal-body">
        <video id="vidModalEl" class="vmodal-video" controls playsinline preload="metadata">
          <source id="vidModalSource" src="" type="video/mp4">
        </video>
      </div>
      <div class="modal-hint" data-en="Tip: click outside the media or press ESC to close."
           data-pl="Wskazówka: kliknij poza materiałem lub naciśnij ESC, aby zamknąć."></div>
    </div>
  </div>
</div>`;
  }

  function renderOtherProducts(activeKey, lang) {
    const items = PRODUCT_LINKS
      .filter(p => p.key !== activeKey)
      .map(p => {
        const label = p.label?.[lang] || p.label?.en || p.key;
        return `<a class="bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded font-semibold" href="${escapeHtml(p.href)}">${escapeHtml(label)}</a>`;
      })
      .join("");

    return `
<section class="container mx-auto px-4 pb-16">
  <div class="max-w-5xl mx-auto">
    <div class="bg-gray-800/60 border border-white/5 rounded-2xl p-8">
    <h2 class="text-2xl font-bold mb-5" data-en="Other products" data-pl="Pozostałe produkty"></h2>
    <div class="flex flex-wrap gap-3">${items}</div>
    </div>
  </div>
</section>`;
  }

  function injectLayout({ includeModal, includeVideoModal, lang }) {
    const headerSlot = document.getElementById("siteHeader");
    const headerHtml = renderHeader(lang);
    if (headerSlot) headerSlot.innerHTML = headerHtml;
    else document.body.insertAdjacentHTML("afterbegin", headerHtml);

    const footerSlot = document.getElementById("siteFooter");
    if (footerSlot) footerSlot.innerHTML = renderFooter(lang);
    else document.body.insertAdjacentHTML("beforeend", renderFooter(lang));

    const modalSlot = document.getElementById("siteModal");

    if (includeModal) {
      const html = renderModal();
      if (modalSlot) modalSlot.insertAdjacentHTML("beforeend", html);
      else document.body.insertAdjacentHTML("beforeend", html);
    }
    if (includeVideoModal) {
      const html = renderVideoModal();
      if (modalSlot) modalSlot.insertAdjacentHTML("beforeend", html);
      else document.body.insertAdjacentHTML("beforeend", html);
    }
  }

  // ---- i18n + SEO ----
  function applyTexts(lang) {
    const nodes = Array.from(document.querySelectorAll("[data-en]"));
    for (const el of nodes) {
      const val = el.dataset[lang];
      if (typeof val === "string") el.textContent = val;
    }
  }
  function withLangParam(url, lang) {
    if (!USE_LANG_PARAM) return url;
    if (!url) return url;
    if (!isProductPagePath(window.location.pathname)) return url;
    if (getPathLang(window.location.pathname)) return url;

    try {
      const u = new URL(url, window.location.origin);
      u.searchParams.set("lang", lang);
      return u.toString();
    } catch (_) {
      // fallback for relative URLs
      if (url.includes("?")) return url + "&lang=" + lang;
      return url + "?lang=" + lang;
    }
  }


  function updateMetaTags(lang, metaData) {
    const data = metaData?.[lang] || metaData?.[DEFAULT_LANG] || null;

    if (data?.title) document.title = data.title;

    setMetaTag("description", data?.description || "", "name");
    setMetaTag("keywords", data?.keywords || "", "name");
    setMetaTag("author", data?.author || "ForgeMotion Systems", "name");

    const canonicalBase = (data?.canonical && String(data.canonical).trim())
      ? data.canonical
      : buildCanonicalForCurrent(lang);

    const canonical = withLangParam(canonicalBase, lang);
    setCanonical(canonical);

    setMetaTag("og:title", data?.ogTitle || data?.title || "", "property");
    setMetaTag("og:description", data?.ogDescription || data?.description || "", "property");
    setMetaTag("og:image", data?.ogImage || "", "property");
    setMetaTag("og:url", canonical || "", "property");
    setMetaTag("og:type", "website", "property");

    setMetaTag("twitter:title", data?.twitterTitle || data?.title || "", "name");
    setMetaTag("twitter:description", data?.twitterDescription || data?.description || "", "name");
    setMetaTag("twitter:image", data?.twitterImage || "", "name");
    setMetaTag("twitter:card", "summary_large_image", "name");
  }

  
  function getQueryLang() {
    try {
      const q = new URLSearchParams(window.location.search);
      const v = (q.get("lang") || "").toLowerCase();
      return SUPPORTED_LANGS.includes(v) ? v : null;
    } catch (_) {
      return null;
    }
  }

  function isProductPagePath(pathname) {
    return /\/products-[^\/]+\.html$/i.test(pathname);
  }

  function setLangQueryParam(lang) {
    if (!USE_LANG_PARAM) return;
    // Only for pages that are not under /en or /pl (i.e., product pages in root)
    if (getPathLang(window.location.pathname)) return;
    if (!isProductPagePath(window.location.pathname)) return;

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      // Keep other params (if any)
      window.history.replaceState({}, "", url.toString());
    } catch (_) {}
  }

  function rewriteProductLinks(lang) {
    if (!USE_LANG_PARAM) return;
    if (!isProductPagePath(window.location.pathname)) return;

    const anchors = Array.from(document.querySelectorAll("a[href]"));
    for (const a of anchors) {
      const raw = a.getAttribute("href");
      if (!raw) continue;

      const trimmed = raw.trim();
      // skip external
      if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) continue;

      // product page links
      const m = trimmed.match(/^(products-[^#?]+\.html)([#].+)?$/i);
      if (m) {
        const file = m[1];
        const hash = m[2] || "";
        a.setAttribute("href", `${file}?lang=${lang}${hash}`);
        continue;
      }
    }
  }

function detectLang() {
    const fromPath = getPathLang(window.location.pathname);
    if (fromPath) return fromPath;

    const stored = localStorage.getItem("lang");
    if (SUPPORTED_LANGS.includes(stored)) return stored;

    return DEFAULT_LANG;
  }

  function rewriteIndexAnchors(lang) {
    const safe = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

    const anchors = Array.from(document.querySelectorAll("a[href]"));
    for (const a of anchors) {
      const raw = a.getAttribute("href");
      if (!raw) continue;

      const trimmed = raw.trim();

      if (trimmed.startsWith("#") && isIndexLikePath(window.location.pathname)) continue;

      const m1 = trimmed.match(/^(\/?index\.html)(#.+)?$/i);
      if (m1) {
        const hash = m1[2] || "";
        a.setAttribute("href", `${langBasePath(safe)}${hash}`);
        continue;
      }

      const m2 = trimmed.match(/^\/#(.+)$/);
      if (m2) {
        a.setAttribute("href", buildIndexUrl(safe, `#${m2[1]}`));
        continue;
      }

      const m3 = trimmed.match(/^#(.+)$/);
      if (m3 && !isIndexLikePath(window.location.pathname) && !getPathLang(window.location.pathname)) {
        a.setAttribute("href", buildIndexUrl(safe, `#${m3[1]}`));
        continue;
      }
    }
  }

  
  function rewriteLangHrefs(lang) {
    // Elements can declare language-specific hrefs to avoid hardcoding /en/ or /pl/ in HTML.
    document.querySelectorAll("[data-href-en][data-href-pl]").forEach((a) => {
      const href = a.getAttribute(lang === "pl" ? "data-href-pl" : "data-href-en");
      if (href) a.setAttribute("href", href);
    });
  }

function setLanguage(lang, metaData) {
    const safe = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

    localStorage.setItem("lang", safe);
    document.documentElement.lang = safe;

    applyTexts(safe);
    updateMetaTags(safe, metaData);
    rewriteIndexAnchors(safe)
    rewriteProductLinks(safe);
    setLangQueryParam(safe);;
    rewriteLangHrefs(safe);

    document.querySelectorAll("[data-lang]").forEach(btn => {
      const isActive = btn.getAttribute("data-lang") === safe;
      btn.classList.toggle("nav-active", isActive);
    });

    return safe;
  }

  // ---- mobile menu ----
  function isMobileMenuOpen() {
    const menu = document.getElementById("mobileMenu");
    return menu ? !menu.classList.contains("hidden") : false;
  }

  function closeMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;
    menu.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  }

  function bindMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const open = !menu.classList.contains("hidden");
      if (open) closeMobileMenu();
      else {
        menu.classList.remove("hidden");
        btn.setAttribute("aria-expanded", "true");
      }
    });

    document.querySelectorAll(".mobile-link").forEach(a => a.addEventListener("click", closeMobileMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMobileMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth >= 768) closeMobileMenu(); });
  }

  // ---- image modal ----
  function bindModal() {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalImg");
    const closeBtn = document.getElementById("imgModalClose");
    const prevBtn = document.getElementById("imgModalPrev");
    const nextBtn = document.getElementById("imgModalNext");
    if (!modal || !modalImg || !closeBtn) return;

    let currentKey = null;
    let currentIndex = 0;

    function getList() {
      const key = currentKey;
      const list = (window.ProductGalleries && key && Array.isArray(window.ProductGalleries[key]))
        ? window.ProductGalleries[key]
        : null;
      return list;
    }

    function applyIndex(i) {
      const list = getList();
      if (!list || !list.length) return;

      const safe = (i + list.length) % list.length;
      currentIndex = safe;
      const item = list[safe] || {};
      const full = item.full || item.jpg || item.webp || "";
      modalImg.src = full;
      const isPl = document.documentElement.lang === "pl";
      modalImg.alt = isPl ? (item.altPl || "Podgląd zdjęcia") : (item.altEn || "Image preview");

      if (prevBtn) prevBtn.disabled = list.length < 2;
      if (nextBtn) nextBtn.disabled = list.length < 2;
    }

    function openModalFromImg(img) {
      const full = img.getAttribute("data-full") || img.getAttribute("src") || "";
      currentKey = img.getAttribute("data-gallery-key") || null;
      const idxAttr = img.getAttribute("data-gallery-index");
      currentIndex = idxAttr != null ? Number(idxAttr) || 0 : 0;

      // If we have a gallery list, use it; otherwise fallback to clicked image
      const list = getList();
      if (list && list.length) applyIndex(currentIndex);
      else {
        modalImg.src = full;
        modalImg.alt = img.getAttribute("alt") || "Image preview";
      }

      modal.classList.remove("modal-hidden");
      modal.setAttribute("aria-hidden", "false");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.add("modal-hidden");
      modal.setAttribute("aria-hidden", "true");
      modalImg.src = "";
      modalImg.alt = "";
      document.body.style.overflow = "";
      currentKey = null;
      currentIndex = 0;
    }

    function next() {
      const list = getList();
      if (!list || list.length < 2) return;
      applyIndex(currentIndex + 1);
    }

    function prev() {
      const list = getList();
      if (!list || list.length < 2) return;
      applyIndex(currentIndex - 1);
    }

    document.addEventListener("click", (e) => {
      const img = e.target.closest('img[data-full]');
      if (!img) return;
      openModalFromImg(img);
    });

    closeBtn.addEventListener("click", closeModal);
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) closeModal();
    });

    // keyboard
    document.addEventListener("keydown", (e) => {
      if (modal.getAttribute("aria-hidden") !== "false") return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    // touch swipe (simple)
    let touchX = null;
    modalImg.addEventListener("touchstart", (e) => {
      const t = e.touches && e.touches[0];
      touchX = t ? t.clientX : null;
    }, { passive: true });

    modalImg.addEventListener("touchend", (e) => {
      if (touchX == null) return;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 45) return;
      if (dx < 0) next();
      else prev();
    }, { passive: true });
  }

  // ---- video modal ----
  function bindVideoModal() {
    const modal = document.getElementById("vidModal");
    const video = document.getElementById("vidModalEl");
    const source = document.getElementById("vidModalSource");
    const title = document.getElementById("vidModalTitle");
    const closeBtn = document.getElementById("vidModalClose");
    if (!modal || !video || !source || !title || !closeBtn) return;

    function openVideo({ src, poster, titleText }) {
      title.textContent = titleText || "Video";
      source.src = src;
      video.poster = poster || "";
      video.autoplay = false;
      try { video.pause(); } catch {}
      video.load();

      modal.classList.remove("vmodal-hidden");
      modal.setAttribute("aria-hidden", "false");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function closeVideo() {
      try { video.pause(); } catch {}
      modal.classList.add("vmodal-hidden");
      modal.setAttribute("aria-hidden", "true");
      source.src = "";
      video.poster = "";
      video.load();
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeVideo);
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("vmodal-overlay")) closeVideo();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeVideo();
    });

    return { openVideo, closeVideo };
  }

  // ---- smooth scroll ----
  function bindSmoothAnchorScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      let url;
      try { url = new URL(href, window.location.href); }
      catch { return; }

      if (url.origin !== window.location.origin) return;

      const samePath = (stripTrailingSlash(url.pathname) === stripTrailingSlash(window.location.pathname));
      if (!samePath) return;

      const id = (url.hash || "").replace("#", "");
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);

      if (isMobileMenuOpen()) closeMobileMenu();
    });
  }

  // ---- scrollspy ----
  function bindScrollSpyFallback(links) {
    const ids = SCROLLSPY_SECTIONS.slice();

    function hrefToId(href) {
      try {
        const u = new URL(href, window.location.origin);
        return (u.hash || "").replace("#", "");
      } catch {
        const idx = String(href).indexOf("#");
        return idx >= 0 ? String(href).slice(idx + 1) : "";
      }
    }

    function setActive(id) {
      for (const a of links) {
        const isMatch = hrefToId(a.getAttribute("href")) === id;
        a.classList.toggle("nav-active", isMatch);
        if (isMatch) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      }
    }

    function pickActive() {
      let bestId = "hero";
      let bestTop = Number.POSITIVE_INFINITY;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const top = Math.abs(r.top - 110);
        if (top < bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      setActive(bestId);
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        pickActive();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener("hashchange", () => {
      const id = (window.location.hash || "").replace("#", "");
      if (ids.includes(id)) setActive(id);
    });

    pickActive();
  }

  function bindScrollSpy() {
    const sectionEls = SCROLLSPY_SECTIONS.map(id => document.getElementById(id)).filter(Boolean);
    if (sectionEls.length < 2) return;

    const links = Array.from(document.querySelectorAll('a.site-nav-link[href*="#"]'));
    if (!links.length) return;

    const hrefToId = (href) => {
      try {
        const u = new URL(href, window.location.origin);
        return (u.hash || "").replace("#", "");
      } catch {
        const idx = String(href).indexOf("#");
        return idx >= 0 ? String(href).slice(idx + 1) : "";
      }
    };

    function setActive(id) {
      for (const a of links) {
        const isMatch = hrefToId(a.getAttribute("href")) === id;
        a.classList.toggle("nav-active", isMatch);
        if (isMatch) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      }
    }

    const initialHash = (window.location.hash || "").replace("#", "");
    if (SCROLLSPY_SECTIONS.includes(initialHash)) setActive(initialHash);
    else setActive("hero");

    try {
      if (!("IntersectionObserver" in window)) {
        bindScrollSpyFallback(links);
        return;
      }

      const obs = new IntersectionObserver((entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      }, {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8]
      });

      sectionEls.forEach(el => obs.observe(el));

      window.addEventListener("hashchange", () => {
        const id = (window.location.hash || "").replace("#", "");
        if (SCROLLSPY_SECTIONS.includes(id)) setActive(id);
      });

    } catch {
      bindScrollSpyFallback(links);
    }
  }

  // ---- lang buttons ----
  
  function mapLegalLangPath(path, targetLang) {
    // Keep user within the same legal document when switching language.
    // Supports: /pl/privacy.html <-> /en/privacy.html and terms-and-conditions-*-*.html
    const p = stripTrailingSlash(path);

    // Privacy pages
    if (p === "/pl/privacy.html" && targetLang === "en") return "/en/privacy.html";
    if (p === "/en/privacy.html" && targetLang === "pl") return "/pl/privacy.html";

    // Terms & Conditions pages (in /legal/)
    if (p === "/legal/terms-and-conditions-pl.html" && targetLang === "en") return "/legal/terms-and-conditions-en.html";
    if (p === "/legal/terms-and-conditions-en.html" && targetLang === "pl") return "/legal/terms-and-conditions-pl.html";

    return null;
  }

function bindLangButtons(metaData) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;

      const targetLang = btn.getAttribute("data-lang");
      if (!SUPPORTED_LANGS.includes(targetLang)) return;

      const path = stripTrailingSlash(window.location.pathname);
      const hash = window.location.hash || "";

      const mapped = mapLegalLangPath(path, targetLang);
      if (mapped) {
        localStorage.setItem("lang", targetLang);
        window.location.href = mapped + (hash || "");
        return;
      }

      if (isIndexLikePath(path) || getPathLang(path)) {
        localStorage.setItem("lang", targetLang);
        window.location.href = buildIndexUrl(targetLang, hash);
        return;
      }

      const wasMobileOpen = isMobileMenuOpen();
      setLanguage(targetLang, metaData);
      if (wasMobileOpen) closeMobileMenu();
    });
  }

  // -------- VIDEO DEMOS --------
  async function fetchVideosJson({ timeoutMs = 3500 } = {}) {
    const controller = new AbortController();
    const t = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch("/videos/videos.json", { cache: "no-store", signal: controller.signal });
      if (!res.ok) throw new Error("videos.json not found");
      return await res.json();
    } finally {
      window.clearTimeout(t);
    }
  }

  function normalizeVideos(json) {
    if (!json) return {};
    if (Array.isArray(json.videos)) {
      const out = {};
      for (const v of json.videos) {
        if (!v || !v.key) continue;
        (out[v.key] ||= []).push(v);
      }
      return out;
    }
    return json;
  }

  // ✅ Title picker: supports:
  // - title: {en,pl} or title: "..."
  // - legacy: title_en / title_pl
  function pickTitle(v, lang) {
    if (!v) return "";
    if (typeof v.title === "string") return v.title;
    if (v.title && typeof v.title === "object") return v.title[lang] || v.title.en || v.title.pl || "";
    if (lang === "pl" && typeof v.title_pl === "string") return v.title_pl;
    if (lang === "en" && typeof v.title_en === "string") return v.title_en;
    if (typeof v.title_en === "string") return v.title_en;
    if (typeof v.title_pl === "string") return v.title_pl;
    return "";
  }

  // ✅ Description picker: supports:
  // - desc: {en,pl} or desc: "..."
  // - legacy: desc_en / desc_pl
  function pickDesc(v, lang) {
    if (!v) return "";
    if (typeof v.desc === "string") return v.desc;
    if (v.desc && typeof v.desc === "object") return v.desc[lang] || v.desc.en || v.desc.pl || "";
    if (lang === "pl" && typeof v.desc_pl === "string") return v.desc_pl;
    if (lang === "en" && typeof v.desc_en === "string") return v.desc_en;
    if (typeof v.desc_en === "string") return v.desc_en;
    if (typeof v.desc_pl === "string") return v.desc_pl;
    return "";
  }

  function setDemoButtonsState(map, lang) {
    document.querySelectorAll("[data-demo-key]").forEach(btn => {
      const key = btn.getAttribute("data-demo-key");
      const has = Boolean(map?.[key]?.length);
      btn.disabled = !has;
      btn.classList.toggle("opacity-50", !has);
      btn.classList.toggle("cursor-not-allowed", !has);
      btn.setAttribute("aria-disabled", String(!has));
      btn.title = has ? "" : (lang === "pl" ? "Demo w przygotowaniu" : "Demo coming soon");
    });
  }

  function bindDemoButtons(openVideo, map, lang) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-demo-key]");
      if (!btn) return;

      const key = btn.getAttribute("data-demo-key");
      const item = map?.[key]?.[0];
      if (!item?.src) return;

      openVideo({
        src: item.src,
        poster: item.poster || "",
        titleText: pickTitle(item, lang) || (key.toUpperCase() + " demo")
      });
    });
  }

  function bindHeroFullscreenButton(openVideo, map, lang) {
    const btn = document.getElementById("openHeroVideoModal");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const item = map?.["6dof"]?.[0];
      if (!item?.src) return;

      openVideo({
        src: item.src,
        poster: item.poster || "",
        titleText: pickTitle(item, lang) || "6DOF demo"
      });
    });
  }

  function hydrateHeroVideo(map, lang) {
    const video = document.getElementById("heroVideoEl");
    const source = document.getElementById("heroVideoSource");
    const title = document.getElementById("heroVideoTitle");
    if (!video || !source || !title) return;

    const item = map?.["6dof"]?.[0];
    if (!item?.src) return;

    source.src = item.src;
    video.poster = item.poster || "";
    video.autoplay = false;
    try { video.pause(); } catch {}
    video.load();

    title.textContent = pickTitle(item, lang) || "6DOF demo #1";
  }

  // More demos: find the right-side card robustly
  function findMoreDemosCard() {
    const videosSection = document.getElementById("videos");
    if (!videosSection) return null;

    // Primary: heading has these attributes in your HTML
    const h = videosSection.querySelector('[data-en="More demos"]');
    if (h) {
      const card = h.closest(".rounded-2xl");
      if (card) return card;
    }

    // Fallback: find by visible text (after translation)
    const headings = Array.from(videosSection.querySelectorAll("h3"));
    const target = headings.find(x => {
      const t = (x.textContent || "").trim().toLowerCase();
      return t === "more demos" || t === "więcej demo" || t === "more movies" || t === "więcej filmów";
    });
    if (target) return target.closest(".rounded-2xl");

    return null;
  }

  function setMoreDemosHeading(card, lang) {
    if (!card) return;
    const h = card.querySelector("h3");
    if (!h) return;

    // Force new wording regardless of HTML
    const en = "More movies";
    const pl = "Więcej filmów";
    h.dataset.en = en;
    h.dataset.pl = pl;
    h.textContent = (lang === "pl") ? pl : en;
  }

  function buildExtrasListCards(extras, lang) {
    const wrap = document.createElement("div");
    wrap.className = "space-y-3";

    extras.forEach((v, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "w-full text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 transition flex gap-3 items-center";
      btn.setAttribute("data-extra-idx", String(idx));

      const title = (v.titleText || "").trim();
      const desc = (v.descText || "").trim();
      const safeTitle = title || ((lang === "pl") ? `Film #${idx + 1}` : `Movie #${idx + 1}`);

      const posterHtml = v.poster
        ? `<img src="${escapeHtml(v.poster)}" alt="" class="w-20 h-14 object-cover rounded-lg bg-black/40 shrink-0" loading="lazy" decoding="async">`
        : `<div class="w-20 h-14 rounded-lg bg-black/40 border border-white/10 shrink-0"></div>`;

      btn.innerHTML = `
        ${posterHtml}
        <div class="min-w-0">
          <div class="font-semibold text-white/90 leading-snug">${escapeHtml(safeTitle)}</div>
          ${desc ? `<div class="text-sm text-white/70 mt-0.5">${escapeHtml(desc)}</div>` : ``}
        </div>
      `;

      wrap.appendChild(btn);
    });

    return wrap;
  }

  function renderMoreDemos(card, extras, lang, openVideo) {
    if (!card) return;

    // hide if none
    if (!extras.length) {
      card.classList.add("hidden");
      return;
    }
    card.classList.remove("hidden");

    setMoreDemosHeading(card, lang);

    // Keep only the heading, replace rest with our list
    const heading = card.querySelector("h3");
    const nodes = Array.from(card.childNodes);
    nodes.forEach(n => {
      if (heading && n === heading) return;
      if (n.nodeType === 3 && !String(n.textContent || "").trim()) return;
      card.removeChild(n);
    });

    const list = buildExtrasListCards(extras, lang);
    card.appendChild(list);

    // click binding
    card.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-extra-idx]");
      if (!btn) return;
      const idx = Number(btn.getAttribute("data-extra-idx"));
      const item = extras[idx];
      if (!item?.src) return;
      openVideo({
        src: item.src,
        poster: item.poster || "",
        titleText: item.titleText || "Video"
      });
    }, { passive: true });
  }

  async function initVideoDemos(videoModalApi, lang) {
    let map = {};
    try {
      const json = await fetchVideosJson({ timeoutMs: 3500 });
      map = normalizeVideos(json);

      hydrateHeroVideo(map, lang);
      setDemoButtonsState(map, lang);

      // extras = everything except the first 6dof clip (hero)
      const all = Object.values(map || {}).flatMap(v => Array.isArray(v) ? v : []);
      const hero = map?.["6dof"]?.[0] || null;

      const extrasRaw = all.filter(v => v && v.src && (!hero || v.src !== hero.src));
      const extras = extrasRaw.map(v => ({
        src: v.src,
        poster: v.poster || "",
        titleText: pickTitle(v, lang),
        descText: pickDesc(v, lang),
      }));

      const card = findMoreDemosCard();
      renderMoreDemos(card, extras, lang, videoModalApi.openVideo);

      bindDemoButtons(videoModalApi.openVideo, map, lang);
      bindHeroFullscreenButton(videoModalApi.openVideo, map, lang);

    } catch {
      // videos.json missing/blocked
      setDemoButtonsState({}, lang);
      const card = findMoreDemosCard();
      if (card) card.classList.add("hidden");
    }

    const btn = document.getElementById("openHeroVideoModal");
    if (btn && !map?.["6dof"]?.[0]?.src) {
      btn.disabled = true;
      btn.classList.add("opacity-50", "cursor-not-allowed");
      btn.setAttribute("aria-disabled", "true");
    }
  }

  
  // Cookie banner (shows on first visit; remembers choice in localStorage)
  function initCookieBanner(lang){
    const KEY = "fms_cookie_consent_v1";
    const safeGet = () => {
      try { return window.localStorage ? localStorage.getItem(KEY) : null; } catch(e){ return null; }
    };
    const safeSet = (val) => {
      try { if(window.localStorage) localStorage.setItem(KEY, val); } catch(e){ /* ignore */ }
    };
    const hasConsent = () => safeGet() === "accepted" || safeGet() === "rejected";

    // Reuse existing banner markup if present, but ensure:
    // - it becomes visible when consent is missing ("hidden" class removed)
    // - buttons are wired (some pages embed markup without JS handlers)
    const existing = document.getElementById("cookieBanner");
    if(existing){
      if(!hasConsent()){
        existing.classList.remove("hidden");
        existing.style.display = "block";
      }

      // Wire handlers once
      if(!existing.dataset.cookieInit){
        existing.dataset.cookieInit = "1";
        const acceptBtn = existing.querySelector("#cookieAcceptBtn");
        let rejectBtn = existing.querySelector("#cookieRejectBtn");
        const closeBtn  = existing.querySelector("#cookieCloseBtn");

        // Some pages may ship an older banner markup that only contains "Accept".
        // To keep UX consistent, inject a "Reject" button when it's missing.
        if(!rejectBtn){
          const btnRow = existing.querySelector(".cookie-btn-row") || acceptBtn?.parentElement;
          if(btnRow && acceptBtn){
            rejectBtn = document.createElement("button");
            rejectBtn.type = "button";
            rejectBtn.id = "cookieRejectBtn";
            rejectBtn.className = "rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm font-semibold text-white/90";
            rejectBtn.dataset.en = "Reject";
            rejectBtn.dataset.pl = "Odrzu\u0107";
            rejectBtn.textContent = (lang || "").toLowerCase().startsWith("pl") ? "Odrzu\u0107" : "Reject";
            btnRow.insertBefore(rejectBtn, acceptBtn);
          }
        }

        const hide = () => {
          existing.classList.add("hidden");
          existing.style.display = "none";
        };

        if(acceptBtn){
          acceptBtn.addEventListener("click", () => {
            safeSet("accepted");
            hide();
          });
        }
        if(rejectBtn){
          rejectBtn.addEventListener("click", () => {
            safeSet("rejected");
            hide();
          });
        }
        if(closeBtn){
          closeBtn.addEventListener("click", () => {
            // Close is treated as a temporary dismissal (no consent stored)
            hide();
          });
        }
      }

      return;
    }
    if(hasConsent()) return;

    const isPL = (lang || "").toLowerCase().startsWith("pl");
    const href = isPL ? "/pl/cookies.html" : "/en/cookies.html";

    const banner = document.createElement("div");
    banner.id = "cookieBanner";
    banner.setAttribute("role","dialog");
    banner.setAttribute("aria-live","polite");
    banner.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9999;";

    banner.innerHTML = `
      <div class="mx-auto max-w-6xl px-4 pb-4">
        <div class="rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur p-4 md:p-5 shadow-lg">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="text-sm text-white/80 leading-relaxed">
              ${isPL
                ? `Ta strona używa plików cookies (w tym niezbędnych do działania). Możesz zaakceptować lub odrzucić opcjonalne cookies. <a class="underline hover:text-white" href="${href}">Dowiedz się więcej</a>.`
                : `This site uses cookies (including those necessary for operation). You can accept or reject optional cookies. <a class="underline hover:text-white" href="${href}">Learn more</a>.`
              }
            </div>
            <div class="flex flex-col sm:flex-row gap-2 shrink-0">
              <button type="button" id="cookieRejectBtn" class="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm font-semibold">
                ${isPL ? "Odrzuć" : "Reject"}
              </button>
              <button type="button" id="cookieAcceptBtn" class="rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold">
                ${isPL ? "Akceptuję" : "Accept"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    const close = () => { banner.style.display = "none"; };
    const acceptBtn = banner.querySelector("#cookieAcceptBtn");
    const rejectBtn = banner.querySelector("#cookieRejectBtn");

    if(acceptBtn){
      acceptBtn.addEventListener("click", () => { safeSet("accepted"); close(); }, { passive: true });
    }
    if(rejectBtn){
      rejectBtn.addEventListener("click", () => { safeSet("rejected"); close(); }, { passive: true });
    }
  }

window.SiteLayout = {
    init: function (options) {
      const cfg = {
        metaData: options?.metaData || null,
        includeModal: Boolean(options?.includeModal),
        includeVideoModal: options?.includeVideoModal !== false,
        activeProductKey: options?.activeProductKey || null,
        injectOtherProducts: options?.injectOtherProducts !== false,
        enableVideoDemos: options?.enableVideoDemos !== false,
      };

      const lang = detectLang();

      ensureGlobalStyles(cfg.includeModal, cfg.includeVideoModal);
      injectLayout({ includeModal: cfg.includeModal, includeVideoModal: cfg.includeVideoModal, lang });

      bindMobileMenu();
      bindLangButtons(cfg.metaData);
      bindSmoothAnchorScroll();

      const appliedLang = setLanguage(lang, cfg.metaData);

      if (cfg.includeModal) bindModal();

      const videoModalApi = cfg.includeVideoModal ? bindVideoModal() : null;
      if (cfg.enableVideoDemos && videoModalApi) {
        initVideoDemos(videoModalApi, appliedLang);
      }

      if (cfg.injectOtherProducts) {
        const otherSlot = document.getElementById("otherProducts");
        if (otherSlot) {
          otherSlot.innerHTML = renderOtherProducts(cfg.activeProductKey, appliedLang);
          applyTexts(appliedLang);
          rewriteIndexAnchors(appliedLang);
        }
      }


      // Cookie banner (first visit)
      initCookieBanner(lang);
      bindScrollSpy();
    }
  };
})();
