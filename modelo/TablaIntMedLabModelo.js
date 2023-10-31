const db = require('../config/mysql');

const Lab_MedModelo = {
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