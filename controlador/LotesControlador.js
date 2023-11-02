// Import the LotesModelo module
var Lotes = require("../modelo/LotesModelo.js");

/**
 * Creates a new Lote.
 * @async
 * @function NuevoLotes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a status code and a message.
 */
const NuevoLotes = async function (req, res, next) {
    try {
        const Lote = [
            req.body.Montoabo,
            req.body.Fechacad,
            req.body.CveMed,
            req.body.Estatus
        ]
        Lotes.CreateLote(Lote, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(201).json({message: 'Lote created succesfully', id: result.insertId});
            }
        })     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Updates an existing Lote.
 * @async
 * @function ModificarLotes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a status code and a message.
 */
const ModificarLotes = async function (req, res, next) {
    try {
        const Lote = [
            req.body.Montoabo,
            req.body.Fechacad,
            req.body.CveMed,
            req.body.Estatus
        ]
        const loteid = req.params.id;
        Lotes.UpdateLote(Lote, loteid, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(201).json({message:'Lote Updated succesfully', id: result.insertId})
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Deactivates an existing Lote.
 * @async
 * @function DesactivarLotes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a status code and a message.
 */
const DesactivarLotes = async function (req, res, next) {
    try {
        const Estatus = req.body.Estatus;
        const CveLote = req.params.id;
        Lotes.SetOffLote(CveLote, Estatus, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(201).json({message:'Lote desact succesfully', id: result.insertId})
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Gets an existing Lote by ID.
 * @async
 * @function BuscarLotesId
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a status code and a message.
 */
const BuscarLotesId = async function (req, res, next) {
    try {
        const lote  = await Lotes.getLoteById(req.params.id);
        if(!lote){
            return res.status(404).json({message: 'Lote not found'});
        }
        res.status(200).json(lote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Gets all existing Lotes.
 * @async
 * @function TodosLotes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a status code and a message.
 */
const TodosLotes = async function (req, res, next) {
    try {
        const lote = await Lotes.getAllLotes();
        res.status(200).json(lote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Export the functions as an object
module.exports = {
    NuevoLotes,
    ModificarLotes,
    DesactivarLotes,
    BuscarLotesId,
    TodosLotes
}
