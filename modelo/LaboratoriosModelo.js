const db = require('../config/mysql');

/**
 * @typedef {Object} LaboratoriosModelo
 * @property {function(): Promise} getAllLabs - Returns a promise that resolves to an array of all laboratories.
 * @property {function(CveLab: number): Promise} getLabById - Returns a promise that resolves to an array of the laboratory with the given ID.
 * @property {function(Lab: Array): Promise} CreateLab - Inserts a new laboratory into the database and returns a promise that resolves to the result of the insertion.
 * @property {function(Lab: Array, CveLab: number): Promise} UpdateLab - Updates the laboratory with the given ID and returns a promise that resolves to the result of the update.
 * @property {function(CveLab: number, Estatus: string): Promise} DesactivateLab - Updates the status of the laboratory with the given ID and returns a promise that resolves to the result of the update.
 */

const LaboratioriosModelo = {
    /**
     * Returns a promise that resolves to an array of all laboratories.
     * @returns {Promise}
     */
    getAllLabs: () => {
        return new Promise((resolve,reject) =>{
            db.query('SELECT * from Laboratorio', (err, results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results);
                }
            })
        })
    },
    /**
     * Returns a promise that resolves to an array of the laboratory with the given ID.
     * @param {number} CveLab - The ID of the laboratory to retrieve.
     * @returns {Promise}
     */
    getLabById: (CveLab) => {
        return new Promise((resolve,reject) => {
            db.query('SELECT * FROM Laboratorio WHERE CveLab = ?',[CveLab], (err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results);
                }
            })
        })
    },
    /**
     * Inserts a new laboratory into the database and returns a promise that resolves to the result of the insertion.
     * @param {Array} Lab - An array containing the laboratory information to insert.
     * @returns {Promise}
     */
    CreateLab: (Lab) => {
        return new Promise((resolve,reject) => {
            db.query('INSERT INTO Laboratorio (NomLab,DirLab,EstLab,CPLab, LocLab,EmailLab,Estatus) values (?,?,?,?,?,?,?)',Lab, (err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results);
                }
            })
        })
    },
    /**
     * Updates the laboratory with the given ID and returns a promise that resolves to the result of the update.
     * @param {Array} Lab - An array containing the updated laboratory information.
     * @param {number} CveLab - The ID of the laboratory to update.
     * @returns {Promise}
     */
    UpdateLab: (Lab, CveLab) => {
        return new Promise((resolve,reject) => {
            db.query('UPDATE Laboratorio SET NomLab=?, DirLab=?,EstLab=?,CPLab=?, LocLab=?,EmailLab=?,Estatus=? Where CveLab =?',[Lab[0],Lab[1],Lab[2],Lab[3],Lab[4],Lab[5],Lab[6], CveLab], (err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results);
                }
            })
        })
    },
    /**
     * Updates the status of the laboratory with the given ID and returns a promise that resolves to the result of the update.
     * @param {number} CveLab - The ID of the laboratory to update.
     * @param {string} Estatus - The new status of the laboratory.
     * @returns {Promise}
     */
    DesactivateLab: (CveLab,Estatus) => {
        return new Promise((resolve,reject) => {
            db.query('Update Laboratorio set Estatus=? WHERE CveLab = ?',[CveLab, Estatus], (err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results);
                }
            })
        })
    },
}
module.exports = LaboratioriosModelo;