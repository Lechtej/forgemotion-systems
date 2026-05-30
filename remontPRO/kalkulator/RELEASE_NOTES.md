# Release notes — kalkulator_remonty_v1.9.0

## v1.9.0 — porządek bloków kosztorysu i przygotowanie pod instalacje

### Changed
- Uporządkowano kolejność bloków kosztorysu zgodnie z przebiegiem remontu.
- Dodano osobny blok „Przygotowanie pod instalacje” dla bruzdowania, podkuwania, przepustów i otworów pod puszki.
- Usunięto prefiks „Malowanie:” z pozycji zabezpieczeń.
- Kuchnia i łazienka są prezentowane razem w bloku „Łazienki i kuchnie”.
- Pozycje wod-kan z kuchni nie wpadają już do bloku „Inne pozycje”.
- Blok „Inne pozycje” przemianowano na „Pozycje indywidualne” i zostawiono jako miejsce dla pozycji ręcznych.

## v1.4.1
- Zapis projektu używa nazwy pliku z numerem oferty i nazwiskiem/firmą klienta.
- Poprawiono klasyfikację pozycji malowania po wczytaniu JSON: pozycje wracają do bloku Malowanie zamiast Inne pozycje.
- Walidacja techniczna: node --check, unzip -t.

# Release notes


## v1.9.0 — doprecyzowanie przygotowania ścian pod gładź / malowanie

### Changed
- Zmieniono nazwę pozycji „Dodatkowe przygotowanie pod malowanie”.
- Nowa nazwa: „Przygotowanie ścian pod gładź / malowanie (zdzieranie, szlifowanie)”.
- Pozycja jest generowana jako pierwsza pozycja w bloku Malowanie.
- Zaktualizowano opis wariantu malowania w interfejsie.

### Compatibility
- Zachowano dotychczasową logikę i stawki wariantów B/C.
- Projekty zapisane w starszych wersjach pozostają wczytywalne.

## v1.8.6 — parapety, płytki specjalne, zabezpieczenia malarskie

### Added
- Modułowe pozycje parapetów wewnętrznych: demontaż, obsadzenie, obróbka, docinanie.
- Dopłaty za utrudnione układanie płytek: mały format, cegiełka, mozaika, kit-kat/lamelki, jodełka.
- Rozbicie zabezpieczeń do malowania: pełne, podłogi, parkiet, okna, drzwi, klatka/winda.

### Changed
- Glify i parapety są osobnymi pozycjami kosztorysowymi.
- Pozycja legacy zabezpieczenia została zachowana w cenniku, ale kalkulacja malowania korzysta z rozbitych pozycji.

### Validation
- PASS: node --check app.js.

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

## v1.8.6 — parapety, płytki specjalne, zabezpieczenia malarskie

### Added
- Modułowe pozycje parapetów wewnętrznych: demontaż, obsadzenie, obróbka, docinanie.
- Dopłaty za utrudnione układanie płytek: mały format, cegiełka, mozaika, kit-kat/lamelki, jodełka.
- Rozbicie zabezpieczeń do malowania: pełne, podłogi, parkiet, okna, drzwi, klatka/winda.

### Changed
- Glify i parapety są osobnymi pozycjami kosztorysowymi.
- Pozycja legacy zabezpieczenia została zachowana w cenniku, ale kalkulacja malowania korzysta z rozbitych pozycji.

### Validation
- PASS: node --check app.js.

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

## v1.5.0

- Dodano lokalną historię ofert (localStorage).
- Dodano status oferty: robocza / wysłana / zaakceptowana / odrzucona.
- Dodano wczytywanie oferty z historii i usuwanie wpisów.
- Dodano przycisk „Zapisz ofertę” niezależny od backupu JSON.
- Generowanie PDF zapisuje ofertę w historii lokalnej.
- Backup JSON pozostaje bez zmian.


## v1.5.1 — Tapetowanie, LED, serwis listew/sztukaterii

