# Kalkulator remonty v1.4.1

Lokalna aplikacja HTML + JS do kalkulacji kosztów robocizny remontowej.

## Uruchomienie
Otwórz `index.html` w przeglądarce albo uruchom lokalnie przez:

```bash
python -m http.server 8000
```

Następnie wejdź na `http://localhost:8000`.

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
