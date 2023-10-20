const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: 'FarmaExpress',
    port: '3306'
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