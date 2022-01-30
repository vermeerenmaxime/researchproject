# Research Project 2022
## Maxime Vermeeren - 3 MCT
Hoe kan je realtime 3D Graphics renderen in een browser op basis van muziek met behulp van TreeJS?

### Onderzoek
In deze bachelorproef wil ik onderzoeken of het mogelijk is om 3D graphics te laten renderen op basis van muziek met behulp van ThreeJS. Wat belangrijk wordt is hoe performant de applicatie zal werken in de browser en of dit mogelijk is op iedereen zijn device. 

Om dit te onderzoeken ga ik een web applicatie bouwen met NextJS om te zien of het mogelijk is om met ThreeJS, 3D objecten in een scene te laten renderen en reageren op basis van muziek in een HTML5 canvas. De scenes kunnen gemaakt worden in Spline, Blender of een ander 3D programma en omgezet worden naar ThreeJS.

De applicatie kan tracks inlezen vanuit een muzieklabel api, artiesten api of tracks kunnen zelf geupload worden. Met behulp van de web audio api, voert de applicatie een analyze uit die de track gaat bestuderen. In de analyze zullen we kijken naar verschillende soorten factoren zoals bass, mid tonen, hoge tonen, ritme en loudness. Met deze data die uit een track wordt gelezen zal je kunnen kiezen uit meerdere 3D scenes, om deze te laten reageren op muziek. De tracks waarmee de applicatie worden getesten zullen zelf gemaakt worden in FL Studio.

Ter uitbreiding van de appliciatie kan de administrator van de web applicatie kan kiezen wat er met bepaalde objecten, cameras en lichten op de scene gebeurd. Hij kan dus eigenlijk een soort 3D videoclip dirigeren. Een groot voordeel hiervan is dat de grote complexiteit van 3D software wordt weggenomen, waar heel veel kosten van 3D artsits ook aan vasthangen. Voor de eindgebruiker is dit ook een leukere visual experiënce dan naar een track luisteren waarbij er in het artwork niets gebeurd.

### Deelvragen 
- Is het mogelijk om threeJS te gebruiken met een bepaald framework?
    - ReactJS => NextJS
      - react-three, react-three fiber, react-three drei, ..
    - Svelte
      - svelthree (oud)
      - https://svelte-cubed.vercel.app/ (nieuw)
    - VueJS
      - 
      - https://troisjs.github.io/guide/

    - Angular
      - Ja, THREE aanspreken => geen custom components

- Waarom aan de slag gegaan met three fiber?
  - Bundel size van react three fiber is veel kleiner in vergelijking met troisJS 
  - Documentatie van svelthree & svelte cubed is zeer incompleet en weinig community support
- Wat voor impact heeft een virtuele dom op de performance van canvas?
  - Meer loading doordat er extra bundels moeten worden ingeladen.
  - 
- Heeft de compiler van een framework (rust in NextJS) een invloed op de performantie van canvas?
  - ...
  - Ja, snellere refresh tijden (x3) & snellere builds (x5). O
  - React heeft een experimental mode, waarbij er een virtual schedular dingen gaat prioritizen, en zo de scene optimaliseert. Dit werkt nog niet optimaal met de nieuwe versie van NextJS en is alleen beschikbaar in React 18, wat nog moet uitkomen..
  - 
- Is de snelheid van een computer waar de web applicatie op draait belangrijk voor de performance van HTML5 canvas?
  - De snelheid van de internet verbinding speelt een grote rol bij het inladen van de objecten, textures en achtergronden. Je kan de fotos verkleinen, maar dan zullen de textures er niet meer zo realistisch uit komen te zien.
  - De objecten moeten in een juist formaat geexporteerd worden, om zo het best ingeladen te worden. Wat dus ook een grote rol speelt bij de performance van je canvas.
- Kunnen 3D programmas zoals Spline, Unity, Unreal Engine, Blender, .. helpen om 3D scenes te ontwikkelen en om te zetten naar ThreeJS?
  - Blender: ja (build in export)
  - Spline: ja (build in export)
  - Unity: ja => https://github.com/Plattar/gltf-exporter
  - Unreal: ja => https://www.unrealengine.com/marketplace/en-US/product/gltf-exporter
  - ThreeJS web editor: ja, er is een mogelijkheid om te exporten naar .gltf
  - Conclusie
    - Zolang er een mogelijkheid is om te exporteren naar .gltf (optmized standaard voor het web) is het mogelijk.
- Kan de ingeladen track in synchronisatie gezet worden met de 3D scene?
  - ThreeJS stelt tools beschikbaar zoals positionalAudio, waardoor een track kan ingeladen worden in de scene. Dit maakt het wel moeilijker om simpele tasks uit te voeren zoals play & stop. Het is geen gewoon javascript audio() element.
- Hoeveel verschillende canvassen kunnen we op eenzelfde pagina renderen?
- 
- Welke voordelen heeft realtime rendering tegenover video?
  - Customization
  - Precision
  - Quality
  - Loading lagg

  - Video voordelen
    - Streamingbuffer
    - Compability
    - Geen krachtige graphics card nodig
- Zijn er tools op de markt beschikbaar die dit al kunnen realiseren?
  - Er zijn enkele audio visualisers die ontwikkelt zijn. 
  - https://listeningtogether.atspotify.com/
  - https://porterrobinson.com/tour
  - https://medium.com/active-theory/introducing-dreamwave-microverses-1d3e0364eff
  - https://codesandbox.io/s/audio-analyser-forked-infjx
  - https://www.audiograph.xyz/?cc
  - https://codesandbox.io/s/simple-audio-analyser-wu51m
  - 


---

## Libraries
- three
- @react-three
    - @react-three/fiber
    - @react-three/drei
    - @react-three/flex
    - @react-three/postprocessing
    - @react-three/cannon
- react-spring
- troika-3d-text => https://protectwise.github.io/troika/troika-3d/ (not working, TypeError)
    
# APP
- Music library
- Music 3D web player
  - Audio controls
    - Play, pause, resume, forward, backwords
  - Scene controls
    - Quality, fullscreen, timeline, loading, resize, exporting
  - Object controls
    - Speed, size, move
    - Add objects to scene
  - Add animation to object in a timeline on certain time
    - Activate animation
- Save music video settings and play as video (json)

## Research
Research.txt

## Checklist & ideas
- [x] Analyze audio
- [x] Detect lows, mids, highs in audio
- [x] Detect average frequency
- [x] Import GLTF object
- [ ] Import custom GLTF object
- [x] Import audio
- [x] Import custom audio from input (file) field
- [x] Import environment (360° foto)
- [x] Import custom environment (360° foto)
- [x] Import video as object
- [x] Import video as background
- [ ] Import custom video
- [ ] Detect bpm
- [ ] Detect dynamic
- [ ] Detect loudness
- [x] Modify objects in scene by music parameters (lows,mids,high)
- [ ] Move objects by bpm, dynamic, loudness, ..
- [x] useAnimation actions of custom gltf object
- [x] Canvas fullscreen
- [ ] Canvas quality controls
- [ ] Audio play, pause, stop, replay, .. controls
  - [x] play
  - [x] pause

- [x] 3D text on scene
- [x] Edit 3D text
- [ ] Auth login
- [ ] Admin panel
- [ ] Landingpage
- [x] Music page
- [x] Make changes in canvas from outside canvas

- [ ] Import scene from Blender
- [ ] Import object from C4D
- [ ] Chatbox in canvas
- [ ] Likes in canvas

## Answers


## Struggels
- Material inladen
- 3D Text gebruiken (troikaJS TS error)
- TS
- Timer with hooks makes scene glitchy and choppy, not smooth