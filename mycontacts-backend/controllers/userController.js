const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async(req,res)=>{


   const {username, email, password} = req.body;
   if(!username || !email|| !password){
      res.status(400);
      throw new Error("All fields are mandatory!");
   }
   const userExists = await User.findOne({email});
   if(userExists){
      res.status(400);
      throw new Error("This Email is already registered");
   }

   //Hash password
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   
   const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword
   });  
   
   if(user){
      console.log(`User created ${user}`);
      res.status(201).json({_id: user.id, email: user.email});
   }else{
      res.status(400);
      throw new Error("User data is not valid");
   }
   
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async(req,res)=>{        
   const {email, password} = req.body;
   if(!email|| !password){
      res.status(400);
      throw new Error("All fields are mandatory!");
   }
   const user = await User.findOne({email});

   //compare password with hashedpassword
   if(user && (await bcrypt.compare(password, user.password))){

      const accessToken = jwt.sign({

         //payload of the jwt
         user:{
            username: user.username,
            email: user.email,
            id: user.id
         }
      },
      // Secret of the jwt
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: '60m'}
      );

      res.status(200).json({
         message: `User ${req.body.username||''} is logged in`,
         accessToken
      });

   }else{
      res.status(401);
      throw new Error("Email or Password is not valid");
   }

   
});

// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async(req,res)=>{        
   res.json(req.user);
});


module.exports = {registerUser, loginUser, currentUser};