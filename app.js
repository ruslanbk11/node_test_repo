const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const homeRoute = require("./routes/home");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const contactsRoutes = require("./routes/contacts");
const createPath = require("./utils/createPath");

// db connection
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

// app start
const app = express();
app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening ${process.env.PORT}`);
});

// middlewares
app.use(express.json());
app.use(express.static('styles'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status - :response-time ms'));

// routes
app.use(homeRoute);
app.use(authRoutes);
app.use(postRoutes);
app.use(contactsRoutes);

// page not found handling
app.use((request, response) => {
    response
        .status(404)
        .sendFile(createPath('pageNotFound'));
})