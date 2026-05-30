const money = v => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(Number(v||0));
const el = id => document.getElementById(id);
const num = id => parseFloat((el(id).value || '0').toString().replace(',','.')) || 0;
const val = id => el(id).value;
const chk = id => el(id).checked;

const defaultRates = {
  // v1.3.5 — cennik sprzedażowy Warszawa i okolice, robocizna netto.
  // Założenie: dolny / środkowy segment rynkowy, bez stawek premium.
  paintWhiteWalls: 22,
  paintLightExtra: 4,
  paintDarkExtra: 8,
  paintCeiling: 25,
  paintLatexExtra: 4,
  paintCeramicExtra: 8,
  paintCeilingPatch: 50,
  paintTouchup: 40,
  paintTouchupExtended: 90,
  primer: 6,
  smooth: 45,
  mask: 4,
  paintProtectFull: 12,
  paintProtectFloor: 7,
  paintProtectParkiet: 12,
  paintProtectWindow: 45,
  paintProtectDoor: 40,
  paintProtectStairLift: 220,
  prepMediumExtra: 18,
  prepHeavyExtra: 35,
  elec: 150,
  elecQuickPoint: 150,
  elecSocket: 130,
  elecSwitch: 110,
  elecLight: 140,
  elecPower: 220,
  elecBruzdaWall: 30,
  elecBruzdaConcrete: 50,
  elecCable: 10,
  elecConduit: 7,
  elecBoxCut: 25,
  elecBoxMount: 25,
  elecBoard: 650,
  elecProtection: 120,
  elecAgd: 150,
  elecLed: 90,
  elecLedPoint: 160,
  elecLedTape: 35,
  elecLedSolder: 25,
  elecLedProfile: 20,
  hyd: 260,
  hydQuickPoint: 280,
  hydWaterPoint: 260,
  hydSewerPoint: 240,
  hydPipeWall: 35,
  hydPipeFloor: 30,
  hydInsulation: 8,
  hydBruzda: 40,
  hydSewerMb: 50,
  hydManifold: 250,
  hydManifoldConnect: 180,
  hydCorrection: 220,
  hydTapSink: 150,
  hydTapShower: 200,
  hydSink: 180,
  hydWcCompact: 250,
  hydWcFrame: 500,
  hydShowerCabin: 550,
  hydBathtub: 450,
  hydAppliance: 130,
  hydHose: 50,
  hydRadiatorInstall: 250,
  hydRadiatorReplace: 400,
  hydRadiatorConnection: 350,
  siliconeNew: 25,
  siliconeReplace: 45,
  siliconePatch: 60,
  hydPpMultiplier: 1.12,
  gk: 140,
  wallGkSingle: 90,
  wallGkDouble: 130,
  wallGkCeiling: 110,
  wallGkBuildout: 140,
  wallGkInsulation: 22,
  wallGkJoint: 30,
  wallGkOpening: 160,
  wallMasonryAerated: 140,
  wallMasonryBrick: 180,
  wallMasonryBuildout: 160,
  wallMasonryPlaster: 50,
  wallMasonrySmooth: 45,
  wallMasonryOpening: 200,
  demoTiles: 50,
  demoPlaster: 30,
  demoScreed: 65,
  demoFloor: 30,
  demoWall: 120,
  demoWallGk: 55,
  demoWallGazobeton: 90,
  demoWallBrickSilicate: 130,
  demoWallReinforcedThin: 160,
  demoWallHard: 350,
  rubbleTilesM3: 0.04,
  rubblePlasterM3: 0.02,
  rubbleScreedM3: 0.06,
  rubbleFloorM3: 0.015,
  rubbleWallM3: 0.08,
  carryHourly: 70,
  noElevatorSurchargePct: 0.35,
  elevatorSurchargePct: 0.08,
  containerSmall: 600,
  containerLarge: 950,
  bigbag: 300,
  atticWool1: 55,
  atticWool2: 80,
  atticVapor: 12,
  atticTape: 8,
  atticFrame: 35,
  atticGk1: 55,
  atticGk2: 80,
  atticJoint: 30,
  atticSmooth: 45,
  atticRoofWindow: 400,
  atticHatch: 300,
  atticBeamMask: 70,
  atticNiche: 260,
  tileWall: 120,
  tileFloor: 125,
  tileHydro: 35,
  tilePrimer: 8,
  tileGrout: 20,
  tileProfile: 30,
  tileGresExtra: 20,
  tileHardExtra: 35,
  tileMiter: 80,
  tileSmallExtra: 35,
  tileBrickExtra: 45,
  tileMosaicExtra: 90,
  tileKitkatExtra: 110,
  tileHerringboneExtra: 80,
  bathroomGkFrame: 550,
  floorLaminate: 45,
  floorVinylClick: 55,
  floorEngineeredFloating: 75,
  floorUnderlay: 10,
  floorVaporFoil: 6,
  floorSkirting: 22,
  floorThreshold: 60,
  floorDemoSkirting: 8,
  subfloorPrimer: 8,
  subfloorSelfLevelThin: 30,
  subfloorSelfLevelThick: 45,
  subfloorLocalLevel: 40,
  subfloorGrinding: 18,
  subfloorCrackRepair: 25,
  decorCeiling: 30,
  decorWall: 30,
  decorLedMask: 40,
  decorCorner: 20,
  decorPaint: 15,
  wallpaperStandard: 45,
  wallpaperPremium: 80,
  wallpaperRemove: 20,
  wallpaperPrimer: 6,
  wallpaperProtection: 5,
  floorSkirtingAcrylic: 8,
  floorSkirtingProtection: 6,
  floorSkirtingPaint: 12,
  floorSkirtingEndRepair: 18,
  floorSkirtingJointRepair: 20,
  decorJointRepair: 35,
  decorStepRepair: 45,
  decorAcrylicRepair: 8,
  decorProtection: 6,
  decorRepairPaint: 15,
  hardStairsPct: 0.10,
  hardScaffoldDay: 220,
  hardProtectionMb: 10,
  furnitureAssembly: 120,
  furnitureKitchenMb: 220,
  furnitureCountertopMb: 120,
  furnitureHandleAdjust: 20,
  furnitureHourly: 80
,
  furnitureDoorStandard: 350,
  furnitureDoorHidden: 650,
  furnitureDoorAdjustment: 120
,
  revealsWindowStandard: 110,
  revealsDoorStandard: 120,
  revealsHiddenDoor: 190,
  revealsAluCorner: 45,
  revealsOldFrameRepair: 250,
  parapetDemount: 40,
  parapetSet: 120,
  parapetFinish: 80,
  parapetCut: 40
};
let rates = {...defaultRates, ...(JSON.parse(localStorage.getItem('rates_v135') || '{}'))};

const rateLabels = {
  paintWhiteWalls:['Malowanie ścian 2x — biały / baza','zł/m²'],
  paintLightExtra:['Dopłata: jasny kolor ścian','zł/m²'],
  paintDarkExtra:['Dopłata: ciemny kolor ścian','zł/m²'],
  paintCeiling:['Malowanie sufitów — biały','zł/m²'],
  paintLatexExtra:['Dopłata: farba lateksowa','zł/m²'],
  paintCeramicExtra:['Dopłata: farba ceramiczna','zł/m²'],
  paintCeilingPatch:['Serwis malarski: naprawa punktowa sufitu','zł/szt'],
  paintTouchup:['Serwis malarski: zaprawka do ok. 0,25 m²','zł/szt'],
  paintTouchupExtended:['Serwis malarski: zaprawka rozszerzona','zł/szt'],
  primer:['Gruntowanie ścian/sufitów','zł/m²'],
  mask:['Zabezpieczenie powierzchni: folia/taśma — legacy','zł/m²'],
  paintProtectFull:['Zabezpieczenie pełne pomieszczenia','zł/m²'],
  paintProtectFloor:['Zabezpieczenie podłogi','zł/m²'],
  paintProtectParkiet:['Zabezpieczenie parkietu wzmocnione','zł/m²'],
  paintProtectWindow:['Zabezpieczenie okien','zł/szt'],
  paintProtectDoor:['Zabezpieczenie drzwi','zł/szt'],
  paintProtectStairLift:['Zabezpieczenie klatki schodowej / windy','zł/kpl'],
  prepMediumExtra:['Przygotowanie ścian pod gładź / malowanie (zdzieranie, szlifowanie) — wariant średni','zł/m²'],
  prepHeavyExtra:['Przygotowanie ścian pod gładź / malowanie (zdzieranie, szlifowanie) — wariant ciężki','zł/m²'],
  smooth:['Gładź','zł/m²'],
  elec:['Punkt elektryczny — legacy','zł/szt'],
  elecQuickPoint:['Elektryka: punkt elektryczny — szybki tryb','zł/szt'],
  elecSocket:['Elektryka: gniazdo 230V / punkt','zł/szt'],
  elecSwitch:['Elektryka: włącznik / punkt','zł/szt'],
  elecLight:['Elektryka: punkt oświetleniowy','zł/szt'],
  elecPower:['Elektryka: gniazdo siłowe / dedykowany punkt AGD','zł/szt'],
  elecBruzdaWall:['Przygotowanie pod instalacje: bruzdowanie elektryczne w ścianie','zł/mb'],
  elecBruzdaConcrete:['Przygotowanie pod instalacje: bruzdowanie elektryczne w betonie','zł/mb'],
  elecCable:['Elektryka: układanie przewodów','zł/mb'],
  elecConduit:['Elektryka: robocizna — prowadzenie w peszlu/osłonie','zł/mb'],
  elecBoxCut:['Przygotowanie pod instalacje: wycinanie / wiercenie otworów pod puszki','zł/szt'],
  elecBoxMount:['Elektryka: montaż/osadzenie puszki','zł/szt'],
  elecBoard:['Elektryka: montaż/uporządkowanie rozdzielnicy','zł/szt'],
  elecProtection:['Elektryka: zabezpieczenia/obwody w rozdzielnicy','zł/szt'],
  elecAgd:['Elektryka: podłączenie płyty/piekarnika/AGD','zł/szt'],
  elecLed:['Elektryka: LED/taśmy/sterowniki — legacy','zł/mb'],
  elecLedPoint:['Elektryka LED: punkt LED / podłączenie','zł/szt'],
  elecLedTape:['Elektryka LED: montaż taśmy LED','zł/mb'],
  elecLedSolder:['Elektryka LED: lutowanie / łączenie','zł/szt'],
  elecLedProfile:['Elektryka LED: montaż profilu alu','zł/mb'],
  hyd:['Punkt wod-kan — legacy','zł/szt'],
  hydQuickPoint:['Hydraulika: punkt wod-kan — szybki tryb','zł/szt'],
  hydWaterPoint:['Hydraulika: punkt wodny','zł/szt'],
  hydSewerPoint:['Hydraulika: punkt kanalizacyjny','zł/szt'],
  hydPipeWall:['Hydraulika: prowadzenie rur w ścianie','zł/mb'],
  hydPipeFloor:['Hydraulika: prowadzenie rur w podłodze','zł/mb'],
  hydInsulation:['Hydraulika: izolacja rur — robocizna','zł/mb'],
  hydBruzda:['Przygotowanie pod instalacje: bruzdowanie pod wod-kan','zł/mb'],
  hydSewerMb:['Hydraulika: podejście kanalizacyjne','zł/mb'],
  hydManifold:['Hydraulika: montaż rozdzielacza','zł/szt'],
  hydManifoldConnect:['Hydraulika: podłączenie rozdzielacza/obiegów','zł/szt'],
  hydCorrection:['Hydraulika: korekty spadków / przeróbki','zł/kpl'],
  hydTapSink:['Hydraulika: montaż baterii umywalkowej','zł/szt'],
  hydTapShower:['Hydraulika: montaż baterii prysznicowej/wannowej','zł/szt'],
  hydSink:['Hydraulika: montaż umywalki/zlewu','zł/szt'],
  hydWcCompact:['Hydraulika: montaż WC kompakt','zł/szt'],
  hydWcFrame:['Hydraulika: montaż WC podtynkowego/stelaża','zł/szt'],
  hydShowerCabin:['Hydraulika: montaż kabiny prysznicowej','zł/szt'],
  hydBathtub:['Hydraulika: montaż wanny','zł/szt'],
  hydAppliance:['Hydraulika: podłączenie pralki/zmywarki','zł/szt'],
  hydHose:['Hydraulika: wymiana wężyków/zaworków','zł/szt'],
  hydRadiatorInstall:['Hydraulika C.O.: montaż grzejnika standardowego','zł/szt'],
  hydRadiatorReplace:['Hydraulika C.O.: wymiana grzejnika z demontażem','zł/szt'],
  hydRadiatorConnection:['Hydraulika C.O.: przeróbka podejścia pod grzejnik','zł/szt'],
  siliconeNew:['Pomieszczenia mokre: nowe silikonowanie','zł/mb'],
  siliconeReplace:['Pomieszczenia mokre: wymiana silikonu','zł/mb'],
  siliconePatch:['Pomieszczenia mokre: poprawka punktowa silikonu','zł/szt'],
  hydPpMultiplier:['Hydraulika: mnożnik systemu PP zgrzewanego','×'],
  gk:['Ściany GK — legacy','zł/m²'],
  wallGkSingle:['Zabudowy: GK jednostronna','zł/m²'],
  wallGkDouble:['Zabudowy: ścianka GK dwustronna','zł/m²'],
  wallGkCeiling:['Zabudowy: sufit podwieszany GK','zł/m²'],
  wallGkBuildout:['Zabudowy: stelaże / piony / półki GK','zł/m²'],
  wallGkInsulation:['Zabudowy: wełna / izolacja w GK','zł/m²'],
  wallGkJoint:['Zabudowy: spoinowanie / szpachlowanie GK','zł/m²'],
  wallGkOpening:['Zabudowy: otwór / wzmocnienie GK','zł/szt'],
  wallMasonryAerated:['Zabudowy: ścianka z gazobetonu','zł/m²'],
  wallMasonryBrick:['Zabudowy: ścianka z cegły / silikatu','zł/m²'],
  wallMasonryBuildout:['Zabudowy: murowane wnęki / zabudowy','zł/m²'],
  wallMasonryPlaster:['Zabudowy: tynkowanie nowej ścianki','zł/m²'],
  wallMasonrySmooth:['Zabudowy: gładź na ściance murowanej','zł/m²'],
  wallMasonryOpening:['Zabudowy: otwór / nadproże / wzmocnienie','zł/szt'],
  demoTiles:['Demolka: skuwanie płytek','zł/m²'],
  demoPlaster:['Demolka: skuwanie starego tynku','zł/m²'],
  demoScreed:['Demolka: kucie posadzki / wylewki','zł/m²'],
  demoFloor:['Demolka: zrywanie parkietu/desek/paneli','zł/m²'],
  demoWall:['Demolka: wyburzanie ścian działowych — legacy','zł/m²'],
  demoWallGk:['Demolka: wyburzanie ścian — GK / lekka zabudowa','zł/m²'],
  demoWallGazobeton:['Demolka: wyburzanie ścian — gazobeton / beton komórkowy','zł/m²'],
  demoWallBrickSilicate:['Demolka: wyburzanie ścian — cegła / silikat','zł/m²'],
  demoWallReinforcedThin:['Demolka: wyburzanie ścian — żelbet cienki / beton lekki','zł/m²'],
  demoWallHard:['Demolka: wyburzanie ścian — żelbet / beton / klinkier trudny','zł/m²'],
  rubbleTilesM3:['Gruz: płytki z klejem','m³/m²'],
  rubblePlasterM3:['Gruz: tynk ok. 2 cm','m³/m²'],
  rubbleScreedM3:['Gruz: wylewka/posadzka','m³/m²'],
  rubbleFloorM3:['Gruz: podłoga drewniana/panele','m³/m²'],
  rubbleWallM3:['Gruz: ściana działowa','m³/m²'],
  carryHourly:['Wynoszenie gruzu — roboczogodzina','zł/h/os'],
  noElevatorSurchargePct:['Dopłata bez windy od 2. piętra','% robocizny'],
  elevatorSurchargePct:['Dopłata z windą / organizacja','% robocizny'],
  containerSmall:['Kontener mały 2–3 m³','zł'],
  containerLarge:['Kontener 6–7 m³','zł'],
  bigbag:["Big-Bag 1 m³ z wywozem","zł/szt"],
  atticWool1:["Poddasze: wełna mineralna 1 warstwa","zł/m² połaci"],
  atticWool2:["Poddasze: wełna mineralna 2. warstwa","zł/m² połaci"],
  atticVapor:["Poddasze: paroizolacja","zł/m² połaci"],
  atticTape:["Poddasze: taśmy / uszczelnienia","zł/m² połaci"],
  atticFrame:["Poddasze: ruszt stalowy pod GK","zł/m² połaci"],
  atticGk1:["Poddasze: płyta GK 1x","zł/m² połaci"],
  atticGk2:["Poddasze: płyta GK 2x","zł/m² połaci"],
  atticJoint:["Poddasze: szpachlowanie i szlifowanie GK","zł/m² połaci"],
  atticSmooth:["Poddasze: gładź na zabudowie","zł/m² połaci"],
  atticRoofWindow:["Poddasze: obróbka okna dachowego","zł/szt"],
  atticHatch:["Poddasze: właz strychowy","zł/szt"],
  atticBeamMask:["Poddasze: maskowanie belek","zł/mb"],
  atticNiche:["Poddasze: wnęka / półka","zł/szt"],
  tileWall:["Płytki: układanie ścienne","zł/m²"],
  tileFloor:["Płytki: układanie podłogowe","zł/m²"],
  tileHydro:["Płytki: hydroizolacja / folia w płynie","zł/m²"],
  tilePrimer:["Płytki: gruntowanie / grunt szczepny pod płytki","zł/m²"],
  tileGrout:["Płytki: fugowanie / wykończenie","zł/m²"],
  tileProfile:["Płytki: listwy / profile / narożniki","zł/mb"],
  tileGresExtra:["Płytki: dopłata za gres","zł/m²"],
  tileHardExtra:["Płytki: dopłata za materiał trudny w obróbce","zł/m²"],
  tileMiter:["Płytki: szlifowanie krawędzi 45° / narożniki","zł/mb"],
  tileSmallExtra:["Płytki: dopłata za mały format ≤15 cm","zł/m²"],
  tileBrickExtra:["Płytki: dopłata za cegiełkę","zł/m²"],
  tileMosaicExtra:["Płytki: dopłata za mozaikę","zł/m²"],
  tileKitkatExtra:["Płytki: dopłata za kit-kat / lamelki","zł/m²"],
  tileHerringboneExtra:["Płytki: dopłata za jodełkę","zł/m²"],
  bathroomGkFrame:["Łazienka: zabudowa stelaża WC","zł/szt"],
  floorLaminate:["Podłogi: panele laminowane — montaż pływający","zł/m²"],
  floorVinylClick:["Podłogi: winyl click — montaż pływający","zł/m²"],
  floorEngineeredFloating:["Podłogi: deska warstwowa pływająca","zł/m²"],
  floorUnderlay:["Podłogi: podkład — robocizna","zł/m²"],
  floorVaporFoil:["Podłogi: folia paroizolacyjna — robocizna","zł/m²"],
  floorSkirting:["Podłogi: listwy przypodłogowe","zł/mb"],
  floorThreshold:["Podłogi: listwa progowa","zł/szt"],
  floorDemoSkirting:["Podłogi: demontaż starych listew","zł/mb"],
  subfloorPrimer:["Posadzki/podłoże: gruntowanie podłoża","zł/m²"],
  subfloorSelfLevelThin:["Posadzki/podłoże: wylewka samopoziomująca cienka","zł/m²"],
  subfloorSelfLevelThick:["Posadzki/podłoże: wylewka samopoziomująca grubsza","zł/m²"],
  subfloorLocalLevel:["Posadzki/podłoże: wyrównanie lokalne","zł/m²"],
  subfloorGrinding:["Posadzki/podłoże: szlifowanie / oczyszczenie","zł/m²"],
  subfloorCrackRepair:["Posadzki/podłoże: naprawa pęknięć","zł/mb"],
  decorCeiling:["Dekoracje: listwy przysufitowe","zł/mb"],
  decorWall:["Dekoracje: listwy ścienne dekoracyjne","zł/mb"],
  decorLedMask:["Dekoracje: maskownice LED","zł/mb"],
  decorCorner:["Dekoracje: narożniki / zakończenia","zł/szt"],
  decorPaint:["Dekoracje: malowanie listew","zł/mb"],
  wallpaperStandard:["Tapetowanie: standard","zł/m²"],
  wallpaperPremium:["Tapetowanie: premium / wzór","zł/m²"],
  wallpaperRemove:["Tapetowanie: usunięcie starej tapety","zł/m²"],
  wallpaperPrimer:["Tapetowanie: grunt pod tapetę","zł/m²"],
  wallpaperProtection:["Tapetowanie: zabezpieczenie / oklejenie tapety","zł/m²"],
  floorSkirtingAcrylic:["Listwy przypodłogowe: akrylowanie","zł/mb"],
  floorSkirtingProtection:["Listwy przypodłogowe: taśmowanie ochronne","zł/mb"],
  floorSkirtingPaint:["Listwy przypodłogowe: malowanie","zł/mb"],
  floorSkirtingEndRepair:["Listwy przypodłogowe: renowacja zakończenia","zł/szt"],
  floorSkirtingJointRepair:["Listwy przypodłogowe: korekta łączenia","zł/szt"],
  decorJointRepair:["Sztukateria: renowacja łączenia","zł/szt"],
  decorStepRepair:["Sztukateria: wygubienie uskoku / przejścia","zł/szt"],
  decorAcrylicRepair:["Sztukateria: poprawa starego akrylu / pęknięć","zł/mb"],
  decorProtection:["Sztukateria: zabezpieczenie / oklejanie do malowania","zł/mb"],
  decorRepairPaint:["Sztukateria: malowanie po renowacji","zł/mb"],
  hardStairsPct:["Prace trudne: klatki schodowe — dopłata","% robocizny"],
  hardScaffoldDay:["Prace trudne: rusztowanie","zł/dzień"],
  hardProtectionMb:["Prace trudne: zabezpieczenia","zł/mb"],
  furnitureAssembly:["Montaż mebli: skręcanie / montaż wolnostojący","zł/szt"],
  furnitureKitchenMb:["Montaż mebli: zabudowa kuchenna / szafki","zł/mb"],
  furnitureCountertopMb:["Montaż mebli: blat / dopasowanie proste","zł/mb"],
  furnitureHandleAdjust:["Montaż mebli: uchwyty / regulacja frontów","zł/szt"],
  furnitureHourly:["Montaż mebli: korekty / dopasowania godzinowe","zł/h"]
,
  furnitureDoorStandard:["Montaż drzwi: wewnętrzne z ościeżnicą regulowaną","zł/szt"],
  furnitureDoorHidden:["Montaż drzwi: ukryte / bezprzylgowe / ukryta ościeżnica","zł/szt"],
  furnitureDoorAdjustment:["Montaż drzwi: korekta / regulacja / podcięcia","zł/szt"]
,
  revealsWindowStandard:["Glify / szpalety: okienne standard","zł/mb"],
  revealsDoorStandard:["Glify / szpalety: drzwiowe standard","zł/mb"],
  revealsHiddenDoor:["Glify / szpalety: pod drzwi ukryte","zł/mb"],
  revealsAluCorner:["Glify / szpalety: narożnik / kątownik alu","zł/mb"],
  revealsOldFrameRepair:["Glify / szpalety: naprawa po starej ościeżnicy","zł/szt"],
  parapetDemount:["Parapety: demontaż parapetu wewnętrznego","zł/szt"],
  parapetSet:["Parapety: obsadzenie parapetu wewnętrznego","zł/szt"],
  parapetFinish:["Parapety: obróbka parapetu / wykończenie wnęki","zł/szt"],
  parapetCut:["Parapety: docinanie / dopasowanie parapetu","zł/szt"]
};


const SUMMARY_GROUPS = [
  {id:'prep', title:'1. Prace przygotowawcze', order:10},
  {id:'demo', title:'2. Demontaże / rozbiórki / wywóz', order:20},
  {id:'installPrep', title:'3. Przygotowanie pod instalacje', order:30},
  {id:'electric', title:'4. Instalacje elektryczne', order:40},
  {id:'hydraulic', title:'5. Instalacje wod-kan', order:50},
  {id:'walls', title:'6. Ściany / sufity / zabudowy', order:60},
  {id:'attic', title:'6A. Poddasze / skosy', order:65},
  {id:'subfloor', title:'7. Posadzki / przygotowanie podłoża', order:70},
  {id:'wet', title:'8. Łazienki i kuchnie', order:80},
  {id:'smooth', title:'9. Gładzie', order:90},
  {id:'reveals', title:'10. Glify / szpalety / parapety', order:100},
  {id:'decor', title:'11. Dekoracje / sztukateria', order:110},
  {id:'floor', title:'12. Podłogi i listwy przypodłogowe', order:120},
  {id:'wallpaper', title:'13. Tapetowanie / okładziny ścienne', order:130},
  {id:'paint', title:'14. Malowanie', order:140},
  {id:'furniture', title:'15. Stolarka / drzwi / meble', order:150},
  {id:'hard', title:'16. Utrudnienia i dopłaty', order:160},
  {id:'other', title:'17. Pozycje indywidualne', order:900}
];
const SUMMARY_GROUP_BY_ID = Object.fromEntries(SUMMARY_GROUPS.map(g => [g.id, g]));
function inferSummaryMeta(name=''){
  const n = (name || '').toLowerCase();

  // v1.9.0: brudne prace przygotowawcze pod instalacje są osobnym blokiem,
  // a nie demontażem ani właściwą instalacją.
  if(
    n.includes('bruzdowanie') ||
    n.includes('wycinanie / wiercenie otworów pod puszki') ||
    n.includes('kucie/wiercenie pod puszki') ||
    n.includes('wiercenie pod puszki') ||
    n.includes('otworów pod puszki') ||
    n.includes('przepust')
  ) {
    return {group:'installPrep', groupOrder:SUMMARY_GROUP_BY_ID.installPrep.order, order:30};
  }

  // Roboty rozbiórkowe i logistyka gruzu.
  if(
    n.includes('demolka') ||
    n.includes('demontaż') ||
    n.includes('skuwanie') ||
    n.includes('kucie posadzki') ||
    n.includes('zrywanie') ||
    n.includes('usunięcie') ||
    n.includes('gruz') ||
    n.includes('kontener') ||
    n.includes('big-bag') ||
    n.includes('wynoszenie') ||
    n.includes('wywóz') ||
    n.includes('wyburzanie')
  ) {
    return {group:'demo', groupOrder:SUMMARY_GROUP_BY_ID.demo.order, order:20};
  }

  // Prace przygotowawcze niebędące demontażem.
  if(n.includes('zabezpieczenie') || n.includes('oklejanie')) return {group:'prep', groupOrder:SUMMARY_GROUP_BY_ID.prep.order, order:10};

  if(n.includes('glify') || n.includes('szpalety') || n.includes('kątownik alu') || n.includes('starej ościeżnicy') || n.includes('parapety')) return {group:'reveals', groupOrder:SUMMARY_GROUP_BY_ID.reveals.order, order:100};

  // Łazienki i kuchnie: glazura, hydro, wod-kan i biały montaż w pomieszczeniach mokrych razem.
  const wetRoomPrefix = n.includes('łazienka —') || n.includes('kuchnia —') || n.includes('wc —') || n.includes('pralnia') || n.includes('pomieszczenia mokre');
  const isPaintRoomRow = n.includes('— ściany (') || n.includes('- ściany (') || n.includes('— sufit (') || n.includes('- sufit (') || n.includes('— sufity (') || n.includes('- sufity (');
  const wetWork = n.includes('płytki') || n.includes('glazura') || n.includes('hydroizolacja') || n.includes('fugowanie') || n.includes('gruntowanie pod płytki') || n.includes('punkt wodny') || n.includes('punkt kanalizacyjny') || n.includes('prowadzenie rur') || n.includes('stelaża wc') || n.includes('montaż wc') || n.includes('montaż umywalki') || n.includes('montaż baterii') || n.includes('montaż kabiny') || n.includes('montaż wanny') || n.includes('pralki') || n.includes('zmywarki') || n.includes('silikon');
  if((wetRoomPrefix && wetWork && !isPaintRoomRow) || (!isPaintRoomRow && (n.includes('płytki') || n.includes('glazura') || n.includes('hydroizolacja') || n.includes('fugowanie') || n.includes('pomieszczenia mokre')))) {
    return {group:'wet', groupOrder:SUMMARY_GROUP_BY_ID.wet.order, order:80};
  }

  // C.O. i drzwi.
  if(n.includes('grzejnik') || n.includes('c.o.')) return {group:'hydraulic', groupOrder:SUMMARY_GROUP_BY_ID.hydraulic.order, order:50};
  if(n.includes('drzwi') || n.includes('ościeżnic')) return {group:'furniture', groupOrder:SUMMARY_GROUP_BY_ID.furniture.order, order:150};

  let id = 'other';
  let order = 9000;
  if(n.includes('elektryka')) { id='electric'; order=40; }
  if(n.includes('hydraulika') || n.includes('wod-kan') || n.includes('punkt wodny') || n.includes('punkt kanalizacyjny') || n.includes('prowadzenie rur')) { id='hydraulic'; order=50; }
  if(n.includes('zabudowy') || n.includes('ścianka') || n.includes('sufit podwieszany') || n.includes('gk') || n.includes('murowan') || n.includes('tynkowanie nowej ścianki')) { id='walls'; order=60; }
  if(n.includes('poddasze')) { id='attic'; order=65; }
  if(n.includes('posadzki') || n.includes('podłoże') || n.includes('samopoziom') || n.includes('wyrównanie lokalne') || n.includes('szlifowanie podłoża')) { id='subfloor'; order=70; }
  if(n.includes('gładź')) { id='smooth'; order=90; }
  if(n.includes('dekoracje') || n.includes('sztukateria') || n.includes('listwy przysufitowe') || n.includes('maskownice led') || n.includes('malowanie listew') || n.includes('renowacja łączeń sztukaterii') || n.includes('wygubienie uskoku') || n.includes('korekta starego akrylu') || n.includes('poprawa starego akrylu') || n.includes('zabezpieczenie / oklejanie sztukaterii') || n.includes('zabezpieczenie / oklejanie do malowania')) { id='decor'; order=110; }
  if(n.includes('podłogi') || n.includes('panele') || n.includes('winyl') || n.includes('deska warstwowa') || n.includes('listwy przypodłogowe') || n.includes('podkład') || n.includes('paroizolacyjna') || n.includes('progowa')) { id='floor'; order=120; }
  if(n.includes('tapetowanie') || n.includes('tapeta') || n.includes('tapety')) { id='wallpaper'; order=130; }
  if(
    isPaintRoomRow ||
    n.includes('serwis malarski') || n.includes('zaprawka') || n.includes('naprawa punktowa sufitu') ||
    ((n.includes('malowanie') || n.includes('gruntowanie')) && !n.includes('pod płytki') && !n.includes('sztukateria') && !n.includes('listwy przypodłogowe') && !n.includes('dekoracje'))
  ) { id='paint'; order=140; }
  if(n.includes('montaż mebli') || n.includes('meble:') || n.includes('zabudowa kuchenna') || n.includes('regulacja frontów') || n.includes('uchwyty')) { id='furniture'; order=150; }
  if(n.includes('prace trudne') || n.includes('rusztowanie') || n.includes('transport pionowy') || n.includes('dopłata')) { id='hard'; order=160; }
  return {group:id, groupOrder:SUMMARY_GROUP_BY_ID[id].order, order};
}
function renderGroupedSummary(rows){
  if(!rows.length) return '<p>Brak aktywnych pozycji.</p>';
  const normalized = rows.map((r, idx) => ({...inferSummaryMeta(r.name), ...r, _idx: idx}));
  normalized.sort((a,b)=>(a.groupOrder-b.groupOrder) || ((a.order||0)-(b.order||0)) || (a._idx-b._idx));
  const groups = [];
  normalized.forEach(r=>{
    let g = groups[groups.length-1];
    if(!g || g.id !== r.group){
      const def = SUMMARY_GROUP_BY_ID[r.group] || SUMMARY_GROUP_BY_ID.other;
      g = {id:r.group, title:def.title, rows:[], subtotal:0};
      groups.push(g);
    }
    g.rows.push(r);
    if(!r.note) g.subtotal += Number(r.value || 0);
  });
  return groups.map(g=>{
    const body = g.rows.map(r=> r.note
      ? `<div class="summaryRow muted"><span>${r.name}</span><b></b></div>`
      : `<div class="summaryRow"><span>${r.name}: ${Number(r.qty||0).toFixed(1)} ${r.unit || ''} × ${money(r.rate)}</span><b>${money(r.value)}</b></div>`
    ).join('');
    const subtotal = g.subtotal > 0 ? `<div class="summaryRow subtotal"><span>Suma bloku</span><b>${money(g.subtotal)}</b></div>` : '';
    return `<div class="summaryGroupTitle">${g.title}</div>${body}${subtotal}`;
  }).join('');
}

// v1.4.0 — szacowanie czasu robocizny dla jednej osoby.
function helperProductivityFactor(){
  const mode = el('helperMode') ? val('helperMode') : 'off';
  return ({off:1, light:1.25, standard:1.5, full:2})[mode] || 1;
}
function timeDifficultyFactor(){
  return el('timeDifficulty') ? (parseFloat(val('timeDifficulty')) || 1) : 1;
}
function workHoursPerDay(){
  return Math.max(4, Math.min(12, el('workHoursPerDay') ? num('workHoursPerDay') : 8)) || 8;
}
function workTimeRule(row){
  const n = (row.name || '').toLowerCase();
  const unit = (row.unit || '').toLowerCase();
  if(row.note || !Number(row.qty)) return null;
  if(n.includes('wywóz') || n.includes('kontener') || n.includes('big-bag')) return null;
  if(n.includes('prace trudne') || n.includes('rusztowanie') || n.includes('dopłata globalna')) return null;
  if(n.includes('montaż mebli: zabudowa kuchenna') || n.includes('montaż mebli: blat')) return {min:4, max:8};
  if(n.includes('montaż mebli: skręcanie')) return {min:4, max:8};
  if(n.includes('montaż mebli: uchwyty') || n.includes('regulacja frontów')) return {min:8, max:15};
  if(n.includes('montaż mebli: korekty')) return {min:1, max:1.5};
  if(n.includes('tapetowanie')) return {min:8, max:18};
  if(n.includes('usunięcie starej tapety')) return {min:18, max:35};
  if(n.includes('zabezpieczenie') && n.includes('tapety')) return {min:40, max:80};
  if(n.includes('serwis malarski: naprawa punktowa sufitu')) return {min:8, max:14};
  if(n.includes('serwis malarski: zaprawka malarska')) return {min:10, max:18};
  if(n.includes('serwis malarski: zaprawka rozszerzona')) return {min:5, max:10};
  if(n.includes('malowanie listew')) return {min:45, max:75};
  if(n.includes('renowacja zakończeń') || n.includes('korekta łączeń') || n.includes('wygubienie uskoku') || n.includes('korekta starego akrylu') || n.includes('renowacja łączeń')) return {min:3, max:6};
  if(n.includes('malowanie ścian')) return {min:45, max:75};
  if(n.includes('malowanie sufit')) return {min:40, max:65};
  if(n.includes('gruntowanie')) return {min:90, max:150};
  if(n.includes('gładź')) return {min:12, max:22};
  if(n.includes('zabezpieczenie') || n.includes('oklejanie')) return {min:70, max:120};
  if(n.includes('skuwanie płytek')) return {min:12, max:25};
  if(n.includes('skuwanie starego tynku')) return {min:10, max:20};
  if(n.includes('kucie posadzki')) return {min:8, max:16};
  if(n.includes('zrywanie')) return {min:20, max:40};
  if(n.includes('wynoszenie gruzu')) return {hoursPerQty:1};
  if(n.includes('samopoziom')) return {min:35, max:70};
  if(n.includes('szlifowanie') && n.includes('podło')) return {min:35, max:70};
  if(n.includes('naprawa pęknięć')) return {min:25, max:45};
  if(n.includes('wyrównanie lokalne')) return {min:15, max:30};
  if(n.includes('płytki') || n.includes('glazura')) return {min:3.5, max:6.5};
  if(n.includes('hydroizolacja')) return {min:25, max:45};
  if(n.includes('fugowanie')) return {min:20, max:35};
  if(n.includes('profile') || n.includes('narożniki')) return {min:25, max:45};
  if(n.includes('elektryka')) return unit.includes('mb') ? {min:25, max:45} : {min:7, max:12};
  if(n.includes('hydraulika')) return unit.includes('mb') ? {min:12, max:25} : {min:3, max:6};
  if(n.includes('panele') || n.includes('winyl') || n.includes('deska warstwowa')) return {min:18, max:35};
  if(n.includes('podkład') || n.includes('folia paroizolacyjna')) return {min:40, max:80};
  if(n.includes('listwy przypodłogowe')) return {min:35, max:70};
  if(n.includes('listwy progowe')) return {min:10, max:18};
  if(n.includes('listwy przysufitowe') || n.includes('listwy ścienne') || n.includes('maskownice led')) return {min:25, max:50};
  if(n.includes('dekoracje: narożniki')) return {min:25, max:40};
  if(n.includes('zabudowy') || n.includes('ścianka') || n.includes('sufit podwieszany') || n.includes('gk') || n.includes('murowan')) return {min:6, max:12};
  if(n.includes('poddasze')) return {min:8, max:16};
  if(unit.includes('m²')) return {min:20, max:40};
  if(unit.includes('mb')) return {min:25, max:50};
  if(unit.includes('szt')) return {min:6, max:12};
  return null;
}
function estimateWorkTime(rows){
  let minDays = 0, maxDays = 0, counted = 0;
  const hoursDay = workHoursPerDay();
  const hoursScale = 8 / hoursDay;
  const difficulty = timeDifficultyFactor();
  rows.forEach(row=>{
    const rule = workTimeRule(row);
    if(!rule) return;
    const qty = Math.max(0, Number(row.qty || 0));
    let min = 0, max = 0;
    if(rule.hoursPerQty){
      const days = qty * rule.hoursPerQty / 8;
      min = days * 0.85;
      max = days * 1.25;
    } else {
      min = qty / Math.max(rule.max || 1, 0.01);
      max = qty / Math.max(rule.min || 1, 0.01);
    }
    if(isFinite(min) && isFinite(max) && max > 0){ minDays += min; maxDays += max; counted += 1; }
  });
  minDays *= hoursScale * difficulty;
  maxDays *= hoursScale * difficulty;
  const helper = helperProductivityFactor();
  return {min:Math.max(0,minDays), max:Math.max(0,maxDays), helperMin:Math.max(0,minDays/helper), helperMax:Math.max(0,maxDays/helper), helper, hoursDay, counted};
}
function workDaysToWeeksLabel(days){
  const d = Math.max(0, Math.round(Number(days) || 0));
  const weeks = Math.floor(d / 5);
  const rem = d % 5;
  if(weeks <= 0) return `${d} dni roboczych`;
  if(rem === 0) return `${weeks} tyg. robocze`;
  return `${weeks} tyg. robocze + ${rem} dni`;
}
function workDaysRangeLabel(minDays, maxDays){
  const min = Math.max(1, Math.ceil(Number(minDays) || 0));
  const max = Math.max(min, Math.ceil(Number(maxDays) || min));
  return `${workDaysToWeeksLabel(min)} – ${workDaysToWeeksLabel(max)}`;
}
function renderWorkTimeSummary(rows){
  const t = estimateWorkTime(rows);
  if(!t.counted || t.max <= 0) return '';
  const fmt = v => Math.max(0.5, Math.ceil(v * 2) / 2).toFixed(1).replace('.', ',');
  const helperLine = t.helper > 1 ? `<div class="summaryRow"><span>Z pomocnikiem / większą obsadą</span><b>${fmt(t.helperMin)}–${fmt(t.helperMax)} dni roboczych</b></div><div class="summaryRow muted"><span>W przeliczeniu na tygodnie</span><b>${workDaysRangeLabel(t.helperMin, t.helperMax)}</b></div>` : '';
  return `
    <div class="summaryGroupTitle">Szacowany czas robocizny</div>
    <div class="summaryRow total"><span>Zakres bazowy</span><b>${fmt(t.min)}–${fmt(t.max)} dni roboczych</b></div>
    <div class="summaryRow muted"><span>W przeliczeniu na tygodnie</span><b>${workDaysRangeLabel(t.min, t.max)}</b></div>
    <div class="summaryRow"><span>Założenie</span><b>1 osoba × ${t.hoursDay.toFixed(1).replace('.', ',')} h/dzień</b></div>
    ${helperLine}
    <p class="info">Czas jest orientacyjny. 1 tydzień roboczy = 5 dni. Nie obejmuje pełnego harmonogramu, przerw technologicznych, oczekiwania na materiały ani kolizji między branżami.</p>`;
}

const demoMap = {
  tiles: {rate:'demoTiles', rubble:'rubbleTilesM3', label:'Skuwanie płytek ściany/podłogi'},
  plaster: {rate:'demoPlaster', rubble:'rubblePlasterM3', label:'Skuwanie starego tynku'},
  screed: {rate:'demoScreed', rubble:'rubbleScreedM3', label:'Kucie posadzki betonowej / wylewki'},
  floor: {rate:'demoFloor', rubble:'rubbleFloorM3', label:'Zrywanie parkietu / desek / paneli'},
  wallGk: {rate:'demoWallGk', rubble:'rubbleWallM3', label:'Wyburzanie ścian działowych — GK / lekka zabudowa'},
  wallGazobeton: {rate:'demoWallGazobeton', rubble:'rubbleWallM3', label:'Wyburzanie ścian działowych — gazobeton / beton komórkowy'},
  wallBrickSilicate: {rate:'demoWallBrickSilicate', rubble:'rubbleWallM3', label:'Wyburzanie ścian działowych — cegła / silikat'},
  wallReinforcedThin: {rate:'demoWallReinforcedThin', rubble:'rubbleWallM3', label:'Wyburzanie ścian działowych — żelbet cienki / beton lekki'},
  wallHard: {rate:'demoWallHard', rubble:'rubbleWallM3', label:'Wyburzanie ścian działowych — żelbet / beton / klinkier trudny'}
};

const electricMap = {
  socket: {rate:'elecSocket', label:'Elektryka: gniazda 230V'},
  switch: {rate:'elecSwitch', label:'Elektryka: włączniki'},
  light: {rate:'elecLight', label:'Elektryka: punkty oświetleniowe'},
  power: {rate:'elecPower', label:'Elektryka: gniazda siłowe / dedykowane punkty AGD'},
  bruzdaWall: {rate:'elecBruzdaWall', label:'Przygotowanie pod instalacje: bruzdowanie elektryczne w ścianie'},
  bruzdaConcrete: {rate:'elecBruzdaConcrete', label:'Przygotowanie pod instalacje: bruzdowanie elektryczne w betonie'},
  cable: {rate:'elecCable', label:'Elektryka: układanie przewodów'},
  conduit: {rate:'elecConduit', label:'Elektryka: prowadzenie w peszlu/osłonie'},
  boxCut: {rate:'elecBoxCut', label:'Przygotowanie pod instalacje: wycinanie / wiercenie otworów pod puszki'},
  boxMount: {rate:'elecBoxMount', label:'Elektryka: montaż/osadzenie puszki'},
  board: {rate:'elecBoard', label:'Elektryka: rozdzielnica'},
  protection: {rate:'elecProtection', label:'Elektryka: zabezpieczenia / obwody w rozdzielnicy'},
  agd: {rate:'elecAgd', label:'Elektryka: podłączenie AGD'},
  led: {rate:'elecLed', label:'Elektryka: LED / taśmy / sterowniki'},
  ledPoint: {rate:'elecLedPoint', label:'Elektryka LED: punkt LED / podłączenie'},
  ledTape: {rate:'elecLedTape', label:'Elektryka LED: montaż taśmy LED'},
  ledSolder: {rate:'elecLedSolder', label:'Elektryka LED: lutowanie / łączenie'},
  ledProfile: {rate:'elecLedProfile', label:'Elektryka LED: montaż profilu alu'}
};




const revealsMap = {
  windowStandard: {rate:'revealsWindowStandard', label:'Glify / szpalety: okienne standard', unit:'mb'},
  doorStandard: {rate:'revealsDoorStandard', label:'Glify / szpalety: drzwiowe standard', unit:'mb'},
  hiddenDoor: {rate:'revealsHiddenDoor', label:'Glify / szpalety: pod drzwi ukryte', unit:'mb'},
  aluCorner: {rate:'revealsAluCorner', label:'Glify / szpalety: narożnik / kątownik alu', unit:'mb'},
  oldFrameRepair: {rate:'revealsOldFrameRepair', label:'Glify / szpalety: naprawa po starej ościeżnicy', unit:'szt'},
  parapetDemount: {rate:'parapetDemount', label:'Parapety: demontaż parapetu wewnętrznego', unit:'szt'},
  parapetSet: {rate:'parapetSet', label:'Parapety: obsadzenie parapetu wewnętrznego', unit:'szt'},
  parapetFinish: {rate:'parapetFinish', label:'Parapety: obróbka parapetu / wykończenie wnęki', unit:'szt'},
  parapetCut: {rate:'parapetCut', label:'Parapety: docinanie / dopasowanie parapetu', unit:'szt'}
};

