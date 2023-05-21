var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    },
    Lote:{
        type: Schema.ObjectId, ref: "Lotes",
    }
});
const Compras = mongoose.model('Compras', ComprasSchema);

module.exports = Compras;