# Osa 5 - React-sovelluksen testaaminen

Rakennetaan front-end toteutus osan neljä [blogilistan](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_4/blogilista-backend) back-endille. Toteutetaan sisäänkirjautuminen lomakkeella ja sille rakennetulla palautusfunktiolla, ja käyttäjänhallinta tallentamalla onnistuneen sisäänkirjautumisen palauttama token ja käyttäjätiedot selaimen local storageen. Käytetään sivun vaihtoehtoisten renderöintien toteutuksessa komponenteissa useRef-hookia ja vanhempi-lapsi rakennetta, jossa ylätason komponentti tuo näkyvyyttä säätelevän toiminnallisuuden omille lapsi-komponenteilleen. Konfiguroidaan komponenttien propsien tyypit ja pakollisuus prop-types kirjastolla, ja konfiguroidaan ESlint react-appin ja testaustyökalujen kanssa toimivaksi. Lopuksi syvennytään front-endin komponenttien automaattiseen yksikkötestaukseen Jestin kanssa, konfiguroidaan Cypress koko sovelluksen end to end -testaukseen ja kirjoitetaan kattava end to end testausautomaatio blogilistalle.

### Kirjautuminen frontendissä
  * [Tehtävät 5.1 - 5.4](https://fullstackopen.com/osa5/kirjautuminen_frontendissa#tehtavat-5-1-5-4) - ([blogilista-frontend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_5/bloglist-frontend))

### props.children ja proptypet
  * [Tehtävät 5.5 - 5.10](https://fullstackopen.com/osa5/props_children_ja_proptypet#tehtavat-5-5-5-10) - ([blogilista-frontend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_5/bloglist-frontend))
  * [Tehtävät 5.11 - 5.12](https://fullstackopen.com/osa5/props_children_ja_proptypet#tehtavat-5-11-5-12) - ([blogilista-frontend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_5/bloglist-frontend))

### React-sovellusten testaaminen
  * [Tehtävät 5.13 - 5.16](https://fullstackopen.com/osa5/react_sovellusten_testaaminen#tehtavat-5-13-5-16) - ([blogilista-frontend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_5/bloglist-frontend))

### End to end -testaus
  * [Tehtävät 5.17 - 5.22](https://fullstackopen.com/osa5/end_to_end_testaus#tehtavat-5-17-5-22) - ([blogilista-frontend](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_5/bloglist-frontend))
