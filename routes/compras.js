var express = require('express');
var router = express.Router();
const controlador = require('../controlador/ComprasControlador.js');
/* inicio */
router.get('/', controlador.Compras);
//buscar Compras por id
router.post('/:comprasid',controlador.CompraId);
// nueva Compras
router.post('/nuevacompra',controlador.NuevaCompra);

module.exports = router;