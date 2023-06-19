const mongoose = require('mongoose');

const corteSchema = new mongoose.Schema({
    RCC: {
        type: String,
        required: true
    },
    efectivo: {
        type: [Number]
    },
    dolares: {
        type: mongoose.Schema.Types.Mixed
    },
    retiroEnEfectivo: {
        type: String
    },
    tarjeta: {
        type: String
    },
    comprasEfectivo: {
        type: mongoose.Schema.Types.Mixed
    },
    gastosEfectivo: {
        type: mongoose.Schema.Types.Mixed
    },
    vales: {
        type: mongoose.Schema.Types.Mixed
    },
    devoluciones: {
        type: mongoose.Schema.Types.Mixed
    },
    totalSistema: {
        type: Number
    },
    diferencia: {
        type: Number
    },
    recibido: {
        type: String
    },
    cajero: {
        type: String
    },
    fecha: {
        type: String
    },
    hora: {
        type: String
    }
});

const Corte = mongoose.model('Cortes', corteSchema);

module.exports = { Corte: Corte };