var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const LotesSchema = mongoose.Schema({
    ExistenciasFisica:{
        type: Number,
        required: true,
    },
    ExistenciasComprada:{
        type: Number,
    },
    FechaCaducidad:{
        type: Date,
        default: Date.now,
        required: true,
    },
    Estatus:{
        type: Boolean,
        default: true
    },
    Medicamento:{
        type: String,
    },
    Precio:{
        type: Number,
    },
    Compra: {
        type: Schema.Types.ObjectId,
        ref: 'Compras',
    },
});
const Lotes = mongoose.model('Lotes', LotesSchema);

module.exports = Lotes;