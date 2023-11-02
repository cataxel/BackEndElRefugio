const db = require('../config/mysql');

/**
 * @typedef {Object} Lab_MedModelo
 * @property {function} CreateIntMedLab - Creates a new record in the Lab_Med table with the given idMedicamento and idLaboratorio.
 * @property {function} getLabMedById - Retrieves the name of the laboratory associated with the given CveMed.
 * @property {function} UpdateIntMedLab - Updates the CveLab value for the given CveMed in the Lab_Med table.
 * @property {function} DeleteIntMedLab - Deletes the record with the given CveMed from the Lab_Med table.
 */

const Lab_MedModelo = {
    /**
     * Creates a new record in the Lab_Med table with the given idMedicamento and idLaboratorio.
     * @param {number} idMedicamento - The id of the medication to associate with the laboratory.
     * @param {number} idLaboratorio - The id of the laboratory to associate with the medication.
     * @returns {Promise} A promise that resolves with the results of the query or rejects with an error.
     */
    CreateIntMedLab(idMedicamento, idLaboratorio) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO Lab_Med (CveLab, CveMed) values (?,?)',
                [idLaboratorio, idMedicamento],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },
    /**
     * Retrieves the name of the laboratory associated with the given CveMed.
     * @param {number} CveMed - The id of the medication to retrieve the laboratory name for.
     * @returns {Promise} A promise that resolves with the results of the query or rejects with an error.
     */
    getLabMedById(CveMed) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT Laboratorio.NomLab FROM Medicamentos JOIN Lab_Med ON Medicamentos.CveMed = Lab_Med.CveMed
                    JOIN Laboratorio ON Lab_Med.CveLab = Laboratorio.CveLab
                    WHERE Medicamentos.CveMed = ?`,
                [CveMed],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },
    /**
     * Updates the CveLab value for the given CveMed in the Lab_Med table.
     * @param {number} CveMed - The id of the medication to update the laboratory for.
     * @param {number} CveLab - The id of the laboratory to associate with the medication.
     * @returns {Promise} A promise that resolves with the results of the query or rejects with an error.
     */
    UpdateIntMedLab(CveMed,CveLab){
        return new Promise((resolve,reject) => {
            db.query('UPDATE Lab_Med SET CveLab = ? WHERE CveMed = ?',[CveLab,CveMed], (err,results) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    },
    /**
     * Deletes the record with the given CveMed from the Lab_Med table.
     * @param {number} CveMed - The id of the medication to delete the laboratory association for.
     * @returns {Promise} A promise that resolves with the results of the query or rejects with an error.
     */
    DeleteIntMedLab(CveMed){
        return new Promise((resolve,reject) => {
            db.query('Delete FROM Lab_Med WHERE CveMed = ?',[CveMed], (err,results) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    }
}

module.exports = Lab_MedModelo;
