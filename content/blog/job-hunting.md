+++
date = "2026-04-01"
description = "Sumár môjho hľadania práce od posledného kvartálu 2025 a zistení o trhu a nábore."
title = "Hľadanie práce"

[taxonomies]
tags=["osobné"]

[extra]
comment = true
+++

*Sumár môjho hľadania práce od posledného kvartálu 2025 a prehľad zistení o trhu a náborovom procese. Hľadala som primárne remote DevOps a QA (automation/SDET) pozície na Slovensku, v Česku, Poľsku a zahraničí (+ hybrid v Košiciach) a hlásila som sa do rôznych typov firiem od korporátov, cez SW domy rôznej veľkosti po produktové firmy a startupy. Ide o anekdotickú skúsenosť, ale myslím, že každá správa "z frontu" sa hodí.*

# Východiskový bod, ciele a úspešný záver

V polovici októbra 2025 som sa ocitla po prvýkrát v IT nezamestnaná a hľadala som si prácu po sabatikale. Pri výpovedi som netušila, že budem mať dočinenia s trhom práce, ktorý označujú ako [najhorší za dve dekády](https://www.businessinsider.com/tech-jobs-getting-demolished-great-recession-dot-com-era-2026-3). Ubehli vyše 4 roky, čo som naposledy bola na pohovore a potrebovala som zistiť, kam sa požiadavky posunuli a získať nejaké pohovory na rozohriatie. Testovala som vody, či moje CV niekoho zaujme a zároveň som prechádzala DevOps bootcampom.

**Cieľ bol nájsť si prácu ako DevOps inžinier do mája 2026**. Po strete s realitou som ho v polovici februára upravila na DevOps alebo QA job do tohto termínu, keďže som nechcela ostávať mimo práce dlhšie ako rok.

Prvý pohovor som mala v polovici novembra 2025, aktívnejšie som začala reagovať na inzeráty od januára a úmerne s neúspechom som zvyšovala obrátky, až sa job hunting stal činnosťou na plný úväzok. Nakoniec som **za pár mesiacov absolvovala viac pohovorov ako v celej doterajšej kariére**. Koncom marca som dostala ponuku na senior QA, ktorú som prijala. Vzápätí prišla ponuka na mid DevOps, takže som splnila aj pôvodný cieľ.

{% mermaid() %}
---
config:
  theme: 'base'
  themeVariables:
    primaryColor: '#BB2528'
    primaryTextColor: 'rgb(215, 214, 212)'
    secondaryColor: '#006100'
    tertiaryColor: '#fff'
    fontSize: '24px'
    cScaleLabel2: 'rgb(84, 79, 72)'
---
timeline

    section August 2025
        4.8. : Začiatok DevOps bootcampu

    section Október 2025
        8.10. : Pokračovanie bootcampu po pauze
        20.10. : Reakcia na inzerát, ktorá viedla k prvému pohovoru

    section November 2025
        18.11. : Prvý pohovor

    section December 2025
        14.12. : Bootcamp na 95 %

    section Január 2026
        2.1. : Zvýšenie aktivity

    section Február 2026
        11.2. : Začiatok hľadania QA pozícií

    section Marec 2026
        24.3. : Obdržanie ponuky
{% end %}

Hľadanie skončilo úspešne pred termínom, kvôli intenzite však bolo náročné, najmä počtom pohovorov v krátkom čase. Ich pozitívom bolo, že som mala možnosť zistiť viac o firmách a s niektorými si viem predstaviť spoluprácu v budúcnosti.

Demotivujúco pôsobilo, že inzeráty sú v prvých hodinách zavalené stovkami dokonale ušitých CV a motivačných listov (súboj AI), že [algoritmus LinkedInu znevýhodňuje profily s kariérnou prestávkou alebo iné "rizikové"](https://medium.com/@aubrey_87221/opentowork-recruiters-tell-you-not-to-look-desperate-linkedins-algorithm-requires-it-47b60da9b72c) a že recruiting sa sústredí na ľudí, ktorých chce odlákať od konkurenčných firiem (minimálne v Košiciach a na SK). Do toho sa ešte človek dozvedá o [desaťtisícoch ajťákov prepustených vo svete](https://trueup.io/layoffs).

Pozn.: psychická odolnosť je kľúčová, [už 5 odmietnutí vedie k oslabeniu sebadôvery a neskôr až k vyhoreniu](https://www.linkedin.com/pulse/vyhorenie-uch%C3%A1dza%C4%8Da-m%C3%B4%C5%BEe-za%C4%8Da%C5%A5-u%C5%BE-po-5-zamietnutiach-zam%C3%BD%C5%A1%C4%BEame-vallo-ygeqf/).

# Celková štatistika

Polovica žiadostí ostala bez akejkoľvek reakcie. 1/5 žiadostí viedla k pohovoru a 3/8 pohovorov priniesli ponuku, čiže som na 1 ponuku potrebovala 13,33 žiadostí (7,5 % žiadostí sa premenilo na ponuku). Čo v porovnaní s číslami udávanými na internete nie je až také zlé. S celkovým výsledkom pohovorov tiež môžem byť spokojná, po nezdaroch na začiatku som začala postupovať ďalej.

{{ image(path="sankey-sk.png" alt="Sankey graf job huntingu") }}

# IT trh práce a nábor v Q4 2025/Q1 2026

## Situácia na trhu

- **DevOps vs QA**: cielila som na DevOps pozície (na akej som ešte nepracovala) a neskôr aj QA (8+ ročná prax s automatizáciou). Pomer medzi nimi vyšiel presne 1:1 (20:20 žiadostí, 4:4 pohovorov a 1:1 ponúk + 1 ešte nevyhranená ponuka). To som nečakala - DevOps pozícií na juniornom konci bolo ako šafranu, musela som skúšať hlavne mid a pri QA som očakávala pozitívny vplyv seniority.

- **seniorita a roly v QA**:
    - všimla som si stále pomerne dosť junior QA aj čisto manuálnych testing pozícií
    - viaceré senior QA pozície zaváňali skôr lead/test architect rolou. A obdobne, popis požiadaviek a náplne práce u niektorých mid QA pozícií mi bohato stačil.
    - občas sa našla Quality Engineer rola ([QE, nie tradičná QA](https://medium.com/@Staragiletechbytes/quality-engineering-vs-quality-assurance-key-differences-76ad195b6d53)), videla som aj kombináciu QA/DevOps a zistila som, že u zahraničných firiem sa začala objavovať rola [Quality Platform Engineer](https://aiqualityengineer.cc/from-qa-teams-to-platform-capabilities-the-evolution-of-quality-engineering-in-platform-487e828afccf) na pomedzí vývoja, DevEx a kvality ako produktu a súčasti IDP (internej vývojovej platformy)

- **AI v inzerátoch**: AI nástroje ako výhoda alebo požiadavka v QA inzerátoch ešte nie sú bežné, hľadá sa pár testerov AI aplikácií, menej DevOps v súvislosti s prevádzkou AI

- **menej remote príležitostí**: dosť veľa firiem na SK a v ČR vyžaduje hybridný model práce, stretla som sa dokonca s on-site pozíciami. Full remote sa ešte nájdu, ale sú aj zahraničné firmy, ktoré umožňujú remote len v rámci vybraných krajín a SK medzi nimi často chýba.

- **fejky a stav IT globálne/lokálne** 
    - časť pozícií som nepokladala za reálne - či nedopatrením alebo úmyslom môžem len špekulovať (prišiel mi mail, že práve včera sme pozíciu obsadili a tá visí na stránke dodnes)
    - krvavý kúpeľ a zamrznutie trhu sú zrejme nerovnomerne distribuované a záleží na sektore a lokalite... niekedy je výhoda, že SK je pozadu za svetom 😅. Sú veľké firmy s pobočkami vo viacerých krajinách, ktoré majú otvorených presne 0 pozícií, iné zas stovky. Na LI málo vídam niekoho nastúpiť na nové miesto, naopak rámčekmi OpenToWork sa to zelení a nie je raritou vidieť ľudí, ktorí si prácu hľadajú viac ako 2 roky.
    - signály sú nejednoznačné, niektorí poukazujú na nárast otvorených pozícií pre IT recruiterov a potenciál pre obrat k lepšiemu v globále. Lokálne som sama zvedavá, ktorým smerom sa trh pohne.

## Hľadanie

- **pracovné portály**: 
    - **Profesia** je nutné zlo a potrebovala by konkurenciu
    - **LinkedIn** občas zobrazí relevantné inzeráty (a ktoré nie sú na Profesii), filtrovanie sťažuje kopa zle kategorizovaných, najväčší prínos má nastavenie notifikácií na nové joby
    - **české a poľské portály** nepriniesli ani len screening hovor. Prispeli aspoň k prehľadu o finančnom ohodnotení na týchto trhoch - české platy sú nižšie, čo je zreteľné, ak firma inzeruje pozíciu v oboch krajinách. Pri slovenskej daňovej rezidencii sa teda veľmi neoplatí hľadať v ČR.
    - [**Remote Rocketship**](https://www.remoterocketship.com/) sa sústredí na remote pozície na firemných stránkach a pomáha nájsť ponuky nenachádzajúce sa na LI. Práve reakcie na pozície na neprefláknutých miestach, kde sa nehlási pol krajiny/sveta, boli úspešnejšie (v rámci SK vyzerá, že hlavná je Profesia a na LI ešte nie je taká konkurencia).

- **AI**: niektoré zahraničné pracovné portály majú zabudovanú funkcionalitu vyhodnotenia zhody CV s inzerátom pomocou AI. Vyrojila sa kopa platených a neplatených AI nástrojov, ktoré majú pomôcť s hľadaním inzerátov, tvorbou CV, evidenciou žiadostí, analýzou trhu a pod. (napr. [https://slayapply.com](https://slayapply.com) na odhalenie potenciálnych fejkov a scamov)

- **networking**: osobné kontakty a účasť na lokálnych podujatiach nepriniesli žiadne príležitosti. Narazila som na [článok](https://ehandbook.com/stop-telling-job-seekers-that-networking-will-get-them-a-job-d490496545af), ktorý argumentuje, že aj keď sa networking pokladá za najlepší spôsob získania práce, v aktuálnej dobe nefunguje ani ten.

- **podvody**: obozretnosť je na mieste, nezamestnaní bývajú cieľmi hackerov a scammerov. Osobne som sa stretla s jedným vyslovene podozrivým účtom a LI profil rýchlo zablokoval.

## Nábor

- **zdĺhavé procesy**: bežne sa mi ozvali 2-3 týždne po poslaní CV, keď už som to ani nečakala (dokonca aj po zrejme automatickom zamietavom emaili). S pohovormi sa firmy tiež neponáhľali a na jeden som čakala takmer 2 týždne. V jednom prípade sa konanie od podania žiadosti natiahlo na vyše 2,5 mesiaca. Procesy mali často 3-4 kolá, výnimkou boli košické pobočky, kde stačilo 1 kolo.

- **komunikácia a profesionalita**: akákoľvek odpoveď je stále v menšine, aj na pozície, na ktoré som perfektne sedela. Boli aj recruiteri, ktorí sa naozaj starali, ozývali sa počas celého procesu, pani poradila s vylepšením CV a pán pomohol s rokovaním. Absolvovala som jeden dosť bizarný pohovor - iba jeden pohovorujúci si zapol kameru, nikto nevidel vlastný inzerát a odpovede na moje otázky nevzbudzovali chuť pracovať pre danú firmu. Raz sa pohovorujúci na naplánovaný videohovor nedostavil a musel byť nanovo dohodnutý.

- **technické kolá**: dostala som 2 úlohy na kódenie s 35 a 60 minútovým limitom vo fáze po podaní žiadosti (1 DevOps a 1 QA). 1 DevOps pohovor zahŕňal malé debugovanie Kubernetes manifestu. 2 QA pohovory live kódenie. Technické kolá boli rôznej náročnosti, najťažší bol mid QE pohovor do zahraničnej firmy, ktorý išiel viac do hĺbky Kubernetu a Linuxu ako všetky DevOps pohovory 🙂.

- **iné kolá**: americké firmy bežne stavajú časť technického alebo osobitné behaviorálne kolo pre [metódu STAR](https://www.jobs.cz/poradna/5-zpusobu-jak-se-vyporadat-s-behavioralnimi-otazkami/) a mala som aj tzv. culture fit kolo, na SK som sa s týmto nestretla. Niektoré zahraničné firmy používajú ako povinnú súčasť prihlasovacieho formulára videonahrávku uchádzača s predstavením a odpoveďami na otázky vo formulári.

- **AI v nábore**: zopár firiem uviedlo, že žiadosti môžu byť spracovávané AI systémom, asi u jednej som videla napísaný opak, že výhradne ľuďmi, u masy zvyšných ani srnka netuší. Čo sa týka AI a pohovorov, nemala som žiadne kolo s AI botom, jeden hovor bol po súhlase prepisovaný AI nástrojom. Jedna firma mala live kódenie vymyslené tak, že po 15 minútach bolo používanie AI povolené.

- **GitHub**: spomenul ho jeden pán, že ma zachránil, keď ma ako testera chcel vyradiť, ale ako jedna z mála som mala GH a sľúbil mi pohovor (a poznamenal, že teta z HR by si GH nebola pozrela). Na technických kolách sa nikto ku GH nevyjadril.

Pozn.: pobavil inzerát českej firmy, v ktorom bolo, že nie sú ako rodina, len spolu pracujú. Mali odo mňa malé bezvýznamné plus.

## Ďalšie zdroje

Dávam do pozornosti tiež [ebook](https://www.linkedin.com/posts/zdenekkoutsky_it-trh-v-roce-2026-manual-ugcPost-7439358346345738241-hn4f) s ďalšími postrehmi a odporúčaniami zo strany agentúry. A pre ukážku ako sa dá so systémom vybabrať, tento [YouTube kanál](https://www.youtube.com/@sovereigndeveloper/videos) (upozornenie: na hrane etiky a za ňou).

# TL;DR a lekcie

Ani seniori to nemajú na súčasnom IT trhu naklonenom zamestnávateľom ľahké. Poctivou prípravou a s trochou šťastia je stále možné dosiahnuť úspech. Dôležité je skúšať úpravy prístupu a nebrať si odmietnutia príliš k srdcu. 

Samozrejme, tí, čo prácu majú a uvažujú o zmene, môžu venovať hľadaniu vyhradený čas a postupovať tempom, aké im vyhovuje. Tiež sú na pohovoroch v lepšej psychologickej a vyjednávacej pozícii.

1. **Vyčleniť aspoň 1-2 mesiace** na zisk prvého pohovoru a rátať s ďalším časom na prejdenie celým procesom
1. Dostať sa na nejaké **pohovory na rozvičenie**, ideálne nestratiť povedomie o trhu, priebežne sledovať ponuku a **viackrát do roka zájsť na pohovor** pre cvik a prieskum
1. Nečakať postupne za odpoveďami, riešiť **súvisle a paralelne viacero možností**
1. **Viesť si evidenciu** (históriu reakcií, otázky pripravené na pohovor a ktoré na ňom padli, uvedený požadovaný plat atď.) - uľahčuje byť v obraze, keď odniekiaľ zavolajú a pomáha ladiť prístup
1. Hlásiť sa na **miesta, ktoré nie sú široko inzerované**, **reagovať medzi prvými**, nastaviť si notifikácie
1. **Veriť**, že ďalší pokus vyjde **a poučiť sa z tých nevydarených**
