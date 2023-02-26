const express = require('express');

const { registrationValidator } = require("../validation/auth");
const { register, authorize, getUserInfo } = require("../controllers/auth");
const checkAuthorization = require("../middlewares/checkAuthorization");

const router = express.Router();

router.post('/register', registrationValidator, register);
router.post('/auth', authorize);
router.get('/user', checkAuthorization, getUserInfo);

module.exports = router;