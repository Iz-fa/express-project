const mongoose = require("mongoose");
//require dotenv is only needed on the main file server.js

const connectDb= async()=>{
    try{
        console.log("Connecting...");
        
        const connect = await mongoose.connect(process.env.CONNECTION_SRTING);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;