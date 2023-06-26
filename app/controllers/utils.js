const path = require('path');
const { Corte } = require(path.join(__dirname, 'corteSchema.js'));

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

module.exports = {getLatestRCC, getLatestPlusOneRCC, checkRCCinDB, isEmpty};