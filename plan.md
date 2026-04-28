# Harehopp pa Tallinja

## Kort oppsummering

Dette prosjektet skal bli et lyst og lekent 2D nettleserspill for barn, der en hare hopper langs en tallinje og gjor matte til noe konkret og visuelt. Malgruppen er en 6-aring som trenger hjelp til a forsta hvordan tallinjer bygges opp, hvordan ulike intervaller fungerer, og at tallinjer ikke alltid begynner pa `0`.

Forste versjon skal bygges som et nettleserspill med `Phaser + TypeScript + Vite`. Spillverdenen skal vises i canvas, mens oppgavetekst, menyer, lydknapper og foreldrepanel skal ligge i et vanlig DOM-grensesnitt rundt spillet.

## Mal

- Gi barnet en konkret og morsom matteopplevelse gjennom en figur hun kan flytte og folge.
- Trene pa tallinjer med ulike start- og sluttpunkter, for eksempel `0-10`, `0-20` og `10-30`.
- Trene pa like intervaller, som `1`, `2` og `5`.
- Gjore det enkelt a lage egne tallinjer i utvalgte oppdrag ved hjelp av store bokser eller valgfelt for `start`, `slutt` og `intervall`.
- Holde terskelen lav med korte oppdrag, tydelige tilbakemeldinger og vennlig presentasjon.

## Hva v1 IKKE skal vaere

For a holde forste versjon liten og fokusert, holder vi disse utenfor:

- regnestykker som hovedtema (`+`, `-`, `*`)
- innlogging eller flere brukerprofiler pa samme enhet
- nettbasert lagring eller synkronisering mellom enheter
- analytics, sporing eller reklame
- tidsfrister, poengjag eller tapstilstander
- frie sandkasse-moduser uten oppdrag

Disse kan vurderes senere, men ligger utenfor v1.

## Spillfantasi

Spilleren hjelper en glad hare gjennom en verden av stier og hoppesteiner. Tallinja er selve stien haren bruker. Nar barnet velger riktig tall, riktig plass eller riktig intervall, hopper haren videre. Matte blir da ikke bare tall pa skjermen, men en fysisk bevegelse i en liten spillverden.

Den visuelle stilen skal vaere varm, naturpreget og barnevennlig:

- myke bakgrunner
- store tall og tydelige markeringer
- rolige farger
- enkle animasjoner
- milde belonninger som stjerner, jubel og glad hare-animasjon

## Kjernesloyfe

Hvert oppdrag skal vare kort og tydelig:

1. Barnet far en enkel oppgave i tekst og med mulighet for opplesning.
2. Barnet loser oppgaven ved a flytte haren, velge et svar, fylle inn tall eller bygge en tallinje.
3. Spillet gir umiddelbar og forklarende feedback.
4. Haren hopper videre og barnet far en liten belonning.
5. Neste oppdrag lastes inn raskt uten tung navigasjon.

## Skjermbilde og UI

Spillskjermen deles i tre hovedsoner:

### 1. Toppfelt

- Kort oppgavetekst pa norsk.
- Snakkeboble eller liten oppdragsrute.
- Knapp for opplesning av teksten.
- Enkel visning av progresjon, for eksempel stjerner eller steg i pakken.

### 2. Midtfelt

- Stor tallinje som alltid er lett a lese.
- Haren plassert pa tallinja eller ved siden av den.
- Tydelige markeringer for start, slutt og mellompunkter.
- Animasjon for hopp, landing og riktig svar.
- Nok luft rundt tallinja til at den ikke foles trang pa mobil eller nettbrett.

### 3. Bunnfelt

- Store valgknapper eller svarbrikker.
- Dra-og-slipp eller enkle trykkeflater.
- I utvalgte oppdrag: store felter eller valgkontroller for `start`, `slutt` og `intervall`.
- Hintknapp ved behov.

Intervallfeltene skal ikke vises hele tiden. De brukes i egne byggeoppdrag slik at vanlig spilling holder seg ren og enkel.

### Layout og orientering

- Standard layout er liggende (landscape) pa nettbrett og laptop.
- Pa mobil i staende modus skal spillet vise en mild oppfordring om a snu enheten, ikke en hard blokkering.
- Minste stottet bredde er `768 px` for full layout. Under det skiftes det til en kompakt vertikal layout der tallinja fortsatt har forsterett pa midtfeltet.
- Knapper og trykkflater skal vaere minst `44 px` for a vaere komfortable for sma fingre.

