const path = require('path');
const { Corte } = require(path.join(__dirname, 'corteSchema.js'));
const { CorteObj } = require(path.join(__dirname, 'corte.js'));
const mongoose = require('mongoose');

async function createCorte(corteObject) {

    const nuevoCorte = new Corte({
        RCC: corteObject.RCC,
        efectivo: corteObject.efectivo,
        dolares: corteObject.dolares,
        retiroEnEfectivo: corteObject.retiroEnEfectivo,
        tarjeta: corteObject.tarjeta,
        comprasEfectivo: corteObject.comprasEfectivo,
        gastosEfectivo: corteObject.gastosEfectivo,
        vales: corteObject.vales,
        devoluciones: corteObject.devoluciones,
        totalCorte: corteObject.totalCorte,
        totalSistema: corteObject.totalSistema,
        diferencia: corteObject.diferencia,
        recibido: corteObject.recibido,
        cajero: corteObject.cajero,
        fecha: corteObject.fecha,
        hora: corteObject.hora,
    });

    await nuevoCorte.save();
}
  

async function getCortes(){
    try {
        const resultados = await Corte.find();
        
        if (resultados.length > 0) {
          return resultados;
        } else {
          console.log('No se encontraron datos en la base de datos.');
        }
      } catch (error) {
        console.log('Error al consultar los datos:', error);
      }
}

exports.createCorte = createCorte;
exports.getCortes = getCortes;