var mongoose = require('mongoose');
const LaboratioriosSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
    Nombre:{
        type: String,
        require: true,
    },
    Direccion:{
        type: String,
        require: true,
    },
    Estado:{
        type: String,
        require: true,
    },
    CP:{
        type: String,
        require: true,
    },
    Localidad:{
        type: String,
        require: true,
    },
    Email:{
        type: String,
        require: true,
    },
    
});
const Laboratiorios = mongoose.model('Laboratiorios', LaboratioriosSchema);

module.export = Laboratiorios;