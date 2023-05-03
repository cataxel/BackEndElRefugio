var express = require('express');
var router = express.Router();
const controlador = require('../controlador/ComprasControlador.js');
/* inicio */
router.get('/', controlador.Compra);
// nueva Compras
router.post('/nueva',controlador.NuevaCompra);
//buscar Compras por id
router.post('/:id',controlador.CompraId);
module.exports = router;