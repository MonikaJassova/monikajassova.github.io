---
title: ETL testing
description: Zopár bodov k testovaniu ETL procesov v big data.
date: 2022-01-08
tags:
  - IT
  - big data
layout: layouts/post.njk
---

*Cieľom tohto článku je zosumarizovať postupy, ktoré som implementovala pri testovaní ETL procesov a s ktorými som sa stretla v rámci big data.*

## Úvod do big data a ETL
Veľké dáta (ďalej big data) sú charakterizované troma V - volume (veľký objem dát, rádovo v GB a viac), velocity (rýchlosť s akou sú produkované, GB nových dát denne) a variety (dáta prichádzajú z rôznych zdrojov a v rôznej forme). Sú to také veľké súbory dát, že ich nie je možné zachytávať, spravovať a spracovávať bežne používanými softvérovými prostriedkami v rozumnom čase. Úlohou dátových inžinierov je spracovávanie big data a ich príprava do požadovanej podoby pre ďalších používateľov dát - spravidla dátových analytikov, dátových vedcov. 
Jeden z procesov, ktorým sa to deje, sa nazýva ETL (extract-transform-load). V prvej fáze sa dáta extrahujú zo zdrojov - sťahujú sa z FTP serverov, cloudových úložísk, dotazujú sa cez REST API a pod. Surové dáta môžu mať rôznu štruktúru - tabuľky v relačných databázach, záznamy v NoSQL databázach, súbory formátu CSV, XML, JSON atď. Počas fázy transformácie sa dáta upravujú podľa požadovaných pravidiel, filtrujú, očisťujú, spájajú s inými dátami, prevádzajú sa nad nimi agregácie alebo iné výpočty. V záverečnej fáze sa spracované dáta publikujú na dohodnutom mieste, spravidla v dátovom sklade (data warehouse - DWH), kde ich priamo alebo cez connectory vedia používatelia dotazovať, pracovať s nimi. ETL procesy sú zväčša spúšťané periodicky, riadené nejakým orchestrátorom (pozn.: celý tento článok sa venuje batch processingu).

Testovanie a zabezpečenie kvality takýchto procesov bolo náplňou mojej práce v DAZN. Keď som nastúpila, bola to pre mňa úplne nová doména a netušila som, ako to budem testovať. V tomto článku chcem pomôcť ľuďom, čo sa ocitli v podobnej pozícii. Online zdrojov k téme testovania dát je poskromne aj teraz a keď som začínala, nachádzala som len odkazy na platené hotové nástroje na testovanie big data.

## Dátové e2e testy
Prvým krokom pri nastavení automatizovaného testovania jednotlivých ETL procesov bolo vytvorenie testovacích dát. Na testovacom prostredí som si vytvorila osobitné priečinky, kde som si pripravila súbory s testovacími dátami po vzore reálnych. Stačí málo, tak aby som mala kontrolu nad tým, čo v nich je. Treba si pripraviť dáta pre rôzne testovacie prípady, tzv. happy path aj okrajové prípady, či sa do výsledku dostávajú skutočne tie dáta, čo majú. Nad týmito dátami som púšťala reálne workflowy, ktoré ich spracovali a na konci sa výsledné dáta porovnali s očakávaným výsledkom. Automatizovaný test alebo pomocný skript na záver všetky výsledné dáta aj medzivýsledky ETL procesu zmazal a pripravil prostredie na ďalší beh celého testovacieho workflowu.
Ak bol ETL proces jednoduchý a napr. zabezpečoval len, aby sa v DWH držala najnovšia verzia záznamu, automatizované testy bežali na reálnych dátach a porovnávali vstupné dáta s výstupnými.

## Testy konzistencie
Jedným z našich produktov bol tzv. single customer view v grafovej databáze Neo4j. Išlo o znázornenie vzťahov medzi rôznymi uzlami. Testy konzistencie nám pomohli nájsť 

