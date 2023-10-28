const mysql = require('mysql');
const config = require('../config/mysql');
const { reject } = require('async');

const db = config;
//const connection = mysql.createConnection(config)

const UserModel = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Empleados', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getUserById: (CveEmp) => {
        return new Promise((resolve,reject) => {
            console.log(CveEmp);
            db.query('SELECT * FROM Empleados WHERE CveEmp = ?', [CveEmp], (err,results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
        
    },
    createUser: (user,callback) => {
        db.query('INSERT INTO Empleados (NombreEmp, TelEmp, PuestoEmp, EdadEmp, SexoEmp, AntigEmp, Estatus) values (?,?,?,?,?,?,?)', user, callback);
    },
    updateUser: (User, CveEmp) => {
        return new Promise((resolve , reject) => {
            console.log(User)
            db.query('UPDATE Empleados SET NombreEmp=?, TelEmp=?, PuestoEmp=?, EdadEmp=?, SexoEmp=?, AntigEmp=?, Estatus=? WHERE CveEmp = ?', [User[0], User[1], User[2], User[3], User[4], User[5],User[6], CveEmp], (err,results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });        
    },
    desactivateUser: (CveEmp,Estatus) => {
        return new Promise((resolve, reject) =>{
            db.query('UPDATE Empleados SET Estatus=? WHERE CveEmp = ?',[Estatus ,CveEmp],(err,results) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(results)
                }
            });
        })
    },
};

module.exports = UserModel;