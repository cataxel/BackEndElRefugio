var express = require('express');
var router = express.Router();
const controlador = require('../controlador/ProveedoresControlador.js');
/* todos los proveedores */
router.get('/',controlador.Proveedores);
// un provedor por su id
router.post('/proveedorid',controlador.BuscarProveedorId);
// nuevo provedor
router.post('/nuevo',controlador.NuevoProveedor);
// modificar proveedor
router.put('/actualizar/:id',controlador.ModificarProveedor);
// desactivar proveedor
router.put('/desactivar/:id',controlador.DesactivarProveedor);


module.exports = router;