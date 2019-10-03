var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function(req, res, next) {
  console.log(req.body.telephoneName);
  var telephones = [];
  req.body.telephoneName.length.forEach(el => {
    telephones.push({
      nom: req.body.telephoneName.this[el],
      telephone: req.body.telephoneValue.this[el]
    });
  });
  var emails = [];
  req.body.telephoneName.length.forEach(el => {
    emails.push({
      nom: req.body.emailName.this[el],
      email: req.body.emailValue.this[el]
    });
  });

  var newContact = {
    avatar: req.body.avatar,
    nom: req.body,
    prenom: req.body,
    description: req.body,
    telephones: telephones,
    emails: emails
  };
  var entry = mongo.modele();
  var contact = new entry(newContact);
  contact.save().then(() => console.log("contact crée"));
});

module.exports = router;
