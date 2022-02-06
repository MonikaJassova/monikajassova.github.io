---
title: Apache Spark
description: Prehľad Apache Spark
date: 2022-02-17
tags:
  - IT
  - big data
layout: layouts/post.njk
image: /img/ApacheSparkEcosystem.png
---

*Rýchly prehľad Apache Spark*

[Apache Spark](https://spark.apache.org) je jedným z najpoužívanejších výpočtových nástrojov pre big data analýzu. Zvláda dávkové (batch) spracovávanie dát, spracovávanie dát v reálnom čase (streaming), interaktívne dotazovanie, výpočet grafu a machine learning.
Je to open-source framework na spracovanie dát, ktorý dokáže rýchlo vykonávať procesovacie úlohy nad veľmi veľkými množinami dát a tiež dokáže tieto úlohy distribuovať medzi viacero počítačov, ktoré ich paralelne a nezávisle od seba spracúvajú. Pre svoje fungovanie vyžaduje manažér clustera počítačov (napr. Hadoop YARN - Yet Another Resource Negotiator) a distribuovaný systém ukladania dát (HDFS - Hadoop Distributed File System).
Nasledujúci obrázok znázorňuje 4 knižnice pre rôzne účely a jazyky, ktoré podporuje základné API:
![Spark Ecosystem](/img/ApacheSparkEcosystem.png)
Spark bol napísaný v programovacom jazyku [Scala](https://www.scala-lang.org), prvá verzia vyšla v roku 2010 (od 2014 pod hlavičkou firmy Apache) a najnovšia verzia je 3.2.1 z januára 2022.
Spočiatku sa Spark využíval na firmou vlastnených a spravovaných Hadoop clusteroch, v dnešnej dobe cloudu sa už poskytuje ako manažovaná alebo serverless služba, napr. [Amazon EMR](https://aws.amazon.com/emr), [Azure Databricks](https://azure.microsoft.com/en-us/services/databricks) alebo [Spark on Google Cloud](https://cloud.google.com/solutions/spark), takže používateľom odpadá starosť o manažovanie clustera.

### Spark Core
Je rozhranie pre programovanie aplikácií sústredené okolo abstrakcie nazývanej RDD. Medzivýsledky jednotlivých operácií sa držia v distribuovanej pamäti, neukladajú sa na disk (len ak sa nevojdú do RAM), preto sú omnoho rýchlejšie.
Keď sa spustí Spark aplikácia, Spark cluster naštartuje 2 procesy:
— driver je hlavný, riadiaci proces zodpovedný za vytvorenie Spark contextu, postúpenie Spark jobov a preklad kódu Spark aplikácie na výpočtové jednotky — úlohy, ktoré môžu byť distribuované medzi pracovné uzly (worker nodes). Taktiež koordinuje rozvrhnutie úloh a orchestráciu na každom exekútore.
- exekútory bežia na pracovných uzloch clustra a sú zodpovedné za výkon im pridelených výpočtových úloh, vrátenie výsledkov driveru a tiež poskytnutie úložiska pre RDD.
Práve pre sprostredkovanie medzi týmito procesmi je potrebná nejaká forma cluster manažéra - okrem spomínaného YARNu sa novšie používa [Kubernetes](https://kubernetes.io).

#### Spark RDD
Resilient Distributed Dataset (RDD), je abstrakcia reprezentujúca nemennú kolekciu objektov, ktorá môže byť rozdelená medzi výpočtový cluster. Operácie nad RDD sa tiež dajú rozdeliť medzi uzly clustera a sú vykonávané v paralelnom dávkovom procese, čo vedie k rýchlemu a škálovateľnému paralelnému procesovaniu.
RDD sú uložené v partíciách na pracovných uzloch. Partícia je logická časť veľkej distribuovanej množiny dát. Keď je Spark job posunutý clusteru, každý exekútor obdrží na spracovanie jednu partíciu. Veľkosť a počet partícií prenesených exekútoru sú priamo úmerné času, ktorý zaberie ich spracovanie. Čím viac partícií, tým viac práce pre exekútory, s menším množstvom partícií bude práca robená vo väčšách kusoch (a často rýchlejšie).
Resilient - odolný alebo schopný obnoviť činnosť - znamená, že ak v niektorom kroku procesu operácia zlyhá, nie je to žiaden problém a potrebný RDD sa obnoví zo vstupných dát a danou reťazou závislostí a transformácií a celkové spracovanie tak nie je ohrozené a je teda odolné voči chybám.
RDD môžu byť vytvorené dvomi spôsobmi:
1. odkazovaním sa na súbor dát v externom úložnom systéme, ako je zdieľaný súborový systém, HDFS, HBase, jednoduchý textový súbor, SQL databáza, NoSQL sklad (ako Cassandra a MongoDB), bucket na úložisku Amazon S3 a veľa iných,
2. paralelizovaním existujúcej kolekcie v programe drivera - aplikovaním transformácií (napr. map, filter, join) na existujúcich RDD.
Umožňuje tradičnú map and reduce funkcionalitu, ale tiež vstavanú podporu pre spájanie data setov, filtrovanie a agregácie.

Spark RDD API uvádza niekoľko transformácií a akcií pre manipuláciu s RDD.
Transformácie RDD vracajú vždy nový RDD a umožňujú vytvoriť závislosti medzi RDD. Každý RDD v reťazi závislosti má funkciu na výpočet svojich dát a smerník na svoj rodičovský RDD. Transformácia RDD je krok v programe hovoriaci Sparku ako získať dáta a čo s nimi robiť.
Akcie nad RDD vracajú samotný výsledok, hodnotu(y), napr. reduce, count, collect. Výsledok môže byť uložený na disk, zapísaný do databázy alebo vypísaný do konzoly.
RDD sú vyhodnocované odložene (lenivo - lazy evaluation), vyhodnotenie sa nezačne, kým nie je zavolaná nejaká akcia.

#### DAG
Druhou hlavnou abstrakciou v Sparku je DAG (directed acyclic graph). Spark definuje úlohy, ktoré môžu byť vypočítané paralelne nad partíciami dát v clusteri. Spark zostrojí logický tok operácií, ktorý je reprezentovaný ako riadený acyklický graf, kde uzly predstavujú RDD partície a hrany transformácie dát.

### Spark SQL
Uviedol dátovú abstrakciu nazývanú DataFrame, ktorá poskytuje podporu pre štruktúrované a semištruktúrované dáta (JSON).
DataFrame je distribuovaná kolekcia objektov typu Row organizovaná do pomenovaných stĺpcov. Koncepčne zodpovedá tabuľke v relačnej databáze. 
DataFramy sú takisto nemenné. 
Spark SQL poskytuje štandardné rozhranie pre čítanie dát z a zapisovanie do iných dátových úložísk vrátane JSON súborov, Apache Hive, JDBC, Avro, Apache Parquet, existujú aj connectory pre MongoDB atď.
Umožňuje dotazovať dáta v rámci Spark programov s použitím DataFrame API alebo SQL dotazov (slúži ako distribuovaný SQL query engine).

Ukážka DataFrame API vs SQL:
```scala
spark.read.table("published_mediabi.clicks")
  .where(col("dt") === "2020-12-08")
  .agg(sum("clicks"))

spark.sql(s"SELECT SUM(clicks) FROM published_mediabi.clicks WHERE dt = '2020-12-08'")
```

### Spark Shell
Ak si chcete Spark prakticky vyskúšať v interaktívnej konzole (treba mať nainštalovanú Javu), po stiahnutí ju spustíte z rozbaleného adresára príkazom
```bash
./bin/spark-shell
```

- v rámci konzoly funguje automatické dokončovanie pomocou `TAB`
- pomoc zobrazíme `:help`
- históriu príkazov `:history`
- do paste módu pre vloženie viacriadkového kusu kódu sa dostaneme `:paste` (a von z neho `CTRL`+`D`)
- Scala skript môžeme načítať `:load <cesta k súboru>`
- prácu v konzole ukončíme `:quit`

Spark konzola pri spustení vytvorí: 
- premennú <mark>sc</mark> pre prístup k SparkContextu (vstupný bod Spark Core funkcionality) 
- premennú <mark>spark</mark> pre prístup k SparkSession (vstupný bod Spark SQL funkcionality)

Príklady načítania dát:
```scala
spark.read.parquet("/data/staged/ott/mediabi/googledfp/NetworkImpressions/dt=20201209")
spark.read.option("header", true).csv("/data/staged/media/scv/bluekai_insights_categories/dt=20201209")
spark.read.table("staged_mediabi.dfp_etl_status")
```
