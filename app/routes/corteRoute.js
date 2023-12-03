const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { Corte } = require(path.join(__dirname, '..', 'controllers', 'corteSchema.js'));
const { getLatestRCC , getLatestPlusOneRCC, checkRCCinDB, leerArchivoJSON, escribirArchivoJSON, validarYActualizarCorteLocal} = require(path.join(__dirname, '..', 'controllers', 'utils.js'));
const { createCorte , getCortes } = require(path.join(__dirname, '..', 'controllers', 'data_handler.js'));
const { CorteObj } = require(path.join(__dirname, '..', 'controllers','corte.js'));
const config = require(path.join(__dirname, '..', 'config', 'config.js'));

// Aqui se haran las rutas de corte para el CRUD con la base de datos

// GET Todos los cortes
router.get('/', async (req, res) => {
    try {
        const cortes = await getCortes();
        console.log(cortes);
        res.status(200).json(cortes);
    } catch (error) {
        console.log('Error al obtener los cortes:', error);
        res.status(500).json({ error: 'Error al obtener los cortes' });
    }
});

// GET RCC para hacer display en nuevo corte, por eso la suma
router.get('/rcc', async (req, res) => {
    try {
        const rcc = await getLatestRCC();

        res.status(200).send(rcc);
    } catch (error) {
        console.log('Error al obtener el último RCC:', error);
        res.status(500).json({ error: 'Error al obtener último RCC' });
    }
});

router.get('/rcc-plus-one', async (req, res) => {
    try {
        const rcc = await getLatestPlusOneRCC();

        res.status(200).send(rcc);
    } catch (error) {
        console.log('Error al obtener el último RCC:', error);
        res.status(500).json({ error: 'Error al obtener último RCC' });
    }
});

router.get('/rcc-validation', async (req, res) => {
    try {
        var rccToValidate = req.query.rcc;
        var found = await checkRCCinDB(rccToValidate);
        
        if(found) { 
            res.status(200).json( {found: true} );
        } else { 
            res.status(200).json( {found: false} );
        }

    } catch (error) {
        console.log('Error al validar el último RCC:', error);
        res.status(500).json({ error: 'Error al obtener los cortes' });
    }
});

// POST Crear Corte
router.post('/createCorte', async (req, res) => {
    let nuevoCorte;
    console.log(req.body)
    if (typeof req.body === 'object') {
        nuevoCorte = CorteObj.fromObject(req.body);
    } else if (typeof req.body === 'string') {
        nuevoCorte = CorteObj.fromJSON(req.body);
    } else {
        return res.status(400).send('Tipo de elemento no válido en req.body');
    }
  
    createCorte(nuevoCorte);
  
    res.status(200).send('Corte creado!');
});

// POST Crear Corte Local
router.post('/agregar-corte', (req, res) => {
    const corteData = req.body;
  
    leerArchivoJSON((errorLectura, datos) => {
        if (errorLectura) {
            console.error('Error al leer el archivo:', errorLectura);
            return res.status(500).send('Error al leer el archivo');
        }
  
    const datosActualizados = validarYActualizarCorteLocal(datos, corteData);

    escribirArchivoJSON(datosActualizados, errorEscritura => {
        if (errorEscritura) {
            console.error('Error al guardar el archivo:', errorEscritura);
            return res.status(500).send('Error al guardar el archivo');
        }
            res.status(config.HTTP.OK).send('Corte procesado exitosamente');
        });
    });
});

module.exports = router;