const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
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
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");

<<<<<<< HEAD:server/server.js
const app = express();

const port = 3018;
const host = '127.0.0.1';
=======
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'Nadir',
        password: '',
        database: 'custom-game'
    }
});

const app = express();
// const port = process.env.PORT;
>>>>>>> 5d5b95919fdf261e3d7eed7f3643f731d42b2760:custom-game-api/server.js

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {

  console.log( 'post for signup done')
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Incorrect Form");
    }

    const hash = bcrypt.hashSync(password);

    pg('user_info').insert([{hash_key: hash, email: email, user_name: name, creation_date: new Date()}]);

});

<<<<<<< HEAD:server/server.js
// app.post("/signin", (req, res) => {
//     signin.handleSignIn(req, res, db, bcrypt);
// });

// app.post("/register", (req, res) => {
//     register.handleRegister(req, res, db, bcrypt);
// });

// app.get("/profile/:id", (req, res) => {
//     profile.handleProfile(req, res, db);
// });

app.listen(port, host);
=======
app.listen(3000, () =>
    console.log(`Example app listening on port 3000!`)
);
>>>>>>> 5d5b95919fdf261e3d7eed7f3643f731d42b2760:custom-game-api/server.js
