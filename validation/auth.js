const { body } = require("express-validator");

const registrationValidator = [
    body('password').isLength({ min: 8 }),
    body('fullName').isLength({ min: 3 }),
]

module.exports = {
    registrationValidator,
}