## Foreldrepanel

Foreldrepanelet er en enkel skjerm bak en lett barnesperre, for eksempel et trykk-og-hold pa et lite tannhjul i hjornet, eller en kort regneoppgave som `4 + 3`.

Panelet skal i v1 inneholde:

- oversikt over apne pakker og stjerner per pakke
- knapp for a nullstille progresjon
- bryter for lyd og opplesning
- bryter for redusert bevegelse
- valg av stemme eller opplesningsmetode hvis flere er tilgjengelige

Panelet skal vaere kort, ryddig og uten reklame eller eksterne lenker.

## Oppdragstyper i v1

### Flytt haren

Barnet far beskjed om a flytte haren til riktig tall pa tallinja.

Eksempel:
`Flytt haren til 7.`

### Hvor lander haren?

Barnet ser et hopp med et gitt intervall og skal velge hvor haren lander.

Eksempel:
`Haren star pa 10 og hopper 2 om gangen. Hvor lander den na?`

### Fyll inn tallinja

En eller flere etiketter pa tallinja mangler, og barnet skal velge riktig tall.

Eksempel:
`Hvilket tall mangler mellom 12 og 16 nar vi hopper 2 om gangen?`

### Bygg tallinja

Barnet velger `start`, `slutt` og `intervall`, og spillet tegner tallinja og sjekker om oppsettet er riktig for oppgaven.

Eksempel:
`Lag en tallinje fra 10 til 30 som hopper 5 om gangen.`

### Finn feilen

Barnet ser en tallinje med feil intervall eller feilplassering og skal oppdage hva som er galt.

Eksempel:
`Ser du noe feil her? 10, 12, 14, 17, 18`

## Leringsinnhold

Forste versjon skal bare fokusere pa tallinjer, ikke regnestykker som hovedtema. Det betyr:

- plassering av tall pa tallinje
- rekkefolge
- start og slutt
- like mellomrom
- forstaelse av at tallinja kan starte pa andre tall enn `0`
- forstaelse av at hopp kan ga med flere enn `1`

## Progresjon

### Pakke 1: 0-10

- intervall `1`
- grunnleggende plassering
- flytte haren til riktig tall
- fylle inn enkle manglende tall

### Pakke 2: 0-20

- intervall `1` og `2`
- introdusere ideen om faste hopp
- se hvor haren lander etter hopp

### Pakke 3: 10-30

- intervall `1`, `2` og `5`
- fokus pa tallinjer som ikke starter pa `0`
- flere oppgaver med sammenligning og feilfinning

### Pakke 4: Bygg selv

- barnet velger `start`, `slutt` og `intervall`
- tallinja bygges ut fra valg
- oppgavene er fortsatt guidede, ikke helt frie

### Lagring av progresjon

Progresjonen skal lagres lokalt i nettleseren via `localStorage`, slik at barnet kan fortsette der hun slapp uten innlogging. Lagringen skal:

- vaere knyttet til enheten, ikke til en konto
- kunne nullstilles fra foreldrepanelet
- ha en versjonsnokkel slik at ny struktur ikke krasjer gammelt lagret data
- aldri inneholde personopplysninger

## Feedback og motivasjon

Tilbakemeldinger skal vare forklarende, korte og vennlige. Spillet skal ikke bare si `riktig` eller `feil`, men hjelpe barnet videre.

Eksempler:

- `Bra! Haren landet pa 12 fordi vi hopper 2 om gangen fra 10.`
- `Na ble hoppene ulike. Proev igjen sa hvert hopp blir like stort.`
- `Denne tallinja starter pa 10, ikke pa 0. Se pa forste tallet forst.`

Spillet skal ikke ha harde tapstilstander i v1. Etter noen feil skal barnet fa:

- et vennlig hint
- tydeligere markeringer
- enklere svarvalg ved behov

## Lyd og tilgjengelighet

### Opplesning

Opplesning gjores i to lag:

1. Forhandsinnspilte lydfiler for faste tekster som menytitler, ros og standard hint. Disse gir konsistent kvalitet og norsk uttale.
2. Web Speech API (`speechSynthesis`) som reserve for dynamiske tekster, for eksempel oppgaver som inneholder tall som varierer.

Hvis Web Speech API ikke er tilgjengelig eller ikke stotter norsk, skal spillet falle tilbake til a vise tekst tydelig og spille en kort lyd som indikerer at opplesning ikke er mulig.

