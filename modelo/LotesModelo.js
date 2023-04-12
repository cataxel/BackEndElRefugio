var mongoose = require('mongoose');
const LotesSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
    Existencias:{
        type: Number,
        require: true,
    },
    FechaCaducidad:{
        type: Date,
        default: Date.now,
        require: true,
    },
    
});
const Lotes = mongoose.model('Lotes', LotesSchema);

module.export = Lotes;