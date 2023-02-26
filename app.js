const express = require('express');
const morgan = require("morgan");

const postRoutes = require("./routes/post");
const contactsRoutes = require("./routes/contacts");
const createPath = require("./utils/createPath");

const app = express();

const PORT = 3000;
const db = 'mongodb://localhost:8000';

mongoose.set('strictQuery', false);
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch((error) => console.log(error));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.sendFile(createPath('home'));
});

app.use(postRoutes);
app.use(contactsRoutes);

app.use((request, response) => {
    response
        .status(404)
        .sendFile(createPath('pageNotFound'));
})