function revealNum(row, selector){
  return parseFloat(row.querySelector(selector)?.value || '0') || 0;
}
function calcRevealMb(row){
  const mode = row.querySelector('.rMode')?.value || 'quick';
  if(mode === 'manual') return revealNum(row, '.rManual');
  const count = revealNum(row, '.rCount');
  const width = revealNum(row, '.rWidth');
  const height = revealNum(row, '.rHeight');
  return count * (2 * height + width);
}
function syncRevealsUi(){
  const box = el('revealsDetailsBox');
  if(box) box.style.display = chk('svcReveals') ? 'block' : 'none';
  document.querySelectorAll('#revealsTable tbody tr[data-reveal]').forEach(row=>{
    const mode = row.querySelector('.rMode')?.value || 'quick';
    row.querySelectorAll('.rQuick').forEach(w=>{ w.style.display = mode === 'quick' ? '' : 'none'; });
    row.querySelectorAll('.rManualWrap').forEach(w=>{ w.style.display = mode === 'manual' ? '' : 'none'; });
    const def = revealsMap[row.dataset.reveal];
    const qty = def?.unit === 'szt' ? revealNum(row,'.rManual') : calcRevealMb(row);
    const calcCell = row.querySelector('.rCalcMb');
    if(calcCell) calcCell.textContent = def?.unit === 'szt' ? qty.toFixed(1) + ' szt' : qty.toFixed(1) + ' mb';
    const rateCell = row.querySelector('.rRate');
    if(rateCell && def) rateCell.textContent = money(rates[def.rate] || 0);
  });
}
function addRevealsRows(add){
  if(!chk('svcReveals')) return;
  syncRevealsUi();
  document.querySelectorAll('#revealsTable tbody tr[data-reveal]').forEach(row=>{
    const def = revealsMap[row.dataset.reveal];
    if(!def || !row.querySelector('.rActive')?.checked) return;
    const qty = def.unit === 'szt' ? revealNum(row,'.rManual') : calcRevealMb(row);
    if(qty > 0) add(def.label, qty, def.unit, rates[def.rate] || 0);
  });
}

const furnitureMap = {
  assembly: {rate:'furnitureAssembly', label:'Montaż mebli: skręcanie / montaż wolnostojący', unit:'szt'},
  kitchenMb: {rate:'furnitureKitchenMb', label:'Montaż mebli: zabudowa kuchenna / szafki', unit:'mb'},
  countertopMb: {rate:'furnitureCountertopMb', label:'Montaż mebli: blat / dopasowanie proste', unit:'mb'},
  handleAdjust: {rate:'furnitureHandleAdjust', label:'Montaż mebli: uchwyty / regulacja frontów', unit:'szt'},
  hourly: {rate:'furnitureHourly', label:'Montaż mebli: korekty / dopasowania', unit:'h'},
  doorStandard: {rate:'furnitureDoorStandard', label:'Montaż drzwi: wewnętrzne z ościeżnicą regulowaną', unit:'szt'},
  doorHidden: {rate:'furnitureDoorHidden', label:'Montaż drzwi: ukryte / bezprzylgowe / ukryta ościeżnica', unit:'szt'},
  doorAdjustment: {rate:'furnitureDoorAdjustment', label:'Montaż drzwi: korekta / regulacja / podcięcia', unit:'szt'}
};

function addFurnitureRows(add){
  if(!chk('svcFurniture')) return;
  document.querySelectorAll('#furnitureTable tbody tr').forEach(tr=>{
    const key = tr.dataset.furniture;
    const active = tr.querySelector('.fActive')?.checked;
    const qty = parseFloat(tr.querySelector('.fQty')?.value || '0') || 0;
    const cfg = furnitureMap[key];
    if(!cfg) return;
    const rate = rates[cfg.rate] || 0;
    const rateCell = tr.querySelector('.fRate');
    if(rateCell) rateCell.textContent = money(rate);
    if(active && qty > 0) add(cfg.label, qty, cfg.unit, rate);
  });
}

function syncFurnitureUi(){
  const box = el('furnitureDetailsBox');
  if(box) box.style.display = chk('svcFurniture') ? '' : 'none';
}

const wallMap = {
  gkSingle: {rate:'wallGkSingle', label:'Zabudowy GK: jednostronna'},
  gkDouble: {rate:'wallGkDouble', label:'Ścianka GK dwustronna'},
  gkCeiling: {rate:'wallGkCeiling', label:'Sufit podwieszany GK'},
  gkBuildout: {rate:'wallGkBuildout', label:'Zabudowy GK: stelaże / piony / półki'},
  gkInsulation: {rate:'wallGkInsulation', label:'Zabudowy GK: wełna / izolacja'},
  gkJoint: {rate:'wallGkJoint', label:'Zabudowy GK: spoinowanie / szpachlowanie'},
  gkOpening: {rate:'wallGkOpening', label:'Zabudowy GK: otwór / wzmocnienie'},
  masonryAerated: {rate:'wallMasonryAerated', label:'Ścianka murowana: gazobeton'},
  masonryBrick: {rate:'wallMasonryBrick', label:'Ścianka murowana: cegła / silikat'},
  masonryBuildout: {rate:'wallMasonryBuildout', label:'Murowane wnęki / zabudowy'},
  masonryPlaster: {rate:'wallMasonryPlaster', label:'Tynkowanie nowej ścianki'},
  masonrySmooth: {rate:'wallMasonrySmooth', label:'Gładź na ściance murowanej'},
  masonryOpening: {rate:'wallMasonryOpening', label:'Otwór / nadproże / wzmocnienie'}
};

const hydraulicMap = {
  tapSink: {rate:'hydTapSink', label:'Hydraulika: montaż baterii umywalkowej', white:true},
  tapShower: {rate:'hydTapShower', label:'Hydraulika: montaż baterii prysznicowej / wannowej', white:true},
  sink: {rate:'hydSink', label:'Hydraulika: montaż umywalki / zlewu', white:true},
  wcCompact: {rate:'hydWcCompact', label:'Hydraulika: montaż WC kompakt', white:true},
  wcFrame: {rate:'hydWcFrame', label:'Hydraulika: montaż WC podtynkowego / stelaża', white:true},
  showerCabin: {rate:'hydShowerCabin', label:'Hydraulika: montaż kabiny prysznicowej', white:true},
  bathtub: {rate:'hydBathtub', label:'Hydraulika: montaż wanny', white:true},
  appliance: {rate:'hydAppliance', label:'Hydraulika: podłączenie pralki / zmywarki', white:true},
  hose: {rate:'hydHose', label:'Hydraulika: wymiana wężyków / zaworków', white:true},
  radiatorInstall: {rate:'hydRadiatorInstall', label:'Hydraulika C.O.: montaż grzejnika standardowego', white:true},
  radiatorReplace: {rate:'hydRadiatorReplace', label:'Hydraulika C.O.: wymiana grzejnika z demontażem', white:true},
  radiatorConnection: {rate:'hydRadiatorConnection', label:'Hydraulika C.O.: przeróbka podejścia pod grzejnik', white:true},
  waterPoint: {rate:'hydWaterPoint', label:'Hydraulika: punkt wodny'},
  sewerPoint: {rate:'hydSewerPoint', label:'Hydraulika: punkt kanalizacyjny'},
  pipeWall: {rate:'hydPipeWall', label:'Hydraulika: prowadzenie rur w ścianie'},
  pipeFloor: {rate:'hydPipeFloor', label:'Hydraulika: prowadzenie rur w podłodze'},
  insulation: {rate:'hydInsulation', label:'Hydraulika: izolacja rur — robocizna'},
  bruzda: {rate:'hydBruzda', label:'Hydraulika: bruzdowanie pod instalację'},
  sewerMb: {rate:'hydSewerMb', label:'Hydraulika: podejście kanalizacyjne'},
  manifold: {rate:'hydManifold', label:'Hydraulika: montaż rozdzielacza'},
  manifoldConnect: {rate:'hydManifoldConnect', label:'Hydraulika: podłączenie rozdzielacza / obiegów'},
  correction: {rate:'hydCorrection', label:'Hydraulika: korekty spadków / przeróbki lokalne'}
};


const floorTypeMap = {
  laminate: {rate:'floorLaminate', label:'Podłogi: panele laminowane'},
  vinyl: {rate:'floorVinylClick', label:'Podłogi: winyl click'},
  engineered: {rate:'floorEngineeredFloating', label:'Podłogi: deska warstwowa pływająca'}
};

function findTooltipBox(icon){
  if(!icon) return null;

  const fieldLabel = icon.closest('.field-label');
  if(fieldLabel && fieldLabel.nextElementSibling?.classList?.contains('tooltip-box')){
    return fieldLabel.nextElementSibling;
  }

  const inlineSpan = icon.parentElement;
  if(inlineSpan && inlineSpan.nextElementSibling?.classList?.contains('tooltip-box')){
    return inlineSpan.nextElementSibling;
  }

  const host = icon.closest('label, td, th, .serviceBlock, .card, div');
  return host?.querySelector('.tooltip-box') || null;
}

function ensureFloatingTooltip(){
  let floatTip = document.getElementById('floatingTooltip');
  if(!floatTip){
    floatTip = document.createElement('div');
    floatTip.id = 'floatingTooltip';
    document.body.appendChild(floatTip);
  }
  return floatTip;
}

function hideTooltip(){
  const floatTip = document.getElementById('floatingTooltip');
  if(floatTip){
    floatTip.style.display = 'none';
    floatTip.dataset.source = '';
  }
}

