const db = require('../config/mysql');
const lotes = require('../modelo/LotesModelo');

/**
 * Modelo de la tabla DetComMed
 * @namespace DetCompModelo
 */
const DetCompModelo = {
    /**
     * Crea un registro en la tabla DetComMed y actualiza las existencias del lote correspondiente
     * @function CreateDetComp
     * @memberof DetCompModelo
     * @param {number} CveLote - Clave del lote
     * @param {number} CveComp - Clave de la compra
     * @param {number} Cantidad - Cantidad de componentes comprados
     * @returns {Promise} Promesa que resuelve con los resultados de la consulta
     */
    CreateDetComp(CveLote,CveComp,Cantidad){
        return new Promise((resolve,reject)=>{
            db.query(
                'INSERT INTO DetComMed (CveLote,CveCom,CantCom) values (?,?,?)',
                [CveLote,CveComp,Cantidad],
                (err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        // Actualizar Existencias
                        try{
                            lotes.ActualizarExistenciasC(CveLote,Cantidad);
                            resolve(results);
                        }catch(err){
                            reject(err);
                        }
                    }
                }
            );
        });
    },
    /**
     * Obtiene la clave del lote correspondiente a una compra
     * @function GetLoteIdFromComp
     * @memberof DetCompModelo
     * @param {number} CveComp - Clave de la compra
     * @returns {Promise} Promesa que resuelve con los resultados de la consulta
     */
    GetLoteIdFromComp(CveComp){
        return new Promise((resolve,reject)=>{
            db.query(
                'SELECT l.CveLote FROM Lotes l join DetComMed dcm on l.CveLote = dcm.CveLote ' +
                'join Compras c on dcm.CveCom = c.CveCom ' +
                'WHERE c.CveCom  = ?',
                [CveComp],
                (err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            );
        });
    },
    /**
     * Obtiene los detalles de una compra
     * @function getDetCompById
     * @memberof DetCompModelo
     * @param {number} CveComp - Clave de la compra
     * @returns {Promise} Promesa que resuelve con los resultados de la consulta
     */
    getDetCompById(CveComp){
        return new Promise((resolve,reject)=>{
            db.query(
                'SELECT * FROM DetComMed WHERE CveCom = ?',
                [CveComp],
                (err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            );
        });
    }
}

module.exports = DetCompModelo;
