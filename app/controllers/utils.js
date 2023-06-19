const path = require('path');
const { Corte } = require(path.join(__dirname, 'corteSchema.js'));

async function getLatestRCC() {

      const result = await Corte.findOne({ RCC: { $exists: true } })
        .sort({ _id: -1 }) // Ordenar en orden descendente por el campo "_id" para obtener el último documento
        .limit(1); // Limitar el resultado a un solo documento
  
      if (result) {
        return result.RCC;
      } else {
        console.log('No se encontró ningún RCC.');
        return null;
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

module.exports = {getLatestRCC, isEmpty};