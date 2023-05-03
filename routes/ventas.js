var express = require('express');
var router = express.Router();
const controlador = require('../controlador/VentasControlador.js');
/* inicio */
router.get('/', controlador.Ventas);
// nueva venta
router.post('/nueva',controlador.NuevoVenta);
//buscar venta por id
router.post('/:id',controlador.BuscarVentaId);

module.exports = router;