const express = require('express');
const router = express.Router();
const app = express();

// redirect / to /books
app.get('/', (req, res) => res.redirect('/api'));


module.exports = app;