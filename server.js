require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const errorHandler = require('./middleware/error');

const app = express();
//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//
// ─── ROUTE ──────────────────────────────────────────────────────────────────────
//
const auth = require('./routes/api/auth');
app.use('/api/auth/', auth);
//
// ─── ERRORHANDLER ───────────────────────────────────────────────────────────────
//
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) console.error(err);
    else console.log(`Server running on port : ${port}`);
});
