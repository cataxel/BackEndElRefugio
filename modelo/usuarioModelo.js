var mongoose = require('mongoose');
const empleadoSchema = mongoose.Schema({
    nombreEmpleado:{
        type: String,
        require: true,
    },
    telefonoEmpleado:{
        type: String,
        require: true,
        unique: true
    },
    puestoEmpleado:{
        type:String,
        require: true,
    },
    edadEmpleado:{
        type: String,
        require: true,
    },
    sexoEmpleado:{
        type: String,
    },
    AntiguedadEmpleado:{
        type:Date,
        default: Date.now
    },
    Estatus:{
        type: Boolean,
        default: true
    }
});
const Empleado = mongoose.model('Empleados', empleadoSchema);

module.exports = Empleado;