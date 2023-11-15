const Venta = require("../modelo/VentasModelo.js");
const Joi = require('joi');
const Lotes = require("../modelo/LotesModelo");
const NuevoVenta = async function(req,res,next){
    try{
        const venta = req.body.venta;
        const empleado = req.body.Empleado;
        const Detalles = req.body.DetallesVenta;

        Venta.createVenta(venta,empleado,Detalles, (err,result) =>{
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(200).json({message: 'Venta creada exitosamente'});
            }
        })
    }catch(err){
        res.status(500).json({error: err.message});
    }    
}
const BuscarVentaId = async function(req,res,next){
    try {
        const venta = await Venta.getVentaById(req.params.id);
        if (!venta) {
            return res.status(404).json({ message: 'compra not found' });
        }
        res.status(200).json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Ventas = async function(req,res,next){
    try {
        const venta = await Venta.getAllVentas();
        res.status(200).json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const ActualizarExistenciasVenta = async (lotesid,cantidadVendida) => {
    try{
        const lotes = await Lotes.findById(lotesid);
        if(!lotes){
            throw new Error('Lote no encontrado');
        }
        if(cantidadVendida> lotes.ExistenciasFisica){
            throw new Error('No hay suficientes existencias');
        }
        lotes.ExistenciasFisica = Number(lotes.ExistenciasFisica) - Number(cantidadVendida);
        await lotes.save();
    }catch (error) {
        throw error;
    }
};
module.exports = {
    NuevoVenta,
    BuscarVentaId,
    Ventas
}