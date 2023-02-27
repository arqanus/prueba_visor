
function doGet() {


  var template = HtmlService.createTemplateFromFile('Registro');
  template.data = data
  template.pubUrl = "https://script.google.com/macros/s/AKfycbzUc0wYwIicxIOOabraXmXBh9sFJTRXwRSlKIzEkY4/dev"
  var output = template.evaluate();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName('Registro')
  var data = sheet.getDataRange().getDisplayValues()

  
  return output;
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName)
    .getContent()
}

function doPost(e) {
  var SS = SpreadsheetApp.getActiveSpreadsheet()
  var sheetRegistro = SS.getSheetByName('Registro')

  //var id = new Date() 
  var id = getNextId()
  var numeroRegistro = e.parameter.numeroRegistro
  var folios = e.parameter.folios
  var fechaIngreso = e.parameter.fechaIngreso
  var tipoDocumento = e.parameter.tipoDocumento
  var asunto = e.parameter.asunto
  var remite = e.parameter.remite
  var obra = e.parameter.obra
  var estadoDocumento = e.parameter.estadoDocumento


  //var acuerdoPrivacidad = (e.parameter.acuerdoPrivacidad == 'on') ? 'Aceptado' : 'Rechazado'

  sheetRegistro.appendRow([id, numeroRegistro, folios, fechaIngreso, tipoDocumento, asunto, remite, obra, estadoDocumento,])

  // JLCM parte para que se recargue a la misma ágina y llame a la función reset
  var template = HtmlService.createTemplateFromFile('Registro');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbzUc0wYwIicxIOOabraXmXBh9sFJTRXwRSlKIzEkY4/dev";
  template.resetForm = true;
  var output = template.evaluate();

  return output;
}

function getNextId() {
  /////// Get properties
  const properties = PropertiesService.getScriptProperties()

  /////// Aquire the script lock. Prevents race condition
  const lock = LockService.getScriptLock()
  lock.waitLock(2000)

  ////// Get the saved ID and save the next value
  ////// Properties are string so it has to convert the type
  const id = parseInt(properties.getProperty('id_seq') || 0)
  properties.setProperty('id_seq', (id + 1).toString())

  ///// Release the script lock (allows other executions to continue)
  lock.releaseLock()

  /////// Return the result
  console.log(id)
  return id
}
// JLCM_PARA BUSCAR POR REGISTRO AUNQUE SE REQUIERE UNA BUSQUEDA UNIVERSAL

function buscarRegistros(numeroRegistro = "12") {

  let registrosRegistrados = [];
  const SS = SpreadsheetApp.getActiveSpreadsheet()
  const sheetRegistros = SS.getSheetByName("Registro")
  const registros = sheetRegistros.getDataRange().getDisplayValues()
 //console.log(registros);

  registros.forEach(registro => {
    if(registro[1] === numeroRegistro) {

      registrosRegistrados.push(registro);
    }
  })

return registrosRegistrados
}





//-------------------->>>>>>>>>>>>>para resetear la función antes de entregar el prooyecto<<<<<<<<<<<<<<<<<<<<<-----------------------
//function resetIdSeq() {
  //const properties = PropertiesService.getScriptProperties();
  //properties.setProperty('id_seq', '1');
//}

