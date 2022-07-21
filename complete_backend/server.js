const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const register = require("./register.js");

const pg = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        port : 5432,
        user : 'postgres',
        password : '123456',
        database : 'customgames'
      },
    searchPath: ['knex', 'public'],
});

const app = express();
const PORT = process.env.PORT || 5001;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send('this is the api');
})
app.post("/_signin", (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/_register", (req, res) => {
    // register.handleRegister(req, res, pg, bcrypt);

    console.log(req.body);

});

app.get("/_profile", (req, res) => {
    profile.handleProfile(req, res, db);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });