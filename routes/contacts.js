const express = require('express');

const { getContacts, redirectToContacts } = require("../controllers/contacts");

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/about-us', redirectToContacts);

module.exports = router;