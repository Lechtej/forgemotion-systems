const money = v => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(Number(v||0));
const el = id => document.getElementById(id);
const num = id => parseFloat((el(id).value || '0').toString().replace(',','.')) || 0;
const val = id => el(id).value;
const chk = id => el(id).checked;

const defaultRates = {
  paintWhiteWalls: 22,
  paintLightExtra: 5,
  paintDarkExtra: 10,
  paintCeiling: 28,
  paintLatexExtra: 5,
  paintCeramicExtra: 10,
  primer: 8,
  smooth: 50,
  mask: 4,
  prepMediumExtra: 18,
  prepHeavyExtra: 40,
  elec: 180,
  elecQuickPoint: 180,
  elecSocket: 160,
  elecSwitch: 140,
  elecLight: 160,
  elecPower: 260,
  elecBruzdaWall: 35,
  elecBruzdaConcrete: 55,
  elecCable: 12,
  elecConduit: 8,
  elecBoxCut: 30,
  elecBoxMount: 30,
  elecBoard: 750,
  elecProtection: 150,
  elecAgd: 180,
  elecLed: 180,
  hyd: 300,
  hydQuickPoint: 320,
  hydWaterPoint: 320,
  hydSewerPoint: 260,
  hydPipeWall: 45,
  hydPipeFloor: 35,
  hydInsulation: 8,
  hydBruzda: 45,
  hydSewerMb: 60,
  hydManifold: 300,
  hydManifoldConnect: 220,
  hydCorrection: 250,
  hydTapSink: 180,
  hydTapShower: 240,
  hydSink: 220,
  hydWcCompact: 300,
  hydWcFrame: 600,
  hydShowerCabin: 650,
  hydBathtub: 500,
  hydAppliance: 150,
  hydHose: 60,
  hydPpMultiplier: 1.15,
  gk: 160,
  wallGkSingle: 95,
  wallGkDouble: 140,
  wallGkCeiling: 120,
  wallGkBuildout: 160,
  wallGkInsulation: 25,
  wallGkJoint: 35,
  wallGkOpening: 180,
  wallMasonryAerated: 160,
  wallMasonryBrick: 220,
  wallMasonryBuildout: 180,
  wallMasonryPlaster: 55,
  wallMasonrySmooth: 50,
  wallMasonryOpening: 220,
  demoTiles: 80,
  demoPlaster: 65,
  demoScreed: 80,
  demoFloor: 35,
  rubbleTilesM3: 0.04,
  rubblePlasterM3: 0.02,
  rubbleScreedM3: 0.06,
  rubbleFloorM3: 0.015,
  carryHourly: 80,
  noElevatorSurchargePct: 0.45,
  elevatorSurchargePct: 0.10,
  containerSmall: 650,
  containerLarge: 1000,
  bigbag: 330,
  atticWool1: 60,
  atticWool2: 85,
  atticVapor: 15,
  atticTape: 10,
  atticFrame: 40,
  atticGk1: 60,
  atticGk2: 85,
  atticJoint: 32,
  atticSmooth: 55,
  atticRoofWindow: 450,
  atticHatch: 350,
  atticBeamMask: 80,
  atticNiche: 300,
  tileWall: 150,
  tileFloor: 130,
  tileHydro: 40,
  tilePrimer: 10,
  tileGrout: 25,
  tileProfile: 35,
  tileGresExtra: 25,
  tileHardExtra: 45,
  tileMiter: 90,
  bathroomGkFrame: 650,
  floorLaminate: 55,
  floorVinylClick: 65,
  floorEngineeredFloating: 90,
  floorUnderlay: 12,
  floorVaporFoil: 8,
  floorSkirting: 25,
  floorThreshold: 80,
  floorDemoSkirting: 8,
  subfloorPrimer: 10,
  subfloorSelfLevelThin: 45,
  subfloorSelfLevelThick: 70,
  subfloorLocalLevel: 55,
  subfloorGrinding: 35,
  subfloorCrackRepair: 30
};
let rates = {...defaultRates, ...(JSON.parse(localStorage.getItem('rates_v110') || '{}'))};

