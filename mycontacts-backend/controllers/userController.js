const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
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
   res.json({message:"Login the user"});
});

// @desc Current user info
// @route GET /api/current
// @access private
const currentUser = asyncHandler(async(req,res)=>{        
   res.json({message:"Current user info"});
});


module.exports = {registerUser, loginUser, currentUser};