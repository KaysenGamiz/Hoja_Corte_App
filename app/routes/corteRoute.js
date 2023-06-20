const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const { getLatestRCC } = require(path.join(__dirname, '..', 'controllers', 'utils.js'));
const { createCorte , getCortes } = require(path.join(__dirname, '..', 'controllers', 'data_handler.js'));
const { CorteObj } = require(path.join(__dirname, '..', 'controllers','corte.js'));

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
        let rccNums = parseInt(rcc.replace('RCC', ''));
        rccNums += 1;

        let newRcc = 'RCC' + rccNums;

        res.status(200).send(newRcc);
    } catch (error) {
        console.log('Error al obtener el último RCC:', error);
        res.status(500).json({ error: 'Error al obtener los cortes' });
    }
});

// POST Crear Corte
router.post('/createCorte', async (req, res) => {
    let nuevoCorte;
  
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

module.exports = router;