// assets/contact-form.js
// ForgeMotion Systems – Contact/Quote form submit via Supabase Edge Function (multipart/form-data)
//
// Expects HTML structure used in /en/index.html and /pl/index.html:
// - <form id="leadForm"> ... </form>
// - submit button id="leadSubmitBtn"
// - status span id="leadFormStatus"

(() => {
  const form = document.getElementById("leadForm");
  if (!form) return;

  const submitBtn = document.getElementById("leadSubmitBtn");
  const statusEl = document.getElementById("leadFormStatus");

  const ENDPOINT = "https://falhbleuwnlqllfiknrf.supabase.co/functions/v1/contact-form";

  function getLang() {
    const p = (location.pathname || "").toLowerCase();
    if (p.startsWith("/pl")) return "pl";
    return "en";
  }

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("text-red-300", !!isError);
    statusEl.classList.toggle("text-green-300", !isError && !!msg);
  }

  function disable(disabled) {
    if (submitBtn) submitBtn.disabled = disabled;
    if (submitBtn) {
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
    const privacyUrl = lang === "pl" ? "https://forgemotionsystems.com/pl/privacy.html" : "https://forgemotionsystems.com/en/privacy.html";
    return lang === "pl"
      ? `Wyrażam zgodę na przetwarzanie moich danych zgodnie z Polityką prywatności (RODO): ${privacyUrl}`
      : `I agree to the processing of my data in line with the Privacy Policy (GDPR): ${privacyUrl}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const lang = getLang();

    // Basic UI validation (HTML required attributes still apply)
    const name = (form.querySelector('[name="name"]')?.value || "").trim();
    const email = (form.querySelector('[name="email"]')?.value || "").trim();
    const message = (form.querySelector('[name="message"]')?.value || "").trim();
    const gdpr = form.querySelector('[name="gdpr"]')?.checked;

    if (!name || !email || !message) {
      setStatus(lang === "pl" ? "Uzupełnij imię, e-mail i szczegóły projektu." : "Please fill name, email and project details.", true);
      return;
    }
    if (!gdpr) {
      setStatus(lang === "pl" ? "Wymagana jest zgoda RODO." : "GDPR consent is required.", true);
      return;
    }

    // Ensure hidden fields are set
    const pageUrlEl = form.querySelector('[name="page_url"]');
    if (pageUrlEl) pageUrlEl.value = location.href;

    const langEl = form.querySelector('[name="lang"]');
    if (langEl) langEl.value = lang;

    const gdprTextEl = form.querySelector('[name="gdpr_text"]');
    if (gdprTextEl) gdprTextEl.value = buildGdprText(lang);

    // Files validation (client-side mirror of server limits)
    const fileInput = form.querySelector('input[type="file"][name="files"]');
    const files = fileInput?.files ? Array.from(fileInput.files) : [];

    const MAX_FILES = 3;
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".pdf", ".dwg"];

    if (files.length > MAX_FILES) {
      setStatus(lang === "pl" ? `Za dużo plików (maks. ${MAX_FILES}).` : `Too many files (max ${MAX_FILES}).`, true);
      return;
    }
    for (const f of files) {
      const lower = (f.name || "").toLowerCase();
      const ext = lower.includes(".") ? lower.slice(lower.lastIndexOf(".")) : "";
      if (!ALLOWED_EXT.includes(ext)) {
        setStatus(lang === "pl" ? `Niedozwolony typ pliku: ${f.name}` : `File type not allowed: ${f.name}`, true);
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        setStatus(lang === "pl" ? `Plik jest za duży: ${f.name}` : `File too large: ${f.name}`, true);
        return;
      }
    }

    disable(true);
    setStatus(lang === "pl" ? "Wysyłanie..." : "Sending...");

    try {
      const fd = new FormData(form);

      const res = await fetch(ENDPOINT, { method: "POST", body: fd });
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
      if (pageUrlEl) pageUrlEl.value = "";
      if (gdprTextEl) gdprTextEl.value = "";
      if (fileInput) fileInput.value = "";

      disable(false);
    } catch (err) {
      setStatus(lang === "pl" ? "Błąd sieci. Spróbuj ponownie." : "Network error. Please try again.", true);
      disable(false);
    }
  });
})();
