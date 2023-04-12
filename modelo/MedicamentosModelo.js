var mongoose = require('mongoose');
const MedicamentoSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => nanoid(),
    },
    nombreMedicamento:{
        type: String,
        require: true,
    },
    tipoMedicamento:{
        type: String,
        require: true,
        unique: true
    },
    PrecioCompra:{
        type:Number,
        require: true,
    },
    PrecioVenta:{
        type: Number,
        require: true,
    },
    Ganancia:{
        type: Number,
        require:true
    },
    Aplicacion:{
        type:String,
        require:true
    },
    RecetaNecesaria:{
        type: Boolean,
        require:true
    },
    Compuesto:{
        type:String,
        require:true
    },
    Contenido:{
        type:String,
        require:true
    },
    PatenteOGenerico:{
        type:String,
        require:true
    },
});
const Medicamento = mongoose.model('Medicamentos', MedicamentoSchema);

module.export = Medicamento;