const { reject } = require("async");
const db = require("../config/mysql");
const tablaIntDetVenta = require("./TablaIntDetVenta");
const tablaIntEmpVenta = require("./TablaIntEmpVen");

const Ventas = {
    createVenta(venta,Empleado,DetallesVenta) {
        return new Promise((resolve,reject) => {
            db.query(
                'INSERT INTO Ventas (Iva,Subtotal,FchaVta,MetPago) values (?,?,?,?)', [venta.Iva,venta.Subtotal,venta.FchaVta,venta.MetPago],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        try{
                            // registro en tabla intermedia de ventas y empleados
                            tablaIntEmpVenta.createEmpVenta(Empleado,results.insertId);
                            // registro de tabla detalles de ventas
                            tablaIntDetVenta.CreateDetalleVenta(results.insertId,DetallesVenta.CveLote,DetallesVenta.Cantidad);
                            resolve(results);
                        }catch(err){
                            reject(err);
                        }
                    }
                }
            );
        })
    },
    getAllVentas(){
        return new Promise((resolve,reject) => {
            db.query(
                'SELECT * FROM Ventas',
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        })
    },
    getVentaById(CveVta){
        return new Promise((resolve,reject) => {
            db.query(
                'SELECT * FROM Ventas WHERE CveVta = ?', [CveVta],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        tablaIntEmpVenta.getIntEmpVenById(CveVta).then((Empleado_Nombre) => {
                            tablaIntDetVenta.getDetVtaById(CveVta).then((DetalleVenta) => {
                                const resultados = { results, Empleado_Nombre, DetalleVenta }
                                resolve(resultados);
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                }
            );
        })
    }
};

module.exports = Ventas;