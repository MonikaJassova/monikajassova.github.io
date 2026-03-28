+++
date = "2026-04-02"
description = "Sumár môjho zháňania práce od posledného kvartálu 2025."
title = "Hľadanie práce"

[taxonomies]
tags=["osobné"]

[extra]
comment = true
+++

*Zhrnutie môjho zháňania práce od posledného kvartálu 2025.*

# Východzí bod, ciele a úspešný záver

V polovici októbra 2025 som sa ocitla po prvýkrát, čo som v IT, nezamestnaná a hľadala som si prácu po sabatikale. Zároveň som prechádzala DevOps bootcampom a začala som testovať vody, či moje CV niekoho zaujme. Ubehli vyše 4 roky, čo som naposledy bola na pohovore a nevenovala som ani pozornosť trhu (jediné, čo naznačovalo zmenu, bol pokles správ od recruiterov na LinkedIne). Potrebovala som zistiť, kam sa požiadavky posunuli a získať nejaké pohovory na rozohriatie. 

Cieľ bol nájsť si prácu ako DevOps inžinier do mája 2026, po strete s realitou som ho v polovici februára upravila na DevOps alebo QA job do tohto termínu, keďže som nechcela ostávať mimo práce dlhšie ako rok.

Prvý pohovor som mala v polovici novembra 2025, aktívnejšie som začala reagovať na inzeráty od januára a priamo úmerne s neúspechom som zvyšovala obrátky. Hľadanie a príprava sa stali činnosťou na plný úväzok. Nakoniec som za pár mesiacov absolvovala viac pohovorov ako v celej doterajšej kariére. Bolo to vyčerpávajúce a po obdržaní prvej ponuky koncom marca (a chvíli rokovania) som už mala všetkého dosť a ostatné rozbehnuté pohovory som zastavila. Neskôr prišla ponuka na DevOps, takže podaril sa mi aj pôvodný kúsok a presunúť sa skúsim v budúcnosti interne na novom pracovisku.

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
        4.8. : Začiatok bootcampu

    section Október 2025
        8.10. : Pokračovanie bootcampu po pauze
        20.10. : Podanie žiadosti k prvému pohovoru

    section November 2025
        18.11. : Prvý pohovor

    section December 2025
        14.12. : Bootcamp na 95 %

    section Január 2026
        2.1. : Zvýšenie aktivity

    section Február 2026
        11.2. : Začiatok hľadania QA pozícií

    section Marec 2026
        24.3. : Obdržanie prvej ponuky
{% end %}

Demotivujúce bolo vidieť, ako sa recruiting sústredí na ľudí, ktorých chcú odlákať od konkurenčných firiem (akoby ihneď dostupní kandidáti neexistovali alebo neboli dobrí), že inzeráty sú v prvých hodinách zavalené stovkami dokonale ušitých CV a motivačných listov a že LinkedIn kladie profilom s kariérnou prestávkou alebo bez aktuálnej pozície pod nohy polená vo forme menšej viditeľnosti vo vyhľadávaní, dosahov príspevkov a pod. Do toho sa ešte človek dozvedá o desaťtisícoch ľudí prepustených údajne z dôvodu AI.

# Celková štatistika

Polovica žiadostí ostala bez akejkoľvek reakcie. 1/5 žiadostí viedla k pohovoru a 1/4 pohovorov priniesla ponuku, čiže som potrebovala 20 žiadostí na 1 ponuku. Čo v porovnaní s priemerom udávaným na internete nie je až taká zlá štatistika. S celkovým výsledkom pohovorov tiež môžem byť spokojná, po neúspešných pokusoch na začiatku som začala postupovať ďalej.

{{ image(path="sankey-sk.png" alt="Sankey graf job huntingu") }}

# IT trh práce a nábor v Q4 2025/Q1 2026
*Nasleduje sumár pozorovaní z mojich interakcií so súčasným trhom a náborovým procesom. Správa z frontu, ktorá sa môže hodiť tým, čo v ostatnej dobe sedeli v zázemí:*

