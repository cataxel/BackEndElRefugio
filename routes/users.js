var express = require('express');
var router = express.Router();
const controlador = require('../controlador/usuarioControlador.js');

// empleados
/* GET users listing. */
router.get('/', function (req, res, next) {
  // obtener todos los usuarios
  res.send('principal empleados');
});
// buscar usuario por id
router.get('/:usuarioid', (req, res, next) => {

})
// añadir usuario
router.get('/añadir', function (req, res, next) {

});
router.post('/añadir', controlador.BuscarUsuarioId);
// actualizar usuario
router.post('/actualizar/:usuarioid', controlador.ActualizarUsuario);
// desactivar los usuarios
router.get('/desactivar/:usuarioid', (req, res, next) => {

});
router.post('/desactivar/:usuarioid', controlador.DesactivarUsuario);

module.exports = router;
