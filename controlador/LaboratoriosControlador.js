const { tryEach } = require("async");
var Laboratorio = require("../modelo/LaboratoriosModelo.js");

/**
 * Busca un laboratorio por su ID
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función de middleware para pasar al siguiente controlador
 * @returns {Object} - Objeto JSON que contiene el laboratorio encontrado
 */
const BuscarLaboratorioId = async function(req,res,next) {
    try{
        const lab = await Laboratorio.getLabById(req.params.id);
        if(!lab){
            return res.status(404).json({message:'Lab not found'})
        }
        res.status(200).json(lab[0]);
    }catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Crea un nuevo laboratorio
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función de middleware para pasar al siguiente controlador
 * @returns {Object} - Objeto JSON que indica si el laboratorio se creó correctamente y su ID
 */
const NuevoLaboratorio = async function(req,res,next){
    try{
        var laboratorio = [
            req.body.NomLab,
            req.body.DirLab,
            req.body.EstLab,
            req.body.CPLab,
            req.body.LocLab,
            req.body.EmailLab,
            req.body.Estatus
        ]
        Laboratorio.CreateLab(laboratorio, (err,result) => {
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: 'Laboratory created succesfully', id: result.insertId});
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Modifica un laboratorio existente
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función de middleware para pasar al siguiente controlador
 * @returns {Object} - Objeto JSON que indica si el laboratorio se actualizó correctamente y su ID
 */
const ModificarLaboratorio = async function(req,res,next){
    try {
        var laboratorio = [
            req.body.NomLab,
            req.body.DirLab,
            req.body.EstLab,
            req.body.CPLab,
            req.body.LocLab,
            req.body.EmailLab,
            req.body.Estatus
        ]
        var LabId = req.params.id;
        Laboratorio.UpdateLab(laboratorio,LabId,(err,result) => {
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: 'Laboratory updated succesfully', id: result.insertId});
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Desactiva un laboratorio existente
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función de middleware para pasar al siguiente controlador
 * @returns {Object} - Objeto JSON que indica si el laboratorio se desactivó correctamente
 */
const DesactivarLaboratorio = async function (req, res, next) {
    try {
        const Estatus = req.body.Estatus;  // posible error
        const LabId = req.params.id;
        const Lab = await Laboratorio.DesactivateLab(LabId,Estatus);
        if (!Lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        console.log(Lab)
        res.status(200).json({message: 'Lab Desactivate succesfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Obtiene todos los laboratorios
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función de middleware para pasar al siguiente controlador
 * @returns {Object} - Objeto JSON que contiene todos los laboratorios
 */
const Laboratorios = async function (req, res, next) {
    try {
        const lab = await Laboratorio.getAllLabs();
        console.log(lab);
        res.status(200).json(lab)
    } catch (error) {
        
    }
}

module.exports = {
    NuevoLaboratorio,
    ModificarLaboratorio,
    DesactivarLaboratorio,
    BuscarLaboratorioId,
    Laboratorios}

