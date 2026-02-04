// status 200 means everything is ok, 201 means created, 204 is when theres no response body

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = (req,res)=>{
    res.status(200).json({
        message: "Get all contacts"
    });
};

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContact = (req, res)=>{
    res.status(200).json({
        message: `Get Contact for ${req.params.id}`
    });
};

// @desc Create new contact
// @route POST /api/contacts
// @access public
const createContact = (req, res)=>{
    
    console.log(req.body);
    
    res.status(201).json({       
        message: "Create Contact"
    });
};

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = (req, res)=>{
    res.status(200).json({
        message: `Update contact for ${req.params.id}`
    });
};

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = (rep, res)=>{
    res.status(200).json({
        message: `Delete contact for ${req.params.id}`
    });
};




module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};