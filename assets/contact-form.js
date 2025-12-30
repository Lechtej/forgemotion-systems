// assets/contact-form.js
// ForgeMotion Systems – Contact/Quote form submit via Supabase Edge Function (multipart/form-data)
//
// Expects HTML structure used in /en/index.html and /pl/index.html:
// - <form id="leadForm"> ... </form>
// - submit button id="leadSubmitBtn"
// - status span id="leadFormStatus"
// - topic select id="lead_dof" (kept for backwards compatibility; it is a "topic" selector now)
// - file input id="lead_files"
// - optional dropzone wrapper: #leadDropzone, #leadDropzoneBtn, #leadFileList

(() => {
  const form = document.getElementById("leadForm");
  if (!form) return;

  const submitBtn = document.getElementById("leadSubmitBtn");
  const statusEl = document.getElementById("leadFormStatus");

  // Keep your existing endpoint
  const ENDPOINT = "https://falhbleuwnlqllfiknrf.supabase.co/functions/v1/contact-form";

  const langEl = form.querySelector('[name="lang"]');
  const pageUrlEl = form.querySelector('[name="page_url"]');
  const gdprTextEl = form.querySelector('[name="gdpr_text"]');
  const topicEl = form.querySelector('#lead_dof,[name="dof"]');

  const fileInput = form.querySelector('#lead_files,[name="files"]');
  const dropzone = document.getElementById("leadDropzone");
  const dropzoneBtn = document.getElementById("leadDropzoneBtn");
  const fileListEl = document.getElementById("leadFileList");

  function getLang() {
    const v = (langEl?.value || "").toLowerCase();
    return v === "pl" ? "pl" : "en";
  }

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("text-red-300", !!isError);
    statusEl.classList.toggle("text-green-300", !isError);
  }

  function disable(disabled) {
    if (submitBtn) {
      submitBtn.disabled = !!disabled;
      submitBtn.classList.toggle("opacity-60", disabled);
      submitBtn.classList.toggle("cursor-not-allowed", disabled);
    }
  }

  async function readJsonSafe(res) {
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("application/json")) return await res.json();
    const t = await res.text();
    try { return JSON.parse(t); } catch { return { ok: false, error: t || "Unexpected response" }; }
  }

  function buildGdprText(lang) {
    const privacyUrl =
      lang === "pl"
        ? "https://forgemotionsystems.com/pl/privacy.html"
        : "https://forgemotionsystems.com/en/privacy.html";
    return lang === "pl"
      ? `Wyrażam zgodę na przetwarzanie moich danych zgodnie z Polityką prywatności (RODO): ${privacyUrl}`
      : `I agree to the processing of my data in line with the Privacy Policy (GDPR): ${privacyUrl}`;
  }

  // --- Topic preselect from URL (?topic=...) ---
  function normalizeTopic(v) {
    return String(v || "").trim().toLowerCase();
  }
  function preselectTopicFromUrl() {
    if (!topicEl) return;

    const params = new URLSearchParams(window.location.search);
    const raw = normalizeTopic(params.get("topic"));
    if (!raw) return;

    const map = {
      "mk14": "Ejection seat replica",
      "ejection": "Ejection seat replica",
      "seat": "Ejection seat replica",
      "belt": "Seatbelt tensioner",
      "tensioner": "Seatbelt tensioner",
      "acc": "Accessories",
      "accessories": "Accessories",
      "6dof": "6DOF",
      "3dof": "3DOF/2DOF",
      "2dof": "3DOF/2DOF",
      "other": "Other",
    };

    const desired = map[raw] || null;

    // If query matches an option value directly (case-insensitive), prefer it
    const options = Array.from(topicEl.querySelectorAll("option"));
    const direct = options.find(o => normalizeTopic(o.value) === raw);
    if (direct) {
      topicEl.value = direct.value;
      return;
    }

    if (desired) {
      // choose option by value match
      const opt = options.find(o => o.value === desired);
      if (opt) topicEl.value = opt.value;
    }
  }

  // --- Drag & drop / better file UX ---
  function renderFileList() {
    if (!fileListEl || !fileInput) return;
    fileListEl.innerHTML = "";

    const files = Array.from(fileInput.files || []);
    if (files.length === 0) return;

    for (const [idx, f] of files.entries()) {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2";
      const left = document.createElement("div");
      left.className = "min-w-0";
      const name = document.createElement("div");
      name.className = "truncate text-sm text-white/85";
      name.textContent = f.name;
      const meta = document.createElement("div");
      meta.className = "text-xs text-white/55";
      meta.textContent = `${Math.round(f.size / 1024)} KB`;
      left.appendChild(name);
      left.appendChild(meta);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "shrink-0 text-xs text-white/70 hover:text-white underline";
      btn.textContent = (getLang() === "pl") ? "Usuń" : "Remove";
      btn.addEventListener("click", () => {
        const dt = new DataTransfer();
        files.forEach((file, i) => { if (i !== idx) dt.items.add(file); });
        fileInput.files = dt.files;
        renderFileList();
      });

      li.appendChild(left);
      li.appendChild(btn);
      fileListEl.appendChild(li);
    }
  }

  function wireDropzone() {
    if (!fileInput) return;

    // Click "Choose files"
    if (dropzoneBtn) {
      dropzoneBtn.addEventListener("click", () => fileInput.click());
    }

    // Native picker change
    fileInput.addEventListener("change", () => renderFileList());

    if (!dropzone) return;

    // Clicking anywhere on dropzone opens picker
    dropzone.addEventListener("click", (e) => {
      // avoid double-trigger when clicking button
      if (e.target === dropzoneBtn) return;
      fileInput.click();
    });

    const setActive = (on) => dropzone.classList.toggle("ring-2", on);

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      setActive(true);
    });
    dropzone.addEventListener("dragleave", () => setActive(false));
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      setActive(false);

      const dropped = Array.from(e.dataTransfer?.files || []);
      if (dropped.length === 0) return;

      const dt = new DataTransfer();
      // Keep existing, then add dropped
      const existing = Array.from(fileInput.files || []);
      for (const f of existing) dt.items.add(f);
      for (const f of dropped) dt.items.add(f);

      fileInput.files = dt.files;
      renderFileList();
    });
  }

  // init hidden fields
  if (pageUrlEl) pageUrlEl.value = window.location.href;

  preselectTopicFromUrl();
  wireDropzone();
  renderFileList();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const lang = getLang();

    // Basic UI validation (HTML required attributes still apply)
    const name = (form.querySelector('[name="name"]')?.value || "").trim();
    const email = (form.querySelector('[name="email"]')?.value || "").trim();
    const message = (form.querySelector('[name="message"]')?.value || "").trim();
    const gdpr = form.querySelector('[name="gdpr"]')?.checked;

    if (!name || !email || !message) {
      setStatus(lang === "pl" ? "Uzupełnij wymagane pola." : "Please fill in the required fields.", true);
      return;
    }
    if (!gdpr) {
      setStatus(lang === "pl" ? "Wymagana jest zgoda (RODO)." : "GDPR consent is required.", true);
      return;
    }

    try {
      setStatus(lang === "pl" ? "Wysyłanie..." : "Sending...");
      disable(true);

      const anonMeta = document.querySelector('meta[name="supabase-anon-key"]');
      const anon = anonMeta?.getAttribute("content") || "";
      if (!anon) {
        setStatus(
          lang === "pl"
            ? "Brak konfiguracji: ustaw klucz Supabase ANON w <meta name=\"supabase-anon-key\">."
            : "Missing config: set Supabase ANON key in <meta name=\"supabase-anon-key\">.",
          true
        );
        disable(false);
        return;
      }

      const fd = new FormData(form);

      // keep page_url accurate (e.g. after SPA-like language changes)
      if (pageUrlEl) fd.set("page_url", window.location.href);

      // include GDPR text (stored + visible in email)
      if (gdprTextEl) {
        const t = buildGdprText(lang);
        gdprTextEl.value = t;
        fd.set("gdpr_text", t);
      }

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${anon}`,
          "apikey": anon
        },
        body: fd
      });

      const data = await readJsonSafe(res);

      if (!res.ok || !data?.ok) {
        const msg = data?.error || (lang === "pl" ? "Nie udało się wysłać formularza." : "Failed to send the form.");
        setStatus(msg, true);
        disable(false);
        return;
      }

      setStatus(lang === "pl" ? "Dziękujemy! Odezwiemy się w ciągu 24–48h." : "Thanks! We’ll get back to you within 24–48h.");
      form.reset();

      // Restore lang + hidden fields after reset
      if (langEl) langEl.value = lang;
      if (pageUrlEl) pageUrlEl.value = window.location.href;
      if (gdprTextEl) gdprTextEl.value = "";
      if (fileInput) fileInput.value = "";

      // Re-apply topic if user came with a topic param
      preselectTopicFromUrl();
      renderFileList();

      disable(false);
    } catch (err) {
      setStatus(lang === "pl" ? "Błąd sieci. Spróbuj ponownie." : "Network error. Please try again.", true);
      disable(false);
    }
  });
})();
