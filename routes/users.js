var express = require('express');
var router = express.Router();
const controlador = require('../controlador/usuarioControlador.js');

// empleados
/* GET users listing. */
router.get('/', controlador.Usuario);
// buscar usuario por id
router.post('/:id',controlador.BuscarUsuarioId);
// añadir usuario
router.post('/nuevo', controlador.CrearUsuario);
// actualizar usuario
router.put('/actualizar/:id', controlador.ActualizarUsuario);
// desactivar los usuarios
router.put('/desactivar/:id', controlador.DesactivarUsuario);

module.exports = router;
