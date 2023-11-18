require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl:{
    ca: fs.readFileSync(process.env.DB_SSL_CA)
  }
});
  
  connection.connect(function (error) {
    if (error) {
      console.log('Error connection database :',error);
      return;
    }
    console.log('Connection established');
  });
  
  module.exports = connection;