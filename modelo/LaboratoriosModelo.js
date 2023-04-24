var mongoose = require('mongoose');
const LaboratioriosSchema = mongoose.Schema({
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
    Estatus:{
        type: Boolean,
        default: true
    }
    
});
const Laboratiorios = mongoose.model('Laboratiorios', LaboratioriosSchema);

module.exports = Laboratiorios;