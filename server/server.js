const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");

const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db);
});

app.listen(port || 3000, () =>
    console.log(`Example app listening on port ${port}!`)
);