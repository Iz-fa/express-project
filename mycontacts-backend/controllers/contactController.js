// status 200 means request succeded, 201 means created, 204 is when theres no response body
// status 400 Bad request Invalid input

// This handles exceptions and give them back to errorHandler.js so no need to use throw catch
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async(req,res)=>{        //async because mongoDB uses promises
   
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async(req, res)=>{

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Create new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async(req, res)=>{

    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name: name,
        email: email,
        phone: phone
    });
    res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async(req, res)=>{

    const oldContact = await Contact.findById(req.params.id);

    if(!oldContact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndUpdate(req.params.id, req.body);
    const updatedContact = await Contact.findById(req.params.id);

    console.log("Old contact:", oldContact);
    console.log("New contact:", updatedContact);

    res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async(req, res)=>{

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    //Contact.remove() works the same

    res.status(200).send(`Deleted contact: ${contact}`);
});




module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};