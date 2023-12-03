const path = require('path');
const fs = require('fs');
const { Corte } = require(path.join(__dirname, 'corteSchema.js'));
const rutaArchivo = path.join(__dirname, '..', 'local_data', 'cortes.json');

async function getLatestRCC() {

      const result = await Corte.findOne({ RCC: { $exists: true } })
        .sort({ _id: -1 }) // Ordenar en orden descendente por el campo "_id" para obtener el último documento
        .limit(1) // Limitar el resultado a un solo documento
        .select('RCC');
  
      if (result) {
        return result.RCC;
      } else {
        console.log('No se encontró ningún RCC.');
        return null;
      }
}

async function getLatestPlusOneRCC() {

  const result = await Corte.findOne({ RCC: { $exists: true } })
    .sort({ _id: -1 }) // Ordenar en orden descendente por el campo "_id" para obtener el último documento
    .limit(1) // Limitar el resultado a un solo documento
    .select('RCC');

  let rccNums = parseInt(result.RCC.replace('RCC', ''));
  rccNums += 1;

  let newRcc = 'RCC' + rccNums;

  if (newRcc) {
    return newRcc;
  } else {
    console.log('No se encontró ningún RCC.');
    return null;
  }
}

async function checkRCCinDB(rcc) {

  const existingRCC = await Corte.findOne({ RCC: rcc });

  if (existingRCC) {
    console.log(`El RCC ${rcc} ya existe en la base de datos.`);
    return true;
  } else {
    console.log(`El RCC ${rcc} no existe en la base de datos.`);
    return false;
  }

}

function isEmpty(value){
    if(value === '' || value === null || value === undefined){
        return true
    } 
    else {
        return false
    }
}

function leerArchivoJSON(callback) {
  fs.readFile(rutaArchivo, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

function escribirArchivoJSON(datos, callback) {
  fs.writeFile(rutaArchivo, JSON.stringify(datos, null, 2), err => {
    callback(err);
  });
}

function validarYActualizarCorteLocal(cortes, corteNuevo) {
  const indiceExistente = cortes.findIndex(corte => 
    corte.RCC === corteNuevo.RCC && corte.fecha === corteNuevo.fecha);

  if (indiceExistente !== -1) {
    cortes[indiceExistente] = corteNuevo; // Actualiza el corte existente
  } else {
    cortes.push(corteNuevo); // Agrega un nuevo corte
  }

  return cortes;
}

module.exports = {getLatestRCC, getLatestPlusOneRCC, checkRCCinDB, isEmpty, leerArchivoJSON, escribirArchivoJSON, validarYActualizarCorteLocal};