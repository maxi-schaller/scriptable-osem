//Einstellungen
const APIURL = 'https://api.opensensemap.org/boxes/'



// Abfrage der Widget Parameter
if(args.widgetParameter){
  const osemBoxId = args.widgetParameter
  }
else {}
  const osemBoxId = '605f244277a88b001ba8d6bb' //GEHT IRGENDWIE NICHT!!!
  

// Festlegen der Datenabfrage URL
function getOsemApiUrl(boxIdString){
  return  APIURL + boxIdString
}

// Fehlerbehandlung
function fehler(fehlertext){
  const errorList = new ListWidget()
  errorList.addText(felhertext)
  return null;
  let iosWidget = errorList
}
// Laden des Widgets 
let iosWidget = await createWidget()
if(!config.runsInWidget){
 await iosWidget.presentSmall() 
}
Script.setWidget(iosWidget)
Script.complete()




// FUNKTIONEN

//// Widget Creator
async function createWidget(items){
  //Laden der Daten
  const senseBoxDaten = await new Request(getOsemApiUrl(osemBoxId)).loadJSON()
  if(!senseBoxDaten || !senseBoxDaten._id || !senseBoxDaten.name || !senseBoxDaten.sensors){
    fehler("Keine SenseBox gefunden")
    return;
  }
  //
  const widgetList = new ListWidget()
  //Ueberschrift Name der Box
  const header = widgetList.addText(senseBoxDaten.name)
  header.font = Font.mediumSystemFont(13)
  widgetList.addSpacer()
  //Erstellen der Container
  const basisContainer = widgetList.addStack()
  basisConatiner.layoutHorizontally()
  const linksContainer = basisContainer.addStack()
  linksContainer.layoutVertically()
  const mittelSpacer = basisContainer.addSpacer(5)
  const mittelContainer = basisContainer.addStack()
  mittelContainer.layoutVertically()
  const rechtsContainer = basisContainer.addStack()
  rechtsContainer.layoutVertically()
  
  //Schreiben Bezeichnungen
  senseBoxDaten.sensors.forEach(function(sens){
    linksContainer.addText(sens.title).font = Font.mediumSystemFont(8)
    mittelContainer.addText(sens.lastMeasurement.value).font = Font.mediumSystemFont(8)
    rechtsContainer.addText(sens.unit).font = Font.mediumSystemFont(8)
  })
  widgetList.addSpacer()
  
  //Zeit der letzten Messung schreiben
  
  var letzteMessungZeitpunkt = new Date(senseBoxDaten.sensors[0].lastMeasurement.createdAt)
  var gestern = new Date()
  gestern.setDate(gestern.getDate()-1)
  if(letzteMessungZeitpunkt < gestern){
    var zeitText = widgetList.addText(letzteMessungZeitpunkt.toLocaleString('de-DE'))
    zeitText.textColor = Color.red()
  }
  else {
   var zeitText = widgetList.addText(letzteMessungZeitpunkt.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit'}))
   zeitText.textColor = Color.blue()
  }
  zeitText.font = Font.mediumSystemFont(8)
  
  return widgetList
  
  
  
}



