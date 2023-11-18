require('dotenv').config();
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'farmadb-do-user-14009899-0.c.db.ondigitalocean.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: '25060',
});
  
  connection.connect(function (error) {
    if (error) {
      console.log('Error connection database :',error);
      return;
    }
    console.log('Connection established');
  });
  
  module.exports = connection;
