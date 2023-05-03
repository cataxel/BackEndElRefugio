var mongoose = require('mongoose');
const ComprasSchema = mongoose.Schema({
    FechaCompra:{
        type: Date,
        default: Date.now,
        require: true,
    },
    CantidadCompra:{
        type: Number,
        require: true
    },
    TotalCompra:{
        type: Number,
        require: true,
    }
});
const Compras = mongoose.model('Compras', ComprasSchema);

module.exports = Compras;