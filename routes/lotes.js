var express = require('express');
var router = express.Router();
const controlador = require('../controlador/LotesControlador.js');
/* todos los Lotes */
router.get('/',controlador.Lotes);
// un provedor por su id
router.post('/:id',controlador.BuscarLotesId);
// nuevo provedor
router.post('/nuevo',controlador.NuevoLotes);
// modificar Lote
router.post('/actualizar/:id',controlador.ModificarLotes);
// eliminar proeedor
router.post('/desactivar/:id',controlador.DesactivarLotes);


module.exports = router;