/**
 * Express router for handling Compras routes.
 * @module routes/compras
 */

var express = require('express');
var router = express.Router();
const controlador = require('../controlador/ComprasControlador.js');

/**
 * Route for getting all Compras.
 * @name get/
 * @function
 * @memberof module:routes/compras
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.get('/', controlador.Compra);

/**
 * Route for creating a new Compra.
 * @name post/nueva
 * @function
 * @memberof module:routes/compras
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.post('/nueva',controlador.NuevaCompra);

/**
 * Route for getting a Compra by id.
 * @name get/:id
 * @function
 * @memberof module:routes/compras
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
router.get('/:id',controlador.CompraId);

module.exports = router;
