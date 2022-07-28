const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const { Client } = require('pg');

const client = new Client({
  user: 'postgres', 
  host: '127.0.0.1',
  database: 'customgames',
  password: '123456',
  port: 5432,
})

client.connect()

const PORT = process.env.PORT || 5001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({ message: "Hello from ser!" });
});

app.post("/_register", (req, res) => {

  const saltRounds = 5;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      var conn_string = `INSERT INTO user_info(hash_key, user_name, email) values ('${hash}', '${req.body.name}', '${req.body.email}');`;

      client.query(conn_string, (err, res_) => {
        if (err) 
          console.log(err);
        else
          res.json({ message: "done!" });
      })
    });
  });

})

app.post("/_login", (req,res) => {
  var conn_string = `SELECT hash_key, user_name, email from user_info where email = '${req.body.email}';`;
  client.query(conn_string, (err, res_) => {
    if (err) 
      console.log(err);
    else {
      bcrypt.genSalt(5, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if ( hash === res_[0] )
            res.json({ message: "matched" });
          else
            res.json({ message: "not_matched" });
        })
      });
    };
  })
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });