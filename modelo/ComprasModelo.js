var mongoose = require('mongoose');
const ComprasSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
    FechaCompra:{
        type: Date,
        default: Date.now,
        require: true,
    },
    TotalCompra:{
        type: Number,
        require: true,
    }
});
const Compras = mongoose.model('Compras', ComprasSchema);

module.export = Compras;