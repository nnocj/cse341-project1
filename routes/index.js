const router = require('express').Router();
const path = require('path');
const contactController = require('../controllers/contactsController');
const contactValidate = require('../utilities/validation').contactValidate;
const  errorHandler = require('../middleware/handleErrors');

// Serve static files from the public folder
/*router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});*/

// This endpoint retrieves all contacts from the MongoDB database
router.get('/api/contacts',   errorHandler.generalHandleErrors(contactController.getAllContacts));

//This endpoint retrieves only one customers from the MongoDB database based on the id
router.get('/api/contacts/:id', errorHandler.generalHandleErrors(contactController.getContactById));

// This endpoint creates a new contact in the MongoDB database
router.post('/api/createContact', contactValidate.contactValidationRules(), contactValidate.validateResults, errorHandler.generalHandleErrors(contactController.postContact));

// This endpoint updates an existing contact in the MongoDB database based on the id
router.put('/api/updateContact/:id', contactValidate.contactValidationRules(), contactValidate.validateResults, errorHandler.generalHandleErrors(contactController.putContact));

// This endpoint deletes a contact from the MongoDB database based on the id
router.delete('/api/deleteContact/:id', errorHandler.generalHandleErrors(contactController.deleteContact));

module.exports = router;