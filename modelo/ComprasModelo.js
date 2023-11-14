const db = require("../config/mysql");
const DetCompModelo = require("./TablaIntDetComp");
const ProvComModelo = require("./TablaIntProvCom");
const EmpComModelo = require("./TablaIntEmpCom");

/**
 * @typedef Compra
 * @property {string} FchaCom - The date of the purchase.
 * @property {number} TotalCom - The total cost of the purchase.
 */

/**
 * @typedef Proveedor
 * @property {number} CveProv - The ID of the provider.
 * @property {number} CveCom - The ID of the purchase.
 */

/**
 * @typedef Empleado
 * @property {number} CveEmp - The ID of the employee.
 * @property {number} CveCom - The ID of the purchase.
 */

/**
 * @typedef Detalles
 * @property {number} CveLote - The ID of the lot.
 * @property {number} Cantidad - The quantity of the product purchased.
 */

const ComprasModelo = {
    /**
     * Retrieves all purchases from the database.
     * @returns {Promise<Array>} A promise that resolves to an array of all purchases.
     */
    getAllCompras() {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Compras',
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
     * Retrieves a purchase from the database by its ID.
     * @param {number} CveCom - The ID of the purchase to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the purchase, its provider, its employee, and its details.
     */
    getComprabyId(CveCom) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Compras WHERE CveCom = ?', [CveCom],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        ProvComModelo.getProvCompById(CveCom).then((res) => {
                            EmpComModelo.getEmpComById(CveCom).then((res2) => {
                                DetCompModelo.getDetCompById(CveCom).then((res3) => {
                                    const resultados = { results, res, res2, res3 }
                                    resolve(resultados);
                                }).catch((err) => {
                                    reject(err);
                                });
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                }
            );
        });
    },

    /**
     * Creates a new purchase in the database.
     * @param {Compra} Compra - The purchase to create.
     * @param {Proveedor} Proveedor - The provider associated with the purchase.
     * @param {Empleado} Empleado - The employee associated with the purchase.
     * @param {Detalles} Detalles - The details of the purchase.
     * @returns {Promise<Object>} A promise that resolves to the result of the database insert.
     */
    createCompra(Compra, Proveedor,Empleado,Detalles) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO Compras (FchaCom, TotalCom) VALUES (?,?)',
                [Compra.FchaCom, Compra.TotalCom],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        try{
                            // registro en la tabla intermedia de proveedores y compras
                            ProvComModelo.CreateProvComp(Proveedor, results.insertId);
                            // registro en la tabla intermedia de empleados y compras
                            EmpComModelo.createEmpCom(results.insertId,Empleado);
                            // registro en la tabla intermedia de lotes y compras
                            DetCompModelo.CreateDetComp(Detalles.CveLote,results.insertId,Detalles.Cantidad);
                            resolve(results);
                        }catch(err){
                            reject(err);
                        }
                    }
                }
            );
        });
    },
};

module.exports = ComprasModelo;
