const Compras = require("../modelo/ComprasModelo.js");
const Joi = require('joi');
// empleados
const CompraId = async function(req,res, next){
    try {
        const compra = await Compras.findById(req.params.id);
        if (!compra) {
            return res.status(404).json({ message: 'compra not found' });
        }
        res.status(200).json(compra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const NuevaCompra = async function(req,res, next){
    try {
        /*
        const Schema = Joi.object({
            FechaCompra:Joi.date().required(),
            CantidadCompra: Joi.number().required(),
            TotalCompra:Joi.number().required()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            FechaCompra,
            CantidadCompra,
            TotalCompra
        } = req.body;
        const newCompra = new Compras({
            FechaCompra,
            CantidadCompra,
            TotalCompra });
        const guardado = await newCompra.save();
        res.status(201).json(guardado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Compra ya existe' })
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
const Compra = async function(req,res,next){
    try {
        const Compra = await Compras.find();
        res.status(200).json(Compra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    CompraId,
    NuevaCompra,
    Compra
}