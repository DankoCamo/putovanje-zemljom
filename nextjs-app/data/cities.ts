import { CitiesMap } from '@/lib/types'

export const CITIES: CitiesMap = {
  // ============ EUROPE ============
  HR: [
    { name:{hr:"Zagreb",en:"Zagreb",de:"Zagreb"}, pop:767000, metro:1200000, capital:true },
    { name:{hr:"Split",en:"Split",de:"Split"}, pop:161000, metro:300000 },
    { name:{hr:"Rijeka",en:"Rijeka",de:"Rijeka"}, pop:108000, metro:200000 }
  ],
  SI: [
    { name:{hr:"Ljubljana",en:"Ljubljana",de:"Ljubljana"}, pop:285000, metro:540000, capital:true },
    { name:{hr:"Maribor",en:"Maribor",de:"Maribor"}, pop:95000, metro:165000 },
    { name:{hr:"Celje",en:"Celje",de:"Celje"}, pop:37000, metro:65000 }
  ],
  RS: [
    { name:{hr:"Beograd",en:"Belgrade",de:"Belgrad"}, pop:1170000, metro:1690000, capital:true },
    { name:{hr:"Novi Sad",en:"Novi Sad",de:"Novi Sad"}, pop:307000, metro:370000 },
    { name:{hr:"Niš",en:"Niš",de:"Niš"}, pop:183000, metro:260000 }
  ],
  BA: [
    { name:{hr:"Sarajevo",en:"Sarajevo",de:"Sarajevo"}, pop:275000, metro:555000, capital:true },
    { name:{hr:"Banja Luka",en:"Banja Luka",de:"Banja Luka"}, pop:185000, metro:240000 },
    { name:{hr:"Tuzla",en:"Tuzla",de:"Tuzla"}, pop:111000, metro:180000 }
  ],
  ME: [
    { name:{hr:"Podgorica",en:"Podgorica",de:"Podgorica"}, pop:150000, metro:190000, capital:true },
    { name:{hr:"Nikšić",en:"Nikšić",de:"Nikšić"}, pop:57000, metro:70000 },
    { name:{hr:"Pljevlja",en:"Pljevlja",de:"Pljevlja"}, pop:19000, metro:26000 }
  ],
  XK: [
    { name:{hr:"Priština",en:"Pristina",de:"Pristina"}, pop:200000, metro:480000, capital:true },
    { name:{hr:"Prizren",en:"Prizren",de:"Prizren"}, pop:95000, metro:180000 },
    { name:{hr:"Peć",en:"Peja",de:"Peja"}, pop:49000, metro:95000 }
  ],
  AL: [
    { name:{hr:"Tirana",en:"Tirana",de:"Tirana"}, pop:418000, metro:905000, capital:true },
    { name:{hr:"Drač",en:"Durrës",de:"Durrës"}, pop:175000, metro:280000 },
    { name:{hr:"Vlora",en:"Vlorë",de:"Vlorë"}, pop:89000, metro:141000 }
  ],
  MK: [
    { name:{hr:"Skoplje",en:"Skopje",de:"Skopje"}, pop:545000, metro:640000, capital:true },
    { name:{hr:"Bitola",en:"Bitola",de:"Bitola"}, pop:75000, metro:95000 },
    { name:{hr:"Kumanovo",en:"Kumanovo",de:"Kumanovo"}, pop:75000, metro:106000 }
  ],
  GR: [
    { name:{hr:"Atena",en:"Athens",de:"Athen"}, pop:664000, metro:3640000, capital:true },
    { name:{hr:"Solun",en:"Thessaloniki",de:"Thessaloniki"}, pop:325000, metro:1012000 },
    { name:{hr:"Patras",en:"Patras",de:"Patras"}, pop:168000, metro:215000 }
  ],
  BG: [
    { name:{hr:"Sofija",en:"Sofia",de:"Sofia"}, pop:1240000, metro:1680000, capital:true },
    { name:{hr:"Plovdiv",en:"Plovdiv",de:"Plowdiw"}, pop:346000, metro:675000 },
    { name:{hr:"Varna",en:"Varna",de:"Warna"}, pop:336000, metro:475000 }
  ],
  RO: [
    { name:{hr:"Bukurešt",en:"Bucharest",de:"Bukarest"}, pop:1716000, metro:2270000, capital:true },
    { name:{hr:"Cluj-Napoca",en:"Cluj-Napoca",de:"Cluj-Napoca"}, pop:286000, metro:410000 },
    { name:{hr:"Temišvar",en:"Timișoara",de:"Temeswar"}, pop:251000, metro:356000 }
  ],
  HU: [
    { name:{hr:"Budimpešta",en:"Budapest",de:"Budapest"}, pop:1690000, metro:3300000, capital:true },
    { name:{hr:"Debrecin",en:"Debrecen",de:"Debrezin"}, pop:200000, metro:240000 },
    { name:{hr:"Segedin",en:"Szeged",de:"Szegedin"}, pop:157000, metro:205000 }
  ],
  AT: [
    { name:{hr:"Beč",en:"Vienna",de:"Wien"}, pop:1980000, metro:2950000, capital:true },
    { name:{hr:"Graz",en:"Graz",de:"Graz"}, pop:300000, metro:445000 },
    { name:{hr:"Linz",en:"Linz",de:"Linz"}, pop:210000, metro:790000 }
  ],
  CH: [
    { name:{hr:"Bern",en:"Bern",de:"Bern"}, pop:134000, metro:422000, capital:true },
    { name:{hr:"Zürich",en:"Zurich",de:"Zürich"}, pop:440000, metro:1420000 },
    { name:{hr:"Ženeva",en:"Geneva",de:"Genf"}, pop:205000, metro:1015000 }
  ],
  LI: [
    { name:{hr:"Vaduz",en:"Vaduz",de:"Vaduz"}, pop:5700, capital:true },
    { name:{hr:"Schaan",en:"Schaan",de:"Schaan"}, pop:6000 },
    { name:{hr:"Balzers",en:"Balzers",de:"Balzers"}, pop:4600 }
  ],
  DE: [
    { name:{hr:"Berlin",en:"Berlin",de:"Berlin"}, pop:3780000, metro:6140000, capital:true },
    { name:{hr:"Hamburg",en:"Hamburg",de:"Hamburg"}, pop:1910000, metro:5400000 },
    { name:{hr:"München",en:"Munich",de:"München"}, pop:1510000, metro:6000000 }
  ],
  FR: [
    { name:{hr:"Pariz",en:"Paris",de:"Paris"}, pop:2100000, metro:12400000, capital:true },
    { name:{hr:"Marseille",en:"Marseille",de:"Marseille"}, pop:873000, metro:1890000 },
    { name:{hr:"Lyon",en:"Lyon",de:"Lyon"}, pop:523000, metro:2325000 }
  ],
  ES: [
    { name:{hr:"Madrid",en:"Madrid",de:"Madrid"}, pop:3280000, metro:6750000, capital:true },
    { name:{hr:"Barcelona",en:"Barcelona",de:"Barcelona"}, pop:1640000, metro:5600000 },
    { name:{hr:"Valencija",en:"Valencia",de:"Valencia"}, pop:800000, metro:1580000 }
  ],
  PT: [
    { name:{hr:"Lisabon",en:"Lisbon",de:"Lissabon"}, pop:545000, metro:2960000, capital:true },
    { name:{hr:"Porto",en:"Porto",de:"Porto"}, pop:231000, metro:1740000 },
    { name:{hr:"Vila Nova de Gaia",en:"Vila Nova de Gaia",de:"Vila Nova de Gaia"}, pop:302000, metro:1740000 }
  ],
  IT: [
    { name:{hr:"Rim",en:"Rome",de:"Rom"}, pop:2750000, metro:4350000, capital:true },
    { name:{hr:"Milano",en:"Milan",de:"Mailand"}, pop:1370000, metro:4330000 },
    { name:{hr:"Napulj",en:"Naples",de:"Neapel"}, pop:910000, metro:3080000 }
  ],
  SM: [
    { name:{hr:"San Marino",en:"San Marino",de:"San Marino"}, pop:4000, capital:true },
    { name:{hr:"Serravalle",en:"Serravalle",de:"Serravalle"}, pop:10900 },
    { name:{hr:"Borgo Maggiore",en:"Borgo Maggiore",de:"Borgo Maggiore"}, pop:6500 }
  ],
  VA: [
    { name:{hr:"Vatikan",en:"Vatican City",de:"Vatikanstadt"}, pop:800, capital:true }
  ],
  MT: [
    { name:{hr:"Valletta",en:"Valletta",de:"Valletta"}, pop:5700, metro:400000, capital:true },
    { name:{hr:"Birkirkara",en:"Birkirkara",de:"Birkirkara"}, pop:24500 },
    { name:{hr:"Mosta",en:"Mosta",de:"Mosta"}, pop:23000 }
  ],
  MC: [
    { name:{hr:"Monako",en:"Monaco",de:"Monaco"}, pop:39000, capital:true }
  ],
  AD: [
    { name:{hr:"Andorra la Vella",en:"Andorra la Vella",de:"Andorra la Vella"}, pop:22600, capital:true },
    { name:{hr:"Escaldes-Engordany",en:"Escaldes-Engordany",de:"Escaldes-Engordany"}, pop:14400 },
    { name:{hr:"Encamp",en:"Encamp",de:"Encamp"}, pop:8000 }
  ],
  BE: [
    { name:{hr:"Bruxelles",en:"Brussels",de:"Brüssel"}, pop:1240000, metro:2100000, capital:true },
    { name:{hr:"Antwerpen",en:"Antwerp",de:"Antwerpen"}, pop:535000, metro:1215000 },
    { name:{hr:"Gent",en:"Ghent",de:"Gent"}, pop:265000, metro:560000 }
  ],
  NL: [
    { name:{hr:"Amsterdam",en:"Amsterdam",de:"Amsterdam"}, pop:925000, metro:2480000, capital:true },
    { name:{hr:"Rotterdam",en:"Rotterdam",de:"Rotterdam"}, pop:670000, metro:1485000 },
    { name:{hr:"Haag",en:"The Hague",de:"Den Haag"}, pop:560000, metro:1060000 }
  ],
  LU: [
    { name:{hr:"Luxembourg",en:"Luxembourg City",de:"Luxemburg"}, pop:135000, metro:195000, capital:true },
    { name:{hr:"Esch-sur-Alzette",en:"Esch-sur-Alzette",de:"Esch an der Alzette"}, pop:36700 },
    { name:{hr:"Differdange",en:"Differdange",de:"Differdingen"}, pop:28500 }
  ],
  GB: [
    { name:{hr:"London",en:"London",de:"London"}, pop:8940000, metro:14800000, capital:true },
    { name:{hr:"Birmingham",en:"Birmingham",de:"Birmingham"}, pop:1150000, metro:2910000 },
    { name:{hr:"Manchester",en:"Manchester",de:"Manchester"}, pop:553000, metro:2870000 }
  ],
  IE: [
    { name:{hr:"Dublin",en:"Dublin",de:"Dublin"}, pop:592000, metro:1460000, capital:true },
    { name:{hr:"Cork",en:"Cork",de:"Cork"}, pop:224000, metro:305000 },
    { name:{hr:"Limerick",en:"Limerick",de:"Limerick"}, pop:95000, metro:195000 }
  ],
  IS: [
    { name:{hr:"Reykjavík",en:"Reykjavík",de:"Reykjavík"}, pop:139000, metro:237000, capital:true },
    { name:{hr:"Kópavogur",en:"Kópavogur",de:"Kópavogur"}, pop:39000 },
    { name:{hr:"Hafnarfjörður",en:"Hafnarfjörður",de:"Hafnarfjörður"}, pop:30000 }
  ],
  NO: [
    { name:{hr:"Oslo",en:"Oslo",de:"Oslo"}, pop:710000, metro:1060000, capital:true },
    { name:{hr:"Bergen",en:"Bergen",de:"Bergen"}, pop:287000, metro:430000 },
    { name:{hr:"Stavanger",en:"Stavanger",de:"Stavanger"}, pop:147000, metro:360000 }
  ],
  SE: [
    { name:{hr:"Stockholm",en:"Stockholm",de:"Stockholm"}, pop:980000, metro:2400000, capital:true },
    { name:{hr:"Göteborg",en:"Gothenburg",de:"Göteborg"}, pop:605000, metro:1070000 },
    { name:{hr:"Malmö",en:"Malmö",de:"Malmö"}, pop:360000, metro:740000 }
  ],
  FI: [
    { name:{hr:"Helsinki",en:"Helsinki",de:"Helsinki"}, pop:665000, metro:1570000, capital:true },
    { name:{hr:"Espoo",en:"Espoo",de:"Espoo"}, pop:310000 },
    { name:{hr:"Tampere",en:"Tampere",de:"Tampere"}, pop:250000, metro:395000 }
  ],
  DK: [
    { name:{hr:"Kopenhagen",en:"Copenhagen",de:"Kopenhagen"}, pop:660000, metro:2100000, capital:true },
    { name:{hr:"Aarhus",en:"Aarhus",de:"Aarhus"}, pop:300000, metro:870000 },
    { name:{hr:"Odense",en:"Odense",de:"Odense"}, pop:182000, metro:260000 }
  ],
  EE: [
    { name:{hr:"Tallinn",en:"Tallinn",de:"Tallinn"}, pop:455000, metro:650000, capital:true },
    { name:{hr:"Tartu",en:"Tartu",de:"Tartu"}, pop:97000, metro:135000 },
    { name:{hr:"Narva",en:"Narva",de:"Narva"}, pop:53000 }
  ],
  LV: [
    { name:{hr:"Riga",en:"Riga",de:"Riga"}, pop:605000, metro:1020000, capital:true },
    { name:{hr:"Daugavpils",en:"Daugavpils",de:"Daugavpils"}, pop:79000 },
    { name:{hr:"Liepāja",en:"Liepāja",de:"Liepāja"}, pop:66000 }
  ],
  LT: [
    { name:{hr:"Vilnius",en:"Vilnius",de:"Wilna"}, pop:595000, metro:840000, capital:true },
    { name:{hr:"Kaunas",en:"Kaunas",de:"Kaunas"}, pop:295000, metro:385000 },
    { name:{hr:"Klaipėda",en:"Klaipėda",de:"Klaipėda"}, pop:150000, metro:200000 }
  ],
  PL: [
    { name:{hr:"Varšava",en:"Warsaw",de:"Warschau"}, pop:1860000, metro:3270000, capital:true },
    { name:{hr:"Krakov",en:"Kraków",de:"Krakau"}, pop:804000, metro:1420000 },
    { name:{hr:"Łódź",en:"Łódź",de:"Łódź"}, pop:665000, metro:1085000 }
  ],
  CZ: [
    { name:{hr:"Prag",en:"Prague",de:"Prag"}, pop:1380000, metro:2710000, capital:true },
    { name:{hr:"Brno",en:"Brno",de:"Brünn"}, pop:395000, metro:625000 },
    { name:{hr:"Ostrava",en:"Ostrava",de:"Ostrau"}, pop:280000, metro:965000 }
  ],
  SK: [
    { name:{hr:"Bratislava",en:"Bratislava",de:"Pressburg"}, pop:475000, metro:675000, capital:true },
    { name:{hr:"Košice",en:"Košice",de:"Kaschau"}, pop:228000, metro:345000 },
    { name:{hr:"Prešov",en:"Prešov",de:"Prešov"}, pop:85000 }
  ],
  BY: [
    { name:{hr:"Minsk",en:"Minsk",de:"Minsk"}, pop:2020000, metro:2500000, capital:true },
    { name:{hr:"Gomel",en:"Gomel",de:"Homel"}, pop:505000 },
    { name:{hr:"Mogilev",en:"Mogilev",de:"Mahiljou"}, pop:357000 }
  ],
  UA: [
    { name:{hr:"Kijev",en:"Kyiv",de:"Kiew"}, pop:2960000, metro:3375000, capital:true },
    { name:{hr:"Harkov",en:"Kharkiv",de:"Charkiw"}, pop:1420000, metro:1710000 },
    { name:{hr:"Odesa",en:"Odesa",de:"Odessa"}, pop:1000000, metro:1200000 }
  ],
  MD: [
    { name:{hr:"Kišinjev",en:"Chișinău",de:"Chișinău"}, pop:685000, metro:820000, capital:true },
    { name:{hr:"Tiraspol",en:"Tiraspol",de:"Tiraspol"}, pop:130000 },
    { name:{hr:"Balți",en:"Bălți",de:"Bălți"}, pop:97000 }
  ],
  RU: [
    { name:{hr:"Moskva",en:"Moscow",de:"Moskau"}, pop:13100000, metro:21500000, capital:true },
    { name:{hr:"Sankt-Peterburg",en:"Saint Petersburg",de:"St. Petersburg"}, pop:5600000, metro:7050000 },
    { name:{hr:"Novosibirsk",en:"Novosibirsk",de:"Nowosibirsk"}, pop:1630000, metro:1980000 }
  ],

  // ============ ASIA ============
  TR: [
    { name:{hr:"Ankara",en:"Ankara",de:"Ankara"}, pop:5750000, metro:5865000, capital:true },
    { name:{hr:"Istanbul",en:"Istanbul",de:"Istanbul"}, pop:15650000, metro:16050000 },
    { name:{hr:"Izmir",en:"İzmir",de:"Izmir"}, pop:3050000, metro:4395000 }
  ],
  GE: [
    { name:{hr:"Tbilisi",en:"Tbilisi",de:"Tiflis"}, pop:1200000, metro:1480000, capital:true },
    { name:{hr:"Batumi",en:"Batumi",de:"Batumi"}, pop:170000, metro:205000 },
    { name:{hr:"Kutaisi",en:"Kutaisi",de:"Kutaissi"}, pop:135000 }
  ],
  AM: [
    { name:{hr:"Erevan",en:"Yerevan",de:"Eriwan"}, pop:1090000, metro:1260000, capital:true },
    { name:{hr:"Gyumri",en:"Gyumri",de:"Gjumri"}, pop:114000 },
    { name:{hr:"Vanadzor",en:"Vanadzor",de:"Wanadsor"}, pop:83000 }
  ],
  AZ: [
    { name:{hr:"Baku",en:"Baku",de:"Baku"}, pop:2310000, metro:2940000, capital:true },
    { name:{hr:"Ganja",en:"Ganja",de:"Gəncə"}, pop:335000 },
    { name:{hr:"Sumqayit",en:"Sumqayit",de:"Sumqayit"}, pop:355000 }
  ],
  IR: [
    { name:{hr:"Teheran",en:"Tehran",de:"Teheran"}, pop:9260000, metro:15700000, capital:true },
    { name:{hr:"Mashhad",en:"Mashhad",de:"Maschhad"}, pop:3370000, metro:3580000 },
    { name:{hr:"Isfahan",en:"Isfahan",de:"Isfahan"}, pop:2220000, metro:2940000 }
  ],
  IQ: [
    { name:{hr:"Bagdad",en:"Baghdad",de:"Bagdad"}, pop:7180000, metro:8125000, capital:true },
    { name:{hr:"Basra",en:"Basra",de:"Basra"}, pop:2600000, metro:4050000 },
    { name:{hr:"Mosul",en:"Mosul",de:"Mossul"}, pop:1690000, metro:2500000 }
  ],
  SY: [
    { name:{hr:"Damask",en:"Damascus",de:"Damaskus"}, pop:2500000, metro:3900000, capital:true },
    { name:{hr:"Alep",en:"Aleppo",de:"Aleppo"}, pop:2100000, metro:4100000 },
    { name:{hr:"Homs",en:"Homs",de:"Homs"}, pop:775000, metro:1500000 }
  ],
  LB: [
    { name:{hr:"Bejrut",en:"Beirut",de:"Beirut"}, pop:360000, metro:2420000, capital:true },
    { name:{hr:"Tripoli",en:"Tripoli",de:"Tripoli"}, pop:230000, metro:730000 },
    { name:{hr:"Sidon",en:"Sidon",de:"Sidon"}, pop:80000, metro:260000 }
  ],
  IL: [
    { name:{hr:"Jeruzalem",en:"Jerusalem",de:"Jerusalem"}, pop:990000, metro:1250000, capital:true },
    { name:{hr:"Tel Aviv",en:"Tel Aviv",de:"Tel Aviv"}, pop:475000, metro:4060000 },
    { name:{hr:"Haifa",en:"Haifa",de:"Haifa"}, pop:285000, metro:1080000 }
  ],
  JO: [
    { name:{hr:"Aman",en:"Amman",de:"Amman"}, pop:4060000, metro:4650000, capital:true },
    { name:{hr:"Zarqa",en:"Zarqa",de:"Zarqa"}, pop:640000, metro:1500000 },
    { name:{hr:"Irbid",en:"Irbid",de:"Irbid"}, pop:570000, metro:2040000 }
  ],
  SA: [
    { name:{hr:"Rijad",en:"Riyadh",de:"Riad"}, pop:7680000, metro:8000000, capital:true },
    { name:{hr:"Jeddah",en:"Jeddah",de:"Dschidda"}, pop:4780000, metro:5200000 },
    { name:{hr:"Mekka",en:"Mecca",de:"Mekka"}, pop:2040000, metro:2385000 }
  ],
  YE: [
    { name:{hr:"Sana'a",en:"Sanaa",de:"Sanaa"}, pop:3290000, metro:3500000, capital:true },
    { name:{hr:"Aden",en:"Aden",de:"Aden"}, pop:980000, metro:1080000 },
    { name:{hr:"Taiz",en:"Taiz",de:"Taizz"}, pop:620000 }
  ],
  OM: [
    { name:{hr:"Maskat",en:"Muscat",de:"Maskat"}, pop:1720000, metro:1560000, capital:true },
    { name:{hr:"Seeb",en:"Seeb",de:"Seeb"}, pop:820000 },
    { name:{hr:"Salalah",en:"Salalah",de:"Salala"}, pop:340000 }
  ],
  AE: [
    { name:{hr:"Abu Dhabi",en:"Abu Dhabi",de:"Abu Dhabi"}, pop:1480000, metro:1810000, capital:true },
    { name:{hr:"Dubai",en:"Dubai",de:"Dubai"}, pop:3600000, metro:3600000 },
    { name:{hr:"Sharjah",en:"Sharjah",de:"Schardscha"}, pop:1680000, metro:2400000 }
  ],
  QA: [
    { name:{hr:"Doha",en:"Doha",de:"Doha"}, pop:2380000, metro:2400000, capital:true },
    { name:{hr:"Al Rayyan",en:"Al Rayyan",de:"Ar-Rayyan"}, pop:605000 },
    { name:{hr:"Al Wakrah",en:"Al Wakrah",de:"Al Wakrah"}, pop:300000 }
  ],
  BH: [
    { name:{hr:"Manama",en:"Manama",de:"Manama"}, pop:160000, metro:700000, capital:true },
    { name:{hr:"Riffa",en:"Riffa",de:"Riffa"}, pop:195000 },
    { name:{hr:"Muharraq",en:"Muharraq",de:"Muharraq"}, pop:177000 }
  ],
  KW: [
    { name:{hr:"Kuvajt",en:"Kuwait City",de:"Kuwait-Stadt"}, pop:60000, metro:2990000, capital:true },
    { name:{hr:"Al Ahmadi",en:"Al Ahmadi",de:"al-Ahmadi"}, pop:638000 },
    { name:{hr:"Hawalli",en:"Hawalli",de:"Hawalli"}, pop:165000, metro:600000 }
  ],
  AF: [
    { name:{hr:"Kabul",en:"Kabul",de:"Kabul"}, pop:4600000, metro:5270000, capital:true },
    { name:{hr:"Kandahar",en:"Kandahar",de:"Kandahar"}, pop:615000 },
    { name:{hr:"Herat",en:"Herat",de:"Herat"}, pop:575000 }
  ],
  PK: [
    { name:{hr:"Islamabad",en:"Islamabad",de:"Islamabad"}, pop:1015000, metro:1200000, capital:true },
    { name:{hr:"Karachi",en:"Karachi",de:"Karatschi"}, pop:17240000, metro:20300000 },
    { name:{hr:"Lahore",en:"Lahore",de:"Lahore"}, pop:13100000, metro:13540000 }
  ],
  IN: [
    { name:{hr:"New Delhi",en:"New Delhi",de:"Neu-Delhi"}, pop:257000, metro:32940000, capital:true },
    { name:{hr:"Mumbai",en:"Mumbai",de:"Mumbai"}, pop:12480000, metro:21670000 },
    { name:{hr:"Delhi",en:"Delhi",de:"Delhi"}, pop:16790000, metro:32940000 }
  ],
  NP: [
    { name:{hr:"Katmandu",en:"Kathmandu",de:"Kathmandu"}, pop:860000, metro:3050000, capital:true },
    { name:{hr:"Pokhara",en:"Pokhara",de:"Pokhara"}, pop:415000 },
    { name:{hr:"Lalitpur",en:"Lalitpur",de:"Lalitpur"}, pop:294000 }
  ],
  BT: [
    { name:{hr:"Thimphu",en:"Thimphu",de:"Thimphu"}, pop:115000, metro:140000, capital:true },
    { name:{hr:"Phuntsholing",en:"Phuntsholing",de:"Phuntsholing"}, pop:28000 },
    { name:{hr:"Paro",en:"Paro",de:"Paro"}, pop:13000 }
  ],
  BD: [
    { name:{hr:"Daka",en:"Dhaka",de:"Dhaka"}, pop:10280000, metro:23200000, capital:true },
    { name:{hr:"Chittagong",en:"Chittagong",de:"Chittagong"}, pop:2580000, metro:5250000 },
    { name:{hr:"Khulna",en:"Khulna",de:"Khulna"}, pop:960000, metro:2050000 }
  ],
  LK: [
    { name:{hr:"Colombo",en:"Colombo",de:"Colombo"}, pop:555000, metro:5650000, capital:true },
    { name:{hr:"Dehiwala",en:"Dehiwala",de:"Dehiwala"}, pop:220000 },
    { name:{hr:"Moratuwa",en:"Moratuwa",de:"Moratuwa"}, pop:170000 }
  ],
  MV: [
    { name:{hr:"Malé",en:"Malé",de:"Malé"}, pop:155000, metro:250000, capital:true },
    { name:{hr:"Hulhumalé",en:"Hulhumalé",de:"Hulhumalé"}, pop:50000 },
    { name:{hr:"Addu",en:"Addu City",de:"Addu"}, pop:33000 }
  ],
  CN: [
    { name:{hr:"Peking",en:"Beijing",de:"Peking"}, pop:21540000, metro:22000000, capital:true },
    { name:{hr:"Šangaj",en:"Shanghai",de:"Shanghai"}, pop:24870000, metro:29870000 },
    { name:{hr:"Guangzhou",en:"Guangzhou",de:"Guangzhou"}, pop:18700000, metro:47100000 }
  ],
  MN: [
    { name:{hr:"Ulan Bator",en:"Ulaanbaatar",de:"Ulaanbaatar"}, pop:1645000, metro:1680000, capital:true },
    { name:{hr:"Erdenet",en:"Erdenet",de:"Erdenet"}, pop:100000 },
    { name:{hr:"Darhan",en:"Darkhan",de:"Darchan"}, pop:75000 }
  ],
  KZ: [
    { name:{hr:"Astana",en:"Astana",de:"Astana"}, pop:1350000, metro:1425000, capital:true },
    { name:{hr:"Almaty",en:"Almaty",de:"Almaty"}, pop:2040000, metro:2700000 },
    { name:{hr:"Šimkent",en:"Shymkent",de:"Schymkent"}, pop:1160000 }
  ],
  UZ: [
    { name:{hr:"Taškent",en:"Tashkent",de:"Taschkent"}, pop:2900000, metro:3100000, capital:true },
    { name:{hr:"Samarkand",en:"Samarkand",de:"Samarkand"}, pop:560000 },
    { name:{hr:"Namangan",en:"Namangan",de:"Namangan"}, pop:675000 }
  ],
  TM: [
    { name:{hr:"Ašhabad",en:"Ashgabat",de:"Aschgabat"}, pop:1030000, metro:1080000, capital:true },
    { name:{hr:"Türkmenabat",en:"Türkmenabat",de:"Türkmenabat"}, pop:255000 },
    { name:{hr:"Daşoguz",en:"Daşoguz",de:"Daşoguz"}, pop:245000 }
  ],
  TJ: [
    { name:{hr:"Dušanbe",en:"Dushanbe",de:"Duschanbe"}, pop:910000, metro:1100000, capital:true },
    { name:{hr:"Hujand",en:"Khujand",de:"Chudschand"}, pop:185000 },
    { name:{hr:"Bohtar",en:"Bokhtar",de:"Bochtar"}, pop:110000 }
  ],
  KG: [
    { name:{hr:"Biškek",en:"Bishkek",de:"Bischkek"}, pop:1070000, metro:1250000, capital:true },
    { name:{hr:"Oš",en:"Osh",de:"Osch"}, pop:320000 },
    { name:{hr:"Jalal-Abad",en:"Jalal-Abad",de:"Dschalalabad"}, pop:123000 }
  ],
  MM: [
    { name:{hr:"Naypyidaw",en:"Naypyidaw",de:"Naypyidaw"}, pop:925000, metro:1160000, capital:true },
    { name:{hr:"Yangon",en:"Yangon",de:"Rangun"}, pop:5210000, metro:7360000 },
    { name:{hr:"Mandalay",en:"Mandalay",de:"Mandalay"}, pop:1225000, metro:1725000 }
  ],
  TH: [
    { name:{hr:"Bangkok",en:"Bangkok",de:"Bangkok"}, pop:10540000, metro:17370000, capital:true },
    { name:{hr:"Nonthaburi",en:"Nonthaburi",de:"Nonthaburi"}, pop:260000 },
    { name:{hr:"Chiang Mai",en:"Chiang Mai",de:"Chiang Mai"}, pop:127000, metro:960000 }
  ],
  LA: [
    { name:{hr:"Vientiane",en:"Vientiane",de:"Vientiane"}, pop:820000, metro:950000, capital:true },
    { name:{hr:"Savannakhet",en:"Savannakhet",de:"Savannakhet"}, pop:125000 },
    { name:{hr:"Pakse",en:"Pakse",de:"Pakse"}, pop:90000 }
  ],
  KH: [
    { name:{hr:"Phnom Penh",en:"Phnom Penh",de:"Phnom Penh"}, pop:2130000, metro:2280000, capital:true },
    { name:{hr:"Siem Reap",en:"Siem Reap",de:"Siem Reap"}, pop:245000 },
    { name:{hr:"Battambang",en:"Battambang",de:"Battambang"}, pop:155000 }
  ],
  VN: [
    { name:{hr:"Hanoi",en:"Hanoi",de:"Hanoi"}, pop:8600000, metro:10800000, capital:true },
    { name:{hr:"Ho Ši Min",en:"Ho Chi Minh City",de:"Ho-Chi-Minh-Stadt"}, pop:9320000, metro:21280000 },
    { name:{hr:"Hải Phòng",en:"Haiphong",de:"Hải Phòng"}, pop:2050000, metro:2600000 }
  ],
  MY: [
    { name:{hr:"Kuala Lumpur",en:"Kuala Lumpur",de:"Kuala Lumpur"}, pop:1980000, metro:8800000, capital:true },
    { name:{hr:"Johor Bahru",en:"Johor Bahru",de:"Johor Bahru"}, pop:860000, metro:2240000 },
    { name:{hr:"Ipoh",en:"Ipoh",de:"Ipoh"}, pop:740000 }
  ],
  SG: [
    { name:{hr:"Singapur",en:"Singapore",de:"Singapur"}, pop:5920000, metro:5920000, capital:true }
  ],
  ID: [
    { name:{hr:"Jakarta",en:"Jakarta",de:"Jakarta"}, pop:10560000, metro:34540000, capital:true },
    { name:{hr:"Surabaya",en:"Surabaya",de:"Surabaya"}, pop:2875000, metro:10000000 },
    { name:{hr:"Bandung",en:"Bandung",de:"Bandung"}, pop:2445000, metro:8700000 }
  ],
  PH: [
    { name:{hr:"Manila",en:"Manila",de:"Manila"}, pop:1850000, metro:13485000, capital:true },
    { name:{hr:"Quezon City",en:"Quezon City",de:"Quezon City"}, pop:2960000, metro:13485000 },
    { name:{hr:"Davao",en:"Davao",de:"Davao"}, pop:1780000 }
  ],
  BN: [
    { name:{hr:"Bandar Seri Begawan",en:"Bandar Seri Begawan",de:"Bandar Seri Begawan"}, pop:50000, metro:280000, capital:true },
    { name:{hr:"Kuala Belait",en:"Kuala Belait",de:"Kuala Belait"}, pop:31000 },
    { name:{hr:"Seria",en:"Seria",de:"Seria"}, pop:30000 }
  ],
  TL: [
    { name:{hr:"Dili",en:"Dili",de:"Dili"}, pop:280000, metro:320000, capital:true },
    { name:{hr:"Baucau",en:"Baucau",de:"Baucau"}, pop:17000 },
    { name:{hr:"Maliana",en:"Maliana",de:"Maliana"}, pop:12000 }
  ],
  JP: [
    { name:{hr:"Tokio",en:"Tokyo",de:"Tokio"}, pop:13960000, metro:37400000, capital:true },
    { name:{hr:"Yokohama",en:"Yokohama",de:"Yokohama"}, pop:3770000, metro:37400000 },
    { name:{hr:"Osaka",en:"Osaka",de:"Osaka"}, pop:2750000, metro:19060000 }
  ],
  KR: [
    { name:{hr:"Seul",en:"Seoul",de:"Seoul"}, pop:9410000, metro:25800000, capital:true },
    { name:{hr:"Busan",en:"Busan",de:"Busan"}, pop:3300000, metro:3620000 },
    { name:{hr:"Incheon",en:"Incheon",de:"Incheon"}, pop:2970000, metro:25800000 }
  ],
  KP: [
    { name:{hr:"Pjongjang",en:"Pyongyang",de:"Pjöngjang"}, pop:3060000, metro:3250000, capital:true },
    { name:{hr:"Hamhung",en:"Hamhung",de:"Hamhŭng"}, pop:770000 },
    { name:{hr:"Chongjin",en:"Chongjin",de:"Chongjin"}, pop:625000 }
  ],
  TW: [
    { name:{hr:"Taipei",en:"Taipei",de:"Taipeh"}, pop:2520000, metro:7030000, capital:true },
    { name:{hr:"New Taipei",en:"New Taipei",de:"Neu-Taipeh"}, pop:4030000, metro:7030000 },
    { name:{hr:"Kaohsiung",en:"Kaohsiung",de:"Kaohsiung"}, pop:2740000, metro:2770000 }
  ],

  // ============ AFRICA ============
  EG: [
    { name:{hr:"Kairo",en:"Cairo",de:"Kairo"}, pop:10100000, metro:22620000, capital:true },
    { name:{hr:"Aleksandrija",en:"Alexandria",de:"Alexandria"}, pop:5390000, metro:5490000 },
    { name:{hr:"Giza",en:"Giza",de:"Gizeh"}, pop:4145000, metro:22620000 }
  ],
  LY: [
    { name:{hr:"Tripoli",en:"Tripoli",de:"Tripolis"}, pop:1170000, metro:1160000, capital:true },
    { name:{hr:"Bengazi",en:"Benghazi",de:"Bengasi"}, pop:810000, metro:800000 },
    { name:{hr:"Misrata",en:"Misrata",de:"Misrata"}, pop:395000 }
  ],
  TN: [
    { name:{hr:"Tunis",en:"Tunis",de:"Tunis"}, pop:640000, metro:2850000, capital:true },
    { name:{hr:"Sfax",en:"Sfax",de:"Sfax"}, pop:340000, metro:955000 },
    { name:{hr:"Sousse",en:"Sousse",de:"Sousse"}, pop:275000, metro:675000 }
  ],
  DZ: [
    { name:{hr:"Alžir",en:"Algiers",de:"Algier"}, pop:2770000, metro:4610000, capital:true },
    { name:{hr:"Oran",en:"Oran",de:"Oran"}, pop:930000, metro:1560000 },
    { name:{hr:"Constantine",en:"Constantine",de:"Constantine"}, pop:450000, metro:940000 }
  ],
  MA: [
    { name:{hr:"Rabat",en:"Rabat",de:"Rabat"}, pop:580000, metro:1930000, capital:true },
    { name:{hr:"Casablanca",en:"Casablanca",de:"Casablanca"}, pop:3360000, metro:4370000 },
    { name:{hr:"Fes",en:"Fes",de:"Fès"}, pop:1150000, metro:1250000 }
  ],
  EH: [
    { name:{hr:"El Ayoun",en:"Laayoune",de:"El Aaiún"}, pop:220000, metro:270000, capital:true },
    { name:{hr:"Dakhla",en:"Dakhla",de:"Dakhla"}, pop:106000 },
    { name:{hr:"Smara",en:"Smara",de:"Smara"}, pop:57000 }
  ],
  MR: [
    { name:{hr:"Nouakchott",en:"Nouakchott",de:"Nouakchott"}, pop:1200000, metro:1320000, capital:true },
    { name:{hr:"Nouadhibou",en:"Nouadhibou",de:"Nouadhibou"}, pop:125000 },
    { name:{hr:"Rosso",en:"Rosso",de:"Rosso"}, pop:65000 }
  ],
  ML: [
    { name:{hr:"Bamako",en:"Bamako",de:"Bamako"}, pop:2500000, metro:3340000, capital:true },
    { name:{hr:"Sikasso",en:"Sikasso",de:"Sikasso"}, pop:230000 },
    { name:{hr:"Mopti",en:"Mopti",de:"Mopti"}, pop:145000 }
  ],
  NE: [
    { name:{hr:"Niamey",en:"Niamey",de:"Niamey"}, pop:1330000, metro:1530000, capital:true },
    { name:{hr:"Zinder",en:"Zinder",de:"Zinder"}, pop:240000 },
    { name:{hr:"Maradi",en:"Maradi",de:"Maradi"}, pop:270000 }
  ],
  TD: [
    { name:{hr:"N'Djamena",en:"N'Djamena",de:"N'Djamena"}, pop:1420000, metro:1600000, capital:true },
    { name:{hr:"Moundou",en:"Moundou",de:"Moundou"}, pop:140000 },
    { name:{hr:"Sarh",en:"Sarh",de:"Sarh"}, pop:115000 }
  ],
  SD: [
    { name:{hr:"Kartum",en:"Khartoum",de:"Khartum"}, pop:5830000, metro:6160000, capital:true },
    { name:{hr:"Omdurman",en:"Omdurman",de:"Omdurman"}, pop:2805000, metro:6160000 },
    { name:{hr:"Port Sudan",en:"Port Sudan",de:"Port Sudan"}, pop:490000 }
  ],
  SS: [
    { name:{hr:"Juba",en:"Juba",de:"Dschuba"}, pop:525000, metro:575000, capital:true },
    { name:{hr:"Wau",en:"Wau",de:"Wau"}, pop:230000 },
    { name:{hr:"Malakal",en:"Malakal",de:"Malakal"}, pop:150000 }
  ],
  ER: [
    { name:{hr:"Asmara",en:"Asmara",de:"Asmara"}, pop:965000, metro:1030000, capital:true },
    { name:{hr:"Keren",en:"Keren",de:"Keren"}, pop:121000 },
    { name:{hr:"Massawa",en:"Massawa",de:"Massawa"}, pop:54000 }
  ],
  DJ: [
    { name:{hr:"Džibuti",en:"Djibouti",de:"Dschibuti"}, pop:620000, metro:690000, capital:true },
    { name:{hr:"Ali Sabieh",en:"Ali Sabieh",de:"Ali Sabieh"}, pop:40000 },
    { name:{hr:"Tadjourah",en:"Tadjourah",de:"Tadjourah"}, pop:22000 }
  ],
  ET: [
    { name:{hr:"Adis Abeba",en:"Addis Ababa",de:"Addis Abeba"}, pop:3650000, metro:4900000, capital:true },
    { name:{hr:"Dire Dawa",en:"Dire Dawa",de:"Dire Dawa"}, pop:440000 },
    { name:{hr:"Mekelle",en:"Mekelle",de:"Mekelle"}, pop:325000 }
  ],
  SO: [
    { name:{hr:"Mogadishu",en:"Mogadishu",de:"Mogadischu"}, pop:2610000, metro:2780000, capital:true },
    { name:{hr:"Hargeisa",en:"Hargeisa",de:"Hargeisa"}, pop:1200000 },
    { name:{hr:"Bosaso",en:"Bosaso",de:"Bosaso"}, pop:165000 }
  ],
  KE: [
    { name:{hr:"Nairobi",en:"Nairobi",de:"Nairobi"}, pop:4400000, metro:5120000, capital:true },
    { name:{hr:"Mombasa",en:"Mombasa",de:"Mombasa"}, pop:1210000, metro:2230000 },
    { name:{hr:"Kisumu",en:"Kisumu",de:"Kisumu"}, pop:400000, metro:610000 }
  ],
  UG: [
    { name:{hr:"Kampala",en:"Kampala",de:"Kampala"}, pop:1680000, metro:3800000, capital:true },
    { name:{hr:"Nansana",en:"Nansana",de:"Nansana"}, pop:530000 },
    { name:{hr:"Kira",en:"Kira",de:"Kira"}, pop:475000 }
  ],
  RW: [
    { name:{hr:"Kigali",en:"Kigali",de:"Kigali"}, pop:1200000, metro:1750000, capital:true },
    { name:{hr:"Butare",en:"Butare",de:"Butare"}, pop:90000 },
    { name:{hr:"Gisenyi",en:"Gisenyi",de:"Gisenyi"}, pop:85000 }
  ],
  BI: [
    { name:{hr:"Gitega",en:"Gitega",de:"Gitega"}, pop:135000, metro:160000, capital:true },
    { name:{hr:"Bujumbura",en:"Bujumbura",de:"Bujumbura"}, pop:500000, metro:1120000 },
    { name:{hr:"Muyinga",en:"Muyinga",de:"Muyinga"}, pop:90000 }
  ],
  TZ: [
    { name:{hr:"Dodoma",en:"Dodoma",de:"Dodoma"}, pop:410000, metro:530000, capital:true },
    { name:{hr:"Dar es Salaam",en:"Dar es Salaam",de:"Daressalam"}, pop:5380000, metro:7670000 },
    { name:{hr:"Mwanza",en:"Mwanza",de:"Mwanza"}, pop:1180000, metro:1250000 }
  ],
  CF: [
    { name:{hr:"Bangui",en:"Bangui",de:"Bangui"}, pop:890000, metro:1000000, capital:true },
    { name:{hr:"Bimbo",en:"Bimbo",de:"Bimbo"}, pop:265000 },
    { name:{hr:"Berbérati",en:"Berbérati",de:"Berbérati"}, pop:77000 }
  ],
  CM: [
    { name:{hr:"Yaoundé",en:"Yaoundé",de:"Yaoundé"}, pop:2765000, metro:4100000, capital:true },
    { name:{hr:"Douala",en:"Douala",de:"Douala"}, pop:2770000, metro:3660000 },
    { name:{hr:"Bamenda",en:"Bamenda",de:"Bamenda"}, pop:430000 }
  ],
  NG: [
    { name:{hr:"Abuja",en:"Abuja",de:"Abuja"}, pop:1235000, metro:3840000, capital:true },
    { name:{hr:"Lagos",en:"Lagos",de:"Lagos"}, pop:9000000, metro:15950000 },
    { name:{hr:"Kano",en:"Kano",de:"Kano"}, pop:3890000, metro:4100000 }
  ],
  BJ: [
    { name:{hr:"Porto-Novo",en:"Porto-Novo",de:"Porto-Novo"}, pop:285000, metro:420000, capital:true },
    { name:{hr:"Cotonou",en:"Cotonou",de:"Cotonou"}, pop:780000, metro:2400000 },
    { name:{hr:"Parakou",en:"Parakou",de:"Parakou"}, pop:255000 }
  ],
  TG: [
    { name:{hr:"Lomé",en:"Lomé",de:"Lomé"}, pop:1745000, metro:2190000, capital:true },
    { name:{hr:"Sokodé",en:"Sokodé",de:"Sokodé"}, pop:115000 },
    { name:{hr:"Kara",en:"Kara",de:"Kara"}, pop:105000 }
  ],
  GH: [
    { name:{hr:"Accra",en:"Accra",de:"Accra"}, pop:2390000, metro:4730000, capital:true },
    { name:{hr:"Kumasi",en:"Kumasi",de:"Kumasi"}, pop:3490000, metro:3630000 },
    { name:{hr:"Tamale",en:"Tamale",de:"Tamale"}, pop:375000, metro:595000 }
  ],
  CI: [
    { name:{hr:"Yamoussoukro",en:"Yamoussoukro",de:"Yamoussoukro"}, pop:355000, metro:415000, capital:true },
    { name:{hr:"Abidjan",en:"Abidjan",de:"Abidjan"}, pop:4910000, metro:6320000 },
    { name:{hr:"Bouaké",en:"Bouaké",de:"Bouaké"}, pop:830000 }
  ],
  LR: [
    { name:{hr:"Monrovia",en:"Monrovia",de:"Monrovia"}, pop:1020000, metro:1570000, capital:true },
    { name:{hr:"Gbarnga",en:"Gbarnga",de:"Gbarnga"}, pop:56000 },
    { name:{hr:"Buchanan",en:"Buchanan",de:"Buchanan"}, pop:50000 }
  ],
  SL: [
    { name:{hr:"Freetown",en:"Freetown",de:"Freetown"}, pop:1050000, metro:1270000, capital:true },
    { name:{hr:"Bo",en:"Bo",de:"Bo"}, pop:175000 },
    { name:{hr:"Kenema",en:"Kenema",de:"Kenema"}, pop:200000 }
  ],
  GN: [
    { name:{hr:"Conakry",en:"Conakry",de:"Conakry"}, pop:1670000, metro:2160000, capital:true },
    { name:{hr:"Nzérékoré",en:"Nzérékoré",de:"Nzérékoré"}, pop:195000 },
    { name:{hr:"Kindia",en:"Kindia",de:"Kindia"}, pop:185000 }
  ],
  GW: [
    { name:{hr:"Bissau",en:"Bissau",de:"Bissau"}, pop:490000, metro:625000, capital:true },
    { name:{hr:"Bafatá",en:"Bafatá",de:"Bafatá"}, pop:28000 },
    { name:{hr:"Gabú",en:"Gabú",de:"Gabú"}, pop:48000 }
  ],
  SN: [
    { name:{hr:"Dakar",en:"Dakar",de:"Dakar"}, pop:1180000, metro:4140000, capital:true },
    { name:{hr:"Touba",en:"Touba",de:"Touba"}, pop:755000 },
    { name:{hr:"Thiès",en:"Thiès",de:"Thiès"}, pop:370000, metro:490000 }
  ],
  GM: [
    { name:{hr:"Banjul",en:"Banjul",de:"Banjul"}, pop:34000, metro:445000, capital:true },
    { name:{hr:"Serekunda",en:"Serekunda",de:"Serekunda"}, pop:340000 },
    { name:{hr:"Brikama",en:"Brikama",de:"Brikama"}, pop:95000 }
  ],
  CV: [
    { name:{hr:"Praia",en:"Praia",de:"Praia"}, pop:160000, metro:175000, capital:true },
    { name:{hr:"Mindelo",en:"Mindelo",de:"Mindelo"}, pop:76000 },
    { name:{hr:"Santa Maria",en:"Santa Maria",de:"Santa Maria"}, pop:18000 }
  ],
  BF: [
    { name:{hr:"Ouagadougou",en:"Ouagadougou",de:"Ouagadougou"}, pop:2780000, metro:3060000, capital:true },
    { name:{hr:"Bobo-Dioulasso",en:"Bobo-Dioulasso",de:"Bobo-Dioulasso"}, pop:905000 },
    { name:{hr:"Koudougou",en:"Koudougou",de:"Koudougou"}, pop:170000 }
  ],
  CD: [
    { name:{hr:"Kinshasa",en:"Kinshasa",de:"Kinshasa"}, pop:15060000, metro:17780000, capital:true },
    { name:{hr:"Lubumbashi",en:"Lubumbashi",de:"Lubumbashi"}, pop:2580000, metro:2870000 },
    { name:{hr:"Mbuji-Mayi",en:"Mbuji-Mayi",de:"Mbuji-Mayi"}, pop:2770000 }
  ],
  CG: [
    { name:{hr:"Brazzaville",en:"Brazzaville",de:"Brazzaville"}, pop:1970000, metro:2390000, capital:true },
    { name:{hr:"Pointe-Noire",en:"Pointe-Noire",de:"Pointe-Noire"}, pop:1420000, metro:1600000 },
    { name:{hr:"Dolisie",en:"Dolisie",de:"Dolisie"}, pop:110000 }
  ],
  GA: [
    { name:{hr:"Libreville",en:"Libreville",de:"Libreville"}, pop:705000, metro:860000, capital:true },
    { name:{hr:"Port-Gentil",en:"Port-Gentil",de:"Port-Gentil"}, pop:140000 },
    { name:{hr:"Franceville",en:"Franceville",de:"Franceville"}, pop:110000 }
  ],
  GQ: [
    { name:{hr:"Malabo",en:"Malabo",de:"Malabo"}, pop:300000, metro:335000, capital:true },
    { name:{hr:"Bata",en:"Bata",de:"Bata"}, pop:250000 },
    { name:{hr:"Ebebiyín",en:"Ebebiyín",de:"Ebebiyín"}, pop:40000 }
  ],
  AO: [
    { name:{hr:"Luanda",en:"Luanda",de:"Luanda"}, pop:2780000, metro:8330000, capital:true },
    { name:{hr:"Lubango",en:"Lubango",de:"Lubango"}, pop:900000 },
    { name:{hr:"Benguela",en:"Benguela",de:"Benguela"}, pop:560000 }
  ],
  ZM: [
    { name:{hr:"Lusaka",en:"Lusaka",de:"Lusaka"}, pop:1750000, metro:3300000, capital:true },
    { name:{hr:"Kitwe",en:"Kitwe",de:"Kitwe"}, pop:675000 },
    { name:{hr:"Ndola",en:"Ndola",de:"Ndola"}, pop:465000 }
  ],
  ZW: [
    { name:{hr:"Harare",en:"Harare",de:"Harare"}, pop:1530000, metro:2150000, capital:true },
    { name:{hr:"Bulawayo",en:"Bulawayo",de:"Bulawayo"}, pop:655000, metro:1200000 },
    { name:{hr:"Chitungwiza",en:"Chitungwiza",de:"Chitungwiza"}, pop:370000 }
  ],
  BW: [
    { name:{hr:"Gaborone",en:"Gaborone",de:"Gaborone"}, pop:235000, metro:425000, capital:true },
    { name:{hr:"Francistown",en:"Francistown",de:"Francistown"}, pop:103000 },
    { name:{hr:"Molepolole",en:"Molepolole",de:"Molepolole"}, pop:73000 }
  ],
  NA: [
    { name:{hr:"Windhoek",en:"Windhoek",de:"Windhuk"}, pop:430000, metro:485000, capital:true },
    { name:{hr:"Walvis Bay",en:"Walvis Bay",de:"Walvis Bay"}, pop:86000 },
    { name:{hr:"Swakopmund",en:"Swakopmund",de:"Swakopmund"}, pop:75000 }
  ],
  ZA: [
    { name:{hr:"Pretorija",en:"Pretoria",de:"Pretoria"}, pop:740000, metro:2920000, capital:true },
    { name:{hr:"Johannesburg",en:"Johannesburg",de:"Johannesburg"}, pop:5640000, metro:9610000 },
    { name:{hr:"Cape Town",en:"Cape Town",de:"Kapstadt"}, pop:4620000, metro:4940000 }
  ],
  LS: [
    { name:{hr:"Maseru",en:"Maseru",de:"Maseru"}, pop:330000, metro:520000, capital:true },
    { name:{hr:"Teyateyaneng",en:"Teyateyaneng",de:"Teyateyaneng"}, pop:75000 },
    { name:{hr:"Mafeteng",en:"Mafeteng",de:"Mafeteng"}, pop:57000 }
  ],
  SZ: [
    { name:{hr:"Mbabane",en:"Mbabane",de:"Mbabane"}, pop:95000, metro:115000, capital:true },
    { name:{hr:"Manzini",en:"Manzini",de:"Manzini"}, pop:110000 },
    { name:{hr:"Lobamba",en:"Lobamba",de:"Lobamba"}, pop:11000 }
  ],
  MZ: [
    { name:{hr:"Maputo",en:"Maputo",de:"Maputo"}, pop:1120000, metro:2720000, capital:true },
    { name:{hr:"Matola",en:"Matola",de:"Matola"}, pop:1040000, metro:2720000 },
    { name:{hr:"Beira",en:"Beira",de:"Beira"}, pop:590000 }
  ],
  MW: [
    { name:{hr:"Lilongwe",en:"Lilongwe",de:"Lilongwe"}, pop:1120000, metro:1320000, capital:true },
    { name:{hr:"Blantyre",en:"Blantyre",de:"Blantyre"}, pop:800000, metro:1310000 },
    { name:{hr:"Mzuzu",en:"Mzuzu",de:"Mzuzu"}, pop:220000 }
  ],
  MG: [
    { name:{hr:"Antananarivo",en:"Antananarivo",de:"Antananarivo"}, pop:1275000, metro:3300000, capital:true },
    { name:{hr:"Toamasina",en:"Toamasina",de:"Toamasina"}, pop:325000 },
    { name:{hr:"Antsirabe",en:"Antsirabe",de:"Antsirabe"}, pop:260000 }
  ],
  MU: [
    { name:{hr:"Port Louis",en:"Port Louis",de:"Port Louis"}, pop:150000, metro:345000, capital:true },
    { name:{hr:"Beau Bassin",en:"Beau Bassin-Rose Hill",de:"Beau Bassin"}, pop:110000 },
    { name:{hr:"Vacoas-Phoenix",en:"Vacoas-Phoenix",de:"Vacoas-Phoenix"}, pop:110000 }
  ],
  SC: [
    { name:{hr:"Victoria",en:"Victoria",de:"Victoria"}, pop:27000, metro:32000, capital:true },
    { name:{hr:"Anse Boileau",en:"Anse Boileau",de:"Anse Boileau"}, pop:4300 },
    { name:{hr:"Beau Vallon",en:"Beau Vallon",de:"Beau Vallon"}, pop:3500 }
  ],
  KM: [
    { name:{hr:"Moroni",en:"Moroni",de:"Moroni"}, pop:60000, metro:115000, capital:true },
    { name:{hr:"Mutsamudu",en:"Mutsamudu",de:"Mutsamudu"}, pop:25000 },
    { name:{hr:"Fomboni",en:"Fomboni",de:"Fomboni"}, pop:14000 }
  ],
  ST: [
    { name:{hr:"São Tomé",en:"São Tomé",de:"São Tomé"}, pop:80000, metro:100000, capital:true },
    { name:{hr:"Trindade",en:"Trindade",de:"Trindade"}, pop:7000 },
    { name:{hr:"Santo António",en:"Santo António",de:"Santo António"}, pop:2500 }
  ],

  // ============ NORTH AMERICA ============
  US: [
    { name:{hr:"Washington D.C.",en:"Washington, D.C.",de:"Washington, D.C."}, pop:680000, metro:6380000, capital:true },
    { name:{hr:"New York",en:"New York City",de:"New York"}, pop:8260000, metro:19500000 },
    { name:{hr:"Los Angeles",en:"Los Angeles",de:"Los Angeles"}, pop:3820000, metro:12800000 }
  ],
  CA: [
    { name:{hr:"Ottawa",en:"Ottawa",de:"Ottawa"}, pop:1020000, metro:1490000, capital:true },
    { name:{hr:"Toronto",en:"Toronto",de:"Toronto"}, pop:2930000, metro:6370000 },
    { name:{hr:"Montreal",en:"Montreal",de:"Montreal"}, pop:1760000, metro:4290000 }
  ],
  MX: [
    { name:{hr:"Ciudad de México",en:"Mexico City",de:"Mexiko-Stadt"}, pop:9210000, metro:22510000, capital:true },
    { name:{hr:"Guadalajara",en:"Guadalajara",de:"Guadalajara"}, pop:1400000, metro:5300000 },
    { name:{hr:"Monterrey",en:"Monterrey",de:"Monterrey"}, pop:1140000, metro:5340000 }
  ],
  GT: [
    { name:{hr:"Guatemala",en:"Guatemala City",de:"Guatemala-Stadt"}, pop:995000, metro:3300000, capital:true },
    { name:{hr:"Mixco",en:"Mixco",de:"Mixco"}, pop:475000, metro:3300000 },
    { name:{hr:"Villa Nueva",en:"Villa Nueva",de:"Villa Nueva"}, pop:435000, metro:3300000 }
  ],
  BZ: [
    { name:{hr:"Belmopan",en:"Belmopan",de:"Belmopan"}, pop:20000, metro:25000, capital:true },
    { name:{hr:"Belize City",en:"Belize City",de:"Belize City"}, pop:65000, metro:85000 },
    { name:{hr:"San Ignacio",en:"San Ignacio",de:"San Ignacio"}, pop:20000 }
  ],
  SV: [
    { name:{hr:"San Salvador",en:"San Salvador",de:"San Salvador"}, pop:240000, metro:2440000, capital:true },
    { name:{hr:"Soyapango",en:"Soyapango",de:"Soyapango"}, pop:240000 },
    { name:{hr:"Santa Ana",en:"Santa Ana",de:"Santa Ana"}, pop:275000 }
  ],
  HN: [
    { name:{hr:"Tegucigalpa",en:"Tegucigalpa",de:"Tegucigalpa"}, pop:1155000, metro:1560000, capital:true },
    { name:{hr:"San Pedro Sula",en:"San Pedro Sula",de:"San Pedro Sula"}, pop:830000, metro:1515000 },
    { name:{hr:"Choloma",en:"Choloma",de:"Choloma"}, pop:270000 }
  ],
  NI: [
    { name:{hr:"Managua",en:"Managua",de:"Managua"}, pop:1090000, metro:1400000, capital:true },
    { name:{hr:"León",en:"León",de:"León"}, pop:210000 },
    { name:{hr:"Masaya",en:"Masaya",de:"Masaya"}, pop:160000 }
  ],
  CR: [
    { name:{hr:"San José",en:"San José",de:"San José"}, pop:340000, metro:2160000, capital:true },
    { name:{hr:"Alajuela",en:"Alajuela",de:"Alajuela"}, pop:255000 },
    { name:{hr:"Cartago",en:"Cartago",de:"Cartago"}, pop:155000 }
  ],
  PA: [
    { name:{hr:"Panamá",en:"Panama City",de:"Panama-Stadt"}, pop:880000, metro:1870000, capital:true },
    { name:{hr:"San Miguelito",en:"San Miguelito",de:"San Miguelito"}, pop:325000 },
    { name:{hr:"Tocumen",en:"Tocumen",de:"Tocumen"}, pop:90000 }
  ],
  CU: [
    { name:{hr:"Havana",en:"Havana",de:"Havanna"}, pop:2130000, metro:2130000, capital:true },
    { name:{hr:"Santiago de Cuba",en:"Santiago de Cuba",de:"Santiago de Cuba"}, pop:510000 },
    { name:{hr:"Camagüey",en:"Camagüey",de:"Camagüey"}, pop:325000 }
  ],
  JM: [
    { name:{hr:"Kingston",en:"Kingston",de:"Kingston"}, pop:590000, metro:1240000, capital:true },
    { name:{hr:"Montego Bay",en:"Montego Bay",de:"Montego Bay"}, pop:110000, metro:200000 },
    { name:{hr:"Spanish Town",en:"Spanish Town",de:"Spanish Town"}, pop:145000 }
  ],
  HT: [
    { name:{hr:"Port-au-Prince",en:"Port-au-Prince",de:"Port-au-Prince"}, pop:990000, metro:2910000, capital:true },
    { name:{hr:"Cap-Haïtien",en:"Cap-Haïtien",de:"Cap-Haïtien"}, pop:275000 },
    { name:{hr:"Pétion-Ville",en:"Pétion-Ville",de:"Pétion-Ville"}, pop:285000 }
  ],
  DO: [
    { name:{hr:"Santo Domingo",en:"Santo Domingo",de:"Santo Domingo"}, pop:1030000, metro:3570000, capital:true },
    { name:{hr:"Santiago",en:"Santiago de los Caballeros",de:"Santiago de los Caballeros"}, pop:695000, metro:1340000 },
    { name:{hr:"Los Alcarrizos",en:"Los Alcarrizos",de:"Los Alcarrizos"}, pop:285000 }
  ],
  BS: [
    { name:{hr:"Nassau",en:"Nassau",de:"Nassau"}, pop:275000, metro:275000, capital:true },
    { name:{hr:"Freeport",en:"Freeport",de:"Freeport"}, pop:50000 },
    { name:{hr:"West End",en:"West End",de:"West End"}, pop:13000 }
  ],
  BB: [
    { name:{hr:"Bridgetown",en:"Bridgetown",de:"Bridgetown"}, pop:110000, metro:115000, capital:true },
    { name:{hr:"Speightstown",en:"Speightstown",de:"Speightstown"}, pop:3500 },
    { name:{hr:"Oistins",en:"Oistins",de:"Oistins"}, pop:2500 }
  ],
  TT: [
    { name:{hr:"Port of Spain",en:"Port of Spain",de:"Port of Spain"}, pop:37000, metro:545000, capital:true },
    { name:{hr:"San Fernando",en:"San Fernando",de:"San Fernando"}, pop:83000 },
    { name:{hr:"Chaguanas",en:"Chaguanas",de:"Chaguanas"}, pop:86000 }
  ],
  GD: [
    { name:{hr:"St. George's",en:"St. George's",de:"St. George's"}, pop:4300, metro:38000, capital:true },
    { name:{hr:"Gouyave",en:"Gouyave",de:"Gouyave"}, pop:3400 },
    { name:{hr:"Grenville",en:"Grenville",de:"Grenville"}, pop:2500 }
  ],
  LC: [
    { name:{hr:"Castries",en:"Castries",de:"Castries"}, pop:20000, metro:72000, capital:true },
    { name:{hr:"Vieux Fort",en:"Vieux Fort",de:"Vieux Fort"}, pop:4500 },
    { name:{hr:"Micoud",en:"Micoud",de:"Micoud"}, pop:3500 }
  ],
  VC: [
    { name:{hr:"Kingstown",en:"Kingstown",de:"Kingstown"}, pop:13000, metro:25000, capital:true },
    { name:{hr:"Georgetown",en:"Georgetown",de:"Georgetown"}, pop:1600 },
    { name:{hr:"Byera",en:"Byera Village",de:"Byera"}, pop:1300 }
  ],
  AG: [
    { name:{hr:"Saint John's",en:"Saint John's",de:"Saint John's"}, pop:22000, metro:30000, capital:true },
    { name:{hr:"All Saints",en:"All Saints",de:"All Saints"}, pop:4000 },
    { name:{hr:"Liberta",en:"Liberta",de:"Liberta"}, pop:2500 }
  ],
  KN: [
    { name:{hr:"Basseterre",en:"Basseterre",de:"Basseterre"}, pop:13000, metro:18000, capital:true },
    { name:{hr:"Charlestown",en:"Charlestown",de:"Charlestown"}, pop:1500 },
    { name:{hr:"Old Road Town",en:"Old Road Town",de:"Old Road Town"}, pop:2200 }
  ],
  DM: [
    { name:{hr:"Roseau",en:"Roseau",de:"Roseau"}, pop:15000, metro:28000, capital:true },
    { name:{hr:"Portsmouth",en:"Portsmouth",de:"Portsmouth"}, pop:3600 },
    { name:{hr:"Marigot",en:"Marigot",de:"Marigot"}, pop:2700 }
  ],

  // ============ SOUTH AMERICA ============
  CO: [
    { name:{hr:"Bogotá",en:"Bogotá",de:"Bogotá"}, pop:7880000, metro:11600000, capital:true },
    { name:{hr:"Medellín",en:"Medellín",de:"Medellín"}, pop:2570000, metro:4060000 },
    { name:{hr:"Cali",en:"Cali",de:"Cali"}, pop:2230000, metro:2870000 }
  ],
  VE: [
    { name:{hr:"Caracas",en:"Caracas",de:"Caracas"}, pop:2080000, metro:2930000, capital:true },
    { name:{hr:"Maracaibo",en:"Maracaibo",de:"Maracaibo"}, pop:1495000, metro:2450000 },
    { name:{hr:"Valencia",en:"Valencia",de:"Valencia"}, pop:915000, metro:1830000 }
  ],
  GY: [
    { name:{hr:"Georgetown",en:"Georgetown",de:"Georgetown"}, pop:110000, metro:235000, capital:true },
    { name:{hr:"Linden",en:"Linden",de:"Linden"}, pop:30000 },
    { name:{hr:"New Amsterdam",en:"New Amsterdam",de:"New Amsterdam"}, pop:35000 }
  ],
  SR: [
    { name:{hr:"Paramaribo",en:"Paramaribo",de:"Paramaribo"}, pop:240000, metro:350000, capital:true },
    { name:{hr:"Lelydorp",en:"Lelydorp",de:"Lelydorp"}, pop:22000 },
    { name:{hr:"Nieuw Nickerie",en:"Nieuw Nickerie",de:"Nieuw Nickerie"}, pop:13000 }
  ],
  BR: [
    { name:{hr:"Brasília",en:"Brasília",de:"Brasília"}, pop:3050000, metro:4820000, capital:true },
    { name:{hr:"São Paulo",en:"São Paulo",de:"São Paulo"}, pop:12400000, metro:22620000 },
    { name:{hr:"Rio de Janeiro",en:"Rio de Janeiro",de:"Rio de Janeiro"}, pop:6770000, metro:13700000 }
  ],
  EC: [
    { name:{hr:"Quito",en:"Quito",de:"Quito"}, pop:1870000, metro:2870000, capital:true },
    { name:{hr:"Guayaquil",en:"Guayaquil",de:"Guayaquil"}, pop:2700000, metro:3080000 },
    { name:{hr:"Cuenca",en:"Cuenca",de:"Cuenca"}, pop:340000, metro:640000 }
  ],
  PE: [
    { name:{hr:"Lima",en:"Lima",de:"Lima"}, pop:9750000, metro:11040000, capital:true },
    { name:{hr:"Arequipa",en:"Arequipa",de:"Arequipa"}, pop:870000, metro:1130000 },
    { name:{hr:"Trujillo",en:"Trujillo",de:"Trujillo"}, pop:790000, metro:960000 }
  ],
  BO: [
    { name:{hr:"La Paz",en:"La Paz",de:"La Paz"}, pop:755000, metro:2300000, capital:true },
    { name:{hr:"Santa Cruz",en:"Santa Cruz de la Sierra",de:"Santa Cruz"}, pop:1720000, metro:2060000 },
    { name:{hr:"Cochabamba",en:"Cochabamba",de:"Cochabamba"}, pop:630000, metro:1125000 }
  ],
  PY: [
    { name:{hr:"Asunción",en:"Asunción",de:"Asunción"}, pop:520000, metro:2900000, capital:true },
    { name:{hr:"Ciudad del Este",en:"Ciudad del Este",de:"Ciudad del Este"}, pop:305000, metro:750000 },
    { name:{hr:"San Lorenzo",en:"San Lorenzo",de:"San Lorenzo"}, pop:260000 }
  ],
  UY: [
    { name:{hr:"Montevideo",en:"Montevideo",de:"Montevideo"}, pop:1320000, metro:1960000, capital:true },
    { name:{hr:"Salto",en:"Salto",de:"Salto"}, pop:105000 },
    { name:{hr:"Ciudad de la Costa",en:"Ciudad de la Costa",de:"Ciudad de la Costa"}, pop:95000 }
  ],
  AR: [
    { name:{hr:"Buenos Aires",en:"Buenos Aires",de:"Buenos Aires"}, pop:3120000, metro:15370000, capital:true },
    { name:{hr:"Córdoba",en:"Córdoba",de:"Córdoba"}, pop:1440000, metro:1600000 },
    { name:{hr:"Rosario",en:"Rosario",de:"Rosario"}, pop:950000, metro:1430000 }
  ],
  CL: [
    { name:{hr:"Santiago",en:"Santiago",de:"Santiago de Chile"}, pop:5220000, metro:7120000, capital:true },
    { name:{hr:"Valparaíso",en:"Valparaíso",de:"Valparaíso"}, pop:300000, metro:1000000 },
    { name:{hr:"Concepción",en:"Concepción",de:"Concepción"}, pop:225000, metro:1020000 }
  ],

  // ============ OCEANIA ============
  AU: [
    { name:{hr:"Canberra",en:"Canberra",de:"Canberra"}, pop:457000, metro:470000, capital:true },
    { name:{hr:"Sydney",en:"Sydney",de:"Sydney"}, pop:5360000, metro:5360000 },
    { name:{hr:"Melbourne",en:"Melbourne",de:"Melbourne"}, pop:5080000, metro:5080000 }
  ],
  NZ: [
    { name:{hr:"Wellington",en:"Wellington",de:"Wellington"}, pop:215000, metro:440000, capital:true },
    { name:{hr:"Auckland",en:"Auckland",de:"Auckland"}, pop:1470000, metro:1740000 },
    { name:{hr:"Christchurch",en:"Christchurch",de:"Christchurch"}, pop:385000, metro:510000 }
  ],
  PG: [
    { name:{hr:"Port Moresby",en:"Port Moresby",de:"Port Moresby"}, pop:365000, metro:415000, capital:true },
    { name:{hr:"Lae",en:"Lae",de:"Lae"}, pop:155000 },
    { name:{hr:"Mount Hagen",en:"Mount Hagen",de:"Mount Hagen"}, pop:47000 }
  ],
  FJ: [
    { name:{hr:"Suva",en:"Suva",de:"Suva"}, pop:95000, metro:200000, capital:true },
    { name:{hr:"Nasinu",en:"Nasinu",de:"Nasinu"}, pop:93000 },
    { name:{hr:"Lautoka",en:"Lautoka",de:"Lautoka"}, pop:72000 }
  ],
  SB: [
    { name:{hr:"Honiara",en:"Honiara",de:"Honiara"}, pop:85000, metro:110000, capital:true },
    { name:{hr:"Auki",en:"Auki",de:"Auki"}, pop:7100 },
    { name:{hr:"Gizo",en:"Gizo",de:"Gizo"}, pop:6100 }
  ],
  VU: [
    { name:{hr:"Port Vila",en:"Port Vila",de:"Port Vila"}, pop:52000, metro:75000, capital:true },
    { name:{hr:"Luganville",en:"Luganville",de:"Luganville"}, pop:18000 },
    { name:{hr:"Norsup",en:"Norsup",de:"Norsup"}, pop:3500 }
  ],
  WS: [
    { name:{hr:"Apia",en:"Apia",de:"Apia"}, pop:37000, metro:40000, capital:true },
    { name:{hr:"Asau",en:"Asau",de:"Asau"}, pop:1100 },
    { name:{hr:"Mulifanua",en:"Mulifanua",de:"Mulifanua"}, pop:1100 }
  ],
  TO: [
    { name:{hr:"Nuku'alofa",en:"Nukuʻalofa",de:"Nukuʻalofa"}, pop:23000, metro:35000, capital:true },
    { name:{hr:"Neiafu",en:"Neiafu",de:"Neiafu"}, pop:4000 },
    { name:{hr:"Haveluloto",en:"Haveluloto",de:"Haveluloto"}, pop:3300 }
  ],
  KI: [
    { name:{hr:"Tarawa",en:"South Tarawa",de:"South Tarawa"}, pop:64000, metro:64000, capital:true },
    { name:{hr:"Betio",en:"Betio",de:"Betio"}, pop:17000 },
    { name:{hr:"Bairiki",en:"Bairiki",de:"Bairiki"}, pop:2800 }
  ],
  TV: [
    { name:{hr:"Funafuti",en:"Funafuti",de:"Funafuti"}, pop:6300, metro:7000, capital:true },
    { name:{hr:"Savave",en:"Savave",de:"Savave"}, pop:800 },
    { name:{hr:"Tanrake",en:"Tanrake",de:"Tanrake"}, pop:650 }
  ],
  FM: [
    { name:{hr:"Palikir",en:"Palikir",de:"Palikir"}, pop:7000, metro:8000, capital:true },
    { name:{hr:"Weno",en:"Weno",de:"Weno"}, pop:13900 },
    { name:{hr:"Kolonia",en:"Kolonia",de:"Kolonia"}, pop:6100 }
  ],
  MH: [
    { name:{hr:"Majuro",en:"Majuro",de:"Majuro"}, pop:28000, metro:28000, capital:true },
    { name:{hr:"Ebeye",en:"Ebeye",de:"Ebeye"}, pop:9500 },
    { name:{hr:"Arno",en:"Arno",de:"Arno"}, pop:1800 }
  ],
  PW: [
    { name:{hr:"Ngerulmud",en:"Ngerulmud",de:"Ngerulmud"}, pop:400, capital:true },
    { name:{hr:"Koror",en:"Koror",de:"Koror"}, pop:11200 },
    { name:{hr:"Meyungs",en:"Meyungs",de:"Meyungs"}, pop:1500 }
  ],
  NR: [
    { name:{hr:"Yaren",en:"Yaren",de:"Yaren"}, pop:1100, metro:1100, capital:true },
    { name:{hr:"Denigomodu",en:"Denigomodu",de:"Denigomodu"}, pop:1800 },
    { name:{hr:"Meneng",en:"Meneng",de:"Meneng"}, pop:1380 }
  ],
}
