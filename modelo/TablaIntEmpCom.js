const db = require("../config/mysql");

/**
 * @typedef {Object} ProvComModelo
 * @property {function} getEmpComById - Retrieves the name of an employee associated with a purchase by its ID.
 * @property {function} createEmpCom - Creates a new association between an employee and a purchase.
 */

/**
 * @type {ProvComModelo}
 */
const ProvComModelo = {
    /**
     * Retrieves the name of an employee associated with a purchase by its ID.
     * @param {number} CveCom - The ID of the purchase.
     * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing the name of the employee.
     */
    getEmpComById(CveCom) {
        return new Promise((resolve, reject) => {
            db.query(
                `select Empleados.NombreEmp from Compras join Emp_Com on Compras.CveCom = Emp_Com.CveCom
                join Empleados on Emp_Com.CveEmp = Empleados.CveEmp
                where Compras.CveCom = ?`,
                [CveCom],
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
     * Creates a new association between an employee and a purchase.
     * @param {number} CveCom - The ID of the purchase.
     * @param {number} CveEmp - The ID of the employee.
     * @returns {Promise<Object>} - A promise that resolves to an object containing information about the new association.
     */
    createEmpCom(CveCom, CveEmp) {
        return new Promise((resolve, reject) => {
            db.query(
                'insert into Emp_Com (CveEmp, CveCom) values (?,?)',
                [CveEmp, CveCom],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
};

module.exports = ProvComModelo;
