var express = require('express');
var router = express.Router();
/**
 * Controlador para manejar las ventas.
 * @type {Object}
 */
const controlador = require('../controlador/VentasControlador.js');
/* inicio */
router.get('/', controlador.Ventas);
// nueva venta
router.post('/nueva',controlador.NuevoVenta);
//buscar venta por id
router.get('/:id',controlador.BuscarVentaId);

module.exports = router;