## Observability
Tretím pilierom, ktorý nám veľmi pomohol odhaľovať problémy a anomálie a zvýšiť dôveru vo fungovanie našich procesov, bolo nastavenie monitoringu metrík týkajúcich sa dát a samotných ETL procesov. My sme použili konkrétne [Kibanu](https://www.elastic.co/kibana) od Elasticu, existuje veľa alternatív (open-source napr. [Grafana](https://grafana.com)). Vytypovali sme metriky, ktoré sa opäť periodicky spúšťali v rámci Spark aplikácií alebo bash skriptov a zaznamenávali v logoch pre Kibanu. Išlo napr. o veľkosť surových dát, ktoré sa stiahli daný deň, sumy záznamov vo výsledných dátach, trvanie ETL procesu. Do Kibany reportovali aj testy, ktoré kontrolovali, či sú prítomné dáta z každej hodiny dňa, či boli všetky surové dáta spracované, či všetky staged dáta boli publikované a či sa na HDFS nenachádzajú staré súbory, ktoré mali byť vymazané workflowom, ktorý to mal zabezpečiť po uplynutí doby retencie dát. Nastavila som alerty, aby sme boli o takýchto udalostiach notifikovaní emailom.

## Kvalita dát, katalóg dát a spol.
Ďalším riešením, ktoré som rešeršovala, boli nástroje na kvalitu dát. Umožňujú analýzu datasetu, validáciu dát, profilovanie dát, odhalenie nevalidných (napr. duplicitné záznamy, hodnoty v stĺpci nezodpovedajúce dátovému typu alebo rozsahu hodnôt, v akom by mali byť), chýbajúcich alebo neobvyklých dát. Pomôžu odhaliť duplicitné záznamy. Zámerom bolo zapojiť takéto testy do CI/CD pipelinu a zastaviť ďalšie spracovávanie datasetu, ak by obsahoval zlé dáta a tým by sa zabránilo zavedeniu zlých dát do published.

Našla som knižnicu [Great Expectations](https://greatexpectations.io), nemohli sme ju však použiť kvôli starej verzii Pythonu na našich clustroch. Great Expectations umožňuje tiež automatickú dokumentáciu dát. Až neskôr som objavila alternatívy pre Scalu ako [Deequ](https://github.com/awslabs/deequ), [DDQ](https://github.com/FRosner/drunken-data-quality), [DataFrame Rules Engine](https://github.com/databrickslabs/dataframe-rules-engine) a [Apache Griffin](https://griffin.apache.org). [Soda SQL](https://github.com/sodadata/soda-sql) operuje nad dátami prístupnými SQL, podporuje Amazon Redshift, Apache Hive a Spark, Snowflake a niekoľko DB a pravidlá sa definujú v YAML formáte. Umožňuje aj používanie vlastných metrík.

Pod monitoringom dát sa rozumie pravidelné kontrolovanie dát, či spĺňajú vopred definované pravidlá a štandardy kvality. Zahŕňa kalkuláciu metrík, ktoré nie sú priamo retrievable in a dataset as raw metadata, such as invalid, missing, or unexpected values. Nastavujú sa prahy akceptovaných parametrov pre dáta s dobrou kvalitou, oproti ktorým sa dáta testujú.

Profilovanie dát zahŕňa používanie výsledkov testovania a monitoringu na prehodnotenie štruktúry dát, vzájomných vzťahov a kvality na zistenie ako najlepšie použiť dáta pre rôzne biznis účely. Spomínané výsledky predošlých aktivít a ich sprievodné vizualizácie môžu pomôcť identifikovať vzory v dátach a príležitosti prepojenia datasetov, značkovania a pridania metadát s cieľom lepšie identifikovať a kategorizovať informácie v organizácii.

Data observability je o využití výstupu z dátových systémov – metrík, logov a traces – na získanie priebežnej viditeľnosti do celkového zdravia dát s systémoch. Dátové sklady a nástroje na transformáciu dát produkujú kvantum metadát o aktivite, ktorá prebieha v datasete a tieto sa dajú použiť na priebežné check for and anticipate issues. Monitoring dát hlási, že “Máme problém”, nástroje pre data observability ponúkajú detailnejší pohľad na operácie v systéme, jeho zdravie a výkonnosť; a produkujú konkrétne náhľady ako “Tento proces zlyhal kvôli neplatnému riadku v datasete X”. 

Zaujímavo sa javili aj nástroje na vytvorenie katalógu dát [Amundsen](https://www.amundsen.io) a na pôvod dát a vizualizáciu procesov [Apache Spline](https://absaoss.github.io/spline). Katalóg dát slúži ako organizovaný inventár dát pre dátových inžinierov a používateľov dát, kde môžu na jednom mieste vyhľadávať dáta vhodné pre svoje potreby.
