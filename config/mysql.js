require('dotenv').config();
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
  
  connection.connect(function (error) {
    if (error) {
      console.log('Error connection database :',error);
      return;
    }
    console.log('Connection established');
  });

  /*
  const connectDB = async () => {

    try {
      await connection.connect; // Obtiene una conexión asincrónica
      console.log('MySQL connected');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  };*/
  
  module.exports = connection;