var Usuarios = require("../modelo/usuarioModelo.js")
const Joi = require('joi');
// empleados
/* GET users listing. */
//buscar usuario por id
const BuscarUsuarioId = async function (req, res, next) {
    try {
        const user = await Usuarios.BuscarUsuarioId(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const CrearUsuario = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            nombreEmpleado: Joi.string().required(),
            telefonoEmpleado: Joi.string().required(),
            puestoEmpleado: Joi.string().required(),
            edadEmpleado: Joi.string().required(),
            sexoEmpleado: Joi.string(),
            AntiguedadEmpleado: Joi.date(),
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = new Usuarios({
            nombreEmpleado: value.nombreEmpleado,
            telefonoEmpleado: value.telefonoEmpleado,
            puestoEmpleado: value.puestoEmpleado,
            edadEmpleado: value.edadEmpleado,
            sexoEmpleado: value.sexoEmpleado,
            AntiguedadEmpleado: value.AntiguedadEmpleado,
            Estatus: value.Estatus
        }); */
        const { nombreEmpleado,
            telefonoEmpleado,
            puestoEmpleado,
            edadEmpleado,
            sexoEmpleado,
            AntiguedadEmpleado,
            Estatus } = req.body;
        const newUsuario = new Usuarios({nombreEmpleado,telefonoEmpleado,puestoEmpleado,edadEmpleado,sexoEmpleado,AntiguedadEmpleado,edadEmpleado,Estatus});
        const guardado = await newUsuario.save();
        res.status(201).json(guardado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'El numero de telefono ya existe' })
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
const ActualizarUsuario = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            nombreEmpleado: Joi.string().required(),
            telefonoEmpleado: Joi.string().required(),
            puestoEmpleado: Joi.string().required(),
            edadEmpleado: Joi.string().required(),
            sexoEmpleado: Joi.string(),
            AntiguedadEmpleado: Joi.date(),
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const { 
            nombreEmpleado,
            telefonoEmpleado,
            puestoEmpleado,
            edadEmpleado,
            sexoEmpleado,
            AntiguedadEmpleado,
            Estatus } = req.body;
        const userId = req.params.id;
        const User = await Usuarios.findOneAndUpdate(
            { _id: userId },
            {
                nombreEmpleado,
                telefonoEmpleado,
                puestoEmpleado,
                edadEmpleado,
                sexoEmpleado,
                AntiguedadEmpleado,
                Estatus
            },
            { new: true, runValidators: true }
        );
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(User)
        res.status(200).json(User);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const DesactivarUsuario = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
            
        }*/
        const Estatus = req.body.Estatus;  // posible error
        const userId = req.params.id;
        const User = await Usuarios.findOneAndUpdate(
            { _id: userId },
            { Estatus },
            { new: true, runValidators: true }
        );
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(User);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Usuario = async function (req,res,next){
    try{
        const user = await Usuarios.find();
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
