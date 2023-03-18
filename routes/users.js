var express = require('express');
var router = express.Router();

// empleados
/* GET users listing. */
router.get('/', function(req, res, next) {
  // obtener todos los usuarios
  res.send('principal empleados');
});
// buscar usuario por id
router.get('/:usuarioid',(req,res,next)=>{

})
// añadir usuario
router.get('/añadir',function(req,res,next){

});
router.post('/añadir',function(req,res,next){

});
// actualizar usuario
router.put('/actualizar/:usuarioid',(req,res,next)=>{

});
// desactivar los usuarios
router.get('/desactivar/:usuarioid',(req,res,next)=>{

});
router.post('/desactivar/:usuarioid',(req,res,next)=>{

});

module.exports = router;
