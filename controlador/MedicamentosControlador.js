var Medicamento = require("../modelo/MedicamentosModelo.js");
var Joi = require("joi");
const NuevoMedicamento = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            nombreMedicamento: Joi.string().required(),
            tipoMedicamento: Joi.string().required(),
            PrecioCompra: Joi.number().required(),
            PrecioVenta: Joi.number().required(),
            Ganancia: Joi.number().required(),
            Aplicacion: Joi.string().required(),
            RecetaNecesaria: Joi.bool.required(),
            Compuesto: Joi.string().required(),
            Contendido: Joi.string().required(),
            PatenteOGenerico: Joi.string().required()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            nombreMedicamento,
            tipoMedicamento,
            PrecioCompra,
            PrecioVenta,
            Ganancia,
            Aplicacion,
            RecetaNecesaria,
            Compuesto,
            Contenido,
            PatenteOGenerico,
            Laboratorio,
        } = req.body;
        const newMedicamento = new Medicamento({
            nombreMedicamento,
            tipoMedicamento,
            PrecioCompra,
            PrecioVenta,
            Ganancia,
            Aplicacion,
            RecetaNecesaria,
            Compuesto,
            Contenido,
            PatenteOGenerico,
            Laboratorio
        });
        const guardado = await newMedicamento.save();
        res.status(201).json(guardado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'El tipo de medicamento ya existe' })
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
const ModificarMedicamento = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            nombreMedicamento: Joi.string().required(),
            tipoMedicamento: Joi.string().required(),
            PrecioCompra: Joi.number().required(),
            PrecioVenta: Joi.number().required(),
            Ganancia: Joi.number().required(),
            Aplicacion: Joi.string().required(),
            RecetaNecesaria: Joi.bool.required(),
            Compuesto: Joi.string().required(),
            Contendido: Joi.string().required(),
            PatenteOGenerico: Joi.string().required()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const { nombreMedicamento,
            tipoMedicamento,
            PrecioCompra,
            PrecioVenta,
            Ganancia,
            Aplicacion,
            RecetaNecesaria,
            Compuesto,
            Contenido,
            PatenteOGenerico,
            Laboratorio
        } = req.body;
        const medicamentoid = req.params.id;
        const medicamento = await Medicamento.findOneAndUpdate(
            { _id: medicamentoid },
            {
                nombreMedicamento,
                tipoMedicamento,
                PrecioCompra,
                PrecioVenta,
                Ganancia,
                Aplicacion,
                RecetaNecesaria,
                Compuesto,
                Contenido,
                PatenteOGenerico,
                Laboratorio
            },
            { new: true, runValidators: true }
        );
        if (!medicamento) {
            return res.status(404).json({ message: 'medicamento not found' });
        }
        console.log(medicamento)
        res.status(200).json(medicamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const EliminarMedicamento = async function (req, res, next) {
    try {
        const medicamentoid = req.params.id;
        const medicamento = await Medicamento.deleteOne(
            {_id:medicamentoid}
        )
        if (!medicamento) {
            return res.status(404).json({ message: 'medicamento not found' });
        }
        console.log(medicamento)
        res.status(200).json(medicamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const BuscarMedicamentoId = async function (req, res, next) {
    try {
        const medicameno = await Medicamento.findById(req.params.id);
        if (!medicameno) {
            return res.status(404).json({ message: 'medicamento not found' });
        }
        res.status(200).json(medicameno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Medicamentos = async function (req, res, next) {
    try{
        const medicamento = await Medicamento.find();
        res.status(200).json(medicamento);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    NuevoMedicamento,
    ModificarMedicamento,
    EliminarMedicamento,
    BuscarMedicamentoId,
    Medicamentos
}