function toggleTip(elm, ev){
  if(ev){
    ev.preventDefault();
    ev.stopPropagation();
  }

  const localTip = findTooltipBox(elm);
  if(!localTip) return;

  const floatTip = ensureFloatingTooltip();
  const source = localTip.textContent.trim();
  const same = floatTip.dataset.source === source && floatTip.style.display === 'block';
  if(same){ hideTooltip(); return; }

  floatTip.innerHTML = localTip.innerHTML;
  floatTip.dataset.source = source;
  floatTip.style.display = 'block';

  const rect = elm.getBoundingClientRect();
  const width = Math.min(420, Math.max(260, window.innerWidth - 24));
  floatTip.style.width = width + 'px';

  let left = rect.left + 18;
  if(left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
  if(left < 12) left = 12;

  let top = rect.bottom + 8;
  const height = floatTip.offsetHeight || 80;
  if(top + height > window.innerHeight - 12) top = rect.top - height - 8;
  if(top < 12) top = 12;

  floatTip.style.left = left + 'px';
  floatTip.style.top = top + 'px';
}

window.toggleTip = toggleTip;

document.addEventListener('click', (ev)=>{
  const icon = ev.target.closest?.('.info-icon');
  if(icon){ toggleTip(icon, ev); return; }
  const floatTip = document.getElementById('floatingTooltip');
  if(floatTip && !floatTip.contains(ev.target)) hideTooltip();
}, true);

document.addEventListener('keydown', (ev)=>{
  if(ev.key === 'Escape') hideTooltip();
});

window.addEventListener('resize', hideTooltip);

const roomBody = document.querySelector('#roomsTable tbody');
function salonName(){ return val('kitchenType') === 'aneks' ? 'salon z aneksem kuchennym' : 'salon'; }
function updateLivingHint(){ el('livingRoomHint').textContent = `W kalkulacji pomieszczeń główne pomieszczenie: ${salonName()}.`; }
function isBathroomName(name){ return (name || '').toLowerCase().includes('łaz') || (name || '').toLowerCase().includes('laz'); }
function scopeOptions(isBath){
  return isBath
    ? `<option value="bath_ceiling">tylko sufit</option><option value="bath_partial">sufit + % ścian</option>`
    : `<option value="walls_ceiling">ściany + sufit</option><option value="walls_only">tylko ściany</option><option value="ceiling_only">tylko sufit</option>`;
}

function addRoom(data={}){
  const name = data.name || 'pokój';
  const bath = isBathroomName(name);
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input class="rName" value="${name}"></td>
    <td><input class="rLen" type="number" min="0" step="0.1" value="${data.len ?? 4}"></td>
    <td><input class="rWid" type="number" min="0" step="0.1" value="${data.wid ?? 3}"></td>
    <td><input class="rHei" type="number" min="0" step="0.05" value="${data.hei ?? val('height')}"></td>
    <td><input class="rOpen" type="number" min="0" step="0.1" value="${data.open ?? 2}"></td>
    <td><select class="paintScope">${scopeOptions(bath)}</select></td>
    <td><input class="wallPct" type="number" min="0" max="100" step="1" value="${data.wallPct ?? (bath ? 30 : 100)}"></td>
    <td><select class="wallColor"><option value="white">biały</option><option value="light">jasny kolor</option><option value="dark">ciemny kolor</option></select></td>
    <td><select class="wallPaintType"><option value="acrylic">akrylowa</option><option value="latex">lateksowa</option><option value="ceramic">ceramiczna</option></select></td>
    <td><select class="ceilingPaintType"><option value="acrylic">akrylowa</option><option value="latex">lateksowa</option><option value="ceramic">ceramiczna</option></select></td>
    <td><button class="secondary delRoom" type="button">Usuń</button></td>`;
  roomBody.appendChild(tr);
  const scope = tr.querySelector('.paintScope');
  if(data.scope){ scope.value = data.scope; }
  tr.querySelector('.wallColor').value = data.wallColor || 'white';
  tr.querySelector('.wallPaintType').value = data.wallPaintType || 'acrylic';
  tr.querySelector('.ceilingPaintType').value = data.ceilingPaintType || 'acrylic';
  tr.querySelector('.delRoom').addEventListener('click',()=>{tr.remove();refreshWetSourceSelects();refreshFloorSourceSelects();refreshSubfloorSourceSelects();calc();});
  tr.querySelector('.rName').addEventListener('change',()=>{
    const old = scope.value;
    scope.innerHTML = scopeOptions(isBathroomName(tr.querySelector('.rName').value));
    scope.value = [...scope.options].some(o=>o.value===old) ? old : (isBathroomName(tr.querySelector('.rName').value) ? 'bath_ceiling' : 'walls_ceiling');
    refreshWetSourceSelects();
    refreshFloorSourceSelects();
    refreshSubfloorSourceSelects();
    calc();
  });
  tr.querySelectorAll('input,select').forEach(e=>{ e.addEventListener('input',switchToRoomsMeasurementAndCalc); e.addEventListener('change',switchToRoomsMeasurementAndCalc); });
}


function dimsFromArea(targetArea, preferredRatio=1.35){
  const area = Math.max(1, targetArea || 1);
  const width = Math.sqrt(area / preferredRatio);
  const length = area / width;
  return {
    len: Math.round(length * 10) / 10,
    wid: Math.round(width * 10) / 10
  };
}

function autoRoomPlan(){
  const area = Math.max(10, num('area'));
  const height = Math.max(2, num('height') || 2.6);
  const rooms = Math.max(1, Math.round(num('roomsCount') || 1)); // liczba pokoi razem z salonem
  const baths = Math.max(0, Math.round(num('bathroomsCount') || 0));
  const kitchenSeparate = val('kitchenType') === 'oddzielna';

  const bathArea = baths > 0 ? Math.min(area * 0.18, baths * 5.5) : 0;
  const kitchenArea = kitchenSeparate ? Math.min(Math.max(7, area * 0.10), 12) : 0;
  const hallArea = Math.min(Math.max(4.5, area * 0.12), 12);
  const remaining = Math.max(area - bathArea - kitchenArea - hallArea, area * 0.45);

  const bedrooms = Math.max(0, rooms - 1);
  const salonArea = bedrooms > 0 ? remaining * 0.50 : remaining;
  const bedroomArea = bedrooms > 0 ? (remaining - salonArea) / bedrooms : 0;

  const result = [];

  let d = dimsFromArea(salonArea, 1.35);
  result.push({name: salonName(), len: d.len, wid: d.wid, hei: height, open: kitchenSeparate ? 3 : 4, scope:'walls_ceiling', wallPct:100});

  for(let i=0; i<bedrooms; i++){
    d = dimsFromArea(bedroomArea, 1.25);
    result.push({name: bedrooms === 1 ? 'sypialnia' : `sypialnia ${i+1}`, len: d.len, wid: d.wid, hei: height, open: 2, scope:'walls_ceiling', wallPct:100});
  }

  if(kitchenSeparate){
    d = dimsFromArea(kitchenArea, 1.25);
    result.push({name:'kuchnia', len:d.len, wid:d.wid, hei:height, open:2, scope:'walls_ceiling', wallPct:100});
  }

  for(let i=0; i<baths; i++){
    const eachBathArea = bathArea / Math.max(1, baths);
    d = dimsFromArea(eachBathArea || 4, 1.25);
    result.push({name: baths === 1 ? 'łazienka' : `łazienka ${i+1}`, len:d.len, wid:d.wid, hei:height, open:1.5, scope:'bath_ceiling', wallPct:30});
  }

  d = dimsFromArea(hallArea, 2.0);
  result.push({name:'Przedpokój', len:d.len, wid:d.wid, hei:height, open:3, scope:'walls_ceiling', wallPct:100});

  return result;
}

function seedRooms(){
  roomBody.innerHTML='';
  autoRoomPlan().forEach(addRoom);
  if(document.querySelector('#wetRoomsTable tbody')) document.querySelector('#wetRoomsTable tbody').innerHTML='';
  refreshWetSourceSelects();
  refreshFloorSourceSelects();
  refreshSubfloorSourceSelects();
}

function autoUpdateRoomsFromProject(){
  seedRooms();
  updateLivingHint();
  calc();
}

function paintRateFor(color, paintType, isCeiling=false){
  let rate = isCeiling ? rates.paintCeiling : rates.paintWhiteWalls;
  if(!isCeiling){
    if(color === 'light') rate += rates.paintLightExtra;
    if(color === 'dark') rate += rates.paintDarkExtra;
  }
  if(paintType === 'latex') rate += rates.paintLatexExtra;
  if(paintType === 'ceramic') rate += rates.paintCeramicExtra;
  return rate;
}
function paintTypeLabel(t){
  return t === 'latex' ? 'lateksowa' : t === 'ceramic' ? 'ceramiczna' : 'akrylowa';
}
function wallColorLabel(c){
  return c === 'light' ? 'jasny kolor' : c === 'dark' ? 'ciemny kolor' : 'biały';
}

function roomsMeasurement(){
  let walls=0, ceilings=0, rawWalls=0, rawCeilings=0;
  const paintRows = [];
  [...roomBody.querySelectorAll('tr')].forEach(tr=>{
    const name = tr.querySelector('.rName').value || 'pomieszczenie';
    const l=parseFloat(tr.querySelector('.rLen').value)||0;
    const w=parseFloat(tr.querySelector('.rWid').value)||0;
    const h=parseFloat(tr.querySelector('.rHei').value)||0;
    const o=parseFloat(tr.querySelector('.rOpen').value)||0;
    const wallRaw=Math.max(0,2*(l+w)*h-o);
    const ceil=l*w;
    const scope=tr.querySelector('.paintScope').value;
    const pct=(parseFloat(tr.querySelector('.wallPct').value)||0)/100;
    const wallColor=tr.querySelector('.wallColor')?.value || 'white';
    const wallPaintType=tr.querySelector('.wallPaintType')?.value || 'acrylic';
    const ceilingPaintType=tr.querySelector('.ceilingPaintType')?.value || 'acrylic';
    let roomWalls = 0, roomCeilings = 0;
    rawWalls+=wallRaw; rawCeilings+=ceil;
    if(scope==='walls_ceiling'){ roomWalls=wallRaw; roomCeilings=ceil; }
    if(scope==='walls_only'){ roomWalls=wallRaw; }
    if(scope==='ceiling_only'){ roomCeilings=ceil; }
    if(scope==='bath_ceiling'){ roomCeilings=ceil; }
    if(scope==='bath_partial'){ roomCeilings=ceil; roomWalls=wallRaw*pct; }
    walls += roomWalls; ceilings += roomCeilings;
    if(roomWalls>0){
      paintRows.push({
        kind:'walls',
        name:`${name} — ściany (${wallColorLabel(wallColor)}, ${paintTypeLabel(wallPaintType)})`,
        qty:roomWalls,
        unit:'m²',
        rate:paintRateFor(wallColor, wallPaintType, false)
      });
    }
    if(roomCeilings>0){
      paintRows.push({
        kind:'ceiling',
        name:`${name} — sufit (biały, ${paintTypeLabel(ceilingPaintType)})`,
        qty:roomCeilings,
        unit:'m²',
        rate:paintRateFor('white', ceilingPaintType, true)
      });
    }
  });
  return {walls, ceilings, rawWalls, rawCeilings, paintRows};
}
function quickMeasurement(){
  const area=num('area'), h=num('height'), rooms=num('roomsCount'), baths=num('bathroomsCount');
  let factor=2.55;
  if(rooms>=2) factor+=0.25*(rooms-1);
  if(val('kitchenType')==='oddzielna') factor+=0.25;
  factor += Math.max(0,baths-1)*0.15;
  factor *= h/2.6;
  return {walls: area*factor, ceilings: area, rawWalls: area*factor, rawCeilings: area};
}
function measurement(){
  const mode=val('measureMode');
  if(mode==='manual') return {walls:num('manualWalls'), ceilings:num('manualCeilings'), rawWalls:num('manualWalls'), rawCeilings:num('manualCeilings')};
  if(mode==='rooms') return roomsMeasurement();
  return quickMeasurement();
}
function updateDelegationVisibility(){
  const show = val('outsideWarsaw') === 'yes';
  document.querySelectorAll('.delegationField').forEach(field=>{
    field.classList.toggle('hidden', !show);
  });
}

function switchToRoomsMeasurementAndCalc(){
  const mm = el('measureMode');
  if(mm && mm.value !== 'rooms') mm.value = 'rooms';
  calc();
}

function prepExtraRate(){ return val('paintVariant') === 'B' ? rates.prepMediumExtra : val('paintVariant') === 'C' ? rates.prepHeavyExtra : 0; }

function demoDetails(){
  let labor=0, rubble=0, detailRows=[];
  document.querySelectorAll('#demoTable tbody tr').forEach(tr=>{
    const key = tr.dataset.demo;
    const active = tr.querySelector('.dActive').checked;
    const qty = parseFloat(tr.querySelector('.dQty').value)||0;
    const cfg = demoMap[key];
    const rate = rates[cfg.rate] || 0;
    const vol = qty * (rates[cfg.rubble] || 0);
    tr.querySelector('.dRate').textContent = money(rate);
    tr.querySelector('.dVol').textContent = vol.toFixed(2);
    if(active && qty>0){
      const value = qty * rate;
      labor += value; rubble += vol;
      detailRows.push({name:cfg.label, qty, unit:'m²', rate, value});
    }
  });
  const floor = num('demoFloor');
  const noElevator = val('demoElevator') === 'no';
  const surchargePct = noElevator && floor >= 2 ? rates.noElevatorSurchargePct : rates.elevatorSurchargePct;
  const carrySurcharge = labor * (surchargePct || 0);
  const carryManual = num('demoCarryPeople') * num('demoCarryHours') * rates.carryHourly;
  let waste = 0;
  const mode = val('demoWasteMode');
  if(mode === 'container_small') waste = rates.containerSmall;
  if(mode === 'container_large') waste = rates.containerLarge;
  if(mode === 'bigbag') waste = Math.ceil(Math.max(rubble, 0.01)) * rates.bigbag;
  if(mode === 'manual') waste = num('demoWasteManual');
  const logistics = carrySurcharge + carryManual + waste;
  return {labor, rubble, carrySurcharge, carryManual, waste, logistics, detailRows};
}

function syncDemoUi(){
  const box = el('demoDetailsBox');
  if(box) box.style.display = chk('svcDemo') ? '' : 'none';
}
function syncPaintUi(){
  const paintBox = el('paintDetailsBox');
  const repairBox = el('paintRepairDetailsBox');
  const protectionBox = el('paintProtectionBox');
  if(paintBox) paintBox.style.display = chk('svcPaint') ? '' : 'none';
  if(repairBox) repairBox.style.display = chk('svcPaintRepair') ? '' : 'none';
  if(protectionBox) protectionBox.style.display = (chk('svcPaint') && chk('svcMask')) ? '' : 'none';
}
function paintRepairLightMultiplier(){
  const mode = el('paintRepairLightMode') ? val('paintRepairLightMode') : 'standard';
  return ({standard:1, demanding:1.2, critical:1.5})[mode] || 1;
}
function syncSmoothUi(){
  const box = el('smoothDetailsBox');
  if(box) box.style.display = chk('svcSmooth') ? '' : 'none';
}
function isDomSegment(){ return val('propertyType') === 'dom_segment' || val('propertyType') === 'dom'; }
function syncAtticUi(){
  const block = el('atticServiceBlock');
  const details = el('atticDetailsBox');
  if(block) block.style.display = isDomSegment() ? '' : 'none';
  if(!isDomSegment() && el('svcAttic')) el('svcAttic').checked = false;
  if(details) details.style.display = (isDomSegment() && chk('svcAttic')) ? '' : 'none';
  updateAtticAreaHint();
}
function atticSlopeArea(){
  if(!el('atticMeasureMode')) return 0;
  if(val('atticMeasureMode') === 'manual') return num('atticSlopeAreaManual');
  return num('atticFloorArea') * (parseFloat(val('atticComplexity')) || 1.6);
}
function updateAtticAreaHint(){
  const hint = el('atticAreaHint');
  if(!hint) return;
  const area = atticSlopeArea();
  const mode = el('atticMeasureMode') ? val('atticMeasureMode') : 'auto';
  hint.textContent = mode === 'manual'
    ? `Aktywna powierzchnia połaci/skosów: ${area.toFixed(1)} m² — wpis ręczny.`
    : `Aktywna powierzchnia połaci/skosów: ${area.toFixed(1)} m² = ${num('atticFloorArea').toFixed(1)} m² podłogi × ${val('atticComplexity')}.`;
}
function addAtticRows(add){
  if(!isDomSegment() || !chk('svcAttic')) return;
  const a = atticSlopeArea();
  if(chk('atticWool1')) add('Poddasze: ocieplenie wełną 1 warstwa', a, 'm² połaci', rates.atticWool1);
  if(chk('atticWool2')) add('Poddasze: ocieplenie wełną 2. warstwa', a, 'm² połaci', rates.atticWool2);
  if(chk('atticVapor')) add('Poddasze: folia paroizolacyjna', a, 'm² połaci', rates.atticVapor);
  if(chk('atticTape')) add('Poddasze: taśmy / uszczelnienia paroizolacji', a, 'm² połaci', rates.atticTape);
  if(chk('atticFrame')) add('Poddasze: ruszt stalowy pod GK', a, 'm² połaci', rates.atticFrame);
  if(chk('atticGk1')) add('Poddasze: płyta GK 1x', a, 'm² połaci', rates.atticGk1);
  if(chk('atticGk2')) add('Poddasze: płyta GK 2x', a, 'm² połaci', rates.atticGk2);
  if(chk('atticJoint')) add('Poddasze: szpachlowanie i szlifowanie GK', a, 'm² połaci', rates.atticJoint);
  if(chk('atticSmooth')) add('Poddasze: gładź na zabudowie', a, 'm² połaci', rates.atticSmooth);
  add('Poddasze: obróbka okien dachowych', num('atticRoofWindows'), 'szt', rates.atticRoofWindow);
  add('Poddasze: montaż / obróbka włazu strychowego', num('atticHatches'), 'szt', rates.atticHatch);
  add('Poddasze: maskowanie belek', num('atticBeamMb'), 'mb', rates.atticBeamMask);
  add('Poddasze: wnęki / półki', num('atticNiches'), 'szt', rates.atticNiche);
}
function syncElectricUi(){
  const details = el('electricDetailsBox');
  if(details) details.style.display = chk('svcElec') ? 'block' : 'none';
  const isDetailed = el('electricMode') && val('electricMode') === 'detailed';
  const quickLabel = el('elecQuickPtsLabel');
  const detailedBox = el('electricDetailedBox');
  if(quickLabel) quickLabel.style.display = isDetailed ? 'none' : 'flex';
  if(detailedBox) detailedBox.style.display = isDetailed ? 'block' : 'none';
  const autoPts = Math.max(0, Math.round((num('roomsCount') || 0) * 6 + (num('bathroomsCount') || 0) * 3 + (val('kitchenType') === 'oddzielna' ? 4 : 2)));
  if(el('elecAutoHint')) el('elecAutoHint').value = `${autoPts} pkt — podpowiedź z układu`;
  document.querySelectorAll('#electricTable tbody tr').forEach(tr=>{
    const key = tr.dataset.elec;
    const cfg = electricMap[key];
    const rate = cfg ? rates[cfg.rate] || 0 : 0;
    const cell = tr.querySelector('.eRate');
    if(cell) cell.textContent = money(rate);
  });
}

function addElectricRows(add){
  if(!chk('svcElec')) return;
  syncElectricUi();
  if(!el('electricMode') || val('electricMode') === 'quick'){
    add('Elektryka: punkty elektryczne — szybki tryb', num('elecPts'), 'szt', rates.elecQuickPoint || rates.elec);
    return;
  }
  document.querySelectorAll('#electricTable tbody tr').forEach(tr=>{
    if(!tr.querySelector('.eActive')?.checked) return;
    const key = tr.dataset.elec;
    const cfg = electricMap[key];
    if(!cfg) return;
    const qty = parseFloat(tr.querySelector('.eQty')?.value || '0') || 0;
    const unit = tr.children[2]?.textContent || 'szt';
    add(cfg.label, qty, unit, rates[cfg.rate] || 0);
  });
}




function roomFloorDataFromSource(sourceName){
  const rows = [...roomBody.querySelectorAll('tr')];
  const tr = rows.find(r => (r.querySelector('.rName')?.value || '') === sourceName) || rows[0];
  if(!tr) return {floor:0, perimeter:0, label:'pomieszczenie'};
  const name = tr.querySelector('.rName').value || 'pomieszczenie';
  const l=parseFloat(tr.querySelector('.rLen').value)||0;
  const w=parseFloat(tr.querySelector('.rWid').value)||0;
  return {label:name, floor:l*w, perimeter:Math.max(0, 2*(l+w))};
}
function floorSourceOptions(selected=''){
  const names=[...roomBody.querySelectorAll('.rName')].map(i=>i.value || 'pomieszczenie');
  if(!names.length) names.push('pomieszczenie');
  return names.map(n=>`<option value="${n}" ${n===selected?'selected':''}>${n}</option>`).join('');
}
function totalFloorMeasurement(){
  const rows=[...roomBody.querySelectorAll('tr')];
  let floor=0, perimeter=0;
  rows.forEach(tr=>{
    const l=parseFloat(tr.querySelector('.rLen')?.value)||0;
    const w=parseFloat(tr.querySelector('.rWid')?.value)||0;
    floor += l*w;
    perimeter += Math.max(0, 2*(l+w));
  });
  if(!rows.length || floor<=0) floor = num('area');
  if(!rows.length || perimeter<=0) perimeter = Math.max(0, Math.sqrt(Math.max(0, floor))*4);
  return {floor, perimeter};
}
function refreshFloorSourceSelects(){
  document.querySelectorAll('.floorSource').forEach(sel=>{
    const prev=sel.value;
    sel.innerHTML=floorSourceOptions(prev);
    if([...sel.options].some(o=>o.value===prev)) sel.value=prev;
  });
  syncFloorUi();
}
function addFloorRoom(data={}){
  const tbody=document.querySelector('#floorTable tbody');
  if(!tbody) return;
  const source=data.source || ([...roomBody.querySelectorAll('.rName')][0]?.value || 'pomieszczenie');
  const tr=document.createElement('tr');
  tr.innerHTML = `
    <td><input type="checkbox" class="fActive" checked></td>
    <td><select class="floorSource">${floorSourceOptions(source)}</select></td>
    <td><input type="checkbox" class="floorOverride"></td>
    <td><input class="floorArea" type="number" min="0" step="0.1" value="0"></td>
    <td><input class="floorSkirtingMb" type="number" min="0" step="0.1" value="0"></td>
    <td><select class="floorType"><option value="laminate">panele laminowane</option><option value="vinyl">winyl click</option><option value="engineered">deska warstwowa</option></select></td>
    <td><input type="checkbox" class="floorUnderlay" checked></td>
    <td><input type="checkbox" class="floorVapor"></td>
    <td><input type="checkbox" class="floorSkirting" checked></td>
    <td><input class="floorThresholdQty" type="number" min="0" step="1" value="0"></td>
    <td><input type="checkbox" class="floorDemoSkirting"></td>
    <td><input class="floorCutPct" type="number" min="0" step="0.01" value="0.08"></td>
    <td class="floorRate"></td>
    <td><button type="button" class="secondary delFloor">Usuń</button></td>`;
  tbody.appendChild(tr);
  tr.querySelector('.floorSource').value=source;
  tr.querySelector('.floorType').value=data.type || 'laminate';
  tr.querySelector('.floorThresholdQty').value=data.thresholds ?? 0;
  tr.querySelector('.floorCutPct').value=data.cutPct ?? 0.08;
  tr.querySelector('.floorVapor').checked=!!data.vapor;
  tr.querySelector('.floorDemoSkirting').checked=!!data.demoSkirting;
  tr.querySelector('.delFloor').addEventListener('click',()=>{tr.remove();calc();});
  tr.querySelectorAll('input,select').forEach(i=>{ i.addEventListener('input',()=>{syncFloorUi();calc();}); i.addEventListener('change',()=>{syncFloorUi();calc();}); });
  syncFloorUi();
}
function seedFloorRows(){
  const tbody=document.querySelector('#floorTable tbody');
  if(!tbody || tbody.children.length) return;
  const names=[...roomBody.querySelectorAll('.rName')].map(i=>i.value || '');
  names.forEach(n=>addFloorRoom({source:n}));
  if(!tbody.children.length) addFloorRoom({});
}
function setSubsectionEnabled(box, enabled){
  if(!box) return;
  box.style.display = enabled ? 'block' : 'none';
  box.classList.toggle('serviceSubsectionDisabled', !enabled);
  box.querySelectorAll('input, select, textarea, button').forEach(ctrl=>{
    ctrl.disabled = !enabled;
  });
}
function syncFloorUi(){
  const details=el('floorDetailsBox');
  const floorEnabled = chk('svcFloor');
  const repairEnabled = chk('svcFloorRepair');
  if(details) details.style.display = (floorEnabled || repairEnabled) ? 'block' : 'none';
  const newWorkBox = el('floorNewWorkBox');
  const repairBox = el('floorRepairBox');
  setSubsectionEnabled(newWorkBox, floorEnabled);
  setSubsectionEnabled(repairBox, repairEnabled);
  const detailed = el('floorMode') && val('floorMode') === 'detailed';
  const detailedBox=el('floorDetailedBox');
  const quickOptions=el('floorQuickOptions');
  ['floorQuickTypeLabel','floorQuickAreaLabel','floorQuickPerimeterLabel','floorThresholdsLabel','floorCutPctLabel'].forEach(id=>{ if(el(id)) el(id).style.display = detailed ? 'none' : 'flex'; });
  if(quickOptions) quickOptions.style.display = detailed ? 'none' : 'grid';
  if(detailedBox) detailedBox.style.display = detailed ? 'block' : 'none';
  const total=totalFloorMeasurement();
  if(!detailed){
    if(el('floorQuickArea') && !el('floorQuickArea').dataset.manual && document.activeElement !== el('floorQuickArea')) el('floorQuickArea').value = total.floor.toFixed(1);
    if(el('floorQuickSkirtingMb') && !el('floorQuickSkirtingMb').dataset.manual && document.activeElement !== el('floorQuickSkirtingMb')) el('floorQuickSkirtingMb').value = total.perimeter.toFixed(1);
  }
  if(chk('svcFloor') && detailed) seedFloorRows();
  document.querySelectorAll('#floorTable tbody tr').forEach(tr=>{
    const override=tr.querySelector('.floorOverride')?.checked;
    const data=roomFloorDataFromSource(tr.querySelector('.floorSource')?.value || '');
    const floor=tr.querySelector('.floorArea');
    const skirting=tr.querySelector('.floorSkirtingMb');
    if(!override){ floor.value=data.floor.toFixed(1); skirting.value=data.perimeter.toFixed(1); }
    floor.readOnly=!override; skirting.readOnly=!override;
    floor.classList.toggle('mutedControl', !override); skirting.classList.toggle('mutedControl', !override);
    const cfg=floorTypeMap[tr.querySelector('.floorType')?.value || 'laminate'];
    const rate=cfg ? rates[cfg.rate] || 0 : 0;
    const cell=tr.querySelector('.floorRate');
    if(cell) cell.textContent=money(rate);
  });
}
function trimSizeMultiplier(size){
  const map = {small:0.90, medium:1.00, large:1.25, premium:1.45};
  return map[size] || 1.00;
}

function addWithMultiplier(add, label, qty, unit, rate, multiplier){
  if(!qty || qty <= 0) return;
  const m = multiplier || 1;
  const suffix = m !== 1 ? ` × mnożnik ${m.toFixed(2)}` : '';
  add(`${label}${suffix}`, qty, unit, rate * m);
}

function addFloorRows(add){
  const floorEnabled = chk('svcFloor');
  const repairEnabled = chk('svcFloorRepair');
  if(!floorEnabled && !repairEnabled) return;
  syncFloorUi();
  const detailed = el('floorMode') && val('floorMode') === 'detailed';
  const addSet = (prefix, area, skirtingMb, type, underlay, vapor, skirting, thresholds, demoSkirting, cutPct)=>{
    const cfg=floorTypeMap[type] || floorTypeMap.laminate;
    const floorRate=rates[cfg.rate] || 0;
    add(`${prefix}: ${cfg.label}`, area, 'm²', floorRate);
    if(cutPct>0) add(`${prefix}: docinki / odpady robocizny ${Math.round(cutPct*100)}%`, area*cutPct, 'm² ekw.', floorRate);
    if(underlay) add(`${prefix}: podkład — rozłożenie`, area, 'm²', rates.floorUnderlay);
    if(vapor) add(`${prefix}: folia paroizolacyjna`, area, 'm²', rates.floorVaporFoil);
    if(skirting) add(`${prefix}: listwy przypodłogowe`, skirtingMb, 'mb', rates.floorSkirting);
    add(`${prefix}: listwy progowe`, thresholds, 'szt', rates.floorThreshold);
    if(demoSkirting) add(`${prefix}: demontaż starych listew`, skirtingMb, 'mb', rates.floorDemoSkirting);
  };
  if(floorEnabled && !detailed){
    addSet('Podłogi', num('floorQuickArea'), num('floorQuickSkirtingMb'), val('floorQuickType'), chk('floorQuickUnderlay'), chk('floorQuickVapor'), chk('floorQuickSkirting'), num('floorThresholds'), chk('floorQuickDemoSkirting'), num('floorCutPct'));
  }
  if(floorEnabled && detailed) document.querySelectorAll('#floorTable tbody tr').forEach(tr=>{
    if(!tr.querySelector('.fActive')?.checked) return;
    const source=tr.querySelector('.floorSource')?.value || 'pomieszczenie';
    addSet(`Podłogi — ${source}`,
      parseFloat(tr.querySelector('.floorArea')?.value || '0') || 0,
      parseFloat(tr.querySelector('.floorSkirtingMb')?.value || '0') || 0,
      tr.querySelector('.floorType')?.value || 'laminate',
      tr.querySelector('.floorUnderlay')?.checked,
      tr.querySelector('.floorVapor')?.checked,
      tr.querySelector('.floorSkirting')?.checked,
      parseFloat(tr.querySelector('.floorThresholdQty')?.value || '0') || 0,
      tr.querySelector('.floorDemoSkirting')?.checked,
      parseFloat(tr.querySelector('.floorCutPct')?.value || '0') || 0
    );
  });
  if(repairEnabled){
    const trimMul = trimSizeMultiplier(val('floorSkirtingSize'));
    add('Listwy przypodłogowe: akrylowanie', num('floorSkirtingAcrylicMb'), 'mb', rates.floorSkirtingAcrylic);
    add('Listwy przypodłogowe: taśmowanie ochronne', num('floorSkirtingProtectionMb'), 'mb', rates.floorSkirtingProtection);
    addWithMultiplier(add, 'Listwy przypodłogowe: malowanie', num('floorSkirtingPaintMb'), 'mb', rates.floorSkirtingPaint, trimMul);
    addWithMultiplier(add, 'Listwy przypodłogowe: renowacja zakończeń', num('floorSkirtingEndRepairQty'), 'szt', rates.floorSkirtingEndRepair, trimMul);
    addWithMultiplier(add, 'Listwy przypodłogowe: korekta łączeń / pęknięć', num('floorSkirtingJointRepairQty'), 'szt', rates.floorSkirtingJointRepair, trimMul);
  }
}

function subfloorSourceOptions(selected=''){
  return floorSourceOptions(selected);
}
function totalSubfloorMeasurement(){
  return totalFloorMeasurement();
}
function refreshSubfloorSourceSelects(){
  document.querySelectorAll('.subfloorSource').forEach(sel=>{
    const prev=sel.value;
    sel.innerHTML=subfloorSourceOptions(prev);
    if([...sel.options].some(o=>o.value===prev)) sel.value=prev;
  });
  syncSubfloorUi();
}
function addSubfloorRoom(data={}){
  const tbody=document.querySelector('#subfloorTable tbody');
  if(!tbody) return;
  const source=data.source || ([...roomBody.querySelectorAll('.rName')][0]?.value || 'pomieszczenie');
  const tr=document.createElement('tr');
  tr.innerHTML = `
    <td><input type="checkbox" class="sActive" checked></td>
    <td><select class="subfloorSource">${subfloorSourceOptions(source)}</select></td>
    <td><input type="checkbox" class="subfloorOverride"></td>
    <td><input class="subfloorArea" type="number" min="0" step="0.1" value="0"></td>
    <td><input type="checkbox" class="subfloorPrimer" checked></td>
    <td><select class="subfloorSelfLevel"><option value="none">brak</option><option value="thin">samopoziom cienki</option><option value="thick">samopoziom grubszy</option></select></td>
    <td><input class="subfloorLocalArea" type="number" min="0" step="0.1" value="0"></td>
    <td><input type="checkbox" class="subfloorGrinding"></td>
    <td><input class="subfloorCracksMb" type="number" min="0" step="0.1" value="0"></td>
    <td class="subfloorRate"></td>
    <td><button type="button" class="secondary delSubfloor">Usuń</button></td>`;
  tbody.appendChild(tr);
  tr.querySelector('.subfloorSource').value=source;
  tr.querySelector('.subfloorSelfLevel').value=data.selfLevel || 'thick';
  tr.querySelector('.subfloorLocalArea').value=data.localArea ?? 0;
  tr.querySelector('.subfloorCracksMb').value=data.cracksMb ?? 0;
  tr.querySelector('.subfloorGrinding').checked=!!data.grinding;
  tr.querySelector('.delSubfloor').addEventListener('click',()=>{tr.remove();calc();});
  tr.querySelectorAll('input,select').forEach(i=>{ i.addEventListener('input',()=>{syncSubfloorUi();calc();}); i.addEventListener('change',()=>{syncSubfloorUi();calc();}); });
  syncSubfloorUi();
}
function seedSubfloorRows(){
  const tbody=document.querySelector('#subfloorTable tbody');
  if(!tbody || tbody.children.length) return;
  const names=[...roomBody.querySelectorAll('.rName')].map(i=>i.value || '');
  names.forEach(n=>addSubfloorRoom({source:n}));
  if(!tbody.children.length) addSubfloorRoom({});
}
function syncSubfloorUi(){
  const details=el('subfloorDetailsBox');
  if(details) details.style.display = chk('svcSubfloor') ? 'block' : 'none';
  const detailed = el('subfloorMode') && val('subfloorMode') === 'detailed';
  const detailedBox=el('subfloorDetailedBox');
  const quickOptions=el('subfloorQuickOptions');
  ['subfloorQuickAreaLabel','subfloorQuickCracksLabel'].forEach(id=>{ if(el(id)) el(id).style.display = detailed ? 'none' : 'flex'; });
  if(quickOptions) quickOptions.style.display = detailed ? 'none' : 'grid';
  if(detailedBox) detailedBox.style.display = detailed ? 'block' : 'none';
  const total=totalSubfloorMeasurement();
  if(!detailed && el('subfloorQuickArea') && !el('subfloorQuickArea').dataset.manual && document.activeElement !== el('subfloorQuickArea')) el('subfloorQuickArea').value = total.floor.toFixed(1);
  if(chk('svcSubfloor') && detailed) seedSubfloorRows();
  document.querySelectorAll('#subfloorTable tbody tr').forEach(tr=>{
    const override=tr.querySelector('.subfloorOverride')?.checked;
    const data=roomFloorDataFromSource(tr.querySelector('.subfloorSource')?.value || '');
    const area=tr.querySelector('.subfloorArea');
    if(!override) area.value=data.floor.toFixed(1);
    area.readOnly=!override;
    area.classList.toggle('mutedControl', !override);
    const mode=tr.querySelector('.subfloorSelfLevel')?.value || 'none';
    const rate = mode==='thin' ? rates.subfloorSelfLevelThin : mode==='thick' ? rates.subfloorSelfLevelThick : 0;
    const cell=tr.querySelector('.subfloorRate');
    if(cell) cell.textContent = rate ? money(rate) : '—';
  });
}
function addSubfloorRows(add){
  if(!chk('svcSubfloor')) return;
  syncSubfloorUi();
  const detailed = el('subfloorMode') && val('subfloorMode') === 'detailed';
  const addSet = (prefix, area, primer, selfLevel, localArea, grinding, cracksMb)=>{
    if(primer) add(`${prefix}: gruntowanie podłoża`, area, 'm²', rates.subfloorPrimer);
    if(selfLevel==='thin') add(`${prefix}: wylewka samopoziomująca cienka`, area, 'm²', rates.subfloorSelfLevelThin);
    if(selfLevel==='thick') add(`${prefix}: wylewka samopoziomująca grubsza`, area, 'm²', rates.subfloorSelfLevelThick);
    add(`${prefix}: wyrównanie lokalne`, localArea, 'm²', rates.subfloorLocalLevel);
    if(grinding) add(`${prefix}: szlifowanie / oczyszczenie podłoża`, area, 'm²', rates.subfloorGrinding);
    add(`${prefix}: naprawa pęknięć`, cracksMb, 'mb', rates.subfloorCrackRepair);
  };
  if(!detailed){
    addSet('Posadzki / podłoże', num('subfloorQuickArea'), chk('subfloorQuickPrimer'), val('subfloorQuickSelfLevel'), num('subfloorQuickLocalArea'), chk('subfloorQuickGrinding'), num('subfloorQuickCracksMb'));
    return;
  }
  document.querySelectorAll('#subfloorTable tbody tr').forEach(tr=>{
    if(!tr.querySelector('.sActive')?.checked) return;
    const source=tr.querySelector('.subfloorSource')?.value || 'pomieszczenie';
    addSet(`Posadzki / podłoże — ${source}`,
      parseFloat(tr.querySelector('.subfloorArea')?.value || '0') || 0,
      tr.querySelector('.subfloorPrimer')?.checked,
      tr.querySelector('.subfloorSelfLevel')?.value || 'none',
      parseFloat(tr.querySelector('.subfloorLocalArea')?.value || '0') || 0,
      tr.querySelector('.subfloorGrinding')?.checked,
      parseFloat(tr.querySelector('.subfloorCracksMb')?.value || '0') || 0
    );
  });
}


function syncWallsUi(){
  const details = el('wallsDetailsBox');
  if(details) details.style.display = chk('svcWalls') ? 'block' : 'none';
  document.querySelectorAll('#wallsGkTable tbody tr, #wallsMasonryTable tbody tr').forEach(tr=>{
    const key = tr.dataset.wall;
    const cfg = wallMap[key];
    const rate = cfg ? rates[cfg.rate] || 0 : 0;
    const cell = tr.querySelector('.wRate');
    if(cell) cell.textContent = money(rate);
  });
}

function addWallRows(add){
  if(!chk('svcWalls')) return;
  syncWallsUi();
  document.querySelectorAll('#wallsGkTable tbody tr, #wallsMasonryTable tbody tr').forEach(tr=>{
    if(!tr.querySelector('.wActive')?.checked) return;
    const key = tr.dataset.wall;
    const cfg = wallMap[key];
    if(!cfg) return;
    const qty = parseFloat(tr.querySelector('.wQty')?.value || '0') || 0;
    const unit = tr.children[2]?.textContent || 'm²';
    add(cfg.label, qty, unit, rates[cfg.rate] || 0);
  });
}

function hydSystemMultiplier(){
  return val('hydSystem') === 'pp' ? (rates.hydPpMultiplier || 1.15) : 1;
}

function syncHydraulicUi(){
  const details = el('hydDetailsBox');
  if(details) details.style.display = chk('svcHyd') ? 'block' : 'none';
  const isDetailed = el('hydMode') && val('hydMode') === 'detailed';
  const quickLabel = el('hydQuickPtsLabel');
  const detailedBox = el('hydDetailedBox');
  if(quickLabel) quickLabel.style.display = isDetailed ? 'none' : 'flex';
  if(detailedBox) detailedBox.style.display = isDetailed ? 'block' : 'none';

  const mult = hydSystemMultiplier();
  if(el('hydSystemHint')) el('hydSystemHint').value = val('hydSystem') === 'pp' ? `PP zgrzewany ×${mult.toFixed(2)}` : 'PEX-AL-PEX ×1.00';

  document.querySelectorAll('#hydTable tbody tr, #hydWhiteTable tbody tr').forEach(tr=>{
    const key = tr.dataset.hyd;
    const cfg = hydraulicMap[key];
    const baseRate = cfg ? rates[cfg.rate] || 0 : 0;
    const rate = cfg?.white ? baseRate : baseRate * mult;
    const cell = tr.querySelector('.hRate');
    if(cell) cell.textContent = money(rate);
  });
}

function addHydraulicRows(add){
  if(!chk('svcHyd')) return;
  syncHydraulicUi();
  const mult = hydSystemMultiplier();
  if(!el('hydMode') || val('hydMode') === 'quick'){
    add(`Hydraulika: punkty wod-kan — szybki tryb (${val('hydSystem') === 'pp' ? 'PP' : 'PEX-AL-PEX'})`, num('hydPts'), 'szt', (rates.hydQuickPoint || rates.hyd || 0) * mult);
    return;
  }
  document.querySelectorAll('#hydTable tbody tr, #hydWhiteTable tbody tr').forEach(tr=>{
    if(!tr.querySelector('.hActive')?.checked) return;
    const key = tr.dataset.hyd;
    const cfg = hydraulicMap[key];
    if(!cfg) return;
    const qty = parseFloat(tr.querySelector('.hQty')?.value || '0') || 0;
    const unit = tr.children[2]?.textContent || 'szt';
    const rate = (rates[cfg.rate] || 0) * (cfg.white ? 1 : mult);
    add(cfg.label, qty, unit, rate);
  });
}


function wetRoomDataFromSource(sourceName){
  const rows = [...roomBody.querySelectorAll('tr')];
  const tr = rows.find(r => (r.querySelector('.rName')?.value || '') === sourceName) || rows[0];
  if(!tr) return {floor:0, walls:0, label:'pomieszczenie'};
  const name = tr.querySelector('.rName').value || 'pomieszczenie';
  const l=parseFloat(tr.querySelector('.rLen').value)||0;
  const w=parseFloat(tr.querySelector('.rWid').value)||0;
  const h=parseFloat(tr.querySelector('.rHei').value)||0;
  const o=parseFloat(tr.querySelector('.rOpen').value)||0;
  return {label:name, floor:l*w, walls:Math.max(0,2*(l+w)*h-o)};
}
function wetSourceOptions(selected=''){
  const names=[...roomBody.querySelectorAll('.rName')].map(i=>i.value || 'pomieszczenie');
  if(!names.length) names.push('pomieszczenie');
  return names.map(n=>`<option value="${n}" ${n===selected?'selected':''}>${n}</option>`).join('');
}
function refreshWetSourceSelects(){
  document.querySelectorAll('.wetSource').forEach(sel=>{
    const prev=sel.value;
    sel.innerHTML=wetSourceOptions(prev);
    if([...sel.options].some(o=>o.value===prev)) sel.value=prev;
  });
  syncWetUi();
}
function addWetRoom(data={}){
  const tbody=document.querySelector('#wetRoomsTable tbody');
  if(!tbody) return;
  const tr=document.createElement('tr');
  const type=data.type || 'bathroom';
  const source=data.source || ([...roomBody.querySelectorAll('.rName')][0]?.value || 'łazienka');
  tr.innerHTML = `
    <td><select class="wetType"><option value="bathroom">łazienka</option><option value="wc">WC</option><option value="kitchen">kuchnia</option><option value="laundry">pralnia/gosp.</option></select></td>
    <td><select class="wetSource">${wetSourceOptions(source)}</select></td>
    <td><input type="checkbox" class="wetOverride"></td>
    <td><input class="wetFloor" type="number" min="0" step="0.1" value="0"></td>
    <td><input class="wetWalls" type="number" min="0" step="0.1" value="0"></td>
    <td><input class="wetTilePct" type="number" min="0" max="100" step="1" value="100"></td>
    <td><input class="wetBacksplash" type="number" min="0" step="0.1" value="0"></td>
    <td><select class="wetTileMaterial"><option value="glazura">glazura</option><option value="gres">gres</option><option value="hard">materiał trudny</option></select></td>
    <td><select class="wetTilePattern"><option value="standard">standard</option><option value="small">mały format ≤15 cm</option><option value="brick">cegiełka</option><option value="mosaic">mozaika</option><option value="kitkat">kit-kat / lamelki</option><option value="herringbone">jodełka</option></select></td>
    <td><select class="wetEdgeMode"><option value="none">brak</option><option value="profile">listwy/profile</option><option value="miter">szlif 45°</option></select></td>
    <td><input class="wetEdgeMb" type="number" min="0" step="0.1" value="0"></td>
    <td><input type="checkbox" class="wetWallTiles" checked></td>
    <td><input type="checkbox" class="wetFloorTiles" checked></td>
    <td><input type="checkbox" class="wetPrimer" checked></td>
    <td><input type="checkbox" class="wetHydro"></td>
    <td><input type="checkbox" class="wetGrout" checked></td>
    <td><input class="wetWaterPts" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetSewerPts" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetPipeMb" type="number" min="0" step="0.1" value="0"></td>
    <td><input class="wetBruzdaMb" type="number" min="0" step="0.1" value="0"></td>
    <td><input class="wetWcFrame" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetWcCompact" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetSink" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetTap" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetCabin" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetBathtub" type="number" min="0" step="1" value="0"></td>
    <td><input class="wetAppliance" type="number" min="0" step="1" value="0"></td>
    <td><button type="button" class="secondary delWet">Usuń</button></td>`;
  tbody.appendChild(tr);
  tr.querySelector('.wetType').value=type;
  tr.querySelector('.wetSource').value=source;
  tr.querySelector('.wetTileMaterial').value=data.tileMaterial || (type==='kitchen' ? 'glazura' : 'gres');
  tr.querySelector('.wetTilePattern').value=data.tilePattern || 'standard';
  tr.querySelector('.wetEdgeMode').value=data.edgeMode || 'profile';
  tr.querySelector('.wetEdgeMb').value=data.edgeMb ?? 0;
  tr.querySelector('.wetTilePct').value=data.tilePct ?? (type==='kitchen' ? 0 : type==='wc' ? 75 : 100);
  tr.querySelector('.wetBacksplash').value=data.backsplash ?? (type==='kitchen' ? 3 : 0);
  tr.querySelector('.wetWaterPts').value=data.waterPts ?? (type==='kitchen' ? 2 : type==='wc' ? 1 : 3);
  tr.querySelector('.wetSewerPts').value=data.sewerPts ?? (type==='kitchen' ? 2 : type==='wc' ? 1 : 2);
  tr.querySelector('.wetSink').value=data.sink ?? (type==='bathroom' || type==='kitchen' ? 1 : 0);
  tr.querySelector('.wetTap').value=data.tap ?? (type==='bathroom' || type==='kitchen' ? 1 : 0);
  tr.querySelector('.wetWcFrame').value=data.wcFrame ?? (type==='bathroom' ? 1 : 0);
  tr.querySelector('.wetWcCompact').value=data.wcCompact ?? (type==='wc' ? 1 : 0);
  tr.querySelector('.wetCabin').value=data.cabin ?? (type==='bathroom' ? 1 : 0);
  tr.querySelector('.wetBathtub').value=data.bathtub ?? 0;
  tr.querySelector('.wetAppliance').value=data.appliance ?? (type==='kitchen' ? 1 : 0);
  if(type==='kitchen'){
    tr.querySelector('.wetFloorTiles').checked = false;
    tr.querySelector('.wetWallTiles').checked = true;
  }
  tr.querySelector('.wetHydro').checked = !!data.hydro;
  tr.querySelector('.delWet').addEventListener('click',()=>{tr.remove();refreshWetSourceSelects();calc();});
  tr.querySelector('.wetType').addEventListener('change',()=>{
    const t=tr.querySelector('.wetType').value;
    if(t==='kitchen') {
      tr.querySelector('.wetTilePct').value=0;
      tr.querySelector('.wetBacksplash').value=3;
      tr.querySelector('.wetWallTiles').checked = true;
      tr.querySelector('.wetFloorTiles').checked = false;
      tr.querySelector('.wetHydro').checked = false;
      if((parseFloat(tr.querySelector('.wetAppliance').value)||0)===0) tr.querySelector('.wetAppliance').value = 1;
    }
    if(t==='bathroom') {
      tr.querySelector('.wetTilePct').value=100;
      tr.querySelector('.wetWallTiles').checked = true;
      tr.querySelector('.wetFloorTiles').checked = true;
      tr.querySelector('.wetPrimer').checked = true;
      tr.querySelector('.wetGrout').checked = true;
      tr.querySelector('.wetHydro').checked = false;
      if((parseFloat(tr.querySelector('.wetCabin').value)||0)===0 && (parseFloat(tr.querySelector('.wetBathtub').value)||0)===0) tr.querySelector('.wetCabin').value = 1;
    }
    if(t==='wc') {
      tr.querySelector('.wetTilePct').value=75;
      tr.querySelector('.wetWallTiles').checked = true;
      tr.querySelector('.wetFloorTiles').checked = true;
      tr.querySelector('.wetHydro').checked = false;
    }
    syncWetUi(); calc();
  });
  tr.querySelectorAll('input,select').forEach(i=>{ i.addEventListener('input',()=>{syncWetUi();calc();}); i.addEventListener('change',()=>{syncWetUi();calc();}); });
  syncWetUi();
}
function seedWetRooms(){
  const tbody=document.querySelector('#wetRoomsTable tbody');
  if(!tbody || tbody.children.length) return;
  const roomNames=[...roomBody.querySelectorAll('.rName')].map(i=>i.value || '');
  const bathNames=roomNames.filter(n=>isBathroomName(n));
  bathNames.forEach(n=>addWetRoom({type:'bathroom',source:n}));
  const kitchen=roomNames.find(n=>n.toLowerCase().includes('kuch'));
  if(kitchen) addWetRoom({type:'kitchen',source:kitchen});
  if(!tbody.children.length) addWetRoom({type:'bathroom'});
}
function syncWetUi(){
  const box=el('wetDetailsBox');
  const repairBox=el('wetRepairDetailsBox');
  if(box) box.style.display = chk('svcWet') ? 'block' : 'none';
  if(repairBox) repairBox.style.display = chk('svcWetRepair') ? 'block' : 'none';
  if(chk('svcWet')) seedWetRooms();
  document.querySelectorAll('#wetRoomsTable tbody tr').forEach(tr=>{
    const override=tr.querySelector('.wetOverride')?.checked;
    const data=wetRoomDataFromSource(tr.querySelector('.wetSource')?.value || '');
    const floor=tr.querySelector('.wetFloor');
    const walls=tr.querySelector('.wetWalls');
    if(!override){ floor.value=data.floor.toFixed(1); walls.value=data.walls.toFixed(1); }
    floor.readOnly=!override; walls.readOnly=!override;
    floor.classList.toggle('mutedControl', !override); walls.classList.toggle('mutedControl', !override);
  });
}
function addWetRows(add, rows){
  const wetEnabled = chk('svcWet');
  const wetRepairEnabled = chk('svcWetRepair');
  if(!wetEnabled && !wetRepairEnabled) return;
  syncWetUi();
  const mult = hydSystemMultiplier();
  if(wetEnabled){
  document.querySelectorAll('#wetRoomsTable tbody tr').forEach(tr=>{
    const type=tr.querySelector('.wetType').value;
    const source=tr.querySelector('.wetSource').value || 'pomieszczenie';
    const prefix=`${type==='kitchen'?'Kuchnia':type==='wc'?'WC':type==='laundry'?'Pralnia/pom. gosp.':'Łazienka'} — ${source}`;
    const floor=parseFloat(tr.querySelector('.wetFloor').value)||0;
    const walls=parseFloat(tr.querySelector('.wetWalls').value)||0;
    const pct=(parseFloat(tr.querySelector('.wetTilePct').value)||0)/100;
    const backsplash=parseFloat(tr.querySelector('.wetBacksplash').value)||0;
    const wallTileArea = backsplash>0 ? backsplash : walls*pct;
    const floorTileArea = floor;
    const wetArea = Math.max(floorTileArea,0) + Math.max(wallTileArea,0);
    const tileMaterial = tr.querySelector('.wetTileMaterial')?.value || 'glazura';
    const materialExtra = tileMaterial==='gres' ? (rates.tileGresExtra||0) : tileMaterial==='hard' ? (rates.tileHardExtra||0) : 0;
    const materialLabel = tileMaterial==='gres' ? 'gres' : tileMaterial==='hard' ? 'materiał trudny' : 'glazura';
    const pattern = tr.querySelector('.wetTilePattern')?.value || 'standard';
    const patternExtraMap = {small: rates.tileSmallExtra||0, brick: rates.tileBrickExtra||0, mosaic: rates.tileMosaicExtra||0, kitkat: rates.tileKitkatExtra||0, herringbone: rates.tileHerringboneExtra||0};
    const patternLabelMap = {standard:'standard', small:'mały format', brick:'cegiełka', mosaic:'mozaika', kitkat:'kit-kat / lamelki', herringbone:'jodełka'};
    const patternExtra = patternExtraMap[pattern] || 0;
    const labelExtra = pattern === 'standard' ? materialLabel : `${materialLabel}, ${patternLabelMap[pattern]}`;
    const wallRate = (rates.tileWall||0) + materialExtra + patternExtra;
    const floorRate = (rates.tileFloor||0) + materialExtra + patternExtra;
    if(tr.querySelector('.wetWallTiles').checked) add(`${prefix}: płytki ścienne (${labelExtra})`, wallTileArea, 'm²', wallRate);
    if(tr.querySelector('.wetFloorTiles').checked) add(`${prefix}: płytki podłogowe (${labelExtra})`, floorTileArea, 'm²', floorRate);
    const edgeMode = tr.querySelector('.wetEdgeMode')?.value || 'none';
    const edgeMb = parseFloat(tr.querySelector('.wetEdgeMb')?.value)||0;
    if(edgeMode==='profile') add(`${prefix}: listwy / profile krawędziowe`, edgeMb, 'mb', rates.tileProfile);
    if(edgeMode==='miter') add(`${prefix}: szlifowanie krawędzi 45°`, edgeMb, 'mb', rates.tileMiter);
    if(tr.querySelector('.wetPrimer')?.checked) add(`${prefix}: gruntowanie pod płytki`, wetArea, 'm²', rates.tilePrimer);
    if(tr.querySelector('.wetHydro').checked) add(`${prefix}: hydroizolacja`, wetArea, 'm²', rates.tileHydro);
    if(tr.querySelector('.wetGrout').checked) add(`${prefix}: fugowanie / wykończenie`, wetArea, 'm²', rates.tileGrout);
    add(`${prefix}: punkt wodny`, parseFloat(tr.querySelector('.wetWaterPts').value)||0, 'szt', (rates.hydWaterPoint||0)*mult);
    add(`${prefix}: punkt kanalizacyjny`, parseFloat(tr.querySelector('.wetSewerPts').value)||0, 'szt', (rates.hydSewerPoint||0)*mult);
    add(`${prefix}: prowadzenie rur`, parseFloat(tr.querySelector('.wetPipeMb').value)||0, 'mb', (rates.hydPipeWall||0)*mult);
    add(`${prefix}: przygotowanie pod wod-kan — bruzdy pod instalację`, parseFloat(tr.querySelector('.wetBruzdaMb').value)||0, 'mb', (rates.hydBruzda||0));
    add(`${prefix}: zabudowa stelaża WC`, parseFloat(tr.querySelector('.wetWcFrame').value)||0, 'szt', rates.bathroomGkFrame);
    add(`${prefix}: montaż WC kompakt`, parseFloat(tr.querySelector('.wetWcCompact').value)||0, 'szt', rates.hydWcCompact);
    add(`${prefix}: montaż umywalki / zlewu`, parseFloat(tr.querySelector('.wetSink').value)||0, 'szt', rates.hydSink);
    add(`${prefix}: montaż baterii`, parseFloat(tr.querySelector('.wetTap').value)||0, 'szt', rates.hydTapSink);
    add(`${prefix}: montaż kabiny prysznicowej`, parseFloat(tr.querySelector('.wetCabin').value)||0, 'szt', rates.hydShowerCabin);
    add(`${prefix}: montaż wanny`, parseFloat(tr.querySelector('.wetBathtub').value)||0, 'szt', rates.hydBathtub);
    add(`${prefix}: podłączenie pralki / zmywarki`, parseFloat(tr.querySelector('.wetAppliance').value)||0, 'szt', rates.hydAppliance);
  });
  if(rows) rows.push({name:'Hydraulika, biały montaż i płytki w łazienkach/kuchniach są prezentowane razem w bloku Łazienki i kuchnie — nie dubluj ich w globalnej hydraulice.', qty:0, unit:'', rate:0, value:0, note:true});
  }
  if(wetRepairEnabled){
    add('Pomieszczenia mokre: nowe silikonowanie', num('wetSiliconeNewMb'), 'mb', rates.siliconeNew);
    add('Pomieszczenia mokre: wymiana silikonu', num('wetSiliconeReplaceMb'), 'mb', rates.siliconeReplace);
    add('Pomieszczenia mokre: poprawka punktowa silikonu', num('wetSiliconePatchQty'), 'szt', rates.siliconePatch);
  }
}

function syncMeasureUi(){
  const mode = val('measureMode');
  const manualOnly = mode === 'manual';
  const manualWalls = el('manualWalls');
  const manualCeilings = el('manualCeilings');
  if(manualWalls) manualWalls.closest('label').classList.toggle('mutedControl', !manualOnly);
  if(manualCeilings) manualCeilings.closest('label').classList.toggle('mutedControl', !manualOnly);
}

function syncDecorUi(){
  const details = el('decorDetailsBox');
  const decorEnabled = chk('svcDecor');
  const repairEnabled = chk('svcDecorRepair');
  if(details) details.style.display = (decorEnabled || repairEnabled) ? 'block' : 'none';
  const newWorkBox = el('decorNewWorkBox');
  const repairBox = el('decorRepairBox');
  setSubsectionEnabled(newWorkBox, decorEnabled);
  setSubsectionEnabled(repairBox, repairEnabled);
}
function syncWallpaperUi(){
  const details = el('wallpaperDetailsBox');
  if(details) details.style.display = chk('svcWallpaper') ? 'block' : 'none';
}
function syncHardUi(){
  const details = el('hardDetailsBox');
  if(details) details.style.display = chk('svcHard') ? 'block' : 'none';
}
function syncAtticMenuUi(){
  const isHouse = el('propertyType') && val('propertyType') === 'dom_segment';
  document.querySelectorAll('.atticMenuItem').forEach(x=>x.style.display = isHouse ? 'flex' : 'none');
  const block = el('atticServiceBlock');
  if(block) block.style.display = isHouse ? 'block' : 'none';
  if(!isHouse && el('svcAttic')) el('svcAttic').checked = false;
}
function addDecorRows(add){
  const decorEnabled = chk('svcDecor');
  const repairEnabled = chk('svcDecorRepair');
  if(!decorEnabled && !repairEnabled) return;
  if(decorEnabled){
    const ceiling = num('decorCeilingMb');
    const wall = num('decorWallMb');
    const led = num('decorLedMb');
    add('Dekoracje: listwy przysufitowe', ceiling, 'mb', rates.decorCeiling);
    add('Dekoracje: listwy ścienne dekoracyjne', wall, 'mb', rates.decorWall);
    add('Dekoracje: maskownice LED', led, 'mb', rates.decorLedMask);
    add('Dekoracje: narożniki / zakończenia', num('decorCornersQty'), 'szt', rates.decorCorner);
    if(chk('decorPaint')) add('Dekoracje: malowanie listew', ceiling + wall + led, 'mb', rates.decorPaint);
  }
  if(repairEnabled){
    const decorMul = trimSizeMultiplier(val('decorProfileSize'));
    add('Sztukateria: zabezpieczenie / oklejanie do malowania', num('decorProtectionMb'), 'mb', rates.decorProtection);
    addWithMultiplier(add, 'Sztukateria: renowacja łączeń', num('decorJointRepairQty'), 'szt', rates.decorJointRepair, decorMul);
    addWithMultiplier(add, 'Sztukateria: wygubienie uskoku / przejścia', num('decorStepRepairQty'), 'szt', rates.decorStepRepair, decorMul);
    add('Sztukateria: poprawa starego akrylu / pęknięć', num('decorAcrylicRepairMb'), 'mb', rates.decorAcrylicRepair);
    addWithMultiplier(add, 'Sztukateria: malowanie po renowacji', num('decorRepairPaintMb'), 'mb', rates.decorRepairPaint, decorMul);
  }
}
function addWallpaperRows(add){
  if(!chk('svcWallpaper')) return;
  add('Tapetowanie: standard', num('wallpaperStandardM2'), 'm²', rates.wallpaperStandard);
  add('Tapetowanie: premium / wzór', num('wallpaperPremiumM2'), 'm²', rates.wallpaperPremium);
  add('Tapetowanie: usunięcie starej tapety', num('wallpaperRemoveM2'), 'm²', rates.wallpaperRemove);
  add('Tapetowanie: grunt pod tapetę', num('wallpaperPrimerM2'), 'm²', rates.wallpaperPrimer);
  add('Tapetowanie: zabezpieczenie / oklejenie tapety', num('wallpaperProtectionM2'), 'm²', rates.wallpaperProtection);
}
function addHardRows(rows, addFixed, baseNet){
  if(!chk('svcHard')) return 0;
  let pct = 0;
  if(chk('hardStairs')) pct += rates.hardStairsPct || 0;
  pct += num('hardHeightPct') / 100;
  pct += num('hardVerticalTransportPct') / 100;
  const percentValue = baseNet * pct;
  if(percentValue){
    addFixed('Prace trudne: dopłata globalna (' + (pct*100).toFixed(1) + '%)', percentValue);
  }
  addFixed('Prace trudne: rusztowanie', num('hardScaffoldDays') * (rates.hardScaffoldDay || 0));
  addFixed('Prace trudne: zabezpieczenia', num('hardProtectionMb') * (rates.hardProtectionMb || 0));
  return percentValue;
}
function calc(){
  syncDemoUi();
  syncMeasureUi();
  syncAtticUi();
  syncElectricUi();
  syncHydraulicUi();
  syncWetUi();
  syncPaintUi();
  syncFloorUi();
  syncSubfloorUi();
  syncDecorUi();
  syncWallpaperUi();
  syncHardUi();
  syncAtticMenuUi();
  syncWallsUi();
  if(val('paintVariant')==='C') el('svcSmooth').checked=true;
  syncSmoothUi();
  const st=parseFloat(val('standard')) || 1;
  const vat=parseFloat(val('vatRate')) || 0.08;
  const m=measurement();
  const paintArea=m.walls+m.ceilings;
  let rows=[], net=0;
  function add(name, qty, unit, rate, applyStandard=true){
    if(!qty || !rate) return;
    const effectiveRate = applyStandard ? rate*st : rate;
    const value=qty*effectiveRate; net+=value; rows.push({name, qty, unit, rate:effectiveRate, value, ...inferSummaryMeta(name)});
  }
  function addFixed(name, value){
    if(!value) return;
    net+=value; rows.push({name, qty:1, unit:'kpl', rate:value, value, ...inferSummaryMeta(name)});
  }
  if(chk('svcPaint')){
    add('Przygotowanie ścian pod gładź / malowanie (zdzieranie, szlifowanie)', paintArea, 'm²', prepExtraRate());
    if(val('measureMode') === 'rooms' && Array.isArray(m.paintRows)){
      m.paintRows.forEach(r=>add(r.name, r.qty, r.unit, r.rate));
    } else {
      add(`Malowanie ścian 2x — ${wallColorLabel(val('paintColor'))}, ${paintTypeLabel(val('paintType'))}`, m.walls, 'm²', paintRateFor(val('paintColor'), val('paintType'), false));
      add('Malowanie sufitów — biały', m.ceilings, 'm²', rates.paintCeiling);
    }
  }
  if(chk('svcPrimer')) add('Gruntowanie', paintArea, 'm²', rates.primer);
  if(chk('svcSmooth')) add('Gładź', m.walls, 'm²', rates.smooth);
  if(chk('svcMask')){
    add('Zabezpieczenie pełne pomieszczenia', num('paintProtectFullM2'), 'm²', rates.paintProtectFull);
    add('Zabezpieczenie podłogi', num('paintProtectFloorM2'), 'm²', rates.paintProtectFloor);
    add('Zabezpieczenie parkietu wzmocnione', num('paintProtectParkietM2'), 'm²', rates.paintProtectParkiet);
    add('Zabezpieczenie okien', num('paintProtectWindowQty'), 'szt', rates.paintProtectWindow);
    add('Zabezpieczenie drzwi', num('paintProtectDoorQty'), 'szt', rates.paintProtectDoor);
    add('Zabezpieczenie klatki schodowej / windy', num('paintProtectStairLiftKpl'), 'kpl', rates.paintProtectStairLift);
  }
  if(chk('svcPaintRepair')){
    const lightMult = paintRepairLightMultiplier();
    add('Serwis malarski: naprawa punktowa sufitu', num('paintCeilingPatchQty'), 'szt', (rates.paintCeilingPatch || 0) * lightMult);
    add('Serwis malarski: zaprawka malarska do ok. 0,25 m²', num('paintTouchupQty'), 'szt', (rates.paintTouchup || 0) * lightMult);
    add('Serwis malarski: zaprawka rozszerzona', num('paintTouchupExtendedQty'), 'szt', (rates.paintTouchupExtended || 0) * lightMult);
  }
  addElectricRows(add);
  addWetRows(add, rows);
  if(!chk('svcWet')) addHydraulicRows(add);
  if(chk('svcDemo')){
    const d = demoDetails();
    d.detailRows.forEach(r=>add(r.name, r.qty, r.unit, r.rate));
    addFixed('Wynoszenie gruzu — dopłata piętro/winda', d.carrySurcharge * st);
    addFixed('Wynoszenie gruzu — roboczogodziny', d.carryManual);
    addFixed('Wywóz / kontener / Big-Bag', d.waste);
    rows.push({name:`Szacowany gruz: ${d.rubble.toFixed(2)} m³`, qty:0, unit:'', rate:0, value:0, note:true});
  }
  addSubfloorRows(add);
  addFloorRows(add);
  addDecorRows(add);
  addWallpaperRows(add);
  addRevealsRows(add);
  addFurnitureRows(add);
  addWallRows(add);
  addAtticRows(add);
  const netBeforeHard = net;
  addHardRows(rows, addFixed, netBeforeHard);

  const riskPct=num('riskBuffer');
  const risk=net*riskPct;
  const bufferMode = el('bufferMode') ? val('bufferMode') : 'standard';

  let mat=0;
  if(val('materialsMode')!=='client') mat=num('materialsGross')*(1+num('materialsMargin'))+num('shoppingFee');
  let deleg=0;
  if(val('outsideWarsaw')==='yes') deleg = num('delegDays')*num('delegDaily') + num('kmOneWay')*2*num('kmRate') + num('delegDays')*num('hotel');

  const baseLaborVat=net*vat;
  const baseLaborGross=net+baseLaborVat;
  const baseTotal=baseLaborGross+mat+deleg;

  const reserveVat=risk*vat;
  const reserveGross=risk+reserveVat;
  const maxTotal=baseTotal+reserveGross;

  const laborNet=net+risk;
  const laborVat=laborNet*vat;
  const laborGross=laborNet+laborVat;
  const total=laborGross+mat+deleg;

  const list = renderGroupedSummary(rows);
  let summaryTotals = '';
  if(bufferMode === 'transparent'){
    summaryTotals = `
      <div class="summaryGroupTitle">Cena podstawowa</div>
      <div class="summaryRow"><span>Koszt bazowy robocizny netto</span><b>${money(net)}</b></div>
      <div class="summaryRow"><span>VAT robocizna od ceny podstawowej</span><b>${money(baseLaborVat)}</b></div>
      <div class="summaryRow"><span>Materiały / zakupy</span><b>${money(mat)}</b></div>
      <div class="summaryRow"><span>Delegacja / dojazdy</span><b>${money(deleg)}</b></div>
      <div class="summaryRow total"><span>CENA PODSTAWOWA</span><b>${money(baseTotal)}</b></div>
      <div class="summaryGroupTitle">Rezerwa na prace dodatkowe</div>
      <div class="summaryRow"><span>Rezerwa warunkowa netto (${(riskPct*100).toFixed(0)}%)</span><b>${money(risk)}</b></div>
      <div class="summaryRow"><span>VAT od rezerwy</span><b>${money(reserveVat)}</b></div>
      <div class="summaryRow"><span>Maksymalna rezerwa brutto</span><b>${money(reserveGross)}</b></div>
      <div class="summaryRow total"><span>CENA MAKSYMALNA Z REZERWĄ</span><b>${money(maxTotal)}</b></div>
      <p class="info">Rezerwa jest rozliczana po zakończeniu prac. Jeśli nie wystąpią nieprzewidziane prace wynikające ze stanu technicznego, kwota rezerwy nie jest naliczana.</p>`;
  } else {
    summaryTotals = `
      <div class="summaryRow"><span>Bufor ryzyka</span><b>${money(risk)}</b></div>
      <div class="summaryRow"><span>Robocizna netto po buforze</span><b>${money(laborNet)}</b></div>
      <div class="summaryRow"><span>VAT robocizna</span><b>${money(laborVat)}</b></div>
      <div class="summaryRow"><span>Robocizna brutto</span><b>${money(laborGross)}</b></div>
      <div class="summaryRow"><span>Materiały / zakupy</span><b>${money(mat)}</b></div>
      <div class="summaryRow"><span>Delegacja / dojazdy</span><b>${money(deleg)}</b></div>
      <div class="summaryRow total"><span>Suma orientacyjna</span><b>${money(total)}</b></div>`;
  }

  el('summary').innerHTML = `
    <div class="info">Obmiar aktywny: ściany ${m.walls.toFixed(1)} m², sufity ${m.ceilings.toFixed(1)} m², razem ${paintArea.toFixed(1)} m². ${val('measureMode') === 'rooms' ? 'Malowanie liczone per pomieszczenie.' : 'Użyto domyślnych ustawień malowania.'}</div>
    ${list || '<p>Brak aktywnych pozycji.</p>'}
    ${renderWorkTimeSummary(rows)}
    ${summaryTotals}
    <p class="warn">Uwaga: ceny są startowe. VAT 8%/23% wymaga weryfikacji dla konkretnego zakresu i nieruchomości.</p>`;
}

function renderRates(){
  const body = document.querySelector('#ratesTable tbody'); body.innerHTML='';
  Object.keys(rateLabels).forEach(k=>{
    const [label,unit]=rateLabels[k];
    const step = k.includes('Pct') || k.includes('M3') ? '0.01' : '1';
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${label}</td><td><input data-rate="${k}" type="number" min="0" step="${step}" value="${rates[k]}"></td><td>${unit}</td>`;
    body.appendChild(tr);
  });
}
function saveRates(){
  document.querySelectorAll('[data-rate]').forEach(i=> rates[i.dataset.rate] = parseFloat(i.value)||0);
  localStorage.setItem('rates_v135', JSON.stringify(rates));
  calc();
}
function bindAll(){
  const autoProjectFields = new Set(['area','height','roomsCount','bathroomsCount','kitchenType','propertyType']);
  document.querySelectorAll('input,select').forEach(x=>{
    if(autoProjectFields.has(x.id)){
      x.addEventListener('input',autoUpdateRoomsFromProject);
      x.addEventListener('change',autoUpdateRoomsFromProject);
    } else {
      x.addEventListener('input',()=>{updateLivingHint();updateDelegationVisibility();calc();});
      x.addEventListener('change',()=>{updateLivingHint();updateDelegationVisibility();calc();});
    }
  });
  document.querySelectorAll('.tabBtn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tabBtn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tabPanel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active'); el(btn.dataset.tab).classList.add('active');
  }));
  el('addRoomBtn').addEventListener('click',()=>{addRoom({name:'pomieszczenie'});refreshWetSourceSelects();refreshFloorSourceSelects();refreshSubfloorSourceSelects();});
  if(el('svcPaint')) el('svcPaint').addEventListener('change',()=>{
    if(el('svcPaint').checked){
      if(el('svcPrimer')) el('svcPrimer').checked = true;
      if(el('svcMask')) el('svcMask').checked = true;
    }
    if(typeof syncPaintUi === 'function') syncPaintUi();
    calc();
  });
  if(el('svcPaintRepair')) el('svcPaintRepair').addEventListener('change',()=>{ if(typeof syncPaintUi === 'function') syncPaintUi(); calc(); });
  if(el('addWetRoomBtn')) el('addWetRoomBtn').addEventListener('click',()=>addWetRoom({type:'bathroom'}));
  if(el('addFloorRoomBtn')) el('addFloorRoomBtn').addEventListener('click',()=>addFloorRoom({}));
  if(el('addSubfloorRoomBtn')) el('addSubfloorRoomBtn').addEventListener('click',()=>addSubfloorRoom({}));
  ['floorQuickArea','floorQuickSkirtingMb','subfloorQuickArea'].forEach(id=>{
    if(el(id)) el(id).addEventListener('input',()=>{ el(id).dataset.manual='1'; });
  });
  el('calcBtn').addEventListener('click',calc);
  el('saveRatesBtn').addEventListener('click',saveRates);
  el('defaultRatesBtn').addEventListener('click',()=>{rates={...defaultRates};localStorage.setItem('rates_v135',JSON.stringify(rates));renderRates();calc();});
  el('resetBtn').addEventListener('click',()=>{localStorage.clear(); location.reload();});
}

