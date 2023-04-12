var express = require('express');
var router = express.Router();
const controlador = require('../controlador/MedicamentosControlador.js');
/* todos los Medicamento */
router.get('/',controlador.Medicamentos);
// un Medicamento por su id
router.post('/:id',controlador.BuscarMedicamentoId);
// nuevo Medicamento
router.post('/nuevo',controlador.NuevoMedicamento);
// modificar Medicamento
router.post('/actualizar/:id',controlador.ModificarMedicamento);
// eliminar Medicamento
router.post('/desactivar/:id',controlador.EliminarMedicamento);


module.exports = router;