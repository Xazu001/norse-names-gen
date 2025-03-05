
# Nordic Name Generator

## Opis

**Nordic Name Generator** to aplikacja internetowa, która generuje losowe nordyckie imiona. Aplikacja oferuje użytkownikom możliwość wyboru płci imienia (męskie, żeńskie, bezpłciowe) oraz wyświetlania odpowiednich run dla wygenerowanego imienia.

Aplikacja wykorzystuje dane zebrane z strony o nordyckich imionach, umożliwiając generowanie nazw wraz z ich znaczeniem. Imiona są przypisane do trzech kategorii: **męskie**, **żeńskie** i **beznadziejne** (unisex). Dodatkowo, aplikacja umożliwia wyświetlanie imienia w formie run.

## Funkcje

- **Losowanie imienia**: Aplikacja losuje nordyckie imiona z trzech kategorii (męskie, żeńskie, bezpłciowe).
- **Wybór płci**: Możesz wybrać, czy chcesz otrzymać imię męskie, żeńskie, czy uniseksowe.
- **Znaczenie imion**: Każde wygenerowane imię ma przypisane znaczenie, które jest wyświetlane obok imienia.
- **Runy**: Aplikacja zamienia wygenerowane imię na formę runiczną, wyświetlając ją obok imienia w alfabecie łacińskim.
- **Przycisk do odświeżenia**: Możesz kliknąć przycisk, aby wygenerować nowe losowe imię.
  
## Instalacja

1. **Klonowanie repozytorium**:
   ```
   git clone https://github.com/twoje-repozytorium.git
   ```

2. **Zainstalowanie zależności**:
   Zainstaluj wszystkie niezbędne zależności przy użyciu npm lub yarn.
   ```
   npm install
   # lub
   yarn install
   ```

3. **Uruchomienie aplikacji**:
   Aby uruchomić aplikację w trybie deweloperskim:
   ```
   npm run dev
   # lub
   yarn dev
   ```

4. **Uruchomienie w produkcji**:
   Aby uruchomić aplikację w trybie produkcyjnym:
   ```
   npm run build
   npm run start
   # lub
   yarn build
   yarn start
   ```

## Technologie

- **React**: Używane do budowy interfejsu użytkownika.
- **Remix**: Framework do tworzenia aplikacji webowych.
- **Cheerio**: Do skrobania danych z HTML.
- **Runy**: Zamiana imienia na jego runiczną formę.

## Licencja

Ten projekt jest dostępny na licencji MIT. Zobacz [LICENSE](LICENSE) w celu uzyskania szczegółowych informacji.
