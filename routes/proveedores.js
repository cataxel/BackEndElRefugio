var express = require('express');
var router = express.Router();
const controlador = require('../controlador/ProveedoresControlador.js');
/* todos los proveedores */
router.get('/',controlador.Proveedores);
// nuevo provedor
router.post('/nuevo',controlador.NuevoProveedor);
// modificar proveedor
router.put('/actualizar/:id',controlador.ModificarProveedor);
// desactivar proveedor
router.put('/desactivar/:id',controlador.DesactivarProveedor);
// un provedor por su id
router.get('/:id',controlador.BuscarProveedorId);

module.exports = router;