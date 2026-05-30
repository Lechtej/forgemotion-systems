# Kalkulator remonty v1.9.0

## v1.9.0 — porządek bloków kosztorysu

- Osobny blok: Przygotowanie pod instalacje.
- Zabezpieczenia bez prefiksu „Malowanie”.
- Łazienki i kuchnie scalone logicznie w jednym bloku.
- Kolejność bloków zgodna z przebiegiem remontu.


Lokalna aplikacja HTML + JS do kalkulacji kosztów robocizny remontowej.

## Uruchomienie
Otwórz `index.html` w przeglądarce albo uruchom lokalnie przez:

```bash
python -m http.server 8000
```

Następnie wejdź na `http://localhost:8000`.



## v1.9.0 — doprecyzowanie przygotowania ścian pod gładź / malowanie

Zmiany:
- zmieniono nazwę pozycji „Dodatkowe przygotowanie pod malowanie” na „Przygotowanie ścian pod gładź / malowanie (zdzieranie, szlifowanie)”,
- pozycja jest dodawana jako pierwsza w bloku Malowanie,
- zaktualizowano opis wariantu malowania w UI,
- zachowano stawki wariantów B/C: 18 zł/m² i 35 zł/m².

## v1.8.6 — parapety, płytki specjalne, zabezpieczenia malarskie

Dodano:
- osobne pozycje parapetów: demontaż, obsadzenie, obróbka i docinanie,
- dopłaty glazurnicze za mały format, cegiełkę, mozaikę, kit-kat/lamelki i jodełkę,
- rozbite zabezpieczenia malarskie: pełne, podłogi, parkiet, okna, drzwi, klatka/winda.

Zasada kosztorysowa: glify i parapety nie dublują się. Zabezpieczenie pełne stosuj zamiennie z zabezpieczeniami elementów.

## Funkcje
- obmiar pomieszczeń,
- moduły robót remontowych,
- kosztorys blokowy,
- zapis projektu do JSON,
- wczytanie projektu z JSON,
- eksport PDF przez tryb druku bez popupów.

## Eksport PDF
Kliknij `Eksport PDF`, następnie w oknie druku wybierz `Zapisz jako PDF`.

Wersja v1.3.4 nie używa `window.open()` i nie otwiera `about:blank`.


## v1.3.5 — cennik Warszawa / okolice
- Zaktualizowano domyślne stawki robocizny do wariantu sprzedażowego: dolny/środkowy segment rynku, bez stawek premium.
- Zmieniono klucz zapisu stawek na `rates_v135`, aby stare wartości z przeglądarki nie nadpisywały nowych domyślnych stawek.
- Import projektu nadal może odtworzyć stawki zapisane w projekcie.


## v1.4.0 — czas robocizny
- Dodano szacowanie czasu realizacji dla 1 osoby.
- Domyślne założenie: 8 h/dzień.
- Dodano opcjonalny pomocnik / większą obsadę oraz współczynnik trudności organizacyjnej.
- Wynik prezentowany w podsumowaniu kosztorysowym jako zakres dni roboczych.


## v1.4.1 — stabilizacja zapisu/importu
- Nazwa pliku JSON: numer oferty + nazwisko/firma klienta.
- Poprawiona klasyfikacja malowania po imporcie JSON.
- Print-mode PRO zachowany.

## v1.5.0 — historia ofert local-first

Aplikacja przechowuje historię ofert lokalnie w przeglądarce. Dane są dostępne tylko na tym komputerze i w tej samej przeglądarce. Zalecany backup: przycisk „Zapisz JSON”.

Funkcje:
- zapis oferty w historii,
- status oferty,
- wczytanie oferty z historii,
- usunięcie wpisu,
- automatyczny zapis do historii przy generowaniu PDF.


## v1.5.1 — wykończeniówka PRO

Dodano rozszerzenia usługowe:
- Tapetowanie z ręcznym obmiarem m².
- Rozszerzone LED w elektryce: punkt LED, taśma, lutowanie, profil.
- Serwis listew przypodłogowych: akrylowanie, malowanie, renowacja zakończeń i korekta łączeń.
- Serwis sztukaterii: renowacja łączeń, wygubienie uskoku, korekta starego akrylu/pęknięć.
- Tooltipy technologiczne dla nowych pól.


