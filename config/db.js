var mongoose = require("mongoose");
var async = require("async");

const conectarDB = async () =>{
    try{
        const db = await mongoose.connect("mongodb+srv://root:root@elrefugio.z1oumld.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName:'FARMAXPRESS'
        });
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log("mongo conectado en: ",url)
    }catch(error){
        console.log("Error ",error.message);
        process.exit(1);
    }

}

module.exports = conectarDB;
/* export default conectarDB; */