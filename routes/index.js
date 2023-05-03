var express = require('express');
var router = express.Router();
const controlador = require('../controlador/indexControlador')

router.get('/', controlador.GraficaVentas);

module.exports = router;