### Lyd generelt

- Egne nivaer for stemme, musikk og effekter, slik at musikk kan dempes uten a miste opplesningen.
- Mute-knapp lett tilgjengelig.
- Ingen lyder skal vaere skarpe eller skremmende.

### Tilgjengelighet

- Alle oppgaver skal kunne leses opp.
- Tekstene skal vaere korte og enkle.
- Knapper og trykkflater skal vaere store nok for beroring.
- Farger skal kombineres med form og plassering, ikke bare farge alene.
- Viktig informasjon skal alltid ligge utenfor hare-animasjonen slik at bevegelse ikke skaper forvirring.
- Spillet skal respektere `prefers-reduced-motion` og dempe eller fjerne ikke-nodvendige animasjoner.
- DOM-elementene skal ha meningsfulle ARIA-roller og labels, slik at skjermlesere kan lese oppgavetekst og knapper. Canvas-innholdet far en kort tekstlig beskrivelse i et skjult element.
- Tastaturnavigasjon skal fungere for alle interaktive elementer som ligger i DOM, slik at barnet eller en voksen kan bruke tastatur ved behov.

## Teknisk retning

Prosjektet bygges som et nytt spill fra bunnen av med denne hovedstrukturen:

### Teknologistakk

- `Phaser` for 2D-spillflaten
- `TypeScript` for struktur og trygghet i logikken
- `Vite` for utviklingsserver og bygg
- DOM-baserte menyer og paneler for tekst og kontroller
- `Vitest` for enhetstester av regelmotor og oppgavevalidering
- `ESLint` og `Prettier` for konsistent kodestil

### Stottede nettlesere

- nyeste to versjoner av Chrome, Edge, Safari og Firefox
- Safari pa iPad er en viktig malplattform og skal testes manuelt jevnlig
- ingen stotte for IE eller eldre Android WebView i v1

### Arkitektur

Spillreglene og vurderingen av oppgaver skal leve utenfor Phaser-scenene.

Phaser skal bare ha ansvar for:

- tegning
- animasjon
- input
- sceneoverganger

En egen regelmotor skal ha ansvar for:

- hva som er en gyldig tallinje
- hvordan oppgaver vurderes
- progresjon
- hintlogikk
- belonninger

Regelmotoren skal vaere ren TypeScript uten avhengigheter til Phaser, slik at den kan testes med `Vitest` og gjenbrukes hvis spillflaten byttes ut senere.

### Foreslatt mappeoppsett

```text
src/
  game/
    content/
      missions/
      progression/
    simulation/
      rules/
      systems/
      state.ts
    input/
      actions.ts
    assets/
      manifest.ts
  phaser/
    scenes/
      BootScene.ts
      MenuScene.ts
      PlayScene.ts
    adapters/
      sceneBridge.ts
    view/
      numberLine/
      hare/
      effects/
  ui/
    hud/
    menus/
    overlays/
  storage/
    progress.ts
```

### Ressurser og assets

- Figurer og ikoner lages helst som `SVG` slik at de skalerer rent pa alle skjermstorrelser.
- Bakgrunner kan vaere `PNG` eller `WEBP` med flere oppslosninger.
- Lyd lagres som `OGG` med `MP3` som reserve for Safari.
- En `manifest.ts` holder oversikt over alle assets slik at lasting og preloading er forutsigbart.

## Viktige datatyper

### NumberLineConfig

Bor minst inneholde:

- `start`
- `end`
- `step`
- `showLabels`
- `highlightTicks`

### Mission

Bor minst inneholde:

- `id`
- `type`
- `promptText`
- `promptAudioKey`
- `numberLine`
- `target`
- `choices`
- `hint`
- `reward`

### MissionType

Bor minst stotte:

- `move_hare`
- `predict_jump`
- `fill_missing`
- `build_line`
- `spot_error`

### BuildLineInput

Bor modellere barnets valg for:

- `start`
- `end`
- `step`

### ProgressState

Bor lagre:

- apne pakker
- stjerner eller belonninger
- nylige feil
- brukte hint
- versjonsnokkel for lagringsformat

### Eksempel pa en oppgave som data