renderRates(); bindAll(); updateLivingHint(); seedRooms(); updateDelegationVisibility(); calc();


// v1.1.7.8 — preset posadzek: szybka wycena = całość z obmiaru + grunt + samopoziom grubszy
(function(){
  const moduleStateMap = [
    {masterId:'roomsTable', locked:true},
    {masterId:'svcPaint', sync:()=>{ if(typeof syncPaintUi==='function') syncPaintUi(); }},
    {masterId:'svcPaintRepair', sync:()=>{ if(typeof syncPaintUi==='function') syncPaintUi(); }},
    {masterId:'svcDemo', sync:()=>{}},
    {masterId:'svcElec', sync:()=>{}},
    {masterId:'svcHyd', sync:()=>{}},
    {masterId:'svcWet', sync:()=>{ if(typeof syncWetUi==='function') syncWetUi(); }},
    {masterId:'svcWetRepair', sync:()=>{ if(typeof syncWetUi==='function') syncWetUi(); }},
    {masterId:'svcWalls', sync:()=>{}},
    {masterId:'svcFloor', sync:()=>{ if(typeof syncFloorUi==='function') syncFloorUi(); }},
    {masterId:'svcFloorRepair', sync:()=>{ if(typeof syncFloorUi==='function') syncFloorUi(); }},
    {masterId:'svcSubfloor', sync:()=>{ if(typeof syncSubfloorUi==='function') syncSubfloorUi(); }},
    {masterId:'svcDecor', sync:()=>{ if(typeof syncDecorUi==='function') syncDecorUi(); }},
    {masterId:'svcDecorRepair', sync:()=>{ if(typeof syncDecorUi==='function') syncDecorUi(); }},
    {masterId:'svcWallpaper', sync:()=>{ if(typeof syncWallpaperUi==='function') syncWallpaperUi(); }},
    {masterId:'svcFurniture', sync:()=>{ if(typeof syncFurnitureUi==='function') syncFurnitureUi(); }},
    {masterId:'svcHard', sync:()=>{ if(typeof syncHardUi==='function') syncHardUi(); }},
    {masterId:'svcAttic', sync:()=>{ if(typeof syncAtticUi==='function') syncAtticUi(); }}
  ];

  function getMaster(id){ return document.getElementById(id); }

  function setMenuMirror(masterId, checked){
    const item = document.querySelector(`.moduleItem[data-master-id="${masterId}"]`);
    if(!item) return;
    const mark = item.querySelector('.moduleCheck');
    if(!mark) return;
    mark.classList.toggle('on', !!checked);
    mark.textContent = checked ? '✓' : '';
  }

  function refreshModuleMirrors(){
    moduleStateMap.forEach(cfg=>{
      const master = getMaster(cfg.masterId);
      setMenuMirror(cfg.masterId, cfg.locked ? true : !!master?.checked);
    });
    setMenuMirror('svcPaint', !!getMaster('svcPaint')?.checked || !!getMaster('svcPaintRepair')?.checked);
    setMenuMirror('svcWet', !!getMaster('svcWet')?.checked || !!getMaster('svcWetRepair')?.checked);
    setMenuMirror('svcFloor', !!getMaster('svcFloor')?.checked || !!getMaster('svcFloorRepair')?.checked);
    setMenuMirror('svcDecor', !!getMaster('svcDecor')?.checked || !!getMaster('svcDecorRepair')?.checked);
  }

  function runModuleSync(masterId){
    const cfg = moduleStateMap.find(x=>x.masterId===masterId);
    if(cfg?.sync) cfg.sync();
    refreshModuleMirrors();
    if(typeof calc==='function') calc();
  }

  function goTo(id){
    const target=document.getElementById(id) || document.querySelector('[name="'+id+'"]');
    if(!target) return;
    const panel=target.closest('.tabPanel');
    if(panel && getComputedStyle(panel).overflowY !== 'visible'){
      const offset=target.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop - 12;
      panel.scrollTo({top:Math.max(0,offset),behavior:'smooth'});
    } else {
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }

  moduleStateMap.forEach(cfg=>{
    const master = getMaster(cfg.masterId);
    if(!master || master.tagName.toLowerCase() !== 'input') return;
    master.addEventListener('change',()=>runModuleSync(cfg.masterId));
    master.addEventListener('input',()=>runModuleSync(cfg.masterId));
  });

  document.querySelectorAll('[data-scroll-target]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.moduleItem').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      goTo(btn.getAttribute('data-scroll-target'));
      refreshModuleMirrors();
    });
  });

  document.querySelectorAll('[data-tab-target]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const tab=btn.getAttribute('data-tab-target');
      document.querySelectorAll('.tabBtn').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
      document.querySelectorAll('.tabPanel').forEach(p=>p.classList.toggle('active',p.id===tab));
      setTimeout(()=>{ const panel=document.getElementById(tab); if(panel) panel.scrollTo({top:0,behavior:'smooth'}); },0);
    });
  });

  if(typeof syncFloorUi==='function') syncFloorUi();
  if(typeof syncSubfloorUi==='function') syncSubfloorUi();
  if(typeof syncDecorUi==='function') syncDecorUi();
  if(typeof syncWallpaperUi==='function') syncWallpaperUi();
  if(typeof syncFurnitureUi==='function') syncFurnitureUi();
  if(typeof syncHardUi==='function') syncHardUi();
  if(typeof syncAtticMenuUi==='function') syncAtticMenuUi();
  if(typeof syncWetUi==='function') syncWetUi();
  refreshModuleMirrors();
})();


