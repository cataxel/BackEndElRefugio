var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var connectarDB = require("./config/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var comprasRouter = require('./routes/compras');
var ventasRouter = require('./routes/ventas');
var lotesRouter = require('./routes/lotes');
var laboratoriosRouter = require('./routes/laboratorios');
var proveedoresRouter = require('./routes/proveedores');
var medicamentosRouter = require('./routes/Medicamentos');

var app = express();

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connectarDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/compras', comprasRouter);
app.use('/ventas',ventasRouter);
app.use('/lotes',lotesRouter);
app.use('/laboratorios',laboratoriosRouter);
app.use('/proveedor',proveedoresRouter);
app.use('/medicamentos',medicamentosRouter);

module.exports = app;
