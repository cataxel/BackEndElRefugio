var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lotes = require('./LotesModelo.js');

const ComprasSchema = mongoose.Schema({
    FechaCompra:{
        type: Date,
        default: Date.now,
        required: true,
    },
    CantidadCompra:{
        type: Number,
        required: true
    },
    TotalCompra:{
        type: Number,
        required: true,
    },
    Lotes: [lotes.schema],
});
const Compras = mongoose.model('Compras', ComprasSchema);

module.exports = Compras;