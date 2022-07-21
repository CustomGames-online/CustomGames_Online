const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  console.log( name );
  console.log( email );
  console.log( password );
  
  if (!name || !email || !password) {
    return res.status(400).json("Incorrect Form");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash_key: hash,
        email: email
      })
      .into("user_info")
      .returning("email")
      .then(loginEmail => {
        return trx("user_info")
          .returning("*")
          .insert({
            user_name: name,
            email: loginEmail[0],
            creation_date: new Date()
          })
          .then(user => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to Register"));
};

module.exports = {
  handleRegister: handleRegister
};
