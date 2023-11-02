/**
 * Express application module.
 * @module app
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

//var connectarDB = require("./config/db");
var connectarDB = require("./config/mysql");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var comprasRouter = require('./routes/compras');
var ventasRouter = require('./routes/ventas');
var lotesRouter = require('./routes/lotes');
var laboratoriosRouter = require('./routes/laboratorios');
var proveedoresRouter = require('./routes/proveedores');
var medicamentosRouter = require('./routes/Medicamentos');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.time()

/**
 * Route for the index page.
 * @name get/
 * @function
 * @memberof module:app
 */
app.use('/', indexRouter);

/**
 * Route for the users page.
 * @name get/users
 * @function
 * @memberof module:app
 */
app.use('/users', usersRouter);

/**
 * Route for the compras page.
 * @name get/compras
 * @function
 * @memberof module:app
 */
app.use('/compras', comprasRouter);

/**
 * Route for the ventas page.
 * @name get/ventas
 * @function
 * @memberof module:app
 */
app.use('/ventas',ventasRouter);

/**
 * Route for the lotes page.
 * @name get/lotes
 * @function
 * @memberof module:app
 */
app.use('/lotes',lotesRouter);

/**
 * Route for the laboratorios page.
 * @name get/laboratorios
 * @function
 * @memberof module:app
 */
app.use('/laboratorios',laboratoriosRouter);

/**
 * Route for the proveedores page.
 * @name get/proveedor
 * @function
 * @memberof module:app
 */
app.use('/proveedor',proveedoresRouter);

/**
 * Route for the medicamentos page.
 * @name get/medicamentos
 * @function
 * @memberof module:app
 */
app.use('/medicamentos',medicamentosRouter);

console.timeEnd()

module.exports = app;
