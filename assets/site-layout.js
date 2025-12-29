/* /assets/site-layout.js
   Shared layout + i18n + meta + mobile menu + image modal + VIDEO modal + demos from videos.json
   + scrollspy (index) + smooth anchor scroll + GitHub Pages friendly /en/ /pl/ routing
   + corporate-safe hardening: robust fetch (timeout), safe scrollspy fallback, optional video section auto-hide
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
  <div class="bg-gray-800/60 border border-white/5 rounded-2xl p-8">
    <h2 class="text-2xl font-bold mb-5" data-en="Other products" data-pl="Pozostałe produkty"></h2>
    <div class="flex flex-wrap gap-3">${items}</div>
  </div>
</section>`;
  }

  function injectLayout({ includeModal, includeVideoModal, lang }) {
    const headerSlot = document.getElementById("siteHeader");
    const headerHtml = renderHeader(lang);
    if (headerSlot) headerSlot.innerHTML = headerHtml;
    else document.body.insertAdjacentHTML("afterbegin", headerHtml);

    const footerSlot = document.getElementById("siteFooter");
    if (footerSlot) footerSlot.innerHTML = renderFooter();
    else document.body.insertAdjacentHTML("beforeend", renderFooter());

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

  function setLanguage(lang, metaData) {
    const safe = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

    localStorage.setItem("lang", safe);
    document.documentElement.lang = safe;

    applyTexts(safe);
    updateMetaTags(safe, metaData);
    rewriteIndexAnchors(safe);

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
  function bindLangButtons(metaData) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;

      const targetLang = btn.getAttribute("data-lang");
      if (!SUPPORTED_LANGS.includes(targetLang)) return;

      const path = stripTrailingSlash(window.location.pathname);
      const hash = window.location.hash || "";

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

  function pickTitle(v, lang) {
    if (!v) return "";
    if (typeof v.title === "string") return v.title;
    if (v.title && typeof v.title === "object") return v.title[lang] || v.title.en || v.title.pl || "";
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

  // More demos: find the right-side card robustly, hide if no extras, otherwise render clickable list
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
      return t === "more demos" || t === "więcej demo";
    });
    if (target) return target.closest(".rounded-2xl");

    return null;
  }

  function buildExtrasList(extras, lang) {
    // extras: [{ src, poster, titleText }]
    const wrap = document.createElement("div");
    wrap.className = "space-y-3";

    extras.forEach((v, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "w-full text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 transition";
      btn.setAttribute("data-extra-idx", String(idx));

      const t = (v.titleText || "").trim() || (lang === "pl" ? `Demo #${idx + 2}` : `Demo #${idx + 2}`);
      btn.innerHTML = `
        <div class="font-semibold text-white/90">${escapeHtml(t)}</div>
        <div class="text-sm text-white/60">${escapeHtml(v.src)}</div>
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

    // Replace the placeholder text area with a list
    // Keep the <h3> heading; clean the rest (except heading)
    const heading = card.querySelector("h3");
    const nodes = Array.from(card.childNodes);
    nodes.forEach(n => {
      if (heading && n === heading) return;
      if (n.nodeType === 3 && !String(n.textContent || "").trim()) return;
      card.removeChild(n);
    });

    const list = buildExtrasList(extras, lang);
    card.appendChild(list);

    // click binding
    card.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-extra-idx]");
      if (!btn) return;
      const idx = Number(btn.getAttribute("data-extra-idx"));
      const item = extras[idx];
      if (!item?.src) return;
      openVideo({ src: item.src, poster: item.poster || "", titleText: item.titleText || "Video" });
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
        titleText: pickTitle(v, lang)
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

      bindScrollSpy();
    }
  };
})();
