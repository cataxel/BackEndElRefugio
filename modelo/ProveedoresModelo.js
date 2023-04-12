var mongoose = require('mongoose');
const ProveedoresSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
    nombreProveedores:{
        type: String,
        require: true,
    },
    telefonoProveedores:{
        type: String,
        require: true,
        unique: true
    },
    LocalidadProveedores:{
        type:String,
    },
    EstadoProveedores:{
        type:String,
    },
    CPProveedores:{
        type:String,
    },
    DireccionProveedores:{
        type:String,
    }
});
const Proveedores = mongoose.model('Proveedores', ProveedoresSchema);

module.export = Proveedores;