const db = require("../config/mysql");
const lotes = require("./LotesModelo");

const DetallesVenta = {
    CreateDetalleVenta(CveVta, CveLote, Cantidad) {
        return new Promise((resolve, reject) => {
            db.query('insert into DetVtaMed (CveVta, CveLote, CantVta) values (?,?,?)',
                [CveVta, CveLote, Cantidad],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Actualizar Existencias
                        try {
                            lotes.ActualizarExistenciasV(Cantidad, CveLote);
                            resolve(results);
                        } catch (err) {
                            reject(err);
                        }
                    }
                }
            );
        });
    },
    getDetVtaById(CveVta) {
        return new Promise((resolve, reject) => {
            db.query(
                'select * from DetVtaMed where CveVta = ?', [CveVta],
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

module.exports = DetallesVenta;