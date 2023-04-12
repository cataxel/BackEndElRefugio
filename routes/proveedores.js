var express = require('express');
var router = express.Router();
const controlador = require('../controlador/ProveedoresControlador.js');
/* todos los proveedores */
router.get('/',controlador.Proveedors);
// un provedor por su id
router.post('/proveedorid',controlador.BuscarProveedorId);
// nuevo provedor
router.post('/nuevo',controlador.NuevoProveedor);
// modificar proveedor
router.post('/actualizar/:id',controlador.ModificarProveedor);
// eliminar proeedor
router.post('/desactivar/:id',controlador.DesactivarProveedor);


module.exports = router;