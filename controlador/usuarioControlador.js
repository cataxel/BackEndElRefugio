const { use } = require("../app.js");
const UserModel = require("../modelo/usuarioModelo.js");
var Usuarios = require("../modelo/usuarioModelo.js")
const Joi = require('joi');
// empleados
/* GET users listing. */
//buscar usuario por id
const BuscarUsuarioId = async function (req, res, next) {
    try {
        const user = await Usuarios.getUserById(req.params.id);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const CrearUsuario = async function (req, res, next) {
    var User = [
        req.body.NombreEmp,
        req.body.TelEmp,
        req.body.PuestoEmp,
        req.body.EdadEmp,
        req.body.SexoEmp,
        req.body.AntigEmp,
        req.body.Estatus
    ]
    console.log(User);
    UserModel.createUser(User, (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'User created succesfully', id: result.insertId});
        }
    })
    
}
const ActualizarUsuario = async function (req, res, next) {
    try {
        var Userpar = [
            req.body.NombreEmp,
            req.body.TelEmp,
            req.body.PuestoEmp,
            req.body.EdadEmp,
            req.body.SexoEmp,
            req.body.AntigEmp,
            req.body.Estatus
        ]
        const userId = req.params.id;
        const User = await Usuarios.updateUser(Userpar,userId);
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(User)
        res.status(200).json({message: 'Usuario updated succesfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const DesactivarUsuario = async function (req, res, next) {
    try {
        const Estatus = req.body.Estatus;  // posible error
        const userId = req.params.id;
        const User = await Usuarios.desactivateUser(userId,Estatus);
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({message:"Usuario Updated Succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Usuario = async function (req,res,next){
    try{
        const user = await Usuarios.getAllUsers();
        console.log(user);
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    Usuario,
    BuscarUsuarioId,
    CrearUsuario,
    ActualizarUsuario,
    DesactivarUsuario,
}
