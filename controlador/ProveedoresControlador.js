var Proveedor = require("../modelo/ProveedoresModelo.js");
const Joi = require('joi');

const NuevoProveedor = async function (req, res, next) {
    try {
        const Schema = Joi.object({
            nombreProveedores: Joi.string().required(),
            telefonoProveedores: Joi.string().required(),
            LocalidadProveedores: Joi.string(),
            EstadoProveedores: Joi.string(),
            CPProveedores: Joi.string(),
            DireccionProveedores: Joi.string(),
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { 
            nombreProveedores,
            telefonoProveedores,
            LocalidadProveedores,
            EstadoProveedores,
            CPProveedores,
            DireccionProveedores,
            Estatus
        } = value;
        const newProveedor = new Proveedor({nombreProveedores,telefonoProveedores,LocalidadProveedores,EstadoProveedores,CPProveedores,DireccionProveedores,Estatus});
        const guardado = await newProveedor.save();
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
const ModificarProveedor = async function (req, res, next) {
    try {
        const Schema = Joi.object({
            nombreProveedores: Joi.string().required(),
            telefonoProveedores: Joi.string().required(),
            LocalidadProveedores: Joi.string(),
            EstadoProveedores: Joi.string(),
            CPProveedores: Joi.string(),
            DireccionProveedores: Joi.string(),
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { nombreProveedores,
            telefonoProveedores,
            LocalidadProveedores,
            EstadoProveedores,
            CPProveedores,
            DireccionProveedores,
            Estatus
        } = value;
        const proveedorId = req.params.id;
        const proveedor = await Proveedor.findOneAndUpdate(
            { _id: proveedorId },
            {
                nombreProveedores,
                telefonoProveedores,
                LocalidadProveedores,
                EstadoProveedores,
                CPProveedores,
                DireccionProveedores,
                Estatus
            },
            { new: true, runValidators: true }
        );
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor not found' });
        }
        console.log(proveedor)
        res.status(200).json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const DesactivarProveedor = async function (req, res, next) {
    try {
        const Schema = Joi.object({
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const {
            Estatus
        } = value;
        const proveedorId = req.params.id;
        const proveedor = await Proveedor.findOneAndUpdate(
            { _id: proveedorId },
            {
                Estatus
            },
            { new: true, runValidators: true }
        );
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor not found' });
        }
        console.log(proveedor)
        res.status(200).json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const BuscarProveedorId = async function (req, res, next) {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'proveedor not found' });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Proveedores = async function (req, res, next) {
    try{
        const proveedor = await Proveedor.find();
        res.status(200).json(proveedor);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    NuevoProveedor,
    ModificarProveedor,
    DesactivarProveedor,
    BuscarProveedorId,
    Proveedores
}