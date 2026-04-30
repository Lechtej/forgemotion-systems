## v1.4.1
- Zapis projektu używa nazwy pliku z numerem oferty i nazwiskiem/firmą klienta.
- Poprawiono klasyfikację pozycji malowania po wczytaniu JSON: pozycje wracają do bloku Malowanie zamiast Inne pozycje.
- Walidacja techniczna: node --check, unzip -t.

# Release notes

## v1.4.0
- Dodano dane klienta / lead do formularza projektu.
- Dodano numer oferty REM/YYYY/MM/XXX z inkrementacją lokalną.
- Eksport PDF przebudowany do trybu oferty PRO z nagłówkiem, danymi klienta, danymi projektu i stopką.
- Dodano lokalną historię leadów w localStorage.
- Zachowano zapis/wczytanie projektu oraz print-mode bez popupów.

## v1.3.7
- Dodano moduł „Czas robocizny”.
- Domyślny model: 1 osoba, 8 h/dzień.
- Dodano opcjonalny pomocnik: sporadyczny, okazjonalny lub druga osoba pełny czas.
- Dodano współczynnik trudności organizacyjnej.
- Podsumowanie pokazuje zakres dni roboczych oraz jawne założenia.

## v1.3.5
- Aktualizacja wszystkich domyślnych stawek robocizny pod Warszawę i okolice.
- Profil cenowy: sprzedażowy / realny, dolny–środkowy segment rynku.
- Obniżono przede wszystkim: elektrykę, gładzie, sufity, skuwanie, posadzki, część GK i hydrauliki.
- Zmieniono klucz localStorage stawek na `rates_v135`, żeby przeglądarka nie podciągała starego cennika.
- Zachowano mechanizmy: zapis/wczytanie projektu, print-mode PRO, dekoracje preset.

## v1.3.4
- Dodano preset dla modułu Dekoracje / sztukateria po zaznaczeniu usługi.
- Listwy przysufitowe domyślnie pobierają obwód mieszkania z obmiaru, analogicznie jak listwy przypodłogowe.
- Malowanie listew domyślnie ustawia się na ON.
- Zachowano print-mode PRO oraz zapis/wczytanie projektu.


## v1.3.2
- Naprawiono eksport PDF: usunięto mechanizm popup / about:blank.
- Eksport PDF działa przez bezpośredni `window.print()` z aktualnej strony.
- Dodano dedykowany `printRoot` i CSS `@media print`.
- Wydruk pokazuje tylko kosztorys, bez UI aplikacji.
- Podbito wersję w UI do v1.3.2.

# v1.3.0
- Dodano Zapisz: eksport projektu do JSON.
- Dodano Wczytaj: import projektu z JSON.
- Dodano Eksport PDF: okno wydruku / zapis jako PDF z podsumowania.

## v1.2.3 — fix klasyfikacji demontaży w podsumowaniu

- Wszystkie pozycje demontażowe są klasyfikowane priorytetowo do bloku „Demontaże / skucia / gruz”.
- Naprawiono przypadki, gdzie „Skuwanie płytek” trafiało do podłóg/glazury przez późniejsze reguły słownikowe.
- Demontaż starych listew, kucie, zrywanie, wynoszenie i wywóz gruzu trafiają do jednego bloku kosztorysowego.
- Zmiana dotyczy podsumowania kosztorysowego, bez zmian w mechanice wyceny.

## v1.2.1 — quick fix grupowania kosztorysu

- Przeniesiono „Skuwanie płytek ściany/podłogi” do grupy „Demontaże / skucia / gruz”.
- Poprawiono priorytety klasyfikacji pozycji kosztorysowych: demontaż ma pierwszeństwo przed glazurą i podłogami.
- Zachowano podsumowanie blokowe z v1.2.0.

## v1.2.0 — podsumowanie kosztorysowe blokowe
### Added
- Przebudowano podsumowanie na układ kosztorysowy wg etapów robót.
- Dodano sortowanie pozycji wg logicznej kolejności: przygotowanie, demontaże, posadzki, instalacje, zabudowy, gładzie, podłogi, dekoracje, malowanie, prace trudne.
- Dodano subtotal dla każdego bloku kosztorysu.
- `Prace trudne / narzuty` są prezentowane na końcu podsumowania.

### Changed
- Pozycje kosztowe są klasyfikowane do bloków przez wspólną funkcję `inferSummaryMeta()`.
- Renderer podsumowania działa przez `renderGroupedSummary(rows)`.

### Test
- PASS: `node --check app.js`.
- PASS: ZIP rozpakowany i zweryfikowany komendą `unzip -t`.

