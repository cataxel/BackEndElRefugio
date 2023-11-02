var express = require('express');
var router = express.Router();
/**
 * Require the LotesControlador module for handling lotes routes.
 * @const {Object} controlador
 */
const controlador = require('../controlador/LotesControlador.js');
/* todos los Lotes */
router.get('/',controlador.TodosLotes);
// nuevo lote
router.post('/nuevo',controlador.NuevoLotes);
// modificar Lote
router.put('/actualizar/:id',controlador.ModificarLotes);
// eliminar proeedor
router.put('/desactivar/:id',controlador.DesactivarLotes);
// un lote por su id
router.get('/:id',controlador.BuscarLotesId);

module.exports = router;