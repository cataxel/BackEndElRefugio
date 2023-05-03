const Venta = require("../modelo/VentasModelo.js");
const Joi = require('joi');
const NuevoVenta = async function(req,res,next){
    try {
        const Schema = Joi.object({
            Iva: Joi.number().required(),
            SubTotal:Joi.number().required(),
            Fecha:Joi.date().required(),
            MetodoPago:Joi.string().required()

        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const {
            Fecha,
            Iva,
            SubTotal,
            MetodoPago
        } = value;
        const newVenta = new Venta({
            Fecha,
            Iva,
            SubTotal,
            MetodoPago
        });
        const guardado = await newVenta.save();
        res.status(201).json(guardado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const BuscarVentaId = async function(req,res,next){
    try {
        const venta = await Venta.findById(req.params.id);
        if (!venta) {
            return res.status(404).json({ message: 'compra not found' });
        }
        res.status(200).json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Ventas = async function(req,res,next){
    try {
        const venta = await Venta.find();
        res.status(200).json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    NuevoVenta,
    BuscarVentaId,
    Ventas
}