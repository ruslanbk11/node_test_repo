const createPath = require("../utils/createPath");

const getNewPostForm = (request, response) => {
    response.sendFile(createPath('newPost'));
}

const createNewPost = (request, response) => {
    response.send(request.body);
}

module.exports = {
    getNewPostForm,
    createNewPost,
}