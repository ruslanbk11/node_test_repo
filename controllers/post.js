const Post = require("../models/post");
const createPath = require("../utils/createPath");

const getNewPostForm = (request, response) => {
    response.sendFile(createPath('newPost'));
}

const createNewPost = (request, response) => {
    const { text, title, author } = request.body;
    const post = new Post({ text, title, author });
    post
        .save()
        .then((result) => response.send(result))
        .catch((error) => {
            console.log(error);
            response.sendFile(createPath('error'));
        });
}

module.exports = {
    getNewPostForm,
    createNewPost,
}