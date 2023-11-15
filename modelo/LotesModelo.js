const { reject } = require('async');
const db = require('../config/mysql');

/**
 * @typedef Lote
 * @property {string} CveLote - The unique identifier for the lot.
 * @property {string} NombreLote - The name of the lot.
 * @property {string} Estatus - The status of the lot.
 */

const LotesModelo = {
    /**
     * Retrieves all lots from the database.
     * @returns {Promise<Lote[]>} A promise that resolves to an array of all lots.
     */
    getAllLotes: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from Lotes', (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    /**
     * Retrieves a specific lot from the database by its unique identifier.
     * @param {string} CveLote - The unique identifier of the lot to retrieve.
     * @returns {Promise<Lote>} A promise that resolves to the requested lot.
     */
    getLoteById: (CveLote) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from Lotes WHERE CveLote = ?', [CveLote], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    /**
     * Creates a new lot in the database.
     * @param {Lote} Lote - The lot to create.
     * @returns {Promise<any>} A promise that resolves when the lot has been created.
     */
    CreateLote: (Lote) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Lotes SET Montoabo = ?, Fechacad = ?, CveMed = ?, Estatus = ?', Lote, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    /**
     * Updates an existing lot in the database.
     * @param {Lote} Lote - The updated lot data.
     * @param {string} CveLote - The unique identifier of the lot to update.
     * @returns {Promise<any>} A promise that resolves when the lot has been updated.
     */
    UpdateLote: (Lote, CveLote) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Lotes SET Montoabo = ?, Fechacad = ?, CveMed = ?, Estatus = ? WHERE CveLote = ?', [Lote[0],Lote[1],Lote[2],Lote[3], CveLote], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    /**
     * Sets the status of a lot to "off" in the database.
     * @param {string} CveLote - The unique identifier of the lot to update.
     * @param {string} Estatus - The new status of the lot.
     * @returns {Promise<any>} A promise that resolves when the lot status has been updated.
     */
    SetOffLote: (CveLote,Estatus) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Lotes SET Estatus = ? WHERE CveLote = ?', [Estatus,CveLote], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    /**
     * Updates the stock of a specific lot in the database.
     * @param {string} CveLote - The unique identifier of the lot to update.
     * @param {number} Cantidad - The amount to add to the current stock of the lot.
     * @returns {Promise} A Promise that resolves with the results of the update query or rejects with an error.
     */
    ActualizarExistenciasC(CveLote,Cantidad){
        return new Promise((resolve,reject)=>{
            db.query('UPDATE Lotes SET Montoabo = Montoabo + ? WHERE CveLote = ?',[Cantidad,CveLote],(err,results)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },
    /**
     * Actualiza las existencias de un lote en la base de datos.
     * @param {string} CveLote - La clave del lote a actualizar.
     * @param {number} Cantidad - La cantidad de existencias a restar del lote.
     * @returns {Promise<any>} - Una promesa que resuelve con los resultados de la actualización.
     */
    ActualizarExistenciasV(CveLote,Cantidad){
        return new Promise((resolve,reject)=>{
            db.query('UPDATE Lotes SET Montoabo = Montoabo - ? WHERE CveLote = ?',[Cantidad,CveLote],(err,results)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }
}

module.exports = LotesModelo;
