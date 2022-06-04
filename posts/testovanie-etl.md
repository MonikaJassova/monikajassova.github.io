---
title: Testovanie ETL
description: Zopár bodov k testovaniu ETL procesov v big data.
date: 2022-06-08
tags:
  - IT
  - big data
  - testovanie
layout: layouts/post.njk
image: /img/etl.png
---

*Cieľom tohto článku je zosumarizovať postupy, ktoré som implementovala pri testovaní ETL procesov a s ktorými som sa stretla v rámci big data*

## Úvod do big data a ETL
Veľké dáta (ďalej big data) sú charakterizované troma V:
1. volume - veľký objem dát, rádovo v GB a viac,
2. velocity - rýchlosť s akou sú produkované, GB nových dát denne,
3. variety - dáta prichádzajú z rôznych zdrojov a v rôznej forme.

Sú to také veľké súbory dát, že ich nie je možné zachytávať, spravovať a spracovávať bežne používanými softvérovými prostriedkami v rozumnom čase.
Úlohou dátových inžinierov je spracovanie big data a ich príprava do požadovanej podoby pre ďalších používateľov dát - spravidla dátových analytikov, dátových vedcov.

Jeden z procesov, ktorým sa to deje, sa nazýva <mark>ETL</mark> (extract-transform-load).
V prvej fáze ETL sa dáta extrahujú zo zdrojov - sťahujú sa z FTP serverov, cloudových úložísk, dotazujú sa cez REST API a pod. Surové dáta môžu mať rôznu štruktúru - tabuľky v relačných databázach, záznamy v NoSQL databázach, súbory formátu CSV, XML, JSON atď.
Počas fázy transformácie sa dáta upravujú podľa požadovaných pravidiel, filtrujú, očisťujú, spájajú s inými dátami, prevádzajú sa nad nimi agregácie alebo iné výpočty. Tieto medzivýsledky sa držia v oblasti staged.
V záverečnej fáze sa spracované dáta publikujú na dohodnutom mieste, spravidla v dátovom sklade (data warehouse - DWH), kde ich priamo alebo cez connectory vedia používatelia dotazovať, pracovať s nimi.

![ETL proces](/img/etl.png)

ETL procesy môžu prebiehať:
 - dávkovo - <mark>batch processing</mark>, kedy sú spúšťané periodicky, riadené nejakým orchestrátorom
 - ako <mark>streaming</mark>, kedy sú dáta spracúvané v podstate v reálnom čase ako prichádzajú do systému

Na našom projekte sme používali batch processing. Pre predstavu aký HW náš projekt využíval, išlo o BDA/HDFS cluster od Oracle o 12 uzloch (každý s procesorom Intel XEON), ktorý dokopy disponoval 1 TB RAM a 900 TB HDD.

