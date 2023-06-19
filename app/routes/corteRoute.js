const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const { createCorte , getCortes } = require(path.join(__dirname, '..', 'controllers', 'data_handler.js'));

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

module.exports = router;