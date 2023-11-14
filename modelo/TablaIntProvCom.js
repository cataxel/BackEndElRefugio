const db = require("../config/mysql");

/**
 * Represents the ProvComModelo object with methods to interact with the Prov_Com table in the database.
 * @namespace ProvComModelo
 */
const ProvComModelo = {
    /**
     * Creates a new record in the Prov_Com table with the given idProveedor and idCompra.
     * @memberof ProvComModelo
     * @function CreateProvComp
     * @param {number} idProveedor - The id of the provider to be associated with the purchase.
     * @param {number} idCompra - The id of the purchase to be associated with the provider.
     * @returns {Promise} Promise object represents the result of the query.
     */
    CreateProvComp(idProveedor, idCompra) {
        return new Promise((resolve, reject) => {
            console.log("P"+idProveedor+"   C"+idCompra)
            db.query(
                'insert into Prov_Com (CveCom, CveProv) values (?,?)',
                [idCompra,idProveedor],
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
     * Retrieves the name of the provider associated with the given purchase id.
     * @memberof ProvComModelo
     * @function getProvCompById
     * @param {number} CveComp - The id of the purchase to retrieve the associated provider name.
     * @returns {Promise} Promise object represents the result of the query.
     */
    getProvCompById(CveComp) {
        return new Promise((resolve, reject) => {
            db.query(
                `select Proveedores.NomProv from Compras join Prov_Com on Compras.CveCom = Prov_Com.CveCom
                join Proveedores on Prov_Com.CveProv = Proveedores.CveProv
                where Compras.CveCom = ?`,
                [CveComp],
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
}

module.exports = ProvComModelo;