const rateLabels = {
  paintWhiteWalls:['Malowanie ścian 2x — biały / baza','zł/m²'],
  paintLightExtra:['Dopłata: jasny kolor ścian','zł/m²'],
  paintDarkExtra:['Dopłata: ciemny kolor ścian','zł/m²'],
  paintCeiling:['Malowanie sufitów — biały','zł/m²'],
  paintLatexExtra:['Dopłata: farba lateksowa','zł/m²'],
  paintCeramicExtra:['Dopłata: farba ceramiczna','zł/m²'],
  primer:['Gruntowanie ścian/sufitów','zł/m²'],
  mask:['Zabezpieczenie powierzchni: folia/taśma','zł/m²'],
  prepMediumExtra:['Dopłata: zeskrobanie/poprawki średnie','zł/m²'],
  prepHeavyExtra:['Dopłata: do surowego / ciężkie przygotowanie','zł/m²'],
  smooth:['Gładź','zł/m²'],
  elec:['Punkt elektryczny — legacy','zł/szt'],
  elecQuickPoint:['Elektryka: punkt elektryczny — szybki tryb','zł/szt'],
  elecSocket:['Elektryka: gniazdo 230V / punkt','zł/szt'],
  elecSwitch:['Elektryka: włącznik / punkt','zł/szt'],
  elecLight:['Elektryka: punkt oświetleniowy','zł/szt'],
  elecPower:['Elektryka: gniazdo siłowe / dedykowany punkt AGD','zł/szt'],
  elecBruzdaWall:['Elektryka: bruzdowanie w ścianie','zł/mb'],
  elecBruzdaConcrete:['Elektryka: bruzdowanie w betonie','zł/mb'],
  elecCable:['Elektryka: układanie przewodów','zł/mb'],
  elecConduit:['Elektryka: robocizna — prowadzenie w peszlu/osłonie','zł/mb'],
  elecBoxCut:['Elektryka: kucie/wiercenie pod puszki','zł/szt'],
  elecBoxMount:['Elektryka: montaż/osadzenie puszki','zł/szt'],
  elecBoard:['Elektryka: montaż/uporządkowanie rozdzielnicy','zł/szt'],
  elecProtection:['Elektryka: zabezpieczenia/obwody w rozdzielnicy','zł/szt'],
  elecAgd:['Elektryka: podłączenie płyty/piekarnika/AGD','zł/szt'],
  elecLed:['Elektryka: LED/taśmy/sterowniki','zł/mb'],
  hyd:['Punkt wod-kan — legacy','zł/szt'],
  hydQuickPoint:['Hydraulika: punkt wod-kan — szybki tryb','zł/szt'],
  hydWaterPoint:['Hydraulika: punkt wodny','zł/szt'],
  hydSewerPoint:['Hydraulika: punkt kanalizacyjny','zł/szt'],
  hydPipeWall:['Hydraulika: prowadzenie rur w ścianie','zł/mb'],
  hydPipeFloor:['Hydraulika: prowadzenie rur w podłodze','zł/mb'],
  hydInsulation:['Hydraulika: izolacja rur — robocizna','zł/mb'],
  hydBruzda:['Hydraulika: bruzdowanie pod rury','zł/mb'],
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
  rubbleTilesM3:['Gruz: płytki z klejem','m³/m²'],
  rubblePlasterM3:['Gruz: tynk ok. 2 cm','m³/m²'],
  rubbleScreedM3:['Gruz: wylewka/posadzka','m³/m²'],
  rubbleFloorM3:['Gruz: podłoga drewniana/panele','m³/m²'],
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
  subfloorCrackRepair:["Posadzki/podłoże: naprawa pęknięć","zł/mb"]
};

const demoMap = {
  tiles: {rate:'demoTiles', rubble:'rubbleTilesM3', label:'Skuwanie płytek ściany/podłogi'},
  plaster: {rate:'demoPlaster', rubble:'rubblePlasterM3', label:'Skuwanie starego tynku'},
  screed: {rate:'demoScreed', rubble:'rubbleScreedM3', label:'Kucie posadzki betonowej / wylewki'},
  floor: {rate:'demoFloor', rubble:'rubbleFloorM3', label:'Zrywanie parkietu / desek / paneli'}
};

