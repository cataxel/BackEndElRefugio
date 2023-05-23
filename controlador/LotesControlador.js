var Lotes = require("../modelo/LotesModelo.js");
const Joi = require('joi');

const NuevoLotes = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            Existencias: Joi.string().required(),
            FechaCaducidad: Joi.date().required(),
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            ExistenciasFisica,
            ExistenciasComprada,
            FechaCaducidad,
            Estatus,
            Medicamento,
            Precio,
        } = req.body;
        const newLote = new Lotes({ ExistenciasFisica,
            ExistenciasComprada, FechaCaducidad, Estatus, Medicamento, Precio });
        const guardado = await newLote.save();
        res.status(201).json(guardado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'lote ya existe' })
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
const ModificarLotes = async function (req, res, next) {
    try {
        /*
        const Schema = Joi.object({
            Existencias: Joi.string().required(),
            FechaCaducidad: Joi.date().required(),
            Estatus: Joi.boolean()
        });
        const { error, value } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }*/
        const {
            ExistenciasFisica,
            FechaCaducidad,
            Estatus,
            Medicamento,
            Precio
        } = req.body;
        const loteid = req.params.id;
        const lotes = await Lotes.findOneAndUpdate(
            { _id: loteid },
            {
                ExistenciasFisica,
                FechaCaducidad,
                Estatus,
                Medicamento,
                Precio,
            },
            { new: true, runValidators: true }
        );
        if (!lotes) {
            return res.status(404).json({ message: 'Lotes not found' });
        }
        console.log(lotes)
        res.status(200).json(lotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const DesactivarLotes = async function (req, res, next) {
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
        const loteid = req.params.id;
        const lotes = await Lotes.findOneAndUpdate(
            { _id: loteid },
            {
                Estatus
            },
            { new: true, runValidators: true }
        );
        if (!lotes) {
            return res.status(404).json({ message: 'Lotes not found' });
        }
        console.log(lotes)
        res.status(200).json(lotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const BuscarLotesId = async function (req, res, next) {
    try {
        const lotes = await Lotes.findById(req.params.id);
        if (!lotes) {
            return res.status(404).json({ message: 'lotes not found' });
        }
        res.status(200).json(lotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const TodosLotes = async function (req, res, next) {
    try {
        const lote = await Lotes.find();
        res.status(200).json(lote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    NuevoLotes,
    ModificarLotes,
    DesactivarLotes,
    BuscarLotesId,
    TodosLotes
}