## v1.5.4 — serwis listew i sztukaterii

Zmiany:
- osobne aktywatory serwisu/renowacji dla listew przypodłogowych i sztukaterii,
- akrylowanie i malowanie listew liczone liniowo w mb,
- zakończenia, łączenia i uskoki liczone punktowo w szt,
- brak przeliczania serwisu bez zaznaczenia checkboxa serwisowego.


## v1.5.4 — hotfix sekcji niezależnych
- Nowe prace i serwis/renowacja w podłogach oraz sztukaterii działają jako niezależne sekcje.
- Nieaktywne sekcje są ukrywane zamiast wyszarzania.
- Posadzki i ściany/GK są ponownie osobnymi blokami, nie zagnieżdżają się w bloku podłóg.


## v1.5.5 — serwis listew: taśmowanie, akryl mb, malowanie renowacyjne
- Dodano taśmowanie ochronne przy listwach przypodłogowych liczone w mb.
- Poprawa akrylu sztukaterii liczona liniowo w mb.
- Dodano malowanie sztukaterii po renowacji liczone w mb.
- Łączenia i uskoki pozostają punktowe w szt.


## v1.6.1 — listwy / sztukateria PRO
- Dodano mnożniki wielkości listew i profili: mała, średnia, duża, premium.
- Ujednolicono logikę serwisu listew przypodłogowych i sztukaterii.
- Akrylowanie i malowanie pozostają liczone liniowo w mb.
- Łączenia, zakończenia i uskoki pozostają liczone punktowo w szt.
- LED elektryczny pozostaje w module Elektryka, a maskownice/profil dekoracyjny w Sztukaterii.


## v1.6.2 — korekta mnożników wielkości listew
- Ustawiono standard / średnie listwy jako punkt odniesienia ×1.00.
- Małe listwy/profil: ×0.90.
- Duże listwy/profil: ×1.25.
- Premium / bardzo wysokie lub szerokie: ×1.45.
- Mnożnik nadal dotyczy tylko malowania oraz renowacji połączeń/zakończeń/uskoków.


## v1.6.3 — Silikony / uszczelnienia
- Dodano sekcję silikonów w module Pomieszczenia mokre.
- Nowe silikonowanie liczone w mb.
- Wymiana silikonu liczona w mb jako operacja kompletna: wycięcie, remover, przygotowanie i nowa spoina.
- Poprawki punktowe liczone w szt.
- Oklejanie i zabezpieczenia są wliczone w stawkę operacji.
## v1.6.4 — Renowacja pomieszczeń mokrych
- rozdzielono nowe prace mokre od serwisu / renowacji,
- dodano niezależny checkbox „Renowacja pomieszczeń mokrych”,
- silikony / uszczelnienia liczą się tylko po aktywacji renowacji,
- zaznaczenie renowacji nie uruchamia glazury, płytek ani hydrauliki.



## v1.6.5 — Serwis / zaprawki malarskie
- Dodano niezależny tryb MALOWANIE → Serwis / zaprawki.
- Dodano naprawę punktową sufitu, zaprawkę malarską i zaprawkę rozszerzoną.
- Materiały domyślnie po stronie klienta.
- Tooltipy zawierają ostrzeżenie o możliwej widoczności napraw punktowych.


## v1.7.1 — PDF PRO+
- Druga strona PDF: „Zakres i technologia prac”.
- Opisy technologiczne generowane na podstawie aktywnych modułów.
- Tooltipy w UI pozostają krótkie, a PDF zawiera opisy ofertowe i ograniczenia technologiczne.

## v1.7.1 — PDF PRO++
PDF zawiera dynamiczną kartę „Zakres i technologia prac”, generowaną na podstawie aktywnych usług w kosztorysie. Karta opisuje zakres, ograniczenia technologiczne oraz ryzyka dla prac nowych, serwisowych i renowacyjnych.


### v1.8.5
Dodano generator umowy. Umowa jest drukowana/PDF z poziomu aplikacji i zawiera kosztorys jako załącznik oraz dynamiczny zakres technologiczny jako drugi załącznik.


## v1.8.5
Dodano wyburzanie ścian działowych oraz moduł montażu mebli / wyposażenia.
