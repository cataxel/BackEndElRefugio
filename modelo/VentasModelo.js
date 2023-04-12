var mongoose = require('mongoose');
const LaboratioriosSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
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
    }
});
const Ventas = mongoose.model('Ventas', LaboratioriosSchema);

module.export = Ventas;