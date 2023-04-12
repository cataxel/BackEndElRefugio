var express = require('express');
var router = express.Router();
const controlador = require('../controlador/LaboratoriosControlador.js');
/* todos los Laboratorios */
router.get('/',controlador.Laboratorios);
// un provedor por su id
router.post('/:id',controlador.BuscarLaboratorioId);
// nuevo provedor
router.post('/nuevo',controlador.NuevoLaboratorio);
// modificar Laboratorio
router.post('/actualizar/:id',controlador.ModificarLaboratorio);
// eliminar proeedor
router.post('/desactivar/:id',controlador.DesactivarLaboratorio);


module.exports = router;