# Osa 6 - Sovelluksen tilan hallinta Redux-kirjastolla

Tutustutaan Flux-arkkitehtuuriin ja Redux-kirjastoon. Kehitetään osan yksi [unicafe](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_1/unicafe) appista Redux-storeen ja reducereihin perustuva versio ja laaditaan sille yksikkötestit. Otetaan käyttöön Redux Toolkit ja Redux DevTools ja toteutetaan Redux Toolkitin configureStore() funktiolla useampaan eri reduceriin perustuva store, jota käytetään Redux-kirjaston hook-apin useSelector() ja useDispatch() funktioiden välityksellä. Yhdistetään lopuksi Redux-sovellus tietokantaan ja perehdytään asynkronisten actioneiden käyttöön Redux Thunk kirjastolla ja kehitetään osan yksi [anekdootit](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_1/anekdootit) appista tietokantaan integroitu Redux-versio. Viimeiseksi tarkastellaan vielä vanhempaa Reduxin connect() funktioon perustuvaa tapaa välittää sovelluksen komponenteille storen tilaa ja reducerien actioneita suoraan propseina.

### Flux-arkkitehtuuri ja Redux
  * [Tehtävät 6.1 - 6.2](https://fullstackopen.com/osa6/flux_arkkitehtuuri_ja_redux#tehtavat-6-1-6-2) - ([unicafe-redux](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_6/unicafe-redux))
  * [Tehtävät 6.3 - 6.8](https://fullstackopen.com/osa6/flux_arkkitehtuuri_ja_redux#tehtavat-6-3-6-8) - ([redux-anecdotes](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_6/redux-anecdotes))

### Monta reduseria
  * [Tehtävät 6.9 - 6.12](https://fullstackopen.com/osa6/monta_reduseria#tehtavat-6-9-6-12) - ([redux-anecdotes](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_6/redux-anecdotes))

### Redux-sovelluksen kommunikointi palvelimen kanssa

  * [Tehtävät 6.13 - 6.14](https://fullstackopen.com/osa6/redux_sovelluksen_kommunikointi_palvelimen_kanssa#tehtavat-6-13-6-14) - ([redux-anecdotes](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_6/redux-anecdotes))
  * [Tehtävät 6.15 - 6.18](https://fullstackopen.com/osa6/redux_sovelluksen_kommunikointi_palvelimen_kanssa#tehtavat-6-15-6-18) - ([redux-anecdotes](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_6/redux-anecdotes))

### Connect

  * [Tehtävät 6.19 - 6.21](https://fullstackopen.com/osa6/connect#tehtavat-6-19-6-21) - ([redux-anecdotes](https://github.com/j-pietila/FullStackOpen-2021/tree/main/Part_6/redux-anecdotes))
