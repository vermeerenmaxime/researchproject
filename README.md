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
    - ReactJS
      - react-three, react-three fiber, react-three drei, ..
    - Svelte
      - svelthree (oud)
      - https://svelte-cubed.vercel.app/ (nieuw)
- Wat voor impact heeft een virtuele dom op de performance van canvas?
- Heeft de compiler van een framework (rust in NextJS) een invloed op de performantie van canvas?
- Is de snelheid van een computer waar de web applicatie op draait belangrijk voor de performance van HTML5 canvas?
- Kunnen 3D programmas zoals Spline, Unity, Unreal Engine, Blender, .. helpen om 3D scenes te ontwikkelen en om te zetten naar ThreeJS?
  - Blender: ja
  - Spline
  - Unity
  - Unreal
  - ThreeJS web:
- Kan de ingeladen track in synchronisatie gezet worden met de 3D scene?
  - ThreeJS stelt tools beschikbaar zoals positionalAudio, waardoor ..
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
- Zijn er tools op de markt beschikbaar die dit al kunnen realiseren?


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

## Checklist
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
- [ ] useAnimation actions of custom gltf object
- [ ] Canvas fullscreen
- [ ] Canvas quality controls
- [ ] Audio play, pause, stop, replay, .. controls
  - [x] play
  - [x] pause

- [x] 3D text on scene
- [ ] Edit 3D text
- [ ] Auth login
- [ ] Admin panel
- [ ] Landingpage
- [ ] Music page
- [ ] Make changes in canvas from outside canvas

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