const electricMap = {
  socket: {rate:'elecSocket', label:'Elektryka: gniazda 230V'},
  switch: {rate:'elecSwitch', label:'Elektryka: włączniki'},
  light: {rate:'elecLight', label:'Elektryka: punkty oświetleniowe'},
  power: {rate:'elecPower', label:'Elektryka: gniazda siłowe / dedykowane punkty AGD'},
  bruzdaWall: {rate:'elecBruzdaWall', label:'Elektryka: bruzdowanie w ścianie'},
  bruzdaConcrete: {rate:'elecBruzdaConcrete', label:'Elektryka: bruzdowanie w betonie'},
  cable: {rate:'elecCable', label:'Elektryka: układanie przewodów'},
  conduit: {rate:'elecConduit', label:'Elektryka: prowadzenie w peszlu/osłonie'},
  boxCut: {rate:'elecBoxCut', label:'Elektryka: kucie/wiercenie pod puszki'},
  boxMount: {rate:'elecBoxMount', label:'Elektryka: montaż/osadzenie puszki'},
  board: {rate:'elecBoard', label:'Elektryka: rozdzielnica'},
  protection: {rate:'elecProtection', label:'Elektryka: zabezpieczenia / obwody w rozdzielnicy'},
  agd: {rate:'elecAgd', label:'Elektryka: podłączenie AGD'},
  led: {rate:'elecLed', label:'Elektryka: LED / taśmy / sterowniki'}
};



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

function toggleTip(elm){
  const field = elm.closest('.field-label') || elm.parentElement;
  const localTip = (field?.nextElementSibling?.classList?.contains('tooltip-box')) ? field.nextElementSibling : elm.closest('td, th, label, div')?.querySelector('.tooltip-box');
  if(!localTip) return;
  let floatTip = document.getElementById('floatingTooltip');
  if(!floatTip){ floatTip = document.createElement('div'); floatTip.id = 'floatingTooltip'; document.body.appendChild(floatTip); }
  const same = floatTip.dataset.source === localTip.textContent.trim() && floatTip.style.display === 'block';
  if(same){ floatTip.style.display = 'none'; return; }
  floatTip.innerHTML = localTip.innerHTML;
  floatTip.dataset.source = localTip.textContent.trim();
  floatTip.style.display = 'block';
  const rect = elm.getBoundingClientRect();
  const width = Math.min(420, window.innerWidth - 24);
  floatTip.style.width = width + 'px';
  let left = rect.left + window.scrollX + 18;
  if(left + width > window.scrollX + window.innerWidth - 12) left = window.scrollX + window.innerWidth - width - 12;
  floatTip.style.left = left + 'px';
  floatTip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
}

