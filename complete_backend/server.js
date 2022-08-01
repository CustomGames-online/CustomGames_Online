const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const { Client } = require('pg');
const sgMail = require('@sendgrid/mail')
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

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
app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send('welcome to my api');
});

app.post("/_validate", (req,res) => {
  let jwtSecretKey = 'customgames';

  try {
    const token = req.body.token;

    const verified = jwt.verify(token, jwtSecretKey);
    if(verified){
        return res.json({ message: "validated"});
    }else{
        // Access Denied
        return res.status(401).send(error);
    }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
})

app.post("/_register", (req, res) => {

  const saltRounds = 5;
  let token = '';

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      var conn_string = `INSERT INTO user_info(hash_key, user_name, email) values ('${hash}', '${req.body.name}', '${req.body.email}');`;

      client.query(conn_string, (err, res_) => {
        if (err) 
          res.json({ message: err });
        else{
          let jwtSecretKey = 'customgames';
          let data = {
              time: Date(),
              userId: 12,
          }

          token = jwt.sign(data, jwtSecretKey);
          res.json({ message: "done!", token: token });
        }
      })
    });
  });

})

app.post("/_login", (req,res) => {
  let token = false;
  console.log(req.body);
  var conn_string = `SELECT * from user_info where email = '${req.body.email}';`;
  client.query(conn_string, (err, res_) => {
    if (err) 
      res.json({ message: "not_matched" })
    else {
      if (res_.rows.length > 0) {
        var result = res_.rows[0];
        var pass = result['hash_key'];
        bcrypt.genSalt(5, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            
            if ( hash === pass ) {
              let jwtSecretKey = 'customgames';
              let data = {
                  time: Date(),
                  userId: 12,
              }

              token = jwt.sign(data, jwtSecretKey);
              res.json({ message: "matched", token: token, user_info: result });
            } else
              res.json({ message: "not_matched" });
          })
        })
      } else {
        res.json({ message: "not_matched"});
      }
;
    };
  })
})

app.post("/_send", (req,res) => {

  var code = "12345";
  var conn_string = `SELECT email FROM user_info WHERE email='${req.body.email}';`;
  
  client.query(conn_string, (err, res_) => {
    if (err) {
      res.json({ message: "not_sent"})
    } else {
      if ( res_.rows.length > 0 ) {
     
        const msg = {
          to: `${req.body.email}`, // Change to your recipient
          from: 'kamol.nazarov15@myhunter.cuny.edu', // Change to your verified sender
          subject: 'Reset Password Code',
          text: `This is your code - ${code}`,
          html: `<h1>Custom Games Onlines</h1>
                <strong>This is your code - 12345</strong>`,
        }
        
        sgMail
        .send(msg)
        .then(() => {
          res.json({ message: "sent"});
        })
        .catch((error) => {
          res.json({ message: "not_sent" });
        })
      } else {
        res.json({ message: "not_sent"})
      }
    }
      
  });

  conn_string = `INSERT INTO forgot_password_codes VALUES('${req.body.email}', '${code}')`;

  client.query(conn_string, (err, res_) => {
    if (err) {
      console.log('failed to insert forgot code...');
      console.log(err);
    } else {
      console.log('inserted forgot code..');
    }
  })

});

app.post("/_reset", (req,res) => {

  var conn_string = `SELECT code FROM forgot_password_codes WHERE email=${req.body};`;
  var matches = false;
  client.query(conn_string, (err, res_) => {
    if (err) 
      res.json({ message: err });
    else {
      if (req.body.code === res_.rows[0]) {
        matches = true;
      }
    }
     
  })

  if ( matches ) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        var conn_string = `UPDATE user_info SET hash_key = '${hash}' where email = '${req.body.email}';`;
  
        client.query(conn_string, (err, res_) => {
          if (err) 
            res.json({ message: err });
          else
            res.json({ message: "password changed" });
        })
      });
    });
  } else {
    res.json({ message: "password does not match" });
  }

})





app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });