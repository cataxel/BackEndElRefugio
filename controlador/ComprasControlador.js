const Compras = require("../modelo/ComprasModelo.js");

/**
 * Get a purchase by its ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The purchase object
 */
const CompraId = async function(req,res, next){
    try {
        const compra = await Compras.getComprabyId(req.params.id);
        if (!compra) {
            return res.status(404).json({ message: 'compra not found' });
        }
        res.status(200).json(compra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Create a new purchase
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The new purchase object
 */
const NuevaCompra = async function(req,res, next){
    try{
        const compra = {
            FchaCom : req.body.FchaCom,
            TotalCom :req.body.TotalCom
        }
        const Proveedor = req.body.Proveedorid;
        const Empleado = req.body.Empleadoid;
        const Detalles = {
            CveLote: req.body.CveLote,
            Cantidad: req.body.Cantidad
        }
        console.log(compra,Proveedor,Empleado,Detalles);
        Compras.createCompra(compra,Proveedor,Empleado,Detalles, (err,result) =>{
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(200).json({message: 'Compra creada exitosamente'});
            }
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Get all purchases
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Array} - An array of purchase objects
 */
const Compra = async function(req,res,next){
    try {
        const Compra = await Compras.getAllCompras();
        res.status(200).json(Compra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    CompraId,
    NuevaCompra,
    Compra
}
