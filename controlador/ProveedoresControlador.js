var ProveedoresModelo = require("../modelo/ProveedoresModelo");
const Joi = require('joi');

const NuevoProveedor = async function (req, res, next) {
    try {
        const Proveedor = [
            req.body.NomProv,
            req.body.TelProv,
            req.body.LocProv,
            req.body.EstProv,
            req.body.CPProv,
            req.body.DirProv,
            req.body.Estatus
        ]
        ProveedoresModelo.AddProveedor(Proveedor, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(201).json({message: 'Proveedor created succesfully', id: result.insertId});
            }
        })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'El numero de telefono ya existe' })
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
const ModificarProveedor = async function (req, res, next) {
    try {
        const Proveedor = [
            req.body.NomProv,
            req.body.TelProv,
            req.body.LocProv,
            req.body.EstProv,
            req.body.CPProv,
            req.body.DirProv,
            req.body.Estatus
        ]
        const proveedorId = req.params.id;
        console.log(Proveedor)
        ProveedoresModelo.UpdateProveedor(Proveedor,proveedorId, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }else{
                res.status(201).json({ message: 'Proveedor updated succesfully', id: result.insertId });
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const DesactivarProveedor = async function (req, res, next) {
    try {
        const Estatus = req.body;
        const proveedorId = req.params.id;
        ProveedoresModelo.SetOffProveedor(proveedorId,Estatus, (err, result) => {
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(201).json({message: 'Proveedor updated succesfully', id: result.insertId});
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const BuscarProveedorId = async function (req, res, next) {
    try {
        const proveedor = await ProveedoresModelo.getProveedorById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'proveedor not found' });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const Proveedores = async function (req, res, next) {
    try{
        const proveedor = await ProveedoresModelo.getAllProveedores();
        res.status(200).json(proveedor);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    NuevoProveedor,
    ModificarProveedor,
    DesactivarProveedor,
    BuscarProveedorId,
    Proveedores
}