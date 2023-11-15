const db = require("../config/mysql");

const EmpVenta = {
    createEmpVenta(CveEmp,CveVta){
        return new Promise((resolve,reject) => {
            db.query(
                'insert into Emp_Ven (CveEmp,CveVta) values (?,?)',
                [CveEmp,CveVta],
                (err,results) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            );
        });

    },
    getIntEmpVenById(CveVta){
        return new Promise((resolve,reject) => {
            db.query(
                'select NombreEmp from Emp_Ven inner join Empleados on Emp_Ven.CveEmp = Empleados.CveEmp where CveVta = ?',
                [CveVta],
                (err,results) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(results[0]);
                    }
                }
            );
        });
    }
};

module.exports = EmpVenta;