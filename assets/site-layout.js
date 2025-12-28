/* /assets/site-layout.js
   Shared layout + i18n + meta + mobile menu + (optional) image modal + other products
   + scrollspy (index) + smooth anchor scroll + GitHub Pages friendly /en/ /pl/ routing
*/
(function () {
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGS = ["en", "pl"];

  const PRODUCT_LINKS = [
    { key: "6dof", href: "/products-6dof.html", label: { en: "6DOF", pl: "6DOF" } },
    { key: "3dof", href: "/products-3dof.html", label: { en: "3DOF / 2DOF", pl: "3DOF / 2DOF" } },
    { key: "mk14", href: "/products-mk14.html", label: { en: "MK14", pl: "MK14" } },
    { key: "belt", href: "/products-belt-tensioner.html", label: { en: "Belt tensioner", pl: "Napinacz pasów" } },
    { key: "acc", href: "/products-accessories.html", label: { en: "Accessories", pl: "Akcesoria" } },
  ];

  const SCROLLSPY_SECTIONS = ["hero", "products", "about", "contact"];

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

  function ensureGlobalStyles(includeModal) {
    if (document.getElementById("siteLayoutStyles")) return;

    const style = document.createElement("style");
    style.id = "siteLayoutStyles";
    style.textContent = `
      html { scroll-padding-top: 90px; scroll-behavior: smooth; }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

      .fade-in { opacity: 0; transform: translateY(16px); animation: fadeInUp .9s forwards; }
      @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

      .nav-active { color: rgb(96 165 250) !important; } /* blue-400 */

      ${includeModal ? `
      .modal-hidden { display: none; }
      .modal-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.72); z-index: 50;
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
      }
      .modal-close:hover{ background: rgba(255,255,255,0.18); }
      .modal-img-wrap{ padding:.75rem; }
      .modal-img{
        width:100%; height:auto; max-height: calc(90vh - 1.5rem);
        object-fit: contain; border-radius:.75rem; display:block;
      }
      .modal-hint{
        padding: 0 .95rem .95rem .95rem;
        color: rgba(255,255,255,0.75);
        font-size:.95rem; text-align:center;
      }
      .sr-only{
        position:absolute; width:1px; height:1px; padding:0; margin:-1px;
        overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
      }` : ``}
    `;
    document.head.appendChild(style);
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

  function buildCanonicalForCurrent(lang) {
    const origin = window.location.origin;
    const path = stripTrailingSlash(window.location.pathname);
    if (isIndexLikePath(path) || getPathLang(path)) return `${origin}${langBasePath(lang)}`;
    return `${origin}${window.location.pathname}`;
  }

  function renderHeader(lang) {
    const heroHref = buildIndexUrl(lang, "hero");
    const productsHref = buildIndexUrl(lang, "products");
    const aboutHref = buildIndexUrl(lang, "about");
    const contactHref = buildIndexUrl(lang, "contact");
    const logoHref = productsHref;

    return `
<header class="bg-gray-800/90 backdrop-blur border-b border-white/5 fixed w-full z-10 shadow-md">
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

  function renderFooter() {
    return `<footer class="bg-gray-900 py-6 text-center text-gray-400">© 2025 ForgeMotion Systems</footer>`;
  }

  function renderModal() {
    return `
<div id="imgModal" class="modal-hidden" aria-hidden="true">
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="imgModalTitle">
    <div class="modal-panel">
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
  <div class="bg-gray-800/60 border border-white/5 rounded-2xl p-8">
    <h2 class="text-2xl font-bold mb-5" data-en="Other products" data-pl="Pozostałe produkty"></h2>
    <div class="flex flex-wrap gap-3">${items}</div>
  </div>
</section>`;
  }

  function applyTexts(lang) {
    const nodes = Array.from(document.querySelectorAll("[data-en]"));
    for (const el of nodes) {
      const val = el.dataset[lang];
      if (typeof val === "string") el.textContent = val;
    }
  }

  function updateMetaTags(lang, metaData) {
    const data = metaData?.[lang] || metaData?.[DEFAULT_LANG] || null;

    if (data?.title) document.title = data.title;

    setMetaTag("description", data?.description || "", "name");
    setMetaTag("keywords", data?.keywords || "", "name");
    setMetaTag("author", data?.author || "ForgeMotion Systems", "name");

    const canonical = (data?.canonical && String(data.canonical).trim())
      ? data.canonical
      : buildCanonicalForCurrent(lang);

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

  function detectLang() {
    const fromPath = getPathLang(window.location.pathname);
    if (fromPath) return fromPath;

    const stored = localStorage.getItem("lang");
    if (SUPPORTED_LANGS.includes(stored)) return stored;

    return DEFAULT_LANG;
  }

  function setLanguage(lang, metaData) {
    const safe = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

    localStorage.setItem("lang", safe);
    document.documentElement.lang = safe;

    applyTexts(safe);
    updateMetaTags(safe, metaData);

    document.querySelectorAll("[data-lang]").forEach(btn => {
      const isActive = btn.getAttribute("data-lang") === safe;
      btn.classList.toggle("nav-active", isActive);
    });

    return safe;
  }

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

  function bindModal() {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalImg");
    const closeBtn = document.getElementById("imgModalClose");
    if (!modal || !modalImg || !closeBtn) return;

    function openModal(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || "Image preview";
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
    }

    document.addEventListener("click", (e) => {
      const img = e.target.closest("img[data-full]");
      if (!img) return;
      const full = img.getAttribute("data-full") || img.getAttribute("src");
      const alt = img.getAttribute("alt") || "";
      openModal(full, alt);
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
  }

  function injectLayout({ includeModal, lang }) {
    const headerSlot = document.getElementById("siteHeader");
    const headerHtml = renderHeader(lang);
    if (headerSlot) headerSlot.innerHTML = headerHtml;
    else document.body.insertAdjacentHTML("afterbegin", headerHtml);

    const footerSlot = document.getElementById("siteFooter");
    if (footerSlot) footerSlot.innerHTML = renderFooter();
    else document.body.insertAdjacentHTML("beforeend", renderFooter());

    if (includeModal) {
      const modalSlot = document.getElementById("siteModal");
      if (modalSlot) modalSlot.innerHTML = renderModal();
      else document.body.insertAdjacentHTML("beforeend", renderModal());
    }
  }

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

    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
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
  }

  function bindLangButtons(metaData) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;

      const targetLang = btn.getAttribute("data-lang");
      if (!SUPPORTED_LANGS.includes(targetLang)) return;

      const path = stripTrailingSlash(window.location.pathname);
      const hash = window.location.hash || "";

      // On index pages: navigate to /{lang}/ keeping hash
      if (isIndexLikePath(path) || getPathLang(path)) {
        localStorage.setItem("lang", targetLang);
        window.location.href = buildIndexUrl(targetLang, hash);
        return;
      }

      // On product pages: stay, only switch language + meta/text
      const wasMobileOpen = isMobileMenuOpen();
      setLanguage(targetLang, metaData);
      if (wasMobileOpen) closeMobileMenu();
    });
  }

  window.SiteLayout = {
    init: function (options) {
      const cfg = {
        metaData: options?.metaData || null,
        includeModal: Boolean(options?.includeModal),
        activeProductKey: options?.activeProductKey || null,
        injectOtherProducts: options?.injectOtherProducts !== false,
      };

      const lang = detectLang();

      ensureGlobalStyles(cfg.includeModal);
      injectLayout({ includeModal: cfg.includeModal, lang });

      bindMobileMenu();
      bindLangButtons(cfg.metaData);
      bindSmoothAnchorScroll();

      const appliedLang = setLanguage(lang, cfg.metaData);

      if (cfg.includeModal) bindModal();

      if (cfg.injectOtherProducts) {
        const otherSlot = document.getElementById("otherProducts");
        if (otherSlot) {
          otherSlot.innerHTML = renderOtherProducts(cfg.activeProductKey, appliedLang);
          applyTexts(appliedLang);
        }
      }

      bindScrollSpy();
    }
  };
})();
