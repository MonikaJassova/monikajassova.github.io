---
title: Netradičné prístupy k testovaniu
description: Prehľad zaujímavých prístupov k testovaniu, s ktorými som sa stretla v ostatnej práci.
date: 2025-05-13
tags:
  - IT
  - testovanie
  - blockchain
layout: layouts/post.njk
image: /img/xstate-model-voter.png
---

*Prehľad zaujímavých prístupov k testovaniu, s ktorými som sa stretla na blockchainovom projekte (ako kritický vyžadoval vyššiu mieru istoty a na overenie dizajnu základných kameňov sa využívali aj matematické metódy formálnej verifikácie). Tiež prístupy, ktoré vyzerajú byť dobrým kandidátom na zaradenie do arzenálu. Pôjdeme v smere od unit testov až k E2E testom na produkčnom prostredí.*

### Mutation testing

Mutation testing sa používa na otestovanie unit testov, zhodnotenie ich efektívnosti, kvality. Jeho koncept je veľmi jednoduchý a geniálny - mutácia je zavedenie modifikácie zdrojového kódu aplikácie, napr. otočenie aritmetického znamienka, zmena logického operátora, opačná hodnota boolean a pod., po čom sa očakáva, že unit testy by zmenu v programe mali zachytiť a spadnúť. Ak sa tak nestane a "mutant" prežije, unit testy nedostatočne pokrývajú kód testami (aj pri 100% code coverage nám môžu chýbať negatívne testovacie prípady a iné).
Je vhodný v situácii, kedy potrebujeme zistiť, ako je na tom s unit testami projekt, na ktorý sme prišli a nepoznáme ho alebo napr. open-source projekty. Mutation testy sa môžu použiť aj na otestovanie efektivity [property-based unit testov](#property-based-testing).
Nevýhodou je, že beh mutation testov trvá dlhšie ako unit testy.

https://www.youtube.com/watch?v=Vq9eqZzblfg

Príkladmi konkrétnych frameworkov sú:
- [Stryker Mutator](https://stryker-mutator.io/) pre JavaScript/TypeScript, Scalu a C#
- [Pitest](https://pitest.org/) pre Javu a JVM
- [Cosmic Ray](https://github.com/sixty-north/cosmic-ray) pre Python

### Property-based testing

Klasické testy, s ktorými sa stretávame, sú založené na konkrétnych príkladoch - pre takýto vstup očakávam takýto výstup. Napr. funkciu na vrátenie true/false, či používateľ je plnoletý na základe veku, viem otestovať niekoľkými príkladmi: pre 17 rokov očakávam false, pre 18 true, pre 0 false, pre 100 true.
Property-based testy sú založené na definovaní všeobecných vlastností, ktoré sú platné pre všetky možné hodnoty. Developer zadefinuje, akého typu a z akého rozpätia vstupy majú byť (existujú vstavané generátory pre primitívne dátové typy, príp. developer nakódi vlastný generátor pre typy a triedy, aké potrebuje) a PBT framework vygeneruje veľký počet náhodných hodnôt, ktoré sú otestované, či spĺňajú dané vlastnosti. Vlastnosť môže byť vyjadrená takýmto spôsobom:
```
  pre hocijaké (x, y, ...)
  také, že spĺňa predpoklad(x, y, ...)
  výrok (x, y, ...) je pravdivý
```

Príkladmi konkrétnych frameworkov sú:
- [fast-check](https://fast-check.dev/) pre JS/TS
- [Hypothesis](https://hypothesis.works/) pre Python
- [ScalaCheck](https://scalacheck.org/) a [Hedgehog](https://hedgehogqa.github.io/scala-hedgehog/) pre Scalu
- ďalšie jazyky nájdete na https://github.com/jmid/pbt-frameworks
  - výhodnou funkcionalitou frameworku je shrinking, ktorý sa pri nájdení výnimky z vlastností postará o zjednodušený minimalizovaný prípad na reprodukciu problému

Písanie takýchto testov si vyžaduje zmenu spôsobu myslenia a kreativitu, developer/tester si musí odvodiť univerzálne platné vlastnosti, premýšľať o korektných vstupoch a hlboko porozumieť požiadavkám, ako má funkcionalita fungovať skôr ako pri tradičnom prístupe. PBT sú komplementárne ku klasickým example-based testom - môžu identifikovať hraničné prípady a potenciálne problémy, na ktoré nebolo myslené pri example-based testoch. Taktiež môžu odhaliť neočakávané problémy spojené so špecifickou množinou vstupov alebo mylné predstavy.
PBT majú vyššie náklady, ale aj vyššiu hodnotu. Použiť sa dajú aj na vyšších úrovniach nad unit testami. Tipy pre uvažovanie a výber vlastností: https://fsharpforfunandprofit.com/posts/property-based-testing-2/

Stratégie implementácie:
- začať s example-based, keď tie sú hotové, pridať property-based
- napísať property-based len pre kľúčové komponenty systému
  - komplikované, ktoré nie úplne chápeme, čo robia
  - kritické pre klienta

Viac vo videu:

https://www.youtube.com/watch?v=gENnmmOjifA

Prípadom frameworku postaveného na PBT je [Quickstrom](https://quickstrom.io/) na testovanie webových aplikácií, ktorý k vlastnostiam pridáva lineárnu temporálnu logiku - aplikáciu vieme popísať špecifikáciou, ktorá hovorí, aké prechody stavov sú validné, ktorý stav má nastať po ktorom, aký stav nastane aspoň raz/vždy a pod. V Quickstrome definujeme akcie, ktoré sa dajú v aplikácii vykonať, stavy, v ktorých sa aplikácia môže nachádzať a Quickstrom sa postará o to, aby vygeneroval náhodné sledy akcií a vyhodnotil, či skutočne nadobudnutý sled stavov zodpovedá špecifikácii a aplikácia nespravila niečo neočakávané.
Nevýhodou je strmá krivka učenia, skromná dokumentácia, projekt nie je ešte dostatočne zrelý - limitovaná podpora dynamického obsahu a ťažkosti s načasovaním. Interný proof of concept taktiež odhalil nespoľahlivé alebo neúčinné selektory pre identifikáciu elementov, že defaultné správanie vyhodnotenia viditeľnosti a aktívnosti elementov pre vykonanie akcie nie vždy vyhovovalo a boli potrebné rôzne hacky a explicitné predpoklady, kedy môže byť akcia vykonaná. Neponúka ani schopnosť simultánne pracovať s viacerými stránkami alebo otestovať viac súborov cez príkaz `check`.

Iným nástrojom, ktorý využíva PBT, je [Schemathesis](https://schemathesis.io/) na testovanie API s pomocou API schémy (viď aj [Schema-based contract testing](#schema-based-contract-testing)).

### Model-based testing

Podstatou MBT je automatické generovanie testov a ich exekúcia na základe modelu systému. Abstraktný model reprezentujúci očakávané správanie, vstupy, výstupy a stavy testovaného systému musí vytvoriť tester. To si opäť vyžaduje prepnúť spôsob myslenia, akým uvažujeme. Model môže byť v podobe diagramu prechodu stavov, konečného automatu, rozhodovacej tabuľky, UML diagramu. MBT sa dá použiť na rôznych úrovniach od unit po systémové a akceptačné testy.
Má byť ideálny do agilného prostredia, kde sa menia požiadavky a treba testovať rýchlo a kontinuálne (našla som aj opačnú skúsenosť, že zmeny požiadaviek si vyžiadali aj úplne prerobiť model).

Plusy: šetrí čas automatizovaním vytvárania a exekuovania testov, údržba je takisto zjednodušená - len úprava modelu, zvýšené pokrytie, škálovateľnosť - efektívny pre veľké a komplexné systémy
Mínusy: strmá krivka učenia, tvorba presných a detailných modelov komplexných systémov je zložitá a časovo náročná, málo využívaný v testerskej komunite - ťažké nájsť nejaké odporúčania a overené postupy

Nástroje:
- [XState](https://github.com/statelyai/xstate), k testovaniu [tu](https://stately.ai/docs/generate-test-paths) a [článok o prepojení XState a testovacích frameworkov Jest a Puppeteer](https://css-tricks.com/model-based-testing-in-react-with-state-machines/)
- [GraphWalker](https://graphwalker.github.io/)
- [fMBT](https://github.com/intel/fMBT)

Teória vyzerá pekne, ale zatiaľ som nevidela úspešný príklad z reálnej praxe na nejakom komplexnom projekte. My sme MBT skúšali ako proof of concept testovania decentralizovanej aplikácie DAO s využitím XState. S návrhom ideálneho modelu sme mali ťažkosti (bol to pokus-omyl) a prístup sme si nezvolili, ale vytvorený stavový diagram slúžil ako dobrá vizuálna dokumentácia a oceňovali sme, že prístup nás nútil zamyslieť sa nad rôznymi stavmi, do ktorých sa aplikácia môže dostať.

![XState model - voter](/img/xstate-model-voter.png)

### Contract testing (code-based)

Contract testy sa nachádzajú v testovacej pyramíde medzi unit a integračnými testami. Ich úlohou je zaistiť, že dvojica komponentov vie stále komunikovať cez API napriek zmenám v kóde (teda bol dodržaný skôr dohodnutý kontrakt o vzájomnej komunikácii). Ich podstatou je, že sú asynchrónne a bežia v izolácii - nevyžadujú si prostredie, na ktorom by oba komponenty museli bežať súčasne. Na problémy sa dá prísť ešte pred nasadením na testovacie prostredie, v rámci CI checku na pull requeste v repozitári. Ideálne pre microservices architektúru. Netestujú, či funkcionalita za nejakým API volaním funguje, to stále potrebujeme mať podchytené v iných funkcionálnych testoch.

Plusy: exekuuje reálny aplikačný kód na oboch stranách interakcie, testuje aj statusové kódy a základné predpoklady o odpovedi, zároveň príklady slúžia ako špecifikácia a dokumentácia, silné verifikačné záruky, časť testov na vyšších úrovniach môže byť presunutá do contract testov
Mínusy: zložitejší a časovo náročnejší na začiatok, potrebná údržba testov

Typy:
1. consumer-driven: kontrakt definuje konzument API (klient) na základe toho, čo očakáva od producenta API (servera). Pokrýva len časť, ktorú potrebuje konkrétny konzument (producent môže mať ďalších konzumentov, ktorí majú iné požiadavky). Akékoľvek správanie producenta, ktoré nie je využívané konzumentami sa môže meniť bez obavy z porušenia kontraktu a padnutia testov. Špecifikácia je nahratá s pomocou mocku producenta. Interakcie (vstupy a očakávané výstupy) sú zachytené v súbore kontraktu. Ten sa zdieľa s producentom, ktorý kontrakt verifikuje na svojej strane - prehratím interakcie a porovnaním s očakávanymi odpoveďami.

2. producer-driven: kontrakt definuje producent API (ako súbor všetkého, čo poskytuje) a konzumenti ho používajú na uistenie, že vedia spracovať uvedené odpovede úspešne. Chýba spätná väzba.

3. bidirectional: producent aj konzument vytvoria svoju verziu kontraktu pre špecifickú integráciu - očakávania o správaní producenta a špecifikáciu správania producenta. Porovnanie a verifikáciu kontraktu robí nezávislá tretia strana, ktorej poskytnú kontrakty. Konzument aj producent sa vedia dotazovať na výsledky verifikácie, aby zistili, či nastali nejaké integračné problémy a či je bezpečné nové verzie nasadiť na prostredie.

Viac informácií má na svojej stránke Bas Dijkstra, ktorý sa na contract testing špecializuje:
- https://www.ontestautomation.com/an-introduction-to-contract-testing-part-1-meet-the-players/
- https://www.ontestautomation.com/contract-testing-what-not-to-test-for-part-1/

alebo ich nájdete v nedávno vydanej knihe [Contract Testing in Action](https://www.manning.com/books/contract-testing-in-action).

Frameworky:
- [Pact](https://pact.io/) s podporou JS, JVM, Rust, Python, Go, PHP, .NET
- [Karate](https://github.com/karatelabs/karate/tree/master/karate-netty#consumer-provider-example) - kontrakty definované vo formáte Gherkin, jar na beh testov
- [Spring Cloud Contract](https://spring.io/projects/spring-cloud-contract) - podporuje definovanie kontraktov v YAML a Groovy a ich beh v Dockeri
- [Specmatic](https://specmatic.io/) - no-code riešenie, ktoré generuje contract testy z API špecifikácií

Bohužiaľ, k implementácii contract testingu sme sa na projekte z časových dôvodov a iných priorít nedostali, ale videli sme prípady, kedy by tento prístup pomohol v skorom zachytení nežiaducich zmien priamo u komponentu, ktorý ich spôsobil.

#### Schema-based contract testing

Schéma alebo špecifikácia API je statický formálny popis API, ktorý zachytáva všetky možné koncové body, požiadavky a odpovede. Príklady schém pre rôzne protokoly sú [OpenAPI Specification](https://swagger.io/resources/open-api/) pre REST, [GraphQL schema](https://graphql.org/learn/schema/), [AsyncAPI](https://www.asyncapi.com/en), [JSON schema](https://json-schema.org/) alebo [OpenRPC](https://open-rpc.org/).

SBCT kontroluje, či konzument používa správy, ktoré sa zhodujú s (podmnožinou) danej API schémy a či producent produkuje výstup, ktorý súhlasí s touto schémou. Tvrdí, že daná strana komunikácie je kompatibilná so schémou v určitom čase.
Stále je však potrebné sledovať, aké verzie aplikácií sú nasadené, aby sme sa uistili, že obe strany používajú kompatibilné verzie schémy. Správa tiež môže byť kompatibilná so schémou (syntakticky správna), ale nemať význam a byť nesprávna.

Plusy: ľahšie a rýchlejšie je s nimi začať, menšia údržba - ak sú schémy generované priamo z kódu, zároveň slúži ako dokumentácia API, odstraňuje nutnosť existencie testovacích dát
Mínusy: robí porovnanie schém - teda tvaru dát, ostatné aspekty kontraktu (cesty, metódy, hlavičky, statusové kódy, špecifické množiny vstupov) nie sú testované, nižšie verifikačné záruky, schéma je často ručne vytvorená a udržiavaná - môže nastať odchýlka medzi schémou a reálnym kódom.

Viac v seriáli na https://pactflow.io/blog/contract-testing-using-json-schemas-and-open-api-part-1/

Pár nástrojov:
- [Prism](https://stoplight.io/open-source/prism) pre OpenAPI špecifikácie
- [Microcks](https://microcks.io/) testuje nasadené implementácie oproti API špecifikácii
- [Schemathesis](https://schemathesis.io/) PBT framework na API testovanie, deteguje aj odchýlku medzi implementáciou API a OpenAPI alebo GraphQL špecifikáciou
- [Dredd](https://github.com/apiaryio/dredd) už archivovaný projekt, ktorý testoval, či implementácia backendu zodpovedá API schéme

### Trace-based testing

Na integrovanom prostredí vrátane produkcie (ak máme naprieč komponentami systému implementovaný tracing) môžeme okrem pasívneho monitoringu zbierané dáta využiť aj na proaktívny testovací účel. TBT overuje tvrdenia o trase stôp pre danú transakciu a umožňuje integračné aj komplexné E2E testy. Definujeme model, nasleduje zber dát a na záver vyhodnotenie, či dáta zodpovedajú modelu. Rovnaký model a test môže byť použitý pri integračných testoch na lokálnom prostredí aj unit testoch s mockmi. Sú vhodné najmä pre microservices architektúru a distribuované systémy. TBT sa dajú kombinovať aj so záťažovými testami a pomôcť pri odhalení úzkych hrdiel v systéme.
Tvorbou testov nad traceami zároveň robíme tracing dôležitou súčasťou vývoja, nie dodatočnou myšlienkou a vytvárame cyklus spätnej väzby, ktorý má za následok lepšie testovanie aj lepšiu observabilitu = pozorovateľnosť (dá sa nazvať aj trace-driven development) a tým pádom aj rýchlejšie určenie príčiny v prípade problémov. Akékoľvek nástroje, ktoré umožňujú analýzu štruktúrovaných dát nám pomôžu pri TBT. Ďalšie nadstavby môžu byť kombinácie s temporálnou logikou, model checkermi a formálnou verifikáciou.

Príkladom je [Tracetest](https://tracetest.io/) pre OpenTelemetry. Poskytuje mnoho integrácií vrátane Playwrightu, čím umožňuje naozajstné E2E testovanie, kedy sa test začne na UI webstránky a dostane schopnosť vidieť a sledovať celé interné spracovanie danej požiadavky skrz back end, databázu a externé služby.

https://www.youtube.com/watch?v=MP_edlFWRi4

### Chaos engineering

Zaujímavým prístupom sú nefunkcionálne testovacie techniky na hodnotenie toho, ako je systém robustný, odolný voči nepriaznivým vplyvom a abnormálnemu správaniu, ako toleruje chyby a schopnosť zotaviť sa z nich.
Chaos engineering je praktika úmyselného zavádzania chýb a zlyhaní na rôznych úrovniach (odstránenie Kubernetes podu, zvýšenie latencie, úplné prerušenie sieťového spojenia medzi komponentami, simulácia používateľských chýb atď.). Cieľom je potvrdiť alebo vyvrátiť naše hypotézy o tom, ako systém zareaguje a či sa zotaví a zlepšiť celkovú odolnosť systému odhalením skrytých slabín a validáciou mechanizmov obnovy za realistickej pracovnej záťaže a kombinácie závad. Zameriava sa teda na zvýšenie dôvery v schopnosť distribuovaných systémov čeliť turbulentným podmienkam skutočného sveta vrátane nepredvídateľných zlyhaní.
Vykonáva sa na prostrediach podobných produkcii aj priamo na produkcii.
Podmienkou je mať systém dostatočne zrelý, spoľahlivý (aby nepadal aj bez pričinenia chaos engineeringu) a tiež observabilita na dostatočnej úrovni, aby sme do systému "videli", ako sa správa a mohli sledovať hodnoty kľúčových indikátorov.

Pár nástrojov:
  - [Chaos Mesh](https://chaos-mesh.org/) a [Litmus](https://litmuschaos.io/) pre Kubernetes
  - [Chaos Monkey](https://github.com/netflix/chaosmonkey) od Netflixu, ktorý bol priekopníkom chaos engineeringu
  - [ChaosToolkit](https://chaostoolkit.org/)
  - viac na https://github.com/dastergon/awesome-chaos-engineering

Chaos engineering spadá pod resilience testing (testovanie odolnosti) spolu s:
- fault injection: úmyselne zavádza špecifické závady a zlyhania do systému na validáciu jeho robustnosti a schopnosti poradiť si s chybami. Používa sa skoro vo vývojovom cykle v kontrolovanom testovacom prostredí na potvrdenie, že systém sa správa správne za známych chybových podmienok.
- stress testing: vystavuje systém extrémnej pracovnej záťaži alebo vyťaženiu zdrojov (CPU, pamäť...) a má za cieľ identifikovať výkonnostné úzke hrdlá, zlyhania z preťaženia
- failover testing: úmyselne spôsobí vypovedanie služby a pozoruje, či systém dokáže prejsť na zálohu alebo rezervnú službu
- data recovery testing: verifikuje, že dáta sa dajú obnoviť zo záloh a že zálohovacie mechanizmy sú efektívne a proces obnovy spoľahlivý a výkonný. Mal by byť vykonávaný periodicky, hodí sa tiež po veľkých zmenách v dátach a migráciách.
- disaster recovery testing: pomáha uistiť sa, že systém môže byť obnovený a spojazdnený po udalostiach veľkého rozsahu ako výpadku dátových centier. Zahŕňa aktivity ako obnovu zo záloh, prepnutie na redundantné systémy alebo presmerovanie prevádzky na disaster recovery prostredie. Vhodný po signifikantných zmenách v infraštruktúre.

*Ako vidíte, je toho neúrekom a v testovaní sa stále dá vymyslieť a nájsť niečo nové, kombinovať rôzne prístupy. A v súčasnosti aj využívať pomoc AI.*
