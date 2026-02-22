const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler( async(req, res, next)=>{
    let token;
    let authHeader= req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user; //this is to pass the request with this user to the next function
            next();
        });
    }else{
        res.status(401);
        throw new Error("Authorization header missing");
    }
});

module.exports = validateToken;