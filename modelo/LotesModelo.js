var mongoose = require('mongoose');
const LotesSchema = mongoose.Schema({
    Existencias:{
        type: Number,
        require: true,
    },
    FechaCaducidad:{
        type: Date,
        default: Date.now,
        require: true,
    },
    Estatus:{
        type: Boolean,
        default: true
    }
    
});
const Lotes = mongoose.model('Lotes', LotesSchema);

module.exports = Lotes;