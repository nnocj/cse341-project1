const router = require('express').Router();
const path = require('path');
const contactController = require('../controllers/contactsController');

// Serve static files from the public folder
/*router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});*/

// This endpoint retrieves all contacts from the MongoDB database
router.get('/api/contacts', contactController.getAllContacts);
       
//This endpoint retrieves only one customers from the MongoDB database based on the id
router.get('/api/contacts/:id', contactController.getContactById);

// This endpoint creates a new contact in the MongoDB database
router.post('/api/createContact', contactController.postContact);

// This endpoint updates an existing contact in the MongoDB database based on the id
router.put('/api/updateContact/:id', contactController.putContact);

// This endpoint deletes a contact from the MongoDB database based on the id
router.delete('/api/deleteContact/:id', contactController.deleteContact);

module.exports = router;