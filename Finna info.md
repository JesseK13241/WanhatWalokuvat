Linkkejä:
https://www.kiwi.fi/display/Finna/Finnan+avoin+rajapinta
  - Yleistä tietoa rajapinnan käytöstä ja esimerkkejä käytöstä, pääasiallinen lähde 
    tämän tiedoston tiedoille 
https://api.finna.fi/swagger-ui/?url=%2Fapi%2Fv1%3Fswagger
  - Tarkempi dokumentaatio

Meidän projektille oleelliset tiedot:

  Haku muotoa "https://api.finna.fi/v1/search?<parametrit>"
  Parametrit sisältävät "filter", "field", "page" ja "limit" -kentät

  "Filter" kentässä pystyy filtteröimään kuvia haluamillaan filttereillä.
  OR tai NOT-rajausta voi käyttää lisäämällä fasetin eteen '~' (OR) tai '-' (NOT).  
  Meillä käytössä olevat filtterit ovat:
    "usage_rights_ext_str_mv", käyttöoikeudet
    "online_boolean", kuva internetissä
    "format", sisällön aineistotyyppi, monitasoinen
    "search_daterange_mv" ja "search_daterange_mv_type", hakeminen vuosiluvulla ja tyypin spesifointi

  "Field" kentässä kerrotaan mitkä kentät halutaan haun palauttavan.
  Meillä käytössä olevat kentät:
    "authors", kaikki tekijät
    "title", nimi
    "images", kuvat (ehkä turha, haemme kuvan id:n kautta)
    "id", 
    "year", julkaisuvuosi
    "location", paikka
    "recordPage", linkki aineistoon finnan sivulla
    "buildings", organisaatio/sijanti, monitasoinen

  Lista mahdollisista "field" tai "filter" -kenttien arvoista:
  https://www.kiwi.fi/display/Finna/Kenttien+mappaukset+eri+formaateista+Finnan+indeksiin 

  "Page" kertoo sivunumeron, "limit" taas kuinka monta kuvaa yksi sivu sisältää
  Esim. "limit=20" ja "page=3" palauttaa hakutuloksista kolmannen sivun, joka sisältää 20 kuvaa,
  toisin sanoen jos parametreja vastaavia kuvia olisi 100, palautettaisiin niistä kuvat 41-60

  Haku palautta myös oletuksena osumien määrän. Tätä tietoa käyttämällä pystytään hakemaan yksittäinen
  satunnainen kuva helposti:
    1. Haetaan halutuilla filttereillä osumia ja asetetaan limit=0, jotta saadaan vain osumien määrä
    2. Haetaan uudestaan samoilla filttereillä, mutta asetetaan limit=1 ja sivun arvoksi
      asetetaan satunnainen arvo nollan ja osumien määrä väliltä, eli
      limit=Math.floor(Math.random() * Math.min(resultCount, 100000))
  Haetaan siis yhden kuvan mittaisista sivuista (limit=1) satunnainen sivu (page=n)
  HUOM. Finna palauttaa max 100000 kuvaa!
  


Käyttöoikeuksista: 
  Haemme kuvia joilla on oikeuksina joko "Täysin vapaat" tai "Täysin vapaat, lähde nimettävä"
  Eri organisaatioilla eri vaatimuksia nimeämisen suhteen, nimeämme varmuuden vuoksi 
  kaikissa kuvissa: tekijät, organisaatiot ja aliorganisaatiot

Ongelmia:

Eri organisaatiolla eri tapoja arkistoida aineistoja, esim.
  - Aineistotyypit eivät ole yhdenmukaisia kaikilla, täytyy pysytellä korkeamman
    tason aineistotyypeissä saadakseen kaikki kuvat:
      - 1/Image/Photo/, tarkoittaa valokuvia, kaikki eivät kuitenkaan käytä tätä
      - 0/Image/, tarkoittaa kaikkia kuvia, mutta sisältää esimerkiksi kuvia esineistä

  - Authors kentässä eroja, vaikeuttaa tekijöiden niemämistä etenkin jos tekijöihin sisältyy
    myös kokoelman omistajat

  Mahdollisia ratkaisuja: 
    - Haetaan korkeammalla tasolla kaikki kuvat, rajataan NOT ("-") filttereillä pois
      alatason aineistotyypeistä ne joita emme halua
    - Rajataan organisaatioita, esim. jos suurin osa kuvista tulee muutamasta organisaatiosta,
      keskitytään niihin jotta saataisin yhtänäisempää dataa
      - Organisaatiot joista suurin osa kuvista saadaan kun haetaan 
        asianmukaisilla käyttöoikeuksilla kaikki kuvat:
        1. Museovirasto - 278 167
        2. Tampereen historialliset museot - 142 158
        3. Lusto, Suomen metsämuseo - 75 126 
        4. Helsingin kaupunginmuseo - 72 384
      - Museovirastolla erilaisia kokoelmia


Ongelmanratkaisumenetelmiä:

  Kokeile hakufilttereitä: https://www.finna.fi/Search/Advanced
    - Urlissa näkee mitä filttereitä finnan advanced-haku käyttää
    - Esim. https://www.urldecoder.org/ parantaa luettavuutta

  Aineistojen sivuilla "Finna API" nappi joka näyttää kuvan peruskentät JSON-muodossa, 
  esimerkkejä kentistä joiden avulla voi filtteröidä hakua

  Lue tiedoston alussa olevat linkit, tai hae (Ctrl-F) niistä haluamaasi kohtaa

  Debuggaa ohjelmakoodin puolella, tulosta konsoliin haettu data ja tarkastele muotoa.
  Huom. käyttöliittymäkomponentit tulostavat selaimen konsoliin (Ctrtl-F12) ja 
  serverkomponentit konsoliin, jossa ohjelma on käynnissä











