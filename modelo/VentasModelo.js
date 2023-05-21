var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const VentaSchema = mongoose.Schema({
    Iva:{
        type: Number,
        require: true,
    },
    SubTotal:{
        type: Number,
        require: true,
    },
    Fecha:{
        type: Date,
        default: Date.now,
        require: true,
    },
    MetodoPago:{
        type: String,
        require: true,
    },
    CantidadVendida:{
        type: Number,
        require: true,
    },
    Lote:{
        type: Schema.Types.ObjectId,
        ref: "lotes",
    }
});
const Ventas = mongoose.model('Ventas', VentaSchema);

module.exports = Ventas;