Novším prístupom je <mark>ELT</mark> (extract-load-transform), pri ktorom sa transformácie vykonávajú na cieľovom systéme vtedy, keď sú potrebné, napr. s pomocou nástroja [dbt](https://www.getdbt.com).

Testovanie a zabezpečenie kvality ETL procesov bolo náplňou mojej práce v DAZN. Keď som nastúpila, bola to pre mňa úplne nová doména a netušila som, ako to budem testovať. Online zdrojov k téme testovania dát je poskromne aj teraz a keď som začínala, nachádzala som len odkazy na platené nástroje na testovanie big data, ale máločo o konkrétnych postupoch a metódach. Názvy testov v nasledujúcom texte sú interné označenia, nejde o odbornú terminológiu.

## Dátové E2E testy
Prvým krokom pri zavedení automatizovaného testovania jednotlivých ETL procesov bolo vytvorenie niečoho ako E2E testov. Na testovacom prostredí som vytvorila osobitné priečinky, kde som si pripravila súbory s testovacími dátami po vzore reálnych. Malú vzorku, tak aby som mala kontrolu nad tým, čo v nej je a čo sa s ňou deje. Pripravila som dáta pre rôzne testovacie prípady, tzv. happy path aj okrajové prípady, či sa do výsledku dostávajú skutočne tie dáta, ktoré majú.
Nad týmito dátami som púšťala reálne produkčné workflowy, ktoré ich spracovali a na konci sa výsledné dáta porovnali s očakávaným výsledkom. Automatizovaný test alebo pomocný skript na záver všetky výsledné dáta aj medzivýsledky ETL procesu zmazal a pripravil prostredie na ďalší beh celého testovacieho workflowu.
Ak bol ETL proces jednoduchý a napr. zabezpečoval len, aby sa v published držala najnovšia verzia záznamu, automatizované testy bežali na produkčných dátach a porovnávali vstupné dáta s výstupnými.
E2E testy pomohli odhaliť zapeklitý bug - mala som podozrenie, že občas majú niektoré záznamy isté hodnoty dvojnásobné ako by mali byť, ale nevedeli sme kedy a prečo sa tak deje. Až keď som sa dostala k nasimulovaniu celého procesu a dát, tak som zistila, že v špecifickom prípade, keď dáta spadali do dvoch kategórií, tieto sa započítali dvakrát.

## Testy konzistentnosti
Ďalšou skupinou automatizovaných testov boli testy, ktoré zisťovali, či sú produkčné dáta konzistentné z hľadiska logiky systému. Príklad z digitálneho marketingu a analytiky: počet kliknutí na reklamu musí byť menší ako počet videní a ten zas menší ako počet požiadavok o reklamu odoslaných serveru.
Testy konzistentnosti nám pomohli pri implementácii produktu single customer view v grafovej databáze Neo4j. Ukážka vzťahov medzi rôznymi uzlami a dotazovacieho jazyka Cypher:

![Neo4j](/img/cypher.png)

Testy overovali, či skutočný stav zodpovedá navrhnutému dátovému modelu grafu - či sú správne atribúty uzlov a vzťahov, či nie sú vzťahy duplicitné, či sa v grafe nenachádzajú entity po TTL (time-to-live). Testy konzistentnosti nám pomohli nájsť chyby v implementácii grafu, identifikovať veci, na ktoré sme doposiaľ pri implementácii nemysleli a tiež skryté zlyhania workflowov.

## Monitoring
Tretím pilierom, ktorý nám veľmi pomohol odhaľovať problémy a anomálie a zvýšiť dôveru vo fungovanie našich ETL procesov, bolo nastavenie monitoringu metrík týkajúcich sa dát a samotných ETL procesov. Použili sme na to konkrétne [Kibanu](https://www.elastic.co/kibana) od Elasticu (existuje veľa alternatív, napr. open-source [Grafana](https://grafana.com)). Vytypovali sme metriky, ktoré sa opäť periodicky spúšťali ako Spark aplikácie (metriky týkajúce sa HDFS a Hive), Scala aplikácie (metriky týkajúce sa Neo4j) alebo bash skripty (metriky týkajúce sa BigQuery) a zaznamenávali hodnoty v logoch pre Kibanu.

<p align="center">
    <img src="/img/metric.png" alt="Metrika v Kibane"/>
</p>

Išlo napr. o počet modifikovaných uzlov v daný deň na obrázku vyššie; veľkosť surových dát, ktoré sa stiahli daný deň; sumy záznamov vo výsledných dátach; trvanie ETL procesu.
Do Kibany reportovali výsledky aj testy, ktoré kontrolovali, či sú prítomné dáta z každej hodiny dňa, či boli všetky surové dáta spracované, či všetky staged dáta boli publikované a či sa na HDFS nenachádzajú staré súbory, ktoré mali byť vymazané po uplynutí doby retencie dát. Nastavila som alerty, aby sme boli o takýchto udalostiach notifikovaní emailom.

## Kvalita dát, katalóg dát a spol.
Ďalším riešením, ktoré som rešeršovala, boli nástroje na kvalitu dát. Umožňujú analýzu datasetu, validáciu dát, profilovanie dát, odhalenie nevalidných (napr. duplicitné záznamy, hodnoty v stĺpci nezodpovedajúce dátovému typu alebo rozsahu hodnôt, v akom by mali byť), chýbajúcich alebo neobvyklých dát. Zámerom bolo zapojiť takéto testy do CI/CD pipelinu a zastaviť ďalšie spracovávanie datasetu, ak by obsahoval zlé dáta a tým zabrániť zavedeniu zlých dát do published.
Pre tieto účely som našla knižnicu [Great Expectations](https://greatexpectations.io), nemohli sme ju však použiť kvôli nekompatibilnej verzii Pythonu na našom clustri. Great Expectations umožňuje tiež automatickú dokumentáciu dát. Až neskôr som objavila alternatívy pre Scalu ako [Deequ](https://github.com/awslabs/deequ), [DDQ](https://github.com/FRosner/drunken-data-quality), [DataFrame Rules Engine](https://github.com/databrickslabs/dataframe-rules-engine) a [Apache Griffin](https://griffin.apache.org). [Soda SQL](https://github.com/sodadata/soda-sql) operuje nad dátami prístupnými SQL, podporuje Amazon Redshift, Apache Hive a Spark, Snowflake a niekoľko DB a pravidlá sa definujú v YAML formáte. Umožňuje aj používanie vlastných metrík.

Pod monitoringom dát sa rozumie pravidelné kontrolovanie dát, či spĺňajú vopred definované pravidlá a štandardy kvality. Zahŕňa kalkuláciu metrík, ktoré nie sú priamo retrievable in a dataset as raw metadata, such as invalid, missing, or unexpected values. Nastavujú sa prahy akceptovaných parametrov pre dáta s dobrou kvalitou, oproti ktorým sa dáta testujú.

Profilovanie dát zahŕňa používanie výsledkov testovania a monitoringu na prehodnotenie štruktúry dát, vzájomných vzťahov a kvality na zistenie ako najlepšie použiť dáta pre rôzne biznis účely. Spomínané výsledky predošlých aktivít a ich sprievodné vizualizácie môžu pomôcť identifikovať vzory v dátach a príležitosti prepojenia datasetov, značkovania a pridania metadát s cieľom lepšie identifikovať a kategorizovať informácie v organizácii.

Data observability je o využití výstupu z dátových systémov – metrík, logov a traces – na získanie priebežnej viditeľnosti do celkového zdravia dát s systémoch. Dátové sklady a nástroje na transformáciu dát produkujú kvantum metadát o aktivite, ktorá prebieha v datasete a tieto sa dajú použiť na priebežné check for and anticipate issues. Monitoring dát hlási, že “Máme problém”, nástroje pre data observability ponúkajú detailnejší pohľad na operácie v systéme, jeho zdravie a výkonnosť; a produkujú konkrétne náhľady ako “Tento proces zlyhal kvôli neplatnému riadku v datasete X”.

Zaujímavo sa javili aj nástroje na vytvorenie katalógu dát [Amundsen](https://www.amundsen.io) a na pôvod dát a vizualizáciu procesov [Apache Spline](https://absaoss.github.io/spline). Katalóg dát slúži ako organizovaný inventár dát pre dátových inžinierov a používateľov dát, kde môžu na jednom mieste vyhľadávať dáta vhodné pre svoje potreby.

K využitiu týchto nástrojov som sa už nedostala, keďže priority na projekte sa presunuli smerom od big data a neskôr som zmenila pôsobisko. To je z mojej anabázy v big data všetko 🙂