```ts
const example: Mission = {
  id: "p2-predict-001",
  type: "predict_jump",
  promptText: "Haren star pa 10 og hopper 2 om gangen. Hvor lander den na?",
  promptAudioKey: "p2_predict_001",
  numberLine: { start: 0, end: 20, step: 2, showLabels: true, highlightTicks: [10] },
  target: 12,
  choices: [11, 12, 14],
  hint: "Tell to skritt fram fra 10.",
  reward: { stars: 1 },
};
```

## Innholdsstrategi

Oppdragene skal lages som data, ikke hardkodes inn i scene-logikk. Det gjor det lettere a:

- legge til nye oppdrag
- justere vanskelighetsgrad
- lage flere pakker senere
- endre lyd, tekst og hint uten a skrive om spillmotoren

Oppdragsdata bor ligge i `src/game/content/missions/` som typede TypeScript-moduler, slik at feil i format fanges av kompilatoren.

## Test og kvalitet

### Manuelle akseptansekrav

Forste versjon bor verifiseres mot disse punktene:

- Barnet kan lose hele forste pakke med bare beroring.
- Tallinja er tydelig pa nettbrett og laptop.
- Haren lander riktig visuelt ved korrekte hopp.
- Spillet godkjenner en korrekt tallinje som `10-30` med intervall `2`.
- Spillet avviser ujevne hopp og forklarer hvorfor.
- Byggeoppdrag fungerer uten mye skriving, helst med store valgknapper eller stegvise kontroller.
- Oppgavetekst og opplesning matcher alltid.
- Spillet kan lukkes og apnes igjen uten at progresjonen forsvinner.

### Automatiserte tester

- Enhetstester for regelmotoren med `Vitest`, blant annet:
  - validering av tallinje med ujevne hopp
  - validering av `BuildLineInput` mot mal-tallinje
  - hintvalg ved gjentatte feil
  - lagring og lasting av `ProgressState`
- En liten samling smoke-tester som rendrer hver oppdragstype og sjekker at riktig svar gir suksess-tilstand.

### CI

En enkel GitHub Actions-jobb skal kjore `npm run lint`, `npm run test` og `npm run build` ved hver push, slik at brutt kode oppdages tidlig.

## Milepaeler

### Milepael 1: Grunnprosjekt

- sette opp `Phaser + TypeScript + Vite`
- konfigurere `Vitest`, `ESLint` og `Prettier`
- lage enkel meny
- vise en statisk tallinje og hare

### Milepael 2: Kjernespill

- implementere regelmotor med tester
- lage `move_hare` og `predict_jump`
- legge inn progresjon for pakke 1
- koble pa `localStorage` for lagring

### Milepael 3: Flere oppdrag

- legge til `fill_missing` og `spot_error`
- bygge feedback-system
- legge til lydknapp og grunnleggende opplesningsstotte
- foreldrepanel med nullstilling og lydbrytere

### Milepael 4: Bygg tallinja

- lage egne oppdrag med `start`, `slutt` og `intervall`
- implementere store valgkontroller for disse feltene
- legge til pakke 4

### Milepael 5: Puss og publisering

- visuell polish
- animasjoner og milde belonninger
- responsiv justering for mobil og nettbrett
- stotte for `prefers-reduced-motion`
- produksjonsbygg og VPS-klargjoring

## VPS og publisering

Prosjektet skal kunne bygges og hostes pa en VPS.

Det passer godt fordi:

- spillet er frontend-basert
- ferdig bygg blir statiske filer
- det trengs ingen database i v1

Typisk oppsett:

1. Installere `Node.js` og `npm` pa VPS.
2. Kjore `npm install`.
3. Kjore `npm run build`.
4. Servere `dist/` med `nginx` eller `caddy`.

### Personvern

Spillet skal ikke samle inn personopplysninger, ikke bruke analytics og ikke laste inn tredjepartsskript i v1. All tilstand ligger lokalt i nettleseren. Dette skal vaere et bevisst valg fordi malgruppen er barn.

### Ytelse

- Forste innlasting bor holdes under `2 MB` overforte bytes pa et typisk bygg.
- Phaser og store assets lastes med `Vite`-splitting der det gir mening.
- Bilder skal ha `width`, `height` og `loading` satt riktig.

## Neste steg

Nar implementeringen starter, bor vi begynne med:

1. opprette prosjektstrukturen
2. lage en enkel spillscene med tallinje og hare
3. implementere de to forste oppdragstypene
4. koble pa DOM-grensesnitt for oppgavetekst og knapper
5. verifisere at grunnspillet fungerer fint pa beroring
