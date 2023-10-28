const { reject } = require('async');
const db = require('../config/mysql');

/**
 * @typedef {Object} Medicamento
 * @property {string} NomMed - The name of the medicine.
 * @property {string} TipoMed - The type of the medicine.
 * @property {number} PrecioCmp - The purchase price of the medicine.
 * @property {number} PrecioVta - The sale price of the medicine.
 * @property {number} Ganancia - The profit of the medicine.
 * @property {string} Apmed - The application of the medicine.
 * @property {string} RecNec - The necessary recipe for the medicine.
 * @property {string} CompMed - The composition of the medicine.
 * @property {string} ContMed - The content of the medicine.
 * @property {string} Pat_o_Gen - The patent or generic of the medicine.
 */

/**
 * @typedef {Object} Medicine
 * @property {number} CveMed - The ID of the medicine.
 * @property {string} NomMed - The name of the medicine.
 * @property {string} TipoMed - The type of the medicine.
 * @property {number} PrecioCmp - The purchase price of the medicine.
 * @property {number} PrecioVta - The sale price of the medicine.
 * @property {number} Ganancia - The profit of the medicine.
 * @property {string} Apmed - The application of the medicine.
 * @property {string} RecNec - The necessary recipe for the medicine.
 * @property {string} CompMed - The composition of the medicine.
 * @property {string} ContMed - The content of the medicine.
 * @property {string} Pat_o_Gen - The patent or generic of the medicine.
 */

const MedicamentoModelo = {
    /**
     * Retrieves all medicines from the database.
     * @returns {Promise<Array<Medicine>>} - A promise that resolves to an array of all medicines.
     */
    getAllMedicines: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from Medicamentos', (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    /**
     * Retrieves a medicine from the database by its ID.
     * @param {number} CveMed - The ID of the medicine to retrieve.
     * @returns {Promise<Array<Medicine>>} - A promise that resolves to an array containing the medicine with the specified ID.
     */
    getMedicineById: (CveMed) => {
        return new Promise((resolve,reject) => {
            db.query('Select * from Medicamentos WHERE CveMed = ?',[CveMed],(err,results) => {
                if (err) {
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    },
    /**
     * Creates a new medicine in the database.
     * @param {Medicamento} Med - The medicine to create.
     * @returns {Promise<Array<Medicine>>} - A promise that resolves to an array containing the newly created medicine.
     */
    CreateMedicine: (Med) => {
        return new Promise((resolve,reject) => {
            db.query('INSERT INTO Medicamentos (NomMed,TipoMed,PrecioCmp,PrecioVta,Ganancia,Apmed,RecNec,CompMed, ContMed, Pat_o_Gen) VALUES (?,?,?,?,?,?,?,?,?,?)', Med,(err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    },
    /**
     * Updates a medicine in the database.
     * @param {Medicamento} Med - The updated medicine.
     * @param {number} CveMed - The ID of the medicine to update.
     * @returns {Promise<Array<Medicine>>} - A promise that resolves to an array containing the updated medicine.
     */
    UpdateMedicine: (Med,CveMed) => {
        return new Promise((resolve,reject) => {
            db.query('UPDATE Medicamentos SET NomMed = ?, TipoMed = ?,PrecioCmp=?,PrecioVta=?,Ganancia=?,Apmed=?,RecNec=?,CompMed=?, ContMed=?, Pat_o_Gen=? WHERE CveMed = ?',[Med[0],Med[1],Med[2],Med[3],Med[4],Med[5],Med[6],Med[7],Med[8],Med[9],CveMed],(err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    },
    DeleteMedicine:(CveMed) => {
        return new Promise((resolve,reject) => {
            db.query('DELETE FROM Medicamentos WHERE CveMed = ?',[CveMed],(err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    }
}

module.exports = MedicamentoModelo;