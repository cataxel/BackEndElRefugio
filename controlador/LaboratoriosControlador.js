var Laboratorio = require("../modelo/LaboratoriosModelo.js");
const Joi = require('joi');
/* Nombre: type: String,require: true,
    Direccion:type: String,require: true,
    Estado:type: String, require: true,,
    CP: type: String,require: true,
    Localidad: type: String,require: true,
    Email: type: String, require: true,
    }, */
const NuevoLaboratorio = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            Nombre: Joi.string().required(),
            Direccion: Joi.string().required(),
            Estado: Joi.string().required(),
            CP: Joi.string().required(),
            Localidad: Joi.string().required(),
            Email: Joi.string().required(),
            Estatus: Joi.bool()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            Nombre,
            Direccion,
            Estado,
            CP,
            Localidad,
            Email,
            Estatus
        } = req.body;
        const newlaboratorio = new Laboratorio({
            Nombre,
            Direccion,
            Estado,
            CP,
            Localidad,
            Email,
            Estatus
        });
        const guardado = await newlaboratorio.save();
        res.status(201).json(guardado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'El tipo de laboratorio ya existe' })
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
const ModificarLaboratorio = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            Nombre: Joi.string().required(),
            Direccion: Joi.string().required(),
            Estado: Joi.string().required(),
            CP: Joi.string().required(),
            Localidad: Joi.string().required(),
            Email: Joi.string().required(),
            Estatus: Joi.bool()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            Nombre,
            Direccion,
            Estado,
            CP,
            Localidad,
            Email,
            Estatus
        } = req.body;
        const laboratorioid = req.params.id;
        const laboratorio = await Laboratorio.findOneAndUpdate(
            { _id: laboratorioid },
            {
                Nombre,
                Direccion,
                Estado,
                CP,
                Localidad,
                Email,
                Estatus
            },
            { new: true, runValidators: true }
        );
        if (!laboratorio) {
            return res.status(404).json({ message: 'laboratorio not found' });
        }
        console.log(laboratorio)
        res.status(200).json(laboratorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const DesactivarLaboratorio = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            Estatus
        } = req.body;
        const laboratorioid = req.params.id;
        const laboratorio = await Laboratorio.findOneAndUpdate(
            { _id: laboratorioid },
            { Estatus: Estatus },
            { new: true, runValidators: true }
        )
        if (!laboratorio) {
            return res.status(404).json({ message: 'laboratorio not found' });
        }
        console.log(laboratorio)
        res.status(200).json(laboratorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const BuscarLaboratorioId = async function (req, res, next) {
    try {
        const laboratorio = await Laboratorio.findById(req.params.id);
        if (!laboratorio) {
            return res.status(404).json({ message: 'laboratorio not found' });
        }
        res.status(200).json(laboratorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Laboratorios = async function (req, res, next) {
    try {
        const laboratorio = await Laboratorio.find();
        res.status(200).json(laboratorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    NuevoLaboratorio,
    ModificarLaboratorio,
    DesactivarLaboratorio,
    BuscarLaboratorioId,
    Laboratorios
}