## v1.1.7.9 - tooltip overlay fix
- Naprawiono mechanizm tooltipów po przejściu na układ z przewijanym prawym panelem.
- Tooltipy są teraz obsługiwane delegacją zdarzeń i pozycjonowane jako fixed overlay.
- Dodano zamykanie tooltipa po kliknięciu poza nim, ESC i resize.
- Bez zmian w logice kosztów względem v1.1.7.8.

# Release notes

## v1.1.7.3 — scroll layout fix + powrót z Administracji
- Zmieniono układ przewijania: lewy panel zakresu prac pozostaje stale widoczny na ekranie.
- Prawy obszar roboczy przewija się niezależnie od menu.
- Poprawiono przewijanie po kliknięciu modułów w lewym panelu — scroll działa wewnątrz prawego panelu.
- Dodano przycisk `← Wróć do projektu` w widoku Administracja.
- Nie zmieniano algorytmów wyceny względem v1.1.7.2.


## v1.1.7.2 — layout PRO + fix posadzki
- Dodano lewy panel zakresu prac zgodny z kierunkiem makiety: moduły usług po lewej, aktywny moduł po prawej.
- Przebudowano nagłówek aplikacji na układ narzędziowy.
- Naprawiono skalowanie tabeli `Posadzki / podłoże` w trybie szczegółowym:
  - tabela ma kontrolowaną szerokość,
  - kolumny mają stałe proporcje,
  - poziomy scroll jest zamknięty w kontenerze modułu,
  - tabela nie wypycha layoutu poza ekran.
- Dodano przełącznik aktywacji modułu w nagłówku bloku posadzek, spięty z istniejącym checkboxem logiki.
- Nie zmieniano algorytmów wyceny względem v1.1.7.1.

## v1.1.7.1 — stable base
- Referencyjna baza robocza dla modułu posadzek/podłoża.

## v1.1.7.5
- Fix: blok „Posadzki / podłoże” jest domyślnie aktywny i widoczny w prawym panelu.
- Fix: klik w pozycję „Posadzki / podłoże” w lewym menu wymusza pokazanie szczegółów modułu.
- Zachowano układ v1.1.7.3: stały lewy panel i przewijanie prawego obszaru roboczego.

## v1.1.7.6 — systemowy refactor stanu modułów
- Ujednolicono model stanu modułów: checkbox w bloku jest źródłem prawdy.
- Lewy panel działa jako nawigacja oraz mirror stanu, bez wymuszania aktywacji usługi.
- Naprawiono `Posadzki / podłoże`: checkbox usługi jest widoczny w nagłówku bloku i pozwala wyłączyć moduł.
- Usunięto regresję, w której kliknięcie pozycji w menu ponownie aktywowało posadzki.
- JS sprawdzony składniowo przez `node --check app.js`.


## v1.1.7.8
### Changed
- Moduł „Posadzki / podłoże” po zaznaczeniu startuje w trybie szybkim z powierzchnią z obmiaru całego mieszkania.
- Domyślnie aktywne: gruntowanie podłoża oraz samopoziom grubszy.
- Nowe pozycje w trybie szczegółowym również startują z gruntowaniem i samopoziomem grubszym.

### Test
- PASS: sprawdzenie składni JS.
- PASS: weryfikacja domyślnej opcji thick dla szybkiego i szczegółowego trybu posadzek.

## v1.1.7.7
- FIX: przywrócono widoczny checkbox master w nagłówku bloku „Posadzki / podłoże”.
- FIX: usunięto domyślne `checked` dla `svcSubfloor`.
- FIX: usunięto CSS ukrywający nagłówek `#subfloorServiceBlock > .serviceHeader`.
- TEST: sprawdzono składnię JS przez `node --check app.js`.

## v1.1.9.0 — dekoracje + prace trudne + menu poddasza
### Added
- Dodano moduł `Dekoracje / sztukateria`:
  - listwy przysufitowe [mb],
  - listwy ścienne dekoracyjne [mb],
  - maskownice LED [mb],
  - narożniki / zakończenia [szt],
  - malowanie listew jako checkbox liczący automatycznie sumę mb.
- Dodano moduł `Prace trudne`:
  - klatki schodowe jako dopłata procentowa,
  - prace na wysokości [%],
  - rusztowania [dzień],
  - zabezpieczenia [mb],
  - transport pionowy [%].
- Dodano pozycję `Poddasze` w lewym menu, widoczną po wyborze `dom / segment`.

### Changed
- `Prace trudne` liczą się globalnie po robociźnie bazowej przed VAT i buforem.
- Menu lewego panelu rozszerzono o aktywne pozycje nowych modułów.

### Test
- PASS: `node --check app.js`.
- PASS: ZIP zawiera komplet plików aplikacji.
