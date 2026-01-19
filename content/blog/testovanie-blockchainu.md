+++
title = "Testovanie blockchainu"
description = "Zhrnutie mojej skúsenosti s testovaním blockchainu."
date = "2026-01-13"

[taxonomies]
tags=["IT", "blockchain", "testovanie"]
+++

*Cieľom článku je ukázať, čo všetko obnášala práca na blockchainovom projekte a zosumarizovať skúsenosti, "vojnové historky" a výzvy, s ktorými som sa stretla*

# Úvod do blockchainu

Ak ste ešte náhodou nepočuli o blockchaine, resp. neštudovali si ho bližšie, ide o decentralizovanú distribuovanú digitálnu účtovnú knihu tvorenú reťazou blokov transakcií, ktoré sú navzájom prepojené hashom predošlého bloku. Tento záznam transakcií je replikovaný naprieč peer-to-peer (P2P) sieťou uzlov, ktoré podliehajú určitému protokolu konsenzu na pridávanie a validáciu nových blokov s transakciami bez potreby centrálnej autority. Kryptografia (použitie hashovania, digitálneho podpisu a ďalších techník) zabezpečuje integritu a verifikáciu dát, autentifikáciu a nemennosť (už zapísané transakcie na blockchaine je veľmi ťažké zvrátiť alebo pozmeniť). V prípade kryptomien je blockchain protokolom na výmenu hodnoty, ale blockchain ako technológia sa dá použiť aj ako nemenný overiteľný záznam iných dát v čase.

Blockchain pozostáva z niekoľkých logických vrstiev:
1. infraštruktúra (fyzické a virtuálne servery, na ktorých bežia uzly siete)
1. networking (sem spadá komunikácia uzlov - objavovanie iných účastníkov siete, propagácia informácií a ich verifikácia)
1. konsenzus
1. dáta (bloky, transakcie, Substrate runtime eventy)
1. aplikácie (smart kontrakty/decentralizované aplikácie)

Blockchainy kryptomien (Bitcoin, Ethereum, Cardano, ...) sa líšia konkrétnymi mechanizmami fungovania, preto ďalej trochu priblížim Midnight.

# Špecifiká blockchainu Midnight

Koncom roka 2021 som začala pracovať pre inžiniersku spoločnosť za kryptomenou Cardano. V tom čase som nemala žiadnu prax s testovaním blockchainu, ale Bitcoin a kryptomeny ma zaujímali. Dostala som sa na utajený projekt úplne nového blockchainu Midnight s podporou dôverných transakcií a smart kontraktov. Tým pádom sme dosť veľa vecí na podporu testovania museli riešiť vo vlastnej réžii. Midnight pre sledovanie vlastníctva tokenov kombinuje tzv. UTXO model (pre transakcie z peňaženky na peňaženku) a account model (pre smart kontrakty). Tokeny okrem natívnej meny mohli byť jedinečné užívateľské, ktoré vydáva konkrétny smart kontrakt.

Začnem popisom jednotlivých komponentov projektu. Ten prešiel niekoľkými iteráciami - keď som prišla, bol uzol napísaný v Scale, smart kontrakty inšpirované Ethereom a používalo sa na ne Remix IDE, peňaženka bola desktopová aplikácia. Výskum pokračoval a postupne sa menili technológie, architektúra a koncept fungovania smart kontraktov, na záver bol stav takýto:

