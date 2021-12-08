# Osa 4 - Express-sovellusten testaaminen, käyttäjänhallinta

Rakennetaan REST-konventioiden mukainen back-end, jonka avulla voidaan lisätä, muokata ja poistaa blogeja bookmark-tyyppisenä listauksena. Toteutetaan kattava automatisoitu yksikkö- ja integraatiotestaus back-endin toiminnallisuuksille Jestin ja SuperTestin avulla. Lisätään sovellukseen käyttäjänhallinta, jolla yhdistetään lisätyt blogit ja käyttäjät toisiinsa MongoDB tietokannassa. Käyttäjänhallinnalla rajataan blogien lisäys ja poisto vain todennetuille käyttäjille, joilla on oikeus näihin operaatioihin. Rakennetaan lopuksi JSON Web Tokeneihin perustuva kirjautumisjärjestelmä käyttäjille. Toteutuksessa tietokantaan tallennetaan bcrypt kirjaston avulla luotu hash salasanasta, joka todennetaan jsonwebtoken kirjaston avulla.

### Sovelluksen rakenne ja testauksen alkeet
  * [Tehtävät 4.1 - 4.2](https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-1-4-2) - ([blogilista-backend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_4/blogilista-backend))
  * [Tehtävät 4.3 - 4.7](https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-3-4-7) - ([blogilista-backend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_4/blogilista-backend))

### Backendin testaaminen
  * [Tehtävät 4.8 - 4.12](https://fullstackopen.com/osa4/backendin_testaaminen#tehtavat-4-8-4-12) - ([blogilista-backend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_4/blogilista-backend))
  * [Tehtävät 4.13 - 4.14](https://fullstackopen.com/osa4/backendin_testaaminen#tehtavat-4-13-4-14) - ([blogilista-backend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_4/blogilista-backend))

### Token-perustainen kirjautuminen
  * [Tehtävät 4.15 - 4.23](https://fullstackopen.com/osa4/token_perustainen_kirjautuminen#tehtavat-4-15-4-23) - ([blogilista-backend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_4/blogilista-backend))
