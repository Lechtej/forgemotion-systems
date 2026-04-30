(function () {
  const area = document.getElementById('area');
  const workType = document.getElementById('workType');
  const standard = document.getElementById('standard');
  const risk = document.getElementById('risk');
  const btn = document.getElementById('calcBtn');
  const result = document.getElementById('result');

  const rates = {
    refresh: { label: 'Odświeżenie / malowanie', min: 120, max: 260 },
    standard: { label: 'Standardowe wykończenie', min: 650, max: 1100 },
    bathroom: { label: 'Łazienka / prace mokre', min: 1400, max: 2600 },
    tiles: { label: 'Płytki i gres', min: 180, max: 420 },
    premium: { label: 'Standard premium', min: 1200, max: 2100 }
  };

  function formatPLN(value) {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(value);
  }

  function calculate() {
    const m2 = Number(area.value);
    const selected = rates[workType.value];
    const standardFactor = Number(standard.value);
    const riskFactor = Number(risk.value);

    if (!m2 || m2 <= 0) {
      result.textContent = 'Podaj poprawny metraż.';
      return;
    }

    const min = m2 * selected.min * standardFactor * riskFactor;
    const max = m2 * selected.max * standardFactor * riskFactor;

    result.innerHTML = `<strong>Szacunek:</strong> ${formatPLN(min)} – ${formatPLN(max)} netto.<br><span>Zakres: ${selected.label}. Wynik wymaga potwierdzenia po oględzinach i doprecyzowaniu materiałów.</span>`;
  }

  if (btn) btn.addEventListener('click', calculate);
})();
