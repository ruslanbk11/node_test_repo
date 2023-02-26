const createPath = require("../utils/createPath");

const getHome = (request, response) => {
    response.sendFile(createPath('home'));
}

module.exports = {
    getHome,
}