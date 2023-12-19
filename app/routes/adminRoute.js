const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const config = require(path.join(__dirname, '..', 'config', 'config.js'));

const { deleteCorteByRCC } = require(path.join(__dirname, '..', 'controllers', 'utils.js'));

router.delete('/delete-corte-by-rcc', async (req, res) => {
    // Asegúrate de que se proporciona un RCC en la solicitud
    if (!req.query.rcc) {
        return res.status(400).send('RCC requerido');
    }

    try {
        const rcc = req.query.rcc;
        const result = await deleteCorteByRCC(rcc);

        if (result) {
            res.status(200).send(`Corte con RCC: ${rcc} eliminado exitosamente.`);
        } else {
            res.status(404).send(`No se encontró ningún corte con RCC: ${rcc}.`);
        }
    } catch (error) {
        res.status(500).send(`Error al eliminar el corte: ${error.message}`);
    }
});

module.exports = router;