const router = require('express').Router();
const path = require('path');
const contactController = require('../controllers/contactsController');

// Serve static files from the public folder
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// This endpoint retrieves all contacts from the MongoDB database
router.get('/api/contacts', contactController.getAllContacts);
       
//This endpoint retrieves only one customers from the MongoDB database based on the id
router.get('/api/contacts/:id', contactController.getContactById);
       
module.exports = router;