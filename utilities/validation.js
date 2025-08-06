const {body} = require('express-validator');

const contactValidate ={};

contactValidate.contactValidationRules = ()=> {
    return [
        body('firstName')
            .notEmpty()
            .withMessage('First name is required'),
        
        body('lastName')
            .notEmpty()
            .withMessage('Last name is required'),

        body('email')
            .isEmail()
            .withMessage('Email is not valid'),
        
        body('favoriteColor')
            .notEmpty()
            .withMessage('Favorite color is required'),

        body('birthDate')
            .isDate()
            .withMessage('Birth date is not valid')

    ]
}


//middleware to validate the results
contactValidate.validateResults = (req, res, next) => {
    const errors = validateResults(req);
    if (errors.isEmpty()) {
        return next();
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
}

module.exports = {contactValidate };
