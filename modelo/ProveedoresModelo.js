
const db = require("../config/mysql")
const ProveedoresModelo = {
    getAllProveedores: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from Proveedores', (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    getProveedorById: (CveProv) => {
        return new Promise((resolve, reject) => {
            db.query('Select * from Proveedores WHERE CveProv = ?', [CveProv], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    AddProveedor: (Proveedor) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Proveedores (NomProv, TelProv, LocProv, EstProv, CPProv, DirProv, Estatus) VALUES (?,?,?,?,?,?,?)', Proveedor, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    UpdateProveedor: (Proveedor,CveProv) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Proveedores SET NomProv = ?, TelProv = ?,LocProv = ?,EstProv = ?,CPProv = ?,DirProv = ?, Estatus=? WHERE CveProv = ?', [Proveedor[0],Proveedor[1],Proveedor[2],Proveedor[3],Proveedor[4],Proveedor[5],Proveedor[6],CveProv], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }
            })
        })
    },
    SetOffProveedor:(CveProv,Estatus) => {
        return new Promise((resolve,reject) => {
            db.query('UPDATE Proveedores SET Estatus = ? WHERE CveProv = ?',[Estatus,CveProv],(err,results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    }
}

module.exports = ProveedoresModelo;