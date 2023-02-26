const createPath = require("../utils/createPath");

const getContacts = (request, response) => {
    response.sendFile(createPath('contacts'));
}

const redirectToContacts = (request, response) => {
    response.redirect('contacts');
};

module.exports = {
    getContacts,
    redirectToContacts,
}