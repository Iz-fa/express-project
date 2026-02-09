const express = require("express");
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler");
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv").config();


connectDb();

const app = express();

const port = process.env.PORT || 3000;

/*
app.get('/api/contacts', (req,res)=>{
    res.status(200).json({
        message: "Get all contacts"
    });
});
*/

//this middleware from express is to parse the json data the client is sending back to the server 
// (because the data is a string)
app.use(express.json()); 
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

// since errorHandler funciton has 4 params, this tells express
// that this middleware is to handle the error that was thrown
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});