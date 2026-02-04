const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

/*
app.get('/api/contacts', (req,res)=>{
    res.status(200).json({
        message: "Get all contacts"
    });
});
*/

//this is to parse the json data the client is sending back to the server (because the data is a string)
app.use(express.json()); 

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});