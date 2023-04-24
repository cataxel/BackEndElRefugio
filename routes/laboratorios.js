var express = require('express');
var router = express.Router();
const controlador = require('../controlador/LaboratoriosControlador.js');
/* todos los Laboratorios */
router.get('/',controlador.Laboratorios);
// nuevo provedor
router.post('/nuevo/',controlador.NuevoLaboratorio);
// modificar Laboratorio
router.put('/actualizar/:id',controlador.ModificarLaboratorio);
// eliminar proeedor
router.put('/desactivar/:id',controlador.DesactivarLaboratorio);
// un provedor por su id
router.post('/:id',controlador.BuscarLaboratorioId);


module.exports = router;