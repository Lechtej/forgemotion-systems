# Release notes

## v0.1.4 — Top gallery + calculator app integration
- Dodano sekcję wybranych realizacji wysoko na stronie, bezpośrednio po hero.
- Zachowano pełne case studies PRZED → W TRAKCIE → PO.
- Przesunięto kalkulator na dół strony.
- Usunięto prosty kalkulator orientacyjny z homepage jako główną funkcję.
- Dodano osobną aplikację kalkulatora w `/kalkulator/` na bazie `kalkulator_remonty_v1.1.7.1_release`.
- Homepage prowadzi do aplikacji przyciskiem „Otwórz kalkulator”.

# Release notes — Remont Pro WWW

## v0.1.3 — selected case studies gallery

Data: 2026-04-30

### Dodano

- wyselekcjonowaną galerię zdjęć z realizacji „Na Uboczu”,
- wyselekcjonowaną galerię zdjęć z realizacji „Zgorzała — segment”,
- podział zdjęć na etapy: PRZED / W TRAKCIE / PO,
- sekcję „Przy pracy” z dwoma zdjęciami wykonawczymi,
- lightbox z podglądem zdjęć,
- zoptymalizowane zdjęcia WebP w strukturze `assets/img/realizacje/`.

### Zmieniono

- zastąpiono placeholderową galerię realnymi case studies,
- dopracowano układ galerii pod storytelling sprzedażowy.

### Ograniczenia

- kalkulator pozostaje orientacyjny i wymaga późniejszego podpięcia docelowej aplikacji kalkulacyjnej,
- formularz kontaktowy nadal wymaga docelowego mechanizmu wysyłki.

---

# Release notes — Remont Pro WWW

## v0.1.1 — visual polish + calculator upgrade

Data: 2026-04-30

### Zmieniono

- stonowano pomarańczowy akcent, aby lepiej pasował do technicznego, ciemnego layoutu,
- rozbudowano kalkulator o typ prac, standard wykonania i bufor ryzyka,
- wynik kalkulatora pokazuje widełki netto zamiast jednej kwoty,
- dodano sticky CTA „Zadzwoń”,
- poprawiono hover/focus states dla przycisków i pól formularzy.

### Ograniczenia

- numer telefonu w CTA jest placeholderem i wymaga podmiany,
- formularz nadal nie wysyła wiadomości,
- portfolio ma placeholdery zamiast zdjęć.

## v0.1.0 — initial website shell

Data: 2026-04-30

### Dodano

- pierwszą wersję strony głównej,
- layout dark/technical podobny kierunkowo do ForgeMotion Systems,
- sekcję usług,
- kalkulator orientacyjny kosztów,
- portfolio placeholder,
- sekcję procesu współpracy,
- formularz kontaktowy jako statyczny placeholder,
- dokumentację README.

### Ograniczenia

- formularz nie wysyła jeszcze wiadomości,
- portfolio ma placeholdery zamiast zdjęć,
- brak finalnego logo graficznego,
- kalkulator jest orientacyjny i wymaga rozbudowy logiki.

## v0.1.2 - Gallery structure
- Dodano sekcję galerii z 6 kartami realizacji.
- Dodano filtry: wszystkie, łazienki, mieszkania, detale, przed/po.
- Dodano lightbox JS do podglądu realizacji.
- Przygotowano folder `assets/img/realizacje/` na docelowe zdjęcia.


## v0.1.5 - premium photo hero
- Dodano hero z jednym dużym zdjęciem gotowego pomieszczenia.
- Zmieniono priorytet komunikacji: najpierw efekt końcowy, potem case studies.
- Dodano CTA do kontaktu i kalkulatora w hero.


## v0.1.5.1 - 2026-04-30

### Poprawki galerii
- Podmieniono główne zdjęcie „Na Uboczu” w sekcji wybranych kadrów na łazienkę używaną w hero.
- Usunięto błędne nazewnictwo „Łazienka” dla zdjęcia salonu w trakcie wykańczania.
- Zmieniono „Schody LED” na „Beton architektoniczny” tam, gdzie kadr pokazuje przede wszystkim wykończenie ściany.
- Zmieniono „Prace mokre” na „Remont łazienki”.
- Zmieniono „Pomieszczenie techniczne” na „Salon sportowca”.

## v0.1.5.2 — hero gallery image fix
- Podmieniono główne zdjęcie „Na Uboczu” w sekcji wybranych kadrów na łazienkę używaną jako hero background.
- Podmieniono kartę błędnie opisaną jako „Łazienka” na właściwe zdjęcie i podpis „Salon sportowca”.
- Zmniejszono wizualne przytłoczenie galerii przez limity wysokości kart i bardziej kompaktowe kadrowanie.

## v0.1.6 — thumbnails + lightbox gallery

### Added
- Gallery layout changed to compact thumbnails.
- Lightbox navigation added: previous / next buttons and keyboard arrows.
- Lightbox counter added.

### Changed
- Featured realization section reduced in visual weight.
- Case studies now use compact thumbnail grids instead of large stacked cards.
- Improved mobile behavior for gallery and lightbox.

### Risk / validation
- Verify all images open in lightbox.
- Verify arrows work on desktop and mobile.
- Verify gallery no longer dominates page height.