// v1.4.0 - cennik sprzedażowy Warszawa i okolice + czas robocizny
(function(){
  function safeEl(id){ return document.getElementById(id); }
  function seedDecorDefaults(){
    const master = safeEl('svcDecor');
    if(!master || !master.checked) return;
    const ceiling = safeEl('decorCeilingMb');
    const paint = safeEl('decorPaint');
    const total = (typeof totalFloorMeasurement === 'function') ? totalFloorMeasurement() : {perimeter:0};
    const perimeter = Math.max(0, Number(total.perimeter || 0));
    if(ceiling && (!ceiling.value || Number(ceiling.value) === 0)) ceiling.value = perimeter.toFixed(1);
    if(paint) paint.checked = true;
  }
  const master = safeEl('svcDecor');
  if(master){
    master.addEventListener('change', () => {
      if(master.checked) seedDecorDefaults();
      if(typeof syncDecorUi === 'function') syncDecorUi();
      if(typeof calc === 'function') calc();
    });
  }
})();

// v1.4.0 - funkcje operacyjne: Zapisz / Wczytaj / Generuj ofertę PDF PRO
(function(){
  const PROJECT_SCHEMA_VERSION = '1.9.0';
  const safeId = (id) => document.getElementById(id);
  const getControls = () => Array.from(document.querySelectorAll('input, select, textarea')).filter(c => c.type !== 'file' && !c.dataset.rate);

  function escapeHtml(text){ return String(text || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function sanitizeFilePart(value, fallback='projekt'){
    return String(value || fallback)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || fallback;
  }
  function clientShortName(value){
    const raw = String(value || '').trim();
    if(!raw) return 'klient';
    const parts = raw.split(/\s+/).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : 'klient';
  }
  function buildProjectFileName(data){
    const offer = sanitizeFilePart((data && data.offerNumber) || (safeId('offerNumber') ? safeId('offerNumber').value : ''), 'oferta');
    const client = sanitizeFilePart(clientShortName((data && data.clientName) || (safeId('clientName') ? safeId('clientName').value : '') || (data && data.projectName)), 'klient');
    return `${offer}_${client}.json`;
  }
  function slugifyFileName(value){
    const base = sanitizeFilePart(value || 'projekt_remontu', 'projekt_remontu');
    return `${base}_${new Date().toISOString().slice(0,10)}.json`;
  }
  function offerPrefix(){
    const d = new Date();
    return `REM/${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}`;
  }
  function nextOfferNumber(){
    const prefix = offerPrefix();
    const key = 'offer_counter_' + prefix;
    const current = parseInt(localStorage.getItem(key) || '0', 10) || 0;
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return `${prefix}/${String(next).padStart(3,'0')}`;
  }
  function previewOfferNumber(){
    const prefix = offerPrefix();
    const key = 'offer_counter_' + prefix;
    const next = (parseInt(localStorage.getItem(key) || '0', 10) || 0) + 1;
    return `${prefix}/${String(next).padStart(3,'0')}`;
  }
  function ensureOfferNumber(commit){
    const field = safeId('offerNumber');
    if(!field) return '';
    if(!field.value || /^REM\/\d{4}\/\d{2}\/001$/.test(field.value)){
      field.value = commit ? nextOfferNumber() : previewOfferNumber();
    }
    return field.value;
  }
  function getControlKey(control, index){
    if(control.id) return `id:${control.id}`;
    const row = control.closest('tr');
    if(row){
      const table = control.closest('table');
      const tableId = table && table.id ? table.id : 'table';
      const rowIndex = Array.from(row.parentElement.children).indexOf(row);
      const cellIndex = Array.from(row.children).findIndex(td => td.contains(control));
      const classKey = Array.from(control.classList || []).join('.') || control.tagName.toLowerCase();
      return `table:${tableId}:row:${rowIndex}:cell:${cellIndex}:class:${classKey}`;
    }
    return `index:${index}`;
  }
  function collectProjectState(){
    if(typeof calc === 'function') calc();
    const values = getControls().map((c, index) => ({
      key: getControlKey(c, index), tag: c.tagName.toLowerCase(), type: c.type || '',
      value: c.type === 'checkbox' ? !!c.checked : c.value, dataset: {...(c.dataset || {})}
    }));
    return {app:'kalkulator_remonty', version:PROJECT_SCHEMA_VERSION, savedAt:new Date().toISOString(), projectName:safeId('projectName') ? safeId('projectName').value : '', clientName:safeId('clientName') ? safeId('clientName').value : '', offerNumber:safeId('offerNumber') ? safeId('offerNumber').value : '', values, rates:{...rates}, summaryHtml:safeId('summary') ? safeId('summary').innerHTML : ''};
  }
  function findControlByKey(key, fallbackIndex){
    if(key && key.startsWith('id:')) return safeId(key.slice(3));
    if(key && key.startsWith('table:')){
      const parts = key.split(':'); const tableId = parts[1]; const rowIndex = Number(parts[3]); const cellIndex = Number(parts[5]); const classSpec = (parts[7] || '').split('.').filter(Boolean);
      const table = safeId(tableId); const row = table && table.tBodies[0] ? table.tBodies[0].children[rowIndex] : null; const cell = row ? row.children[cellIndex] : null;
      if(cell){
        const candidates = Array.from(cell.querySelectorAll('input,select,textarea'));
        if(classSpec.length){ const byClass = candidates.find(c => classSpec.every(cls => c.classList.contains(cls))); if(byClass) return byClass; }
        if(candidates[0]) return candidates[0];
      }
    }
    return getControls()[fallbackIndex] || null;
  }
  function applyProjectState(project){
    if(!project || !Array.isArray(project.values)) throw new Error('Nieprawidłowy format pliku projektu.');
    if(project.rates && typeof project.rates === 'object'){
      rates = {...rates, ...project.rates}; localStorage.setItem('rates_v135', JSON.stringify(rates)); if(typeof renderRates === 'function') renderRates();
    }
    project.values.forEach((item, index) => {
      const c = findControlByKey(item.key, index); if(!c) return;
      if(c.type === 'checkbox') c.checked = !!item.value; else c.value = item.value;
      if(item.dataset && typeof item.dataset === 'object') Object.keys(item.dataset).forEach(k => { c.dataset[k] = item.dataset[k]; });
      c.dispatchEvent(new Event('input', {bubbles:true})); c.dispatchEvent(new Event('change', {bubbles:true}));
    });
    if(typeof updateLivingHint === 'function') updateLivingHint(); if(typeof updateDelegationVisibility === 'function') updateDelegationVisibility(); if(typeof syncAtticMenuUi === 'function') syncAtticMenuUi(); if(typeof calc === 'function') calc();
  }
  function saveProjectToFile(){
    const data = collectProjectState(); const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json;charset=utf-8'}); const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = buildProjectFileName(data); document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  function loadProjectFromFile(file){
    const reader = new FileReader(); reader.onload = () => { try{ applyProjectState(JSON.parse(reader.result)); alert('Projekt wczytany poprawnie.'); } catch(err){ alert('Nie udało się wczytać projektu: ' + (err && err.message ? err.message : err)); } }; reader.readAsText(file, 'utf-8');
  }
  function ensurePrintRoot(){
    let root = safeId('printRoot');
    if(!root){
      root = document.createElement('section');
      root.id = 'printRoot';
      root.setAttribute('aria-hidden', 'true');
      document.body.appendChild(root);
    }
    return root;
  }
  function setPrintDocumentTitle(prefix, offerNumber, clientName){
    const originalTitle = document.title;
    const offer = sanitizeFilePart(offerNumber || 'REM', 'REM').toUpperCase();
    const client = sanitizeFilePart(clientShortName(clientName), 'klient');
    document.title = `${prefix}_${offer}_${client}`;
    const restore = () => { document.title = originalTitle; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
  }
  function offerLine(label, value){ return value ? `<div><b>${escapeHtml(label)}:</b> ${escapeHtml(value)}</div>` : ''; }
  function storeLeadHistory(payload){
    try{
      const key = 'lead_history_v140';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      list.unshift(payload);
      localStorage.setItem(key, JSON.stringify(list.slice(0,100)));
    }catch(e){}
  }

  function scopeItem(title, body, details){
    const paragraphs = Array.isArray(body) ? body : [body];
    const pHtml = paragraphs.filter(Boolean).map(txt => `<p>${escapeHtml(txt)}</p>`).join('');
    const detailHtml = details && details.length ? `<ul>${details.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : '';
    return `<article class="scopeItem"><h3>${escapeHtml(title)}</h3>${pHtml}${detailHtml}</article>`;
  }
  function isOn(id){ const c = safeId(id); return !!(c && c.checked); }
  function anyValue(ids){ return ids.some(id => { const c = safeId(id); return c && ((c.type === 'checkbox' && c.checked) || (c.value && Number(String(c.value).replace(',','.')) > 0)); }); }
  function buildPdfScopeDescriptions(){
    const items = [];
    items.push(scopeItem('Zakres oferty', [
      'Oferta obejmuje robociznę wynikającą z pozycji zaznaczonych w kosztorysie. Materiały, zakupy inwestorskie oraz prace ukryte nie są ujęte, jeżeli nie wskazano ich osobno.',
      'Zakres końcowy wymaga potwierdzenia po oględzinach. Pozycje serwisowe i renowacyjne są rozliczane zgodnie z ilościami wskazanymi w kosztorysie.'
    ], [
      'kosztorys dotyczy robocizny',
      'materiały po stronie klienta, o ile nie wskazano inaczej',
      'prace ukryte i dodatkowe wymagają osobnego potwierdzenia'
    ]));

    if(isOn('svcMask')){
      items.push(scopeItem('Prace przygotowawcze — zabezpieczenia', [
        'Zabezpieczenie obejmuje robociznę przygotowania pola pracy: osłonięcie elementów stałych, powierzchni narażonych na zabrudzenie oraz podstawowe oklejanie przed pracami remontowymi, instalacyjnymi, tynkarskimi, gładziami, malowaniem lub innymi pracami wykończeniowymi.'
      ], [
        'zabezpieczenie dotyczy zakresu wynikającego z obmiaru',
        'materiały zabezpieczające mogą być rozliczane osobno, jeśli nie ustalono inaczej',
        'przy pracach serwisowych zakres zabezpieczeń jest dobierany do miejsca naprawy'
      ]));
    }
    if(isOn('svcSmooth')){
      items.push(scopeItem('Gładzie — przygotowanie powierzchni pod malowanie', [
        'Wykonanie gładzi obejmuje robociznę nałożenia warstwy wyrównującej, szlifowanie i przygotowanie powierzchni pod malowanie zgodnie z zakresem w kosztorysie.',
        'Standardowa gładź nie obejmuje dużych napraw konstrukcyjnych, usuwania starych odspojeń ani korekt bardzo krzywych ścian, jeśli takie prace nie zostały wskazane osobno.'
      ], [
        'gładź liczona z obmiaru powierzchni',
        'szlifowanie i przygotowanie pod malowanie w zakresie pozycji',
        'ukryte odspojenia i uszkodzenia podłoża mogą zmienić zakres'
      ]));
    }
    if(isOn('svcPrimer')){
      items.push(scopeItem('Gruntowanie', [
        'Gruntowanie obejmuje robociznę miejscowego lub całościowego przygotowania chłonności podłoża pod kolejne warstwy, w szczególności pod gładź, malowanie lub inne wykończenie powierzchni.'
      ], [
        'materiał gruntujący nie jest ujęty, jeśli nie wskazano inaczej',
        'zakres gruntowania wynika z aktywnych pozycji i obmiaru',
        'podłoża bardzo chłonne lub pylące mogą wymagać dodatkowego przygotowania'
      ]));
    }
    if(isOn('svcPaint')){
      items.push(scopeItem('Malowanie — nowe prace', [
        'Malowanie obejmuje robociznę wykonania powłoki malarskiej na ścianach i/lub sufitach zgodnie z wybranym zakresem. Standardowo kalkulacja zakłada pracę na zadeklarowanym obmiarze i wybranych parametrach koloru oraz rodzaju farby.',
        'Efekt końcowy zależy od jakości podłoża, wcześniejszych powłok, chłonności, światła oraz przygotowania powierzchni.'
      ], [
        'malowanie ścian i sufitów liczone według aktywnego obmiaru',
        'kolory ciemne, lateksowe lub ceramiczne mogą zwiększać pracochłonność',
        'prace przygotowawcze i gruntowanie są ujmowane jako osobne pozycje, jeśli są zaznaczone'
      ]));
    }
    if(isOn('svcPaintRepair')){
      items.push(scopeItem('Malowanie — serwis / zaprawki', [
        'Zaprawki lokalne mają charakter serwisowy i dotyczą małych napraw po przewodach, punktach oświetleniowych, odpryskach lub ubytkach. Obejmują lokalne szpachlowanie, szlifowanie, miejscowe przygotowanie oraz malowanie naprawcze zgodnie z wybraną pozycją.',
        'Ze względu na starzenie farby, strukturę wałka, światło, chłonność powierzchni oraz różnice połysku miejsce naprawy może pozostać częściowo widoczne pod określonym kątem lub przy mocnym oświetleniu.'
      ], [
        'materiał jest domyślnie po stronie klienta',
        'zaprawka punktowa nie gwarantuje pełnego zlania się ze starą powłoką',
        'przy wysokich wymaganiach wizualnych może być konieczne malowanie większego fragmentu lub całego sufitu/ściany'
      ]));
    }
    if(isOn('svcDemo')){
      items.push(scopeItem('Demontaże / rozbiórki / wywóz', [
        'Prace demontażowe obejmują skuwanie, zrywanie lub usuwanie istniejących warstw zgodnie z wybranymi pozycjami. Logistyka gruzu i wynoszenie są traktowane jako osobna część kosztu, ponieważ zależą od piętra, windy, odległości i sposobu wywozu.'
      ], [
        'zakres demontażu wymaga potwierdzenia po oględzinach',
        'ukryte warstwy i większa ilość gruzu mogą zwiększyć koszt',
        'kontener, big-bag i transport odpadów mogą wymagać osobnego rozliczenia'
      ]));
    }
    if(isOn('svcSubfloor')){
      items.push(scopeItem('Posadzki / przygotowanie podłoża', [
        'Przygotowanie podłoża obejmuje prace takie jak gruntowanie, warstwy samopoziomujące lub korekty podłogi przed montażem docelowej okładziny. Zakres dobierany jest do stanu istniejącej posadzki i oczekiwanej technologii dalszych prac.'
      ], [
        'samopoziomowanie nie zastępuje napraw konstrukcyjnych podłoża',
        'grubość i zużycie materiału wymagają oceny na miejscu',
        'czas schnięcia jest zależny od materiału i warunków w lokalu'
      ]));
    }
    if(isOn('svcWalls')){
      items.push(scopeItem('Ściany / zabudowy GK i murowane', [
        'Zabudowy obejmują wykonanie elementów GK lub murowanych zgodnie z wybraną technologią. Pozycje dotyczą robocizny, a materiały konstrukcyjne, płyty, profile, łączniki lub zaprawy są rozliczane osobno, jeśli nie wskazano inaczej.'
      ], [
        'otwory, wnęki i niestandardowe kształty zwiększają pracochłonność',
        'łączenia, spoinowanie i przygotowanie pod malowanie powinny być wskazane w kosztorysie',
        'kolizje instalacyjne mogą wymagać korekty zakresu'
      ]));
    }
    if(isOn('svcWet')){
      items.push(scopeItem('Pomieszczenia mokre — glazura / hydroizolacja', [
        'Zakres pomieszczeń mokrych obejmuje prace glazurnicze i przygotowawcze wskazane w kosztorysie, w tym hydroizolację, gruntowanie, układanie płytek, fugowanie i elementy dodatkowe, jeżeli zostały zaznaczone.',
        'W łazienkach i kuchniach zakres wymaga szczególnej kontroli podłoża, spadków, narożników, stref mokrych i kolizji z hydrauliką.'
      ], [
        'materiały, płytki, kleje, fugi i hydroizolacje nie są ujęte, jeśli nie wskazano inaczej',
        'płytki trudne, gres, docinki i szlify mogą zwiększać koszt',
        'ostateczny zakres wymaga oględzin podłoża'
      ]));
    }
    if(isOn('svcWetRepair')){
      items.push(scopeItem('Pomieszczenia mokre — silikony / uszczelnienia', [
        'Nowe silikonowanie obejmuje wykonanie nowej spoiny w miejscach takich jak umywalki, blaty, wanny, brodziki, kabiny lub styki ścian i wyposażenia. Wymiana silikonu obejmuje wycięcie starego silikonu, oczyszczenie, użycie removera i wykonanie nowej spoiny.',
        'Oklejanie i przygotowanie krawędzi jest elementem technologii wykonawcy i jest wliczone w operację — niezależnie od tego, czy spoina jest wykonywana z taśmą, czy bez.'
      ], [
        'nowe silikonowanie liczone w metrach bieżących',
        'wymiana silikonu liczona w metrach bieżących jako operacja pełna',
        'poprawki punktowe liczone w sztukach',
        'kolor i struktura nowej spoiny mogą różnić się od starych elementów'
      ]));
    }
    if(isOn('svcFloor')){
      items.push(scopeItem('Podłogi i nowe listwy przypodłogowe', [
        'Nowe prace podłogowe obejmują montaż wybranej okładziny, podkładów, progów i listew zgodnie z zakresem kosztorysu. Nowy montaż listew powinien zawierać standardowe spasowanie i prawidłowe wykończenie połączeń wynikające z technologii montażu.'
      ], [
        'zakres dotyczy nowych prac, a nie serwisu istniejących listew',
        'listwy, progi, podkłady i materiały montażowe są materiałem klienta, jeśli nie wskazano inaczej',
        'nietypowe docinki, krzywe ściany lub trudny dostęp mogą zwiększyć pracochłonność'
      ]));
    }
    if(isOn('svcFloorRepair')){
      items.push(scopeItem('Listwy przypodłogowe — serwis / renowacja', [
        'Renowacja istniejących listew obejmuje prace liniowe liczone w metrach bieżących, takie jak zabezpieczenie, akrylowanie i malowanie, oraz prace punktowe liczone w sztukach, takie jak zakończenia, korekty i naprawy połączeń.',
        'Mnożnik wielkości listwy dotyczy malowania oraz prac punktowych, ponieważ rośnie powierzchnia malowania i trudność estetyczna korekt. Nie dotyczy podstawowego oklejania, zabezpieczania i akrylowania po długości.'
      ], [
        'akrylowanie liczone w mb',
        'taśmowanie i zabezpieczenie liczone w mb',
        'zakończenia, uskoki i korekty liczone w sztukach',
        'widoczność napraw zależy od stanu istniejącego montażu i światła'
      ]));
    }
    if(isOn('svcDecor')){
      items.push(scopeItem('Dekoracje / sztukateria — nowe prace', [
        'Nowy montaż dekoracji obejmuje listwy przysufitowe, listwy ścienne, maskownice LED, narożniki i opcjonalne malowanie elementów. Prawidłowy nowy montaż zawiera standardowe spasowanie połączeń wynikające z technologii montażu.',
        'Maskownice LED są elementem dekoracyjnym. Taśmy LED, lutowanie, zasilacze, sterowniki i podłączenia pozostają w zakresie elektryki.'
      ], [
        'listwy i maskownice liczone w mb',
        'narożniki i zakończenia mogą być liczone w sztukach',
        'malowanie listew jest osobną aktywną pozycją, jeśli zostało wybrane'
      ]));
    }
    if(isOn('svcDecorRepair')){
      items.push(scopeItem('Sztukateria — serwis / renowacja', [
        'Renowacja istniejącej sztukaterii obejmuje poprawę akrylu, malowanie po renowacji oraz punktowe wygubienie łączeń lub uskoków. Poprawa akrylu i malowanie są liczone liniowo w metrach bieżących, a łączenia i uskoki punktowo w sztukach.',
        'Mnożnik wielkości profilu dotyczy malowania oraz prac punktowych, ponieważ większy profil zwiększa powierzchnię, czas szlifowania i ryzyko widoczności pod światło. Nie dotyczy podstawowego zabezpieczania i akrylowania po długości.'
      ], [
        'zabezpieczenie do malowania liczone w mb',
        'poprawa akrylu liczona w mb',
        'malowanie po renowacji liczone w mb',
        'wygubienie uskoków i renowacja łączeń liczone w sztukach'
      ]));
    }
    if(isOn('svcWallpaper')){
      items.push(scopeItem('Tapetowanie', [
        'Tapetowanie jest liczone z ręcznie wpisanego obmiaru, ponieważ tapeta często obejmuje tylko jedną ścianę, fragment ściany, wnękę lub dekor. Zakres obejmuje robociznę klejenia zgodnie z wybraną pozycją standardową lub premium.',
        'Przy tapetach wzorzystych lub premium większa pracochłonność wynika z konieczności spasowania wzoru, kontroli łączeń i starannego prowadzenia brytów.'
      ], [
        'obmiar tapetowania wpisywany ręcznie',
        'usunięcie starej tapety i gruntowanie są osobnymi pozycjami',
        'materiał tapety i klej po stronie klienta, jeśli nie wskazano inaczej'
      ]));
    }
    if(isOn('svcElec')){
      items.push(scopeItem('Elektryka / LED', [
        'Pozycje elektryczne obejmują punkty, prowadzenie przewodów, osprzęt, rozdzielnicę i elementy LED zgodnie z wybranymi pozycjami. Bruzdowanie i wycinanie otworów pod puszki są prezentowane w bloku przygotowania pod instalacje. LED w elektryce dotyczy części technicznej: taśm, lutowania, punktów podłączeniowych, zasilaczy i połączeń.',
        'Elementy dekoracyjne lub maskujące związane z LED, takie jak maskownice lub profile dekoracyjne, są ujmowane w dekoracjach / sztukaterii.'
      ], [
        'prace elektryczne wymagają zgodności z istniejącą instalacją',
        'osprzęt, taśmy, zasilacze i sterowniki są materiałem, jeśli nie wskazano inaczej',
        'zakres wymaga weryfikacji po oględzinach instalacji'
      ]));
    }
    if(isOn('svcHyd')){
      items.push(scopeItem('Hydraulika / biały montaż', [
        'Hydraulika obejmuje punkty wodne i kanalizacyjne, prowadzenie instalacji, korekty oraz montaż elementów wyposażenia zgodnie z wybranymi pozycjami. Zakres zależy od istniejącej instalacji, materiału rur i dostępności podejść.'
      ], [
        'materiały instalacyjne i osprzęt nie są ujęte, jeśli nie wskazano inaczej',
        'przeróbki starej instalacji mogą wymagać korekty zakresu',
        'biały montaż zależy od kompletności dostarczonego wyposażenia'
      ]));
    }
    if(isOn('svcHard')){
      items.push(scopeItem('Prace trudne / narzuty', [
        'Prace trudne są traktowane jako narzut lub koszt dodatkowy wynikający z utrudnionego dostępu, pracy na wysokości, transportu pionowego, zabezpieczeń, pracy na klatkach schodowych lub konieczności użycia rusztowań.'
      ], [
        'narzut jest liczony na końcu, zgodnie z konfiguracją kosztorysu',
        'rusztowania i zabezpieczenia mogą być liczone jako koszt stały lub dzienny',
        'utrudnienia logistyczne wymagają potwierdzenia na miejscu'
      ]));
    }
    if(isOn('svcAttic')){
      items.push(scopeItem('Poddasze', [
        'Zakres poddasza obejmuje izolacje, paroizolacje, taśmowanie, konstrukcję, zabudowę GK i elementy dodatkowe zgodnie z wybranymi pozycjami. Prace na poddaszu zależą od geometrii skosów, dostępu, wysokości i liczby detali.'
      ], [
        'skosy, wnęki, okna dachowe i belki zwiększają pracochłonność',
        'materiały izolacyjne i płyty są rozliczane osobno, jeśli nie wskazano inaczej',
        'prace wymagają oceny wilgotności i stanu konstrukcji'
      ]));
    }


    if(isOn('svcDemo')) items.push(scopeItem('Wyburzanie ścian działowych — wg materiału', [
      'Wyburzanie ścian działowych jest rozdzielone według materiału, ponieważ pracochłonność GK, gazobetonu, cegły, silikatu, żelbetu i klinkieru znacząco się różni.',
      'Przed wyburzeniem wymagane jest potwierdzenie, że ściana nie jest elementem nośnym oraz że w przegrodzie nie przebiegają instalacje wymagające zabezpieczenia lub przełożenia.'
    ], [
      'gruz, wynoszenie i kontener są rozliczane osobno',
      'żelbet, beton i klinkier trudny mogą wymagać indywidualnej oceny',
      'zakres wymaga oględzin przed pracami'
    ]));
    if(anyValue(['radiatorInstall','radiatorReplace','radiatorConnection'])) items.push(scopeItem('Hydraulika C.O. — grzejniki', [
      'Pozycje grzejnikowe obejmują robociznę montażu, wymiany lub korekty podejścia pod grzejnik zgodnie z zakresem kosztorysu.',
      'Materiały, zawory, uchwyty, odpowietrzniki oraz ewentualne zamrażanie lub spuszczanie instalacji nie są ujęte, jeżeli nie wskazano inaczej.'
    ], [
      'zakres zależy od istniejącej instalacji i dostępu do podejść',
      'prace na instalacji C.O. mogą wymagać uzgodnień ze wspólnotą lub administracją',
      'przeróbki podejść są liczone osobno'
    ]));
    if(anyValue(['doorStandard','doorHidden','doorAdjustment'])) items.push(scopeItem('Montaż drzwi wewnętrznych', [
      'Montaż drzwi obejmuje robociznę osadzenia i regulacji skrzydła oraz ościeżnicy zgodnie z wybraną pozycją.',
      'Drzwi ukryte wymagają większej precyzji, kontroli płaszczyzn ściany i często koordynacji z gładziami oraz malowaniem.'
    ], [
      'otwory drzwiowe muszą zostać zweryfikowane przed montażem',
      'powiększanie otworów, obróbki, malowanie i materiały nie są ujęte, jeżeli nie wskazano inaczej',
      'regulacje istniejących drzwi nie obejmują napraw stolarskich ani lakierniczych'
    ]));

    if(isOn('svcReveals')) items.push(scopeItem('Obróbki glifów / szpalet / otworów', [
      'Obróbki glifów i szpalet obejmują wykończenie krawędzi oraz płaszczyzn wokół okien, drzwi wejściowych, drzwi wewnętrznych lub drzwi ukrytych.',
      'Tryb szybki przelicza obmiar jako liczba otworów × (2 × wysokość + szerokość), czyli dwa boki i górę otworu. Tryb ręczny pozwala wpisać gotowy obmiar w mb.'
    ], [
      'dolna krawędź/parapet nie jest liczona w trybie szybkim glifów — parapety są osobnymi pozycjami',
      'materiały są po stronie klienta, jeżeli nie wskazano inaczej',
      'drzwi ukryte wymagają większej precyzji i kontroli płaszczyzn'
    ]));
    items.push(scopeItem('Uwagi technologiczne i ograniczenia', [
      'Kosztorys ma charakter ofertowy i opiera się na zadeklarowanym zakresie oraz obmiarze. Różnice stanu podłoża, ukryte uszkodzenia, odspojenia, zawilgocenia, krzywizny, stare warstwy lub konieczność prac dodatkowych mogą wymagać korekty zakresu po oględzinach.',
      'Prace renowacyjne i serwisowe wykonywane na istniejących elementach mogą różnić się efektem od nowych prac, ponieważ zależą od wieku materiału, wcześniejszej technologii wykonania i warunków oświetleniowych.'
    ]));
    return `<section class="scopePage"><h2>Zakres i technologia prac</h2><div class="scopeLead">Poniższe informacje opisują zakres technologiczny, ograniczenia oraz założenia wybranych prac. Sekcja jest generowana dynamicznie na podstawie aktywnych usług w kosztorysie.</div>${items.join('')}</section>`;
  }

  function exportSummaryPdf(){
    if(typeof calc === 'function') calc();
    const offerNumber = ensureOfferNumber(true);
    const projectName = safeId('projectName') ? safeId('projectName').value : 'Projekt';
    const clientName = safeId('clientName') ? safeId('clientName').value : '';
    const clientPhone = safeId('clientPhone') ? safeId('clientPhone').value : '';
    const clientEmail = safeId('clientEmail') ? safeId('clientEmail').value : '';
    const investmentAddress = safeId('investmentAddress') ? safeId('investmentAddress').value : '';
    const clientAddress = safeId('clientAddress') ? safeId('clientAddress').value : '';
    const companyName = safeId('companyName') ? (safeId('companyName').value || 'RemontPRO') : 'RemontPRO';
    const companyAddress = safeId('companyAddress') ? safeId('companyAddress').value : '';
    const companyPhone = safeId('companyPhone') ? safeId('companyPhone').value : '';
    const companyEmail = safeId('companyEmail') ? safeId('companyEmail').value : '';
    const propertyType = safeId('propertyType') ? safeId('propertyType').value : '';
    const area = safeId('area') ? safeId('area').value : '';
    const offerValidDays = safeId('offerValidDays') ? (safeId('offerValidDays').value || '14') : '14';
    const summary = safeId('summary') ? safeId('summary').innerHTML : '';
    storeLeadHistory({offerNumber, savedAt:new Date().toISOString(), clientName, clientPhone, clientEmail, investmentAddress, projectName, area});
    const root = ensurePrintRoot();
    root.innerHTML = `
      <div class="offerTop">
        <div class="offerBrand">
          <h1>${escapeHtml(companyName)}</h1>
          <div class="tagline">Kosztorys robocizny remontowej</div>
          ${offerLine('Adres', companyAddress)}
          ${offerLine('Telefon', companyPhone)}
          ${offerLine('Email', companyEmail)}
        </div>
        <div class="offerBadge">
          <div>Numer oferty</div>
          <b>${escapeHtml(offerNumber)}</b>
          <div>Data: ${new Date().toLocaleDateString('pl-PL')}</div>
        </div>
      </div>
      <div class="offerGrid">
        <div class="offerBox">
          <h3>Dane klienta</h3>
          ${offerLine('Klient', clientName || projectName)}
          ${offerLine('Telefon', clientPhone)}
          ${offerLine('Email', clientEmail)}
          ${offerLine('Adres zamawiającego', clientAddress || investmentAddress)}
          ${offerLine('Adres inwestycji', investmentAddress)}
        </div>
        <div class="offerBox">
          <h3>Dane projektu</h3>
          ${offerLine('Projekt', projectName)}
          ${offerLine('Typ nieruchomości', propertyType)}
          ${offerLine('Powierzchnia', area ? area + ' m²' : '')}
          ${offerLine('Ważność oferty', offerValidDays + ' dni')}
        </div>
      </div>
      <h2>Podsumowanie kosztorysowe</h2>
      <div class="printSummary">${summary}</div>
      <div class="offerFooter">
        <b>Uwagi:</b> Oferta dotyczy robocizny i nie obejmuje materiałów, zakupów inwestorskich ani ukrytych prac dodatkowych, jeżeli nie wskazano inaczej.
        Ważność oferty: ${escapeHtml(offerValidDays)} dni. Finalny zakres wymaga potwierdzenia po oględzinach.
      </div>
      ${buildPdfScopeDescriptions()}
    `;
    root.setAttribute('aria-hidden', 'false');
    setPrintDocumentTitle('Kosztorys', offerNumber, clientName || projectName);
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }
  function contractClause(title, body){
    return `<article class="contractClause"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`;
  }

  function exportContractPdf(){
    if(typeof calc === 'function') calc();
    const offerNumber = ensureOfferNumber(true);
    const projectName = safeId('projectName') ? (safeId('projectName').value || 'Projekt') : 'Projekt';
    const clientName = safeId('clientName') ? safeId('clientName').value : '';
    const clientPhone = safeId('clientPhone') ? safeId('clientPhone').value : '';
    const clientEmail = safeId('clientEmail') ? safeId('clientEmail').value : '';
    const investmentAddress = safeId('investmentAddress') ? safeId('investmentAddress').value : '';
    const clientAddress = safeId('clientAddress') ? safeId('clientAddress').value : '';
    const companyName = safeId('companyName') ? (safeId('companyName').value || 'RemontPRO') : 'RemontPRO';
    const companyAddress = safeId('companyAddress') ? safeId('companyAddress').value : '';
    const companyPhone = safeId('companyPhone') ? safeId('companyPhone').value : '';
    const companyEmail = safeId('companyEmail') ? safeId('companyEmail').value : '';
    const propertyType = safeId('propertyType') ? safeId('propertyType').value : '';
    const area = safeId('area') ? safeId('area').value : '';
    const offerValidDays = safeId('offerValidDays') ? (safeId('offerValidDays').value || '14') : '14';
    const summary = safeId('summary') ? safeId('summary').innerHTML : '';
    storeLeadHistory({offerNumber, savedAt:new Date().toISOString(), clientName, clientPhone, clientEmail, investmentAddress, projectName, area, documentType:'contract'});
    const root = ensurePrintRoot();
    const today = new Date().toLocaleDateString('pl-PL');
    root.innerHTML = `
      <section class="contractPage">
        <div class="offerTop">
          <div class="offerBrand">
            <h1>Umowa o wykonanie prac remontowych</h1>
            <div class="tagline">${escapeHtml(companyName)} · dokument wygenerowany w RemontPRO</div>
            ${offerLine('Telefon wykonawcy', companyPhone)}
            ${offerLine('Email wykonawcy', companyEmail)}
          </div>
          <div class="offerBadge">
            <div>Nr oferty / umowy</div>
            <b>${escapeHtml(offerNumber)}</b>
            <div>Data: ${today}</div>
          </div>
        </div>
        <div class="offerGrid">
          <div class="offerBox">
            <h3>Wykonawca</h3>
            ${offerLine('Nazwa', companyName)}
            ${offerLine('Adres', companyAddress)}
            ${offerLine('Telefon', companyPhone)}
            ${offerLine('Email', companyEmail)}
          </div>
          <div class="offerBox">
            <h3>Zamawiający</h3>
            ${offerLine('Klient', clientName || projectName)}
            ${offerLine('Adres zamawiającego', clientAddress || investmentAddress)}
            ${offerLine('Telefon', clientPhone)}
            ${offerLine('Email', clientEmail)}
            ${offerLine('Adres inwestycji', investmentAddress)}
          </div>
        </div>
        <div class="offerBox contractMeta">
          <h3>Dane projektu</h3>
          ${offerLine('Projekt', projectName)}
          ${offerLine('Typ nieruchomości', propertyType)}
          ${offerLine('Powierzchnia', area ? area + ' m²' : '')}
          ${offerLine('Ważność oferty', offerValidDays + ' dni')}
        </div>

        <h2>Postanowienia umowy</h2>
        ${contractClause('§1. Zakres prac', 'Zakres prac określa Załącznik nr 1 — kosztorys robocizny oraz Załącznik nr 2 — zakres i technologia prac. Zakres końcowy wymaga potwierdzenia po oględzinach, jeżeli strony nie uzgodniły inaczej.')}
        ${contractClause('§2. Wynagrodzenie', 'Wynagrodzenie za wykonanie prac wynika z kosztorysu stanowiącego Załącznik nr 1. Ceny dotyczą robocizny, chyba że w kosztorysie wskazano inaczej.')}
        ${contractClause('§3. Materiały', 'Materiały, zakupy inwestorskie oraz elementy wyposażenia są po stronie Zamawiającego, o ile strony nie ustalą inaczej w kosztorysie lub korespondencji.')}
        ${contractClause('§4. Termin realizacji', 'Szacowany czas realizacji wynika z kosztorysu i ma charakter organizacyjny. Harmonogram może ulec zmianie w przypadku przerw technologicznych, oczekiwania na materiały, prac dodatkowych lub kolizji między branżami.')}
        ${contractClause('§5. Prace dodatkowe', 'Prace wykraczające poza zakres załączników wymagają osobnego potwierdzenia przez strony. Prace ukryte, dodatkowe uszkodzenia lub zmiany zakresu mogą wpływać na wynagrodzenie i termin realizacji.')}
        ${contractClause('§6. Odpowiedzialność i ubezpieczenie', 'Wykonawca posiada aktualne ubezpieczenie odpowiedzialności cywilnej (OC) związane z prowadzoną działalnością i wykonywanym zakresem prac. Kopia polisy może zostać okazana Zamawiającemu na życzenie.')}
        ${contractClause('§7. Ograniczenia technologiczne', 'Prace renowacyjne, zaprawki lokalne, naprawy istniejących elementów i prace na starych powłokach mogą różnić się efektem od nowych prac. Efekt końcowy zależy od stanu podłoża, wieku materiałów, wcześniejszej technologii wykonania oraz warunków oświetleniowych.')}
        ${contractClause('§8. Załączniki', 'Integralną częścią umowy są: Załącznik nr 1 — kosztorys robocizny oraz Załącznik nr 2 — zakres i technologia prac wygenerowane na podstawie aktywnych pozycji kalkulatora.')}
        <div class="signatureGrid">
          <div>Wykonawca<br><br>................................................</div>
          <div>Zamawiający<br><br>................................................</div>
        </div>
      </section>
      <section class="scopePage">
        <h2>Załącznik nr 1 — kosztorys robocizny</h2>
        <div class="printSummary">${summary}</div>
      </section>
      <section class="scopePage">
        <h2>Załącznik nr 2 — zakres i technologia prac</h2>
        ${buildPdfScopeDescriptions().replace('<section class="scopePage"><h2>Zakres i technologia prac</h2>', '<div class="scopeAppendix">').replace('</section>', '</div>')}
      </section>
    `;
    root.setAttribute('aria-hidden', 'false');
    setPrintDocumentTitle('Umowa', offerNumber, clientName || projectName);
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }

  function bindProjectIo(){
    const saveBtn = safeId('saveProjectBtn'), loadBtn = safeId('loadProjectBtn'), fileInput = safeId('projectFileInput'), pdfBtn = safeId('exportPdfBtn'), contractBtn = safeId('exportContractBtn');
    if(saveBtn) saveBtn.addEventListener('click', saveProjectToFile); if(loadBtn && fileInput) loadBtn.addEventListener('click', () => fileInput.click());
    if(fileInput) fileInput.addEventListener('change', () => { const file = fileInput.files && fileInput.files[0]; if(file) loadProjectFromFile(file); fileInput.value = ''; });
    if(pdfBtn) pdfBtn.addEventListener('click', exportSummaryPdf);
    if(contractBtn) contractBtn.addEventListener('click', exportContractPdf);
    ensureOfferNumber(false);
  }
  bindProjectIo();
})();

// v1.5.0 - CRM local-first: historia ofert, statusy, wczytywanie z historii
(function(){
  const VERSION = '1.9.0';
  const HISTORY_KEY = 'offers_history_v150';
  const safeId = (id) => document.getElementById(id);
  const controls = () => Array.from(document.querySelectorAll('input, select, textarea')).filter(c => c.type !== 'file' && !c.dataset.rate);
  const esc = (text) => String(text || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function getControlKey(control, index){
    if(control.id) return `id:${control.id}`;
    const row = control.closest('tr');
    if(row){
      const table = control.closest('table');
      const tableId = table && table.id ? table.id : 'table';
      const rowIndex = Array.from(row.parentElement.children).indexOf(row);
      const cellIndex = Array.from(row.children).findIndex(td => td.contains(control));
      const classKey = Array.from(control.classList || []).join('.') || control.tagName.toLowerCase();
      return `table:${tableId}:row:${rowIndex}:cell:${cellIndex}:class:${classKey}`;
    }
    return `index:${index}`;
  }

  function findControlByKey(key, fallbackIndex){
    if(key && key.startsWith('id:')) return safeId(key.slice(3));
    if(key && key.startsWith('table:')){
      const parts = key.split(':');
      const tableId = parts[1];
      const rowIndex = Number(parts[3]);
      const cellIndex = Number(parts[5]);
      const classSpec = (parts[7] || '').split('.').filter(Boolean);
      const table = safeId(tableId);
      const row = table && table.tBodies[0] ? table.tBodies[0].children[rowIndex] : null;
      const cell = row ? row.children[cellIndex] : null;
      if(cell){
        const candidates = Array.from(cell.querySelectorAll('input,select,textarea'));
        if(classSpec.length){
          const byClass = candidates.find(c => classSpec.every(cls => c.classList.contains(cls)));
          if(byClass) return byClass;
        }
        if(candidates[0]) return candidates[0];
      }
    }
    return controls()[fallbackIndex] || null;
  }

  function collectState(){
    if(typeof calc === 'function') calc();
    const values = controls().map((c, index) => ({
      key:getControlKey(c,index), tag:c.tagName.toLowerCase(), type:c.type || '',
      value:c.type === 'checkbox' ? !!c.checked : c.value, dataset:{...(c.dataset || {})}
    }));
    return {
      app:'kalkulator_remonty', version:VERSION, savedAt:new Date().toISOString(),
      projectName:safeId('projectName') ? safeId('projectName').value : '',
      clientName:safeId('clientName') ? safeId('clientName').value : '',
      offerNumber:safeId('offerNumber') ? safeId('offerNumber').value : '',
      offerStatus:safeId('offerStatus') ? safeId('offerStatus').value : 'robocza',
      values,
      rates:(typeof rates === 'object' ? {...rates} : {}),
      summaryHtml:safeId('summary') ? safeId('summary').innerHTML : ''
    };
  }

  function applyState(project){
    if(!project || !Array.isArray(project.values)) throw new Error('Nieprawidłowy format projektu z historii.');
    if(project.rates && typeof project.rates === 'object' && typeof rates === 'object'){
      rates = {...rates, ...project.rates};
      localStorage.setItem('rates_v135', JSON.stringify(rates));
      if(typeof renderRates === 'function') renderRates();
    }
    project.values.forEach((item, index) => {
      const c = findControlByKey(item.key, index);
      if(!c) return;
      if(c.type === 'checkbox') c.checked = !!item.value; else c.value = item.value;
      if(item.dataset && typeof item.dataset === 'object') Object.keys(item.dataset).forEach(k => { c.dataset[k] = item.dataset[k]; });
      c.dispatchEvent(new Event('input', {bubbles:true}));
      c.dispatchEvent(new Event('change', {bubbles:true}));
    });
    if(typeof updateLivingHint === 'function') updateLivingHint();
    if(typeof updateDelegationVisibility === 'function') updateDelegationVisibility();
    if(typeof syncAtticMenuUi === 'function') syncAtticMenuUi();
    if(typeof syncFloorUi === 'function') syncFloorUi();
    if(typeof syncSubfloorUi === 'function') syncSubfloorUi();
    if(typeof syncDecorUi === 'function') syncDecorUi();
    if(typeof syncHardUi === 'function') syncHardUi();
    if(typeof refreshModuleMirrors === 'function') refreshModuleMirrors();
    if(typeof calc === 'function') calc();
  }

  function loadHistory(){
    try{ return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch(e){ return []; }
  }
  function saveHistory(list){ localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0,200))); }

  function ensureOfferNumberForHistory(){
    const field = safeId('offerNumber');
    if(!field) return '';
    if(!field.value){
      const d = new Date();
      const prefix = `REM/${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}`;
      const key = 'offer_counter_' + prefix;
      const next = (parseInt(localStorage.getItem(key) || '0',10) || 0) + 1;
      localStorage.setItem(key, String(next));
      field.value = `${prefix}/${String(next).padStart(3,'0')}`;
    }
    return field.value;
  }

  function extractTotal(){
    const node = safeId('summary');
    const txt = node ? (node.innerText || node.textContent || '') : '';
    const matches = [...txt.matchAll(/([0-9][0-9\s.,]*)\s*zł/g)];
    if(!matches.length) return '';
    return matches[matches.length-1][1].replace(/\s/g,'').replace(',', '.');
  }

  function statusLabel(value){
    return ({robocza:'robocza', wyslana:'wysłana', zaakceptowana:'zaakceptowana', odrzucona:'odrzucona'}[value] || value || 'robocza');
  }

  function saveCurrentOfferToHistory(source='manual'){
    if(typeof calc === 'function') calc();
    const offerNumber = ensureOfferNumberForHistory();
    const state = collectState();
    state.offerNumber = offerNumber;
    const now = new Date().toISOString();
    const item = {
      id: offerNumber || ('LOCAL-' + Date.now()),
      offerNumber,
      clientName: safeId('clientName') ? safeId('clientName').value : '',
      clientPhone: safeId('clientPhone') ? safeId('clientPhone').value : '',
      clientEmail: safeId('clientEmail') ? safeId('clientEmail').value : '',
      projectName: safeId('projectName') ? safeId('projectName').value : '',
      investmentAddress: safeId('investmentAddress') ? safeId('investmentAddress').value : '',
      status: safeId('offerStatus') ? safeId('offerStatus').value : 'robocza',
      totalNet: extractTotal(),
      source,
      updatedAt: now,
      createdAt: now,
      project: state
    };
    const list = loadHistory();
    const idx = list.findIndex(x => x.offerNumber === item.offerNumber && item.offerNumber);
    if(idx >= 0){ item.createdAt = list[idx].createdAt || now; list.splice(idx,1,item); }
    else list.unshift(item);
    saveHistory(list);
    renderHistory();
    return item;
  }

  function renderHistory(){
    const root = safeId('offersHistory');
    if(!root) return;
    const list = loadHistory();
    if(!list.length){ root.className = 'offersHistory empty'; root.textContent = 'Brak zapisanych ofert.'; return; }
    root.className = 'offersHistory';
    const rows = list.map(item => `
      <div class="offerHistoryRow" data-offer-id="${esc(item.id)}">
        <div><b>${esc(item.offerNumber || 'bez numeru')}</b><div class="muted">${esc((item.updatedAt || '').slice(0,10))}</div></div>
        <div>${esc(item.clientName || item.projectName || 'Klient')}<div class="muted">${esc(item.investmentAddress || '')}</div></div>
        <div>${item.totalNet ? esc(item.totalNet) + ' zł' : '<span class="muted">brak kwoty</span>'}</div>
        <div><select class="offerStatusSelect" data-history-status="${esc(item.id)}">
          ${['robocza','wyslana','zaakceptowana','odrzucona'].map(s => `<option value="${s}" ${item.status===s?'selected':''}>${statusLabel(s)}</option>`).join('')}
        </select></div>
        <div class="offerHistoryActions"><button type="button" data-history-load="${esc(item.id)}">Wczytaj</button><button type="button" data-history-delete="${esc(item.id)}">Usuń</button></div>
      </div>`).join('');
    root.innerHTML = `<div class="offerHistoryRow header"><div>Oferta</div><div>Klient</div><div>Kwota</div><div>Status</div><div>Akcje</div></div>${rows}`;
  }

  function bindHistory(){
    const saveBtn = safeId('saveHistoryBtn');
    const refreshBtn = safeId('refreshHistoryBtn');
    const clearBtn = safeId('clearHistoryBtn');
    const pdfBtn = safeId('exportPdfBtn');
    if(saveBtn) saveBtn.addEventListener('click', () => { saveCurrentOfferToHistory('manual'); alert('Oferta zapisana w historii lokalnej.'); });
    if(refreshBtn) refreshBtn.addEventListener('click', renderHistory);
    if(clearBtn) clearBtn.addEventListener('click', () => { if(confirm('Wyczyścić całą lokalną historię ofert?')){ localStorage.removeItem(HISTORY_KEY); renderHistory(); } });
    if(pdfBtn) pdfBtn.addEventListener('click', () => { try{ saveCurrentOfferToHistory('pdf'); }catch(e){} });
    document.addEventListener('click', (ev) => {
      const loadBtn = ev.target.closest('[data-history-load]');
      const delBtn = ev.target.closest('[data-history-delete]');
      if(loadBtn){
        const id = loadBtn.getAttribute('data-history-load');
        const item = loadHistory().find(x => x.id === id);
        if(item && item.project){ applyState(item.project); alert('Oferta wczytana z historii.'); }
      }
      if(delBtn){
        const id = delBtn.getAttribute('data-history-delete');
        if(confirm('Usunąć ofertę z historii lokalnej?')){ saveHistory(loadHistory().filter(x => x.id !== id)); renderHistory(); }
      }
    });
    document.addEventListener('change', (ev) => {
      const sel = ev.target.closest('[data-history-status]');
      if(!sel) return;
      const id = sel.getAttribute('data-history-status');
      const list = loadHistory();
      const item = list.find(x => x.id === id);
      if(item){ item.status = sel.value; item.updatedAt = new Date().toISOString(); saveHistory(list); }
    });
    renderHistory();
  }

  bindHistory();
})();