- **tiahle procesy**: firmy si dávajú načas, bežne sa mi ozvali späť 2-3 týždne po poslaní CV, keď už som to ani nečakala (dokonca aj po zrejme automatickom zamietavom emaili). S pohovormi sa tiež neponáhľali a na jeden som čakala takmer 2 týždne. V jednom prípade sa konanie od podania žiadosti natiahlo na vyše 2,5 mesiaca kvôli interným zmenám vo firme. Procesy mali často 3-4 kolá, výnimkou boli košické pobočky, kde stačilo 1 kolo.

- **komunikácia a profesionalita**: akákoľvek odpoveď je stále v menšine, aj na pozície, na ktoré som perfektne sedela. Absolvovala som jeden dosť bizarný pohovor - iba jeden pohovorujúci si zapol kameru, nikto nevidel vlastný inzerát a odpovede na moje otázky nevzbudzovali chuť pracovať pre danú firmu (asi jej páni mali sami dosť).  

- **DevOps vs QA a seniorita**: 
    - cielila som na DevOps pozície (na akej som ešte nepracovala) a neskôr som doplnila QA (8+ ročná prax s automatizáciou). Pomer medzi nimi vyšiel presne 1:1 (20:20 žiadostí, 4:4 pohovorov a 1:1 ponúk). To som nečakala, keďže DevOps pozícií na juniornom konci bolo ako šafranu a musela som skúšať hlavne mid level.
    - všimla som si stále pomerne dosť junior QA aj čisto manuálnych testing pozícií. Viaceré senior QA pozície zaváňali skôr lead/test architect rolou. A obdobne, popis požiadaviek a náplne práce u niektorých mid QA pozícií mi bohato stačil.
    - zistila som, že u zahraničných firiem sa začala objavovať rola [Quality Platform Engineer](https://aiqualityengineer.cc/from-qa-teams-to-platform-capabilities-the-evolution-of-quality-engineering-in-platform-487e828afccf) na pomedzí vývoja, DevEx a kvality ako produktu a súčasti IDP (internej vývojovej platformy)

- **úlohy a technické kolá**: dostala som 2 úlohy na kódenie s 35 a 60 minútovým limitom vo fáze po podaní žiadosti (1 DevOps a 1 QA). 1 DevOps pohovor zahŕňal malé debugovanie Kubernetes manifestu. 2 QA pohovory live kódenie. Technické kolá boli rôznej náročnosti, najťažší bol (mid) QA pohovor do zahraničnej firmy, ktorý išiel viac do hĺbky Kubernetu a Linuxu ako všetky DevOps pohovory 🙂. Čo sa týka QA, tým, že každý má za sebou iné projekty, technológie a situácie, trafiť sa do potreby a predstavy druhej strany tiež nebolo samozrejmé.

- **iné kolá**: americké firmy bežne stavajú časť technického alebo osobitné behaviorálne kolo pre [metódu STAR](https://www.jobs.cz/poradna/5-zpusobu-jak-se-vyporadat-s-behavioralnimi-otazkami/) a mala som aj tzv. culture fit kolo, na Slovensku som sa s týmto nestretla

- **AI**: zopár firiem hľadá testerov s AI nástrojmi ako výhodou alebo požiadavkou, nájdu sa aj inzeráty na testerov AI aplikácií, menej DevOps v súvislosti s AI. Čo sa týka AI a pohovorov, nemala som žiadne kolá s AI botom. Zopár firiem uviedlo, že žiadosti môžu byť spracovávané AI systémom, asi u jednej som videla napísaný opak, že výhradne ľuďmi, u masy zvyšných ani srnka netuší. Jedna firma mala live kódenie vymyslené tak, že prvých 15 minút bolo zakázané používať AI, potom povolené.

- **GitHub**: portfólio na GH sa zvykne radiť ako pomôcka a téma na pohovore pre ľudí bez komerčnej praxe, spomenul ho jeden pán, že ma zachránil, keď ma ako testera chcel vyradiť, ale ako jedna z mála som mala GH a sľúbil mi pohovor (a poznamenal, že teta z HR by si GH nebola pozrela). Na technických kolách sa nikto ku GH nevyjadril.

- **menej remote príležitostí**: zaujímali ma primárne remote pozície, dosť veľa firiem na SK a v ČR však vyžaduje hybrid, stretla som sa dokonca s on-site pozíciami. Full remote sa ešte nájdu, ale všimla som si aj zahraničné firmy, ktoré umožňujú remote len v rámci vybraných krajín a SK medzi nimi často chýba.  

- **pracovné portály**: Profesia je niečo strašné a konečne by potrebovala konkurenciu. LI občas zobrazí niečo relevantné (a čo sa nenachádza na Profesii), filtrovanie sťažuje kopa zle kategorizovaných inzerátov, najväčší prínos má nastavenie notifikácií na nové ponuky. Sledovala som aj české a poľské portály, ale žiadosti u susedov nepriniesli ani len screening hovor, prispeli aspoň k prehľadu o finančnom ohodnotení na týchto trhoch. Mimochodom, české platy sú nižšie, čo explicitne vidno, ak firma inzeruje pozíciu v oboch krajinách. Pri slovenskej daňovej rezidencii sa teda veľmi neoplatí hľadať v ČR. [Remote Rocketship](https://www.remoterocketship.com/) sa sústredí na remote pozície na firemných stránkach a pomáha nájsť ponuky nenachádzajúce sa na LI. Práve reakcie na pozície na neprefláknutých miestach, kde sa nehlási pol krajiny/sveta, boli úspešnejšie (v rámci SK vyzerá, že hlavná je Profesia a na LI ešte nie je taká konkurencia).

- **networking**: zisťovanie u bývalých kolegov a účasť na rôznych lokálnych podujatiach nepriniesli žiadne podpultové ani iné príležitosti. Narazila som na [článok](https://ehandbook.com/stop-telling-job-seekers-that-networking-will-get-them-a-job-d490496545af), ktorý argumentuje, že v aktuálnej dobe nefunguje ani networking, napriek tomu, že sa roky pokladá za najlepší spôsob získania práce.

- **fejky?** nemohla som sa ubrániť pocitu, že veľká časť pozícií je ilúziou. Stalo sa mi, že prišiel mail, že bohužiaľ, práve včera sme pozíciu obsadili a tá visí na stránke dodnes. Svetlo do situácie by mohli vniesť ľudia zvnútra firiem, či im reálne nastupujú noví kolegovia, alebo je trh naozaj takmer zamrznutý. Niektoré väčšie firmy s pobočkami vo viacerých krajinách majú otvorených presne 0 pozícií. V mojom LI feede málo vídam niekoho nastúpiť na novú pozíciu, naopak rámčekmi OpenToWork sa to zelení.

- **podvody**: ľudia okolo blockchainu a nezamestnaní bývajú cieľmi hackerov, osobne som sa stretla s jedným vyslovene podozrivým čínskym účtom, ktorý sa tváril, že rozširuje QA v blockchaine, LI profil rýchlo zablokoval

Pozn.: pobavil inzerát českej firmy, v ktorom bolo, že nie sú ako rodina, len spolu pracujú. Mali odo mňa malé bezvýznamné plus.

Dávam do pozornosti tiež tento [ebook](https://www.linkedin.com/posts/zdenekkoutsky_it-trh-v-roce-2026-manual-ugcPost-7439358346345738241-hn4f) s ďalšími postrehmi a odporúčaniami zo strany agentúry. A pre ukážku ako sa dá so systémom vybabrať, tento [YouTube kanál](https://www.youtube.com/@sovereigndeveloper/videos) (upozornenie: na hrane etiky a za ňou).

# TL;DR:

Ani seniori nemajú v súčasnosti na ružiach ustlané. Ak plánujete intenzívne hľadať prácu, rezervujte si **minimálne 1-2 mesiace**, kým sa dostanete na prvé interview a rátajte s ďalším časom na prejdenie celým procesom. Čakať postupne za odpoveďami sa nedá, treba riešiť súvisle a paralelne viacero možností. Ak nie ste preborník v pohovoroch, budete ich potrebovať viac na oťukanie, kým niečo vyjde.

Samozrejme, tí, čo prácu majú a uvažujú o zmene, sú na tom lepšie, môžu postupovať tempom, aké im vyhovuje a venovať tomu vyhradený čas. Tiež sú na pohovoroch v lepšej psychologickej a vyjednávacej pozícii.