- knižnica ledgeru (účtovnej knihy): v Ruste, jadro blockchainu, mechanizmus spracovania transakcií, vedenia stavu mincí a smart kontraktov
- proof server: v Ruste, beží na lokálnom zariadení používateľa peňaženky, jeho úlohou je vytvoriť tzv. zero-knowledge dôkaz o súkromných prvkoch transakcie, ktorý je potom ľahko a rýchlo overiteľný
- blockchainový uzol: v Ruste, založený na modulárnom [Substrate SDK od Polkadot](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate), bežiace uzly vytvárajú samotnú blockchainovú sieť, prijaté transakcie validujú, spracúvajú a pridávajú do nových blokov podľa pravidiel ledgera
- indexer: v Ruste, spracúva transakcie uzla, ku ktorému je napojený, poskytuje GraphQL API pre ľahšie dotazovanie sa na dáta blockchainu a beží procesy read-only peňaženiek (ktoré potom u používateľa môžu fungovať ako tzv. light peňaženky aj v prehliadači)
- knižnica peňaženky a rozšírenia do prehliadača (implementácia peňaženky): v Scala.js a TypeScripte, peňaženka umožňuje vytvárať transakcie a) medzi adresami jednotlivých peňaženiek; b) na adresy smart kontraktov pri interakcii s decentralizovanými aplikáciami (ďalej dApps) a obdržanie tokenov od smart kontraktov
- faucet: služba pre distribúciu tokenov (používatelia blockchainu musia nejak získať tokeny, ak ide o testnet a iné neprodukčné siete, kde token nemá reálnu hodnotu a nedá sa kúpiť), v podstate server, na ktorom beží peňaženka naplnená tokenmi, záujemca zadal adresu svojej peňaženky na webstránke a prebehlo zaslanie nastavenej sumy na požadovanú adresu
- programovací jazyk Compact: vlastný jazyk pre smart kontrakty podobný TypeScriptu, vyžadoval si svoj kompilátor (a podporné nástroje pre vývojárov ako plugin do VS Code pre syntax a debugging)
- knižnica Midnight.js: na vývoj dApps nad Midnightom - prepája smart kontrakty v Compacte s TypeScriptom, obsahuje klientov pre peňaženku, indexer, proof server a iné
- dApps: vzorové decentralizované aplikácie v podobe CLI aj UI, slúžili ako test celého systému a dokumentácia. dApps v skratke vytvoria predpis transakcie na základe smart kontraktu a požiadajú pripojenú peňaženku o schválenie a poskytnutie mincí na jej pokrytie. Alebo sa peňaženka môže uchádzať o vyplatenie sumy z účtu kontraktu po overení na základe pravidiel kontraktu.
- kryptografické knižnice: použité v ledgeri a iných komponentoch, mimo záber testerského tímu (bezpečnosti a testovaniu tohto sa venujú kryptografickí analytici)

Zjednodušený diagram:

{% mermaid() %}
---
config:
  theme: 'base'
  themeVariables:
    primaryColor: '#8c65b0ff'
    primaryTextColor: '#fff'
    primaryBorderColor: '#181818'
    lineColor: '#b3ab9bff'
    secondaryColor: '#79b473'
    tertiaryColor: '#fff'
---
flowchart LR
    node[("uzol + ledger")] --> indexer[indexer] --> wallet[peňaženka] --> proof[proof server]
    wallet --> node
    proof --> wallet
    contract[/smart kontrakt/] --> compiler[kompilátor + MN.JS] --> dApp[dApp]
    dApp --> wallet
    indexer --> dApp
{% end %}

Zjednodušený popis procesu transakcie:
1. peňaženka sa musí zosynchronizovať s blockchainom pomocou indexera, aby mala aktuálne dáta o svojich minciach
1. pripraví transakciu a mince, ktoré ju majú pokryť
1. pošle predpis transakcie proof serveru
1. od neho dostane proof, ktorý zapracuje do konečnej podoby transakcie a pošle uzlu
1. ak transakcia prejde cez všetky kontroly ledgera a je zahrnutá do bloku
1. indexer spracuje nový blok
1. peňaženka nakoniec dostane od indexera aktualizáciu, ktorú aplikuje na svoj stav a zmena zostatku sa prejaví v peňaženke

Ide o pomerne zložitý a prepojený systém plný závislostí. Naviac si bolo treba uvedomiť, že persónami nášho produktu boli okrem obyčajných používateľov kryptomeny aj prevádzkovatelia blockchainovej infraštruktúry, vývojári decentralizovaných aplikácií, vývojári nových implementácií peňaženiek a iných komponentov a tretie strany v podobe kryptobúrz, decentralizovaných zmenární a iných prvkov kryptoekosystému.

# Testovanie peňaženky

