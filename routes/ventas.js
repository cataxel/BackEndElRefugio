var express = require('express');
var router = express.Router();
const controlador = require('../controlador/VentasControlador.js');
/* inicio */
router.get('/', controlador.Ventas);
//buscar venta por id
router.post('/:ventaid',controlador.BuscarVentaId);
// nueva venta
router.post('/NuevaVenta',controlador.NuevoVenta);

module.exports = router;