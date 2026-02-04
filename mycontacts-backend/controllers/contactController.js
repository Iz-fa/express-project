// status 200 means request succeded, 201 means created, 204 is when theres no response body
// status 400 Bad request Invalid input

// This handles exceptions and give them back to errorHandler.js so no need to use throw catch
const asyncHandler = require("express-async-handler");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async(req,res)=>{  //async because mongoDB uses promises
    res.status(200).json({
        message: "Get all contacts"
    });
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message: `Get Contact for ${req.params.id}`
    });
});

// @desc Create new contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async(req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    res.status(201).json({       
        message: "Create Contact"
    });
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message: `Update contact for ${req.params.id}`
    });
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message: `Delete contact for ${req.params.id}`
    });
});




module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};