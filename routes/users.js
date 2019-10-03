var express = require("express");
var router = express.Router();
var mongo = require("./../bin/mongo");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function(req, res, next) {
  var telephones = [];
  if(typeof(req.body.telephoneName) === 'object') {
    Object.keys(req.body.telephoneName).forEach(el => {
      telephones.push({
        nom: req.body.telephoneName[el],
        telephone: req.body.telephoneValue[el]
      });
    });
  } else {
    telephones.push({
      nom: req.body.telephoneName,
      telephone: req.body.telephoneValue
    });
  }
    var emails = [];
  if(typeof(req.body.emailName) === 'object') {
    Object.keys(req.body.emailName).forEach(el => {
      emails.push({
        nom: req.body.emailName[el],
        email: req.body.emailValue[el]
      });
    });
  } else {
    emails.push({
      nom: req.body.emailName,
      email: req.body.emailValue
    });
  }

  var newContact = {
    avatar: req.body.avatar,
    nom: req.body.nom,
    prenom: req.body.prenom,
    description: req.body.description,
    telephones: telephones,
    emails: emails
  };
  console.log(newContact);
  var entry = mongo.modele();
  var contact = new entry(newContact);
  contact.save().then(() => {
    console.log("contact crée");
    res.redirect('/');
  });
});

module.exports = router;