### Added
- Moduł Tapetowanie z ręcznym obmiarem m².
- Rozszerzenie elektryki LED: punkt LED, montaż taśmy LED, lutowanie/łączenie, profil LED.
- Serwis / poprawki listew przypodłogowych: akrylowanie, malowanie, renowacja zakończeń, korekta łączeń.
- Serwis / poprawki sztukaterii: renowacja łączeń, wygubienie uskoku/przejścia, korekta starego akrylu/pęknięcia.
- Komplet tooltipów technologicznych dla nowych pozycji.

### Changed
- Poprawki istniejących listew/sztukaterii są liczone jako serwis elementów już położonych, nie jako dopłata do prawidłowego nowego montażu.
- Tapetowanie nie pobiera automatycznie całych ścian z obmiaru — wymaga ręcznego m².

### Test
- PASS: node --check app.js.
- PASS: unzip -t paczki release.

## v1.5.3 — Hotfix serwisu listew i sztukaterii

### Added
- Oddzielny checkbox `Serwis / renowacja listew przypodłogowych`.
- Oddzielny checkbox `Serwis / renowacja sztukaterii`.

### Changed
- Nowe prace i serwis/renowacje są rozdzielone logicznie.
- Akrylowanie listew przypodłogowych pozostaje pracą liniową i jest liczone w `mb`.
- Renowacje zakończeń, korekty łączeń, wygubianie uskoków i korekty starego akrylu są liczone punktowo w `szt`.
- Pozycje serwisowe nie trafiają do podsumowania bez zaznaczenia właściwego checkboxa serwisowego.
- Tooltipy doprecyzowano pod kątem różnicy: nowy montaż vs serwis istniejących elementów.

### Test
- PASS: node --check app.js.
- PASS: unzip -t paczki release.


## v1.5.3 — Hotfix aktywacji sekcji serwisowych
- Rozdzielono stan aktywacji nowych prac i serwisu/renowacji dla Podłóg oraz Dekoracji/Sztukaterii.
- Checkbox serwisu aktywuje wyłącznie pola serwisowe.
- Checkbox nowych prac aktywuje wyłącznie pola nowych prac.
- Sekcje mogą działać niezależnie: tylko nowe, tylko serwis albo oba naraz.


## v1.5.4 — Hotfix UI sekcji serwisowych
- Poprawiono aktywację serwisu listew przypodłogowych: checkbox serwisu pokazuje i aktywuje wyłącznie sekcję renowacji.
- Poprawiono analogiczną logikę dla sztukaterii.
- Nieaktywne podsekcje są ukrywane, a nie wyszarzane.
- Naprawiono strukturę HTML: Posadzki i Ściany/GK są osobnymi blokami poza blokiem Podłogi.


## v1.5.5 — Doprecyzowanie renowacji listew i sztukaterii
- Listwy przypodłogowe: dodano precyzyjne taśmowanie ochronne przy malowaniu listew, liczone w mb.
- Sztukateria: poprawa starego akrylu / pęknięć zmieniona na mb.
- Sztukateria: dodano malowanie po renowacji w mb.
- Zachowano: renowacja łączeń i wygubienie uskoków jako szt.


## v1.6.1 — Ujednolicenie renowacji listew i sztukaterii
- Dodano mnożniki wielkości listew / profili dla prac renowacyjnych.
- Dodano zabezpieczenie / oklejanie sztukaterii [mb].
- Zachowano rozdział: LED elektryczny w Elektryce, maskownice LED w Sztukaterii.
- Tooltipy rozszerzone o rozróżnienie prac liniowych [mb] i punktowych [szt].


## v1.6.2 — Korekta mnożników listew i sztukaterii
- Zmieniono mnożniki rozmiaru: małe ×0.90, standard/średnie ×1.00, duże ×1.25, premium ×1.45.
- Standard / średnie jest teraz bazą cenową.
- Zakres działania mnożnika bez zmian: malowanie oraz renowacja połączeń/zakończeń/uskoków.


