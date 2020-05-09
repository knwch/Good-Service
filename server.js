require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const app = express();
//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
    fileupload({
        limits: { fileSize: 50 * 1024 * 1024 }
    })
);
//
// ─── ROUTE ──────────────────────────────────────────────────────────────────────
//
const auth = require('./routes/api/auth');
const post = require('./routes/api/post');
const user = require('./routes/api/user');
app.use('/api/auth/', auth);
app.use('/api/posts/', post);
app.use('/api/users/', user);
//
// ─── ERRORHANDLER ───────────────────────────────────────────────────────────────
//
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) console.error(err);
    else console.log(`Server running on port : ${port}`);
});
