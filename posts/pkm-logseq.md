---
title: Budovanie druhého mozgu
description: Personal knowledge management a nástroj Logseq.
date: 2022-07-11
tags:
  - osobné
image: /img/logseq-graf.png
layout: layouts/post.njk
---

*O potrebe personal knowledge managementu a mojich začiatkoch s nástrojom Logseq*

V poslednej dobe čítam veľa náučných kníh a článkov, počúvam náučné videá a podcasty. Veľakrát ma informácie v nich zaujali a hovorila som si: „to si musím zapamätať, je to zaujímavé/užitočné.“ Samozrejme, že mi vyfučali z hlavy, predsa len ľudský mozog má limity, a tak som začala uvažovať, že si začnem robiť poznámky a zapisovať dôležité myšlienky. V správnej chvíli mi LinkedIn zobrazil vo feede [príspevok](https://www.linkedin.com/posts/artem-grygorenko_notetaking-effectiveness-system-activity-6939909127817076736-Aorf), ktorý ma priviedol k heslu <mark>personal knowledge management</mark> (PKM) a systémom robenia poznámok.

### Čo je PKM
- PKM je druhý mozog, externá pamäť, niekde nájdete aj pojem osobná wikipédia
- ide o dlhodobú investíciu času a úsilia do zachytenia a organizovania informácií. Zahŕňa veci, čo prežívame, čítame, počúvame. Je to premyslený a systematický zber informácií.
- PKM teda zahŕňa aj poznámky z mítingov, osobné dáta, nápady na darčeky, nákupné zoznamy, cestovné itineráre atď. Hocičo, čo si chceme pamätať a čo považujeme za užitočné pre budúcnosť. Uložením týchto vecí na centralizovanom digitálnom mieste mimo zábudlivý mozog môžeme využiť benefity vyhľadávania, zálohy, synchronizácie medzi zariadeniami a zdieľania s ostatnými (pripomínam šifrovanie, ak ide o poznámky osobného charakteru).

### Prečo PKM používať
- všetko, čo chceme v živote dokázať, vyžaduje hľadanie a využívanie správnych informácií. Profesionálny úspech a kvalita života závisí od schopnosti manažovať informácie okolo nás (v súčasnosti ich je kvantum a sme nimi zahltení). Nemôžeme použiť hlavu na uloženie všetkého, čo potrebujeme vedieť, pomôžme si technológiou.
- poznámkovanie je zároveň intelektuálnym cvičením:
  - parafrázovanie, zhrnutie vlastnými slovami vedie k lepšiemu pochopeniu, učeniu a zapamätaniu si danej informácie. Naše myšlienky dávajú zmysel.
  - konfrontovanie s existujúcimi poznatkami prispieva k rozvoju kritického myslenia a schopnosti riešiť problémy
  - zvyšuje kreativitu a pomáha v procese rozhodovania. Môžete objaviť nové nečakané prepojenia a generovať nové myšlienky
- zabraňuje zahlteniu, dáva pokoj mysli, šetrí mentálnu kapacitu a energiu
  - ak používame na všetky poznámky jeden nástroj, eliminuje to problém x súborov/aplikácií/papierov (kam som si konkrétnu vec poznačila? bola tá pracovná požiadavka v emaili, Slacku, na Confluence alebo v nejakom zdieľanom dokumente?), zvýraznené pasáže v knihách takisto nie sú používateľsky prívetivé (v ktorej knihe som o danej veci čítala a kde presne to bolo?)
  - ak sú informácie uložené v sieti, prepojenia uľahčujú prácu
    - nemusíte sa zaoberať tým, ako danú informáciu kategorizovať, do ktorého adresára ju uložiť
    - zároveň je jednoduchšie nejakú informáciu nájsť a objaviť súvisiace prepojenia. Štruktúra podobná mozgu umožňuje, že sa k jednej zásuvke dá dôjsť viacerými cestami.
- PKM je obzvlášť nápomocný ľuďom z oblasti výskumu, na písanie odborných prác - budujete základy, na ktorých v budúcnosti môžete stavať, viete, ako sa vaše poznanie rozvíjalo a máte k dispozícii zdroje

Dômyselné a produktívne robenie poznámok a PKM umožňujú aplikácie ako napr. [Roam Research](https://roamresearch.com/), [Obsidian](https://obsidian.md/), [Athens](https://www.athensresearch.org/), [Workflowy](https://workflowy.com/), ja som si vybrala open-source alternatívu [Logseq](https://logseq.com/).

Existuje viacero metód robenia poznámok a ich organizácie ako napr. [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten), [Evergreen Notes](https://notes.andymatuschak.org/Evergreen_notes), [P.A.R.A. - Projects, Areas, Resources, Archives](https://fortelabs.co/blog/para/) a [IMF - Index, Maps of Content, and Other Fluid Frameworks](https://medium.com/@nickmilo22/in-what-ways-can-we-form-useful-relationships-between-notes-9b9ec46973c6). Každému môže lepšie fungovať niečo iné, odporúča sa brať ohľad na osobné ciele, ktoré chceme s PKM dosiahnuť a špecifické okolnosti.

### Logseq
- open-source desktopová a Android aplikácia na vytváranie, organizáciu a zdieľanie osobných znalostí
- pracuje s lokálnymi súbormi vo formáte Markdown alebo Org-mode
- je postavená na odkazoch a tagoch. Je veľmi jednoduché vytvoriť novú stránku a nalinkovať ju - je to záležitosť napísania ```[[Názov novej stránky]]```
  - zároveň umožňuje stránky ukladať aj v hierarchickej štruktúre (ak v ich názve je "/" na oddelenie jednotlivých adresárov), takže je flexibilná a môžete ju používať rôznymi spôsobmi
  - vytvorené stránky a ich prepojenia vidíte pekne v grafe
  - obsahuje tiež journal (denník) - stránku pre každý deň
- dá sa použiť aj na manažment úloh
- môžete definovať šablóny - napr. ak vytvárate stránku pre knihu, ponúkne polia, aké chcete (autor, názov, tagy a pod.)
- dotazy (v Clojure) napr. na zobrazenie všetkých šablón, ktoré máte; zobrazenie úloh s termínom v najbližšom týždni...
- vstavaná podpora pre pomoc so zapamätaním si faktov prostredníctvom kartičiek na princípe [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) (často sa používa na učenie slovíčok/fráz v cudzom jazyku)
- vstavaná podpora PDF - ak vložíte PDF súbor a zvýrazňujete si v ňom pasáže, tieto sa nalinkujú na stránke
- množstvo pluginov a tém od komunity - napr. na zobrazenie stránky ako myšlienkovej mapy, vloženie tituliek z linkovaného YouTube videa...
- ďalšie nástroje integrované s Logseqom a uľahčujúce prácu:
  - [Snipd](https://www.snipd.com/) na uloženie momentov z podcastov
  - [Readwise](https://readwise.io/) importuje zvýraznené pasáže z ebookov a článkov
  - [Shortform](https://www.shortform.com/) poskytuje sumáre kníh a analýzy ich myšlienok
- užitočné zdroje k základom i pokročilým technikám používania Logsequ:
  - https://www.youtube.com/c/OneStutteringMind/featured
  - https://www.youtube.com/c/ToolsonTech/featured

### Moje začiatky s PKM
Pre konkrétny systém robenia poznámok som sa ešte nerozhodla, začala som jednoducho, určila som si pár konvencií ako si stránky zorganizovať. Nemal by byť problém systém neskôr upraviť, môže sa postupom času vyvíjať. Zatiaľ používam denník ako defaultné miesto na zachytenie poznámok, mám aj domovskú stránku, šablónu pre knihy, stránku so všetkými úlohami a doslovné citácie linkujem k jednej stránke a uvádzam ich zdroj. V budúcnosti sa chcem posunúť na systém postupného spracovávania citácií na krátke a výstižné poznámky vlastnými slovami.
Časť môjho grafu na ukážku:

![Graf v Logsequ](/img/logseq-graf.png)

Separátny graf som si vytvorila pre pracovné záležitosti, do ktorého migrujem existujúce poznámky rozhodené po textových súboroch a iných dokumentoch.

Koncept PKM ma očaril a ľutujem, že som ho neobjavila skôr, ušetril by mi mnoho starostí. Teraz sa vraciam k prečítaným knihám, aby som si ich spoznámkovala 😄. Je to vedomá práca, nie je to zadarmo, ale viem, že prinesie benefity v budúcnosti. Už tento príspevok vznikol na základe mojich poznámok o Logsequ a o knihe [How to Take Smart Notes](https://www.martinus.sk/?uItem=913673) 🙂.