## v1.6.3 — Silikony / uszczelnienia w pomieszczeniach mokrych
- Dodano nowe silikonowanie [mb].
- Dodano wymianę silikonu [mb] obejmującą wycięcie, remover, przygotowanie i nową spoinę.
- Dodano poprawkę punktową silikonu [szt].
- Zaktualizowano tooltipy i klasyfikację kosztorysu do bloku Pomieszczenia mokre / glazura.
## v1.6.4 — Renowacja pomieszczeń mokrych
- Fix architektury modułu mokrego: osobny aktywator dla prac glazurniczych i osobny dla silikonów / uszczelnień.
- Silikony nie są już liczone przy samym zaznaczeniu „Pomieszczenia mokre”.
- Renowacja pomieszczeń mokrych może działać samodzielnie, bez płytek i hydrauliki.
- Mirror w lewym menu pokazuje aktywność modułu, gdy włączone są nowe prace albo renowacja.



## v1.6.5 — Serwis / zaprawki malarskie
- Dodano osobny checkbox „Serwis / zaprawki” w module Malowanie.
- Zaprawki działają niezależnie od klasycznego malowania.
- Dodano: naprawa punktowa sufitu [szt], zaprawka malarska [szt], zaprawka rozszerzona [szt].
- Dodano mnożnik „widoczność pod światło”.
- Tooltipy doprecyzowują, że naprawa punktowa może pozostać częściowo widoczna.


## v1.7.1 — PDF PRO+
- Dodano drugą stronę PDF: „Zakres i technologia prac”.
- Dodano opis zakresu i ograniczeń technologicznych dla aktywnych modułów: zaprawki, renowacje, silikony, sztukateria, listwy, LED i tapetowanie.
- Zachowano krótkie tooltipy w UI; PDF generuje dłuższe opisy ofertowe.
- Materiały i prace ukryte pozostają poza zakresem, jeżeli nie wskazano ich osobno.

### Test
- PASS: node --check app.js.
- PASS: unzip -t paczki release.

## v1.7.1 — PDF PRO++ dynamiczne opisy technologiczne
- Rozszerzono drugą stronę PDF: „Zakres i technologia prac”.
- Sekcje są generowane dynamicznie na podstawie aktywnych usług.
- Dodano szczegółowe opisy dla: malowania, gładzi, zaprawek, zabezpieczeń, demontaży, posadzek, pomieszczeń mokrych, silikonów, listew, sztukaterii, tapet, elektryki/LED, hydrauliki, prac trudnych i poddasza.
- Dodano ostrzeżenia technologiczne dla prac serwisowych i renowacyjnych.


## v1.8.5 — Generator umowy
- Dodano przycisk „Generuj umowę”.
- Dodano dokument umowy z danymi wykonawcy, klienta i projektu.
- Kosztorys jest generowany jako Załącznik nr 1.
- Zakres i technologia prac są generowane jako Załącznik nr 2.
- Dodano zapis o ubezpieczeniu OC wykonawcy:
  „Wykonawca posiada aktualne ubezpieczenie odpowiedzialności cywilnej (OC) związane z prowadzoną działalnością i wykonywanym zakresem prac. Kopia polisy może zostać okazana Zamawiającemu na życzenie.”

## v1.8.5
- Rozdzielono nazwy plików PDF przez tytuł dokumentu: `Kosztorys_...` oraz `Umowa_...`.
- Dodano opcjonalne pole adresu wykonawcy.
- Dodano opcjonalne pole adresu zamawiającego / korespondencyjnego.
- Adresy wykonawcy i zamawiającego są zaciągane do umowy.


## v1.8.5

Zakres:
- Dodano pozycję demolki: wyburzanie ścian działowych [m²].
- Dodano współczynnik gruzu dla ścian działowych.
- Dodano nowy moduł: Montaż mebli / wyposażenia.
- Pozycje meblowe: skręcanie mebli, zabudowa/szafki [mb], blaty [mb], uchwyty/regulacja frontów [szt], korekty godzinowe [h].
- Dodano tooltipy i opisy technologiczne do PDF/umowy.

Uwagi:
- Wyburzanie ścian dotyczy ścian działowych, nie nośnych/konstrukcyjnych.
- Meble i akcesoria są materiałem klienta, jeśli nie wskazano inaczej.
