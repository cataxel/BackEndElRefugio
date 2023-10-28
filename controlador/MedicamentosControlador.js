const Medicamento = require("../modelo/MedicamentosModelo.js");

/**
 * Creates a new medicine in the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with a success or error message.
 */
const NuevoMedicamento = async function (req, res, next) {
    try {
        const medicamento = [
            req.body.NomMed,
            req.body.TipoMed,
            req.body.PrecioCmp,
            req.body.PrecioVta,
            req.body.Ganancia,
            req.body.Apmed,
            req.body.RecNec,
            req.body.CompMed,
            req.body.ContMed,
            req.body.Pat_o_Gen
        ]
        console.log(medicamento)
        Medicamento.CreateMedicine(medicamento, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: 'Medicine created succesfully', id: result.insertId});
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Updates an existing medicine in the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with a success or error message.
 */
const ModificarMedicamento = async function (req, res, next) {
    try {
        const medicamento = [
            req.body.NomMed,
            req.body.TipoMed,
            req.body.PrecioCmp,
            req.body.PrecioVta,
            req.body.Ganancia,
            req.body.Apmed,
            req.body.RecNec,
            req.body.CompMed,
            req.body.ContMed,
            req.body.Pat_o_Gen
        ]
        const medicamentoid = req.params.id;
        Medicamento.UpdateMedicine(medicamento, medicamentoid, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: 'Medicine updated succesfully', id: result.insertId});
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Deletes an existing medicine from the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with a success or error message.
 */
const EliminarMedicamento = async function (req, res, next) {
    try {
        const medicamentoid = req.params.id;
        Medicamento.DeleteMedicine(medicamentoid, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(200).json({message: 'Medicine delete succesfully'});
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Retrieves a medicine from the database by its ID.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with the retrieved medicine or an error message.
 */
const BuscarMedicamentoId = async function (req, res, next) {
    try {
        const med = await Medicamento.getMedicineById(req.params.id);
        if (!med) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.status(200).json(med);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Retrieves all medicines from the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with the retrieved medicines or an error message.
 */
const Medicamentos = async function (req, res, next) {
    try {
        const med = await Medicamento.getAllMedicines();
        res.status(200).json(med);
    } catch (error) {
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
