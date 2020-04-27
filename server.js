require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) console.error(err);
    else console.log(`Server running on port : ${port}`);
});
