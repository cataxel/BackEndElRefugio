var express = require('express');
var router = express.Router();
const controlador = require('../controlador/MedicamentosControlador.js');
/* todos los Medicamento */
router.get('/',controlador.Medicamentos);

// nuevo Medicamento
router.post('/nuevo',controlador.NuevoMedicamento);
// modificar Medicamento
router.put('/actualizar/:id',controlador.ModificarMedicamento);
// eliminar Medicamento
router.put('/desactivar/:id',controlador.EliminarMedicamento);
// un Medicamento por su id
router.post('/:id',controlador.BuscarMedicamentoId);

module.exports = router;