document.addEventListener('click', (ev)=>{
  if(ev.target.classList?.contains('info-icon')) return;
  const floatTip = document.getElementById('floatingTooltip');
  if(floatTip && !floatTip.contains(ev.target)) floatTip.style.display='none';
});

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
function syncFloorUi(){
  const details=el('floorDetailsBox');
  if(details) details.style.display = chk('svcFloor') ? 'block' : 'none';
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
function addFloorRows(add){
  if(!chk('svcFloor')) return;
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
  if(!detailed){
    addSet('Podłogi', num('floorQuickArea'), num('floorQuickSkirtingMb'), val('floorQuickType'), chk('floorQuickUnderlay'), chk('floorQuickVapor'), chk('floorQuickSkirting'), num('floorThresholds'), chk('floorQuickDemoSkirting'), num('floorCutPct'));
    return;
  }
  document.querySelectorAll('#floorTable tbody tr').forEach(tr=>{
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
  tr.querySelector('.subfloorSelfLevel').value=data.selfLevel || 'none';
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
  if(box) box.style.display = chk('svcWet') ? 'block' : 'none';
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
  if(!chk('svcWet')) return;
  syncWetUi();
  const mult = hydSystemMultiplier();
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
    const wallRate = (rates.tileWall||0) + materialExtra;
    const floorRate = (rates.tileFloor||0) + materialExtra;
    if(tr.querySelector('.wetWallTiles').checked) add(`${prefix}: płytki ścienne (${materialLabel})`, wallTileArea, 'm²', wallRate);
    if(tr.querySelector('.wetFloorTiles').checked) add(`${prefix}: płytki podłogowe (${materialLabel})`, floorTileArea, 'm²', floorRate);
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
    add(`${prefix}: bruzdowanie pod instalację`, parseFloat(tr.querySelector('.wetBruzdaMb').value)||0, 'mb', (rates.hydBruzda||0));
    add(`${prefix}: zabudowa stelaża WC`, parseFloat(tr.querySelector('.wetWcFrame').value)||0, 'szt', rates.bathroomGkFrame);
    add(`${prefix}: montaż WC kompakt`, parseFloat(tr.querySelector('.wetWcCompact').value)||0, 'szt', rates.hydWcCompact);
    add(`${prefix}: montaż umywalki / zlewu`, parseFloat(tr.querySelector('.wetSink').value)||0, 'szt', rates.hydSink);
    add(`${prefix}: montaż baterii`, parseFloat(tr.querySelector('.wetTap').value)||0, 'szt', rates.hydTapSink);
    add(`${prefix}: montaż kabiny prysznicowej`, parseFloat(tr.querySelector('.wetCabin').value)||0, 'szt', rates.hydShowerCabin);
    add(`${prefix}: montaż wanny`, parseFloat(tr.querySelector('.wetBathtub').value)||0, 'szt', rates.hydBathtub);
    add(`${prefix}: podłączenie pralki / zmywarki`, parseFloat(tr.querySelector('.wetAppliance').value)||0, 'szt', rates.hydAppliance);
  });
  if(rows) rows.push({name:'Hydraulika i płytki w pomieszczeniach mokrych są liczone w module pomieszczeń mokrych — nie dubluj ich w globalnej hydraulice.', qty:0, unit:'', rate:0, value:0, note:true});
}

function syncMeasureUi(){
  const mode = val('measureMode');
  const manualOnly = mode === 'manual';
  const manualWalls = el('manualWalls');
  const manualCeilings = el('manualCeilings');
  if(manualWalls) manualWalls.closest('label').classList.toggle('mutedControl', !manualOnly);
  if(manualCeilings) manualCeilings.closest('label').classList.toggle('mutedControl', !manualOnly);
}

function calc(){
  syncDemoUi();
  syncMeasureUi();
  syncAtticUi();
  syncElectricUi();
  syncHydraulicUi();
  syncWetUi();
  syncFloorUi();
  syncSubfloorUi();
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
    const value=qty*effectiveRate; net+=value; rows.push({name, qty, unit, rate:effectiveRate, value});
  }
  function addFixed(name, value){
    if(!value) return;
    net+=value; rows.push({name, qty:1, unit:'kpl', rate:value, value});
  }
  if(chk('svcPaint')){
    if(val('measureMode') === 'rooms' && Array.isArray(m.paintRows)){
      m.paintRows.forEach(r=>add(r.name, r.qty, r.unit, r.rate));
    } else {
      add(`Malowanie ścian 2x — ${wallColorLabel(val('paintColor'))}, ${paintTypeLabel(val('paintType'))}`, m.walls, 'm²', paintRateFor(val('paintColor'), val('paintType'), false));
      add('Malowanie sufitów — biały', m.ceilings, 'm²', rates.paintCeiling);
    }
    add('Dodatkowe przygotowanie pod malowanie', paintArea, 'm²', prepExtraRate());
  }
  if(chk('svcPrimer')) add('Gruntowanie', paintArea, 'm²', rates.primer);
  if(chk('svcSmooth')) add('Gładź', m.walls, 'm²', rates.smooth);
  if(chk('svcMask')) add('Zabezpieczenie / oklejanie', paintArea, 'm²', rates.mask);
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
  addWallRows(add);
  addAtticRows(add);

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

  const list = rows.map(r=> r.note
    ? `<div class="summaryRow muted"><span>${r.name}</span><b></b></div>`
    : `<div class="summaryRow"><span>${r.name}: ${r.qty.toFixed(1)} ${r.unit} × ${money(r.rate)}</span><b>${money(r.value)}</b></div>`).join('');

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
  localStorage.setItem('rates_v110', JSON.stringify(rates));
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
    calc();
  });
  if(el('addWetRoomBtn')) el('addWetRoomBtn').addEventListener('click',()=>addWetRoom({type:'bathroom'}));
  if(el('addFloorRoomBtn')) el('addFloorRoomBtn').addEventListener('click',()=>addFloorRoom({}));
  if(el('addSubfloorRoomBtn')) el('addSubfloorRoomBtn').addEventListener('click',()=>addSubfloorRoom({}));
  ['floorQuickArea','floorQuickSkirtingMb','subfloorQuickArea'].forEach(id=>{
    if(el(id)) el(id).addEventListener('input',()=>{ el(id).dataset.manual='1'; });
  });
  el('calcBtn').addEventListener('click',calc);
  el('saveRatesBtn').addEventListener('click',saveRates);
  el('defaultRatesBtn').addEventListener('click',()=>{rates={...defaultRates};localStorage.setItem('rates_v110',JSON.stringify(rates));renderRates();calc();});
  el('resetBtn').addEventListener('click',()=>{localStorage.clear(); location.reload();});
}

renderRates(); bindAll(); updateLivingHint(); seedRooms(); updateDelegationVisibility(); calc();
