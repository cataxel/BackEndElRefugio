const { boolean } = require('joi');
var mongoose = require('mongoose');
const ProveedoresSchema = mongoose.Schema({
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
    },
    Estatus:{
        type: Boolean,
        default: true
    }
});
const Proveedor = mongoose.model('Proveedores', ProveedoresSchema);

module.exports = Proveedor;