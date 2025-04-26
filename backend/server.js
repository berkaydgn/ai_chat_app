const express = require('express');
const mongoose = require('mongoose');
const cors = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

app.get('/', (req,res) => {
    res.send('Server is running!');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));