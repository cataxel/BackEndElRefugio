/**
 * Express router for handling Medicamentos related requests.
 * @module routes/Medicamentos
 */

var express = require('express');
var router = express.Router();
const controlador = require('../controlador/MedicamentosControlador.js');

/**
 * Route for getting all Medicamentos.
 * @name get/
 * @function
 * @memberof module:routes/Medicamentos
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.get('/',controlador.Medicamentos);

/**
 * Route for creating a new Medicamento.
 * @name post/nuevo
 * @function
 * @memberof module:routes/Medicamentos
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.post('/nuevo',controlador.NuevoMedicamento);

/**
 * Route for updating an existing Medicamento.
 * @name put/actualizar/:id
 * @function
 * @memberof module:routes/Medicamentos
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.put('/actualizar/:id',controlador.ModificarMedicamento);

/**
 * Route for deleting an existing Medicamento.
 * @name put/desactivar/:id
 * @function
 * @memberof module:routes/Medicamentos
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.put('/eliminar/:id',controlador.EliminarMedicamento);

/**
 * Route for getting a Medicamento by its id.
 * @name get/:id
 * @function
 * @memberof module:routes/Medicamentos
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.get('/:id',controlador.BuscarMedicamentoId);

module.exports = router;