Najviac času som strávila v tíme peňaženky. Automatizované testy som vytvorila pre rozšírenie do prehliadača (s pomocou [Playwrightu](https://playwright.dev/)) aj pre knižnicu (s testovacím frameworkom [Jest](https://jestjs.io/)).  
Keďže inštancia peňaženky potrebuje pre chod proof server, uzol a indexer, tieto som lokálne spúšťala pomocou docker-compose súborov a pri automatizovaných testoch som využívala [Testcontainers](https://testcontainers.com/) a možnosť ovládať kontajnery z testu - napr. dočasné stopnutie niektorého z kontajnerov.

Čo sa týka rozšírenia, Playwright vyžadoval beh v headed móde (neskôr som zachytila, že experimentálne by mal fungovať aj headless) a [perzistentný context](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-persistent-context). Práca s oknom rozšírenia (otvorenom po kliknutí na ikonu v toolbare) sa simulovala prístupom na `chrome-extension://${extensionId}/popup.html` a nastavením veľkosti viewportu.  
Pri testovaní som použila aj rozšírenia na inšpekciu localStorage, či sa dáta a nastavenia peňaženky správne ukladajú, aktualizujú po zmene a pretrvávajú po reštarte prehliadača. Občas sa nedopatrením stalo, že proces rozšírenia sa nespustil pri otvorení browsera a peňaženka sa začala synchronizovať až po otvorení rozšírenia.  
Normálny používateľský flow si vyžadoval na začiatku používania rozšírenia prejsť tzv. onboardingom (vytvorením novej peňaženky - páru kľúčov reprezentovaných 24slovnou frázou alebo vložením takejto frázy, nastavením hesla a endpointov, ktoré má peňaženka používať), v automatizovaných testoch sa to dalo obísť vložením dát do localStorage.  
Pri používaní peňaženky s dlhodobo bežiacimi sieťami (blockchainom na staging alebo testnet prostredí) a pre scenáre s čiastočnou synchronizáciou (od posledného pripojenia k indexeru) som využila uloženie [User Data Directory](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-persistent-context-option-user-data-dir) do artefaktu GitHub Actions, pričom nasledujúci beh nightly testov si ho stiahol a rozšírenie nainštaloval s existujúcou peňaženkou a čiastočne synchronizovanými dátami. Plná synchronizácia od začiatku - bloku 0 pri sieti dosahujúcej milión blokov trvala aj vyše hodinu.  
Dôležitá bola aj výkonnosť, objavili sa bugy, kedy dlho bežiacemu rozšíreniu nakoniec došla pamäť a ráno po otvorení notebooku ste našli spadnutý tab s rozšírením. Na limit som narazila aj v prípade peňaženky, ktorá spravila v histórii veľa transakcií a jej dáta v úložisku prehliadača narástli cez 50 MB, čo fakticky znemožnilo prácu s rozšírením.  
Do E2E testov som zaviedla aj kroky na vizuálne regresné testovanie, bolo však celkom prácne označiť všetky dynamické oblasti, ktoré sa nemali brať do úvahy, plus testy často padali kvôli jednopixelovej odchýlke a žiadnou konfiguráciou sa mi nedarilo malú odchýlku povoliť (myslím, že Playwright mal bug), nakoniec som ich vypla.

Čo sa týka samotnej peňaženky ako knižnice a problémov, čo mi utkveli v pamäti - mala som testovacie peňaženky, ktoré si medzi sebou posielali malú sumu. Ak sa nahromadilo na jednej veľa mincí a chcela som ich veľa použiť v transakcii (napr. suma 20 DUST z 20x1 DUST), proof server zlyhal, keďže musel vytvoriť dôkaz pre každú jednu použitú mincu a ani navyšovanie timeoutu požiadavky pre proof server a pamäte pre Docker (kde bežal proof server) nepomáhalo.  
Ďalší zaujímavý prípad bol, keď transakcia pozostávala z takých mincí, že presne pokryli prevádzanú sumu aj poplatky za transakciu a peňaženke sa nemal vrátiť žiaden výdavok. Vtedy ostala čakať za aktualizáciou od indexera a zostala nepoužiteľná, ďalšie pokusy o transakciu hlásili chybu. Ako rýchly fix sa to riešilo povinným výdavkom v každom prípade, aj keď sa kvôli tomu musela pridať ďalšia minca do transakcie. Mimochodom, algoritmus výberu mincí do transakcie a výpočtu poplatkov som raz dostala od môjho developera popísaný na celú jednu stranu PDF.  
Stalo sa aj, že mince zo zlyhanej transakcie neboli označené ako znovu dostupné a nedali sa použiť pre ďalšie transakcie. Alebo pri prepise modulu zo Scaly do TypeScriptu sa stratilo označenie sumy mincí v pending stave (od zaslania transakcie uzlu po spracovanie aktualizácie z indexera) - toto bolo pekne zachytené E2E testami, ktoré vyslovene očakávali, že pole pending bude na istý čas neprázdne.  
Ukladanie snapshotov peňaženky so synchronizovanými dátami som dorobila aj do nightly testov knižnice peňaženky. Keď resetov blockchainov pribúdalo (občas sa stalo, že blockchain sa dostal do neopraviteľného stavu alebo nová verzia bola nekompatibilná s existujúcimi dátami) a nechcelo sa mi ručne premazať artefakty v GitHub Actions, pridala som kontrolu, či obnova zo snapshotu bola úspešná a či nie je počet blokov plne synchronizovanej peňaženky nižší ako mal snapshot, čo viedlo k štartu peňaženky odnova a vytvoreniu čerstvého snapshotu.  
Testovacie scenáre zahŕňali aj peňaženky so sadou rôznych typov transakcií na začiatku, ďalej sa s peňaženkou nehýbalo a nightly beh kontroloval, či sa zostatky tokenov a stavy smart kontraktov nemenili.  
Knižnica peňaženky využívala RxJS streamy a keď som nerozumela, prečo sa niekedy hodnoty nemenia alebo menia, použila som [túto vizualizáciu](https://rxjs-debug.github.io/).

# Testovanie faucet

Samotná aplikácia nebola rozsiahla (jedna webstránka a asi 2-3 API endpointy) a mala jednoduchú úlohu. Logika rate limitovania bola dôkladne otestovaná na unit úrovni. Pri zavedení JWT tokenov som vyskúšala pohrať sa s [Burp Suite](https://portswigger.net/burp/communitydownload) a [extension na dekódovanie](https://portswigger.net/bappstore/26aaa5ded2f74beea19e2ed8345a93dd), pričom sa mi podarilo nájsť chybu v hodnote exspirácie tokenu.

Viac práce a väčšina problémov vyplývala z prevádzky. Prešlo sa na viac inštancií služby (každá s vlastnou peňaženkou - manipulácia s tou istou peňaženkou v rovnakom čase vedie k problémom, tzv. double spend), ktoré vybavovali požiadavky o tokeny uložené v databáze. Faucet okrem vlastného proof servera dostala neskôr aj svoj indexer.

Pri resete blockchainu bolo treba v Kubernetes clustri odstrániť PVC databázy, v ktorej sa priebežne ukladali aj snapshoty peňaženiek pre rýchlejší štart a nechať faucet synchronizovať s taktiež premazaným indexerom. Trochu ladenia si vyžiadala konfigurácia probes pre K8s, ak sa vymenila použitá peňaženka a musela synchronizovať dlhý blockchain. Dlhšiu investigáciu potrebovala situácia, kedy sa peňaženka javila ako plne zosynchronizovaná, ale v skutočnosti bol blockchain a indexer ďalej a transakcie zlyhávali.

# Testovanie uzla

Tu som strávila posledné mesiace práce. Uzol Midnightu mal závislosti na uzle a ďalšej infraštruktúre z Cardano strany (Midnight je vlastne sidechain alebo partner chain Cardana). Aby sme vedeli bežať a testovať Midnight blockchain aj bez nich, dal sa zapnúť mock follower mód.  
Časovo náročný a náchylný na chyby bol proces inicializácie a registrácie nového sidechainu a registrácie Midnight uzla ako validátora. Nakoniec sa to kolegovi spolu s jedným z SRE tímu podarilo zautomatizovať.

Zostavili sme spolu checklist všetkého, čo nové verzie uzla musia spĺňať - spomínané procedúry inicializácie a registrácie museli prejsť, uzol musel produkovať a finalizovať bloky na lokálnej sieti v Dockeri, staging prostredí aj konfigurácii pre produkciu atď.

Samotný Midnight uzol mohol bežať v rôznych konfiguráciách a chybičky v konfigurácii a použitej špecifikácii siete mohli spôsobiť, že uzol sa nepripojil k existujúcej sieti alebo sa nevedel ani spustiť. To sme chceli zachytiť včas a do CI workflowu som zakomponovala kontroly, či bol pregenerovaný súbor špecifikácie siete a iné miesta, ktoré robili problémy a kontrolu, či aspoň spustenie a produkcia blokov v lokálnej sieti funguje. Test, či uzol vie synchronizovať dáta so staging prostredím a produkciou čakal na vyriešenie prístupu k ďalšiemu potrebnému komponentu z GitHub Actions.

Prevádzkovanie siete uzlov nebola najjednoduchšia úloha a uberala dosť z času, začali sme to nazývať NodeOps. Napr. prechod na novú verziu uzla znamenal postupnosť viacerých krokov, uzly sa museli vymieňať po skupinách v určitom poradí, dôležité preto bolo udržiavať aktuálne runbooky pre rôzne situácie (reset blockchainu, nahodenie produkcie blokov, keď sa z rôznych dôvodov zastavila a pod.). Reset blockchainu obnášal aj ďalšie prípravné úkony ako distribúciu tokenov na všetky peňaženky patriace testerskému tímu a nasadenie testovacích smart kontraktov.

Aby sa pri integrácii zmien nečakalo za peňaženkou a dAppkami, vývojár uzla vytvoril interný nástroj - generátor transakcií, ktorý používal funkcie ledgera na vytvorenie rôznych typov transakcií, takže sme mali dopredu potvrdené, že fungujú. Tento nástroj bol interne vydaný ako Docker image a postupne sa nabaľoval o ďalšie funkcionality - potrebné bolo skontrolovať adresu prislúchajúcu seedu a zostatky na tzv. genesis adresách (počiatočné s tokenmi pri štarte blockchainu), čo hlavne pri zmene kryptografie, prechode na hierarchisticky determinované peňaženky ([viď BIP-44 a spol.](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)) aj iných situáciách párkrát nedopadlo podľa očakávaní.  
Bolo potrebné otestovať uzol aj pod záťažou, takže pribudla podpora pre generovanie dávok transakcií a ich posielanie uzlu v požadovaných intervaloch.

Nie úplne triviálnym sa ukázalo "klonovanie" blockchainu, nakoniec kolega developer prišiel na to, že sa dá zobrať uzol z existujúcej siete, v oddelenom namespace clustera ho použiť ako uzol na bootstrapping siete, k nemu pripojiť nové uzly, a tak spraviť z jedného spoločného základu dve siete s rovnakými dátami (napr. na otestovanie hotfixu alebo rýchlejšie vytvorenie blockchainu na záťažové testy bez potreby naplniť ho generátorom transakcií).

Pri práci s uzlom som sa stretla s [blockchain explorerom od Polkadot](https://polkadot.js.org/apps/#/explorer). Na interakciu s uzlom a indexerom poslúžil API klient [Insomnia](https://insomnia.rest/), ktorý v tom čase ako jeden z mála podporoval aj WebSocket okrem REST a JSON-RPC protokolov.

# Testovanie ďalších komponentov a celoprojektové záležitosti

## Indexer

V tíme indexera som na chvíľu zaskakovala za kolegu. Komponent mával problémy s výkonnosťou, dlhý blockchain a peňaženky s veľkou transakčnou históriou mu dávali zabrať. To (o.i.) sa malo vyriešiť implementáciou nanovo v Ruste, po čom som si našla [nástroj na identifikáciu zmien v GraphQL API](https://the-guild.dev/graphql/inspector), či sa nezaviedli neželané zmeny v API.

## Kompilátor

S týmto komponentom som sa veľmi nestretávala, mali sme nejaké vzorové kontrakty, ktoré boli použité pri testovaní iných komponentov. Pri príležitosti porovnávania výkonnosti komponentov pri zmene podkladovej kryptografie v systéme som našla chybu pri pokuse skompilovať istý smart kontrakt s niekoľkými úrovňami vnorenia funkcií.  
Testeri pridelení k tomuto tímu skúšali vytvárať rôzne kontrakty pomocou fuzzingu a AI a využívať a kombinovať všetky vlastnosti jazyka Compact.

## Verzie a integrácia

Tiahla integrácia zmien naprieč projektom bola nepríjemná. Peňaženka zvykla byť predposledným komponentom, ktorý sa zapojil, keďže potrebovala funkčný uzol, indexer a proof server (po nej nasledovali ešte Midnight.js a vzorové dApps, ktoré neskôr prešli do starostlivosti DevRel tímu).  
Matice kompatibilných verzií som zostavovala väčšinou ja a občas sa prišlo na to, že nová verzia bola neočakávane nekompatibilná so starou a vynútila si reset blockchainu. Ak sa našiel bug, ktorý mal pôvod v ledgeri, nasledovala vlna nových releasov ostatných komponentov, ktoré záviseli na niektorom z jeho artefaktov.

## Hard Fork

Samostatnou kapitolou bola orchestrácia a testovanie tzv. hard forku - upgradu blockchainu naprieč hlavnými komponentmi na spätne nekompatibilnú verziu (postup pri reálnom produkčnom blockchaine, ktorý sa neresetuje) a rollbacku. Dávanie automatizovaného testu dokopy ma stálo veľa mentálnych síl a náčrtov sekvencie krokov, ktoré potrebujem vykonať v jednotlivých fázach hard forku, aby som mala na testovanie pripravené všetko, čo potrebujem 😅.

{% mermaid() %}
---
config:
  theme: 'base'
  themeVariables:
    primaryColor: '#8c65b0ff'
    primaryTextColor: '#fff'
    primaryBorderColor: '#181818'
    lineColor: '#b3ab9bff'
    secondaryColor: '#79b473'
    tertiaryColor: '#fff'
---
flowchart LR
    P0["protokol P0"] -- "hard fork 1" --> P1["protokol P1"] -- "hard fork 2 (= rollback)" --> P2["protokol P2 (= P0)"]
{% end %}

Overenie hard forku sa obmedzovalo na funkčnosť peňaženiek (podpora hard forku u smart kontraktov v tom čase nebola), predstavovalo takéto scenáre:
- peňaženky vytvorené počas protokolu P0 museli fungovať aj v P1 a P2
- peňaženky vytvorené počas protokolu P1 museli fungovať aj v P2
- nové peňaženky mali byť vytvorené vždy podľa aktuálneho protokolu
- transakcie mali fungovať vždy podľa aktuálneho protokolu
- transakcie vytvorené podľa iného protokolu mali byť odmietnuté

E2E test prebiehal tak, že najprv boli pustené Docker kontajnery uzla, indexera a proof servera verzií pred hard forkom, vytvorili sa testovacie peňaženky a spravila transakcia, uložili sa snapshoty. Potom sa špeciálnym API volaním spustil upgrade a migrácia dát na uzle. Po dokončení hard forku sa pustili príslušné verzie indexera a proof servera a upgradovanou verziou knižnice peňaženky sa obnovili peňaženky zo snapshotov (to si vyžiadalo úpravy po konzultácii s architektom, zvyčajný spôsob nefungoval), vytvorila sa nová peňaženka, skontroloval stav starých peňaženiek, spravili ďalšie transakcie a opäť uložili snapshoty. Nasledoval rollback na predchádzajúce verzie a ďalšie kolo testov.

## Dokumentácia a open sourcing

Ďalšiu vrstvu starostí pridávala [dokumentácia](https://docs.midnight.network/) a konečný cieľ [zdrojový kód projektu](https://github.com/midnightntwrk) zverejniť. V prechodnej fáze, kým boli komponenty vyvíjané neverejne, ale zároveň časť dokumentácie bola verejná, boli nastavené workflowy, ktoré určené časti kopírovali z repozitárov komponentov do centrálneho repozitára dokumentácie. Snažila som sa eliminovať väčšinu manuálnych krokov - mergnutie do mainu zdrojového repozitára spustilo pregenerovanie dokumentácie z kódu a vytvorilo pull request, po ktorého mergnutí a aktualizácii súborov v adresári `/docs` sa zavolalo spustenie workflowu v repozitári cieľovej dokumentácie na dotiahnutie zmien zo zdrojového.  
Tým, že sa API a konfigurácie menili, stávalo sa, že príklady vo verejnej dokumentácii zastarali, čo samozrejme netešilo externých experimentátorov s Midnightom. Kontrolovať celú dokumentáciu a ručne testovať príklady po každom release zas bolo nad možnosti testerského tímu.  
Tímy museli tiež nabehnúť na používateľsky orientované dokumentovanie zmien v jednotlivých releasoch a postup migrácií, ak boli potrebné.

## Netradičné prístupy k testovaniu

Netradičná situácia a projekt si pýtali aj netradičné prístupy k testovaniu, o ktorých som písala [v tomto článku](@/blog/netradicne-testovanie.md).

# Záver

Išlo jednoznačne o najkomplexnejší a najnáročnejší projekt, na ktorom som dosiaľ mala možnosť pracovať. A to som nespomínala Glacier Drop (mechanizmus distribúcie tokenov a prípravy genesis bloku mainnetu, ktorý zahŕňal niekoľko iných blockchainov a ich peňaženky), trusted setup (príprava parametrov pre zero knowledge kryptografiu na mainnete), tokenómiu a ďalšie aspekty, ktoré spustenie mainnetu v budúcnosti prinášalo. Roboty bolo ako na kostole, na druhej strane bolo fascinujúce byť súčasťou vývoja niečoho priekopníckeho v celom svete. Stále mám pocit, že som len tak poškrabala povrch a pri testovaní blockchainu sa dá ísť všakovakými smermi a aj poriadne do hĺbky.
