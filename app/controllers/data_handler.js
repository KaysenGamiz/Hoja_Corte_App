const path = require('path');
const { Corte } = require(path.join(__dirname, 'corteSchema.js'));
const { CorteObj } = require(path.join(__dirname, 'corte.js'))
const mongoose = require('mongoose');

async function connect(){
    const mongoConection = `mongodb+srv://admin:hOSqjRp4kzteVwZL@cortes.9iadh5h.mongodb.net/CortesDB`;
    let db = mongoose.connection;
    db.on('connecting', () => {
        console.log('Connecting...');
    });
    db.on('connected', () => {
        console.log('Connected succesfully');
    });
    await mongoose.connect(mongoConection, {useNewUrlParser: true});
}

connect();

async function createCorte(corteObject) {
    await corteObject.initializeRCC();

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

const objetoPrueba = new CorteObj(
    [100, 200, 300], // efectivo
    { tasaCambio: 1.2, cantidad: 50 }, // dolares
    'No', // retiroEnEfectivo
    'Visa', // tarjeta
    { producto1: 10, producto2: 20 }, // comprasEfectivo
    { gasto1: 30, gasto2: 40 }, // gastosEfectivo
    { vale1: 5, vale2: 10 }, // vales
    { devolucion1: 15, devolucion2: 20 }, // devoluciones
    500, // totalSistema
    50, // diferencia
    'Sí', // recibido
    'Juan', // cajero
    '2023-06-18', // fecha
    '10:30 AM' // hora
);

createCorte(objetoPrueba);

exports.createCorte = createCorte;
exports.getCortes = getCortes;