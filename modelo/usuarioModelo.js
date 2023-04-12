var mongoose = require('mongoose');
const empleadoSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
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
        type:String,
    }
});
const Empleado = mongoose.model('Empleados', empleadoSchema);

module.export = Empleado;