var express = require("express");
var router = express.Router();
var mongo = require("./../bin/mongo");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function(req, res, next) {
  var telephones = [];

  if (typeof req.body.telephoneName === "object") {
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

  if (typeof req.body.emailName === "object") {
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

  var avatar = req.body.avatar == "" ? "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.eurogeosurveys.org%2Fwp-content%2Fuploads%2F2014%2F02%2Fdefault_profile_pic.jpg&f=1&nofb=1" : req.body.avatar;

  var entry = mongo.modele();
  if (req.body._id != "newOne") {
    entry.findById(req.body.id, (err, contact) => {
      if (err) throw err;
      contact.avatar = avatar;
      contact.nom = req.body.nom;
      contact.prenom = req.body.prenom;
      contact.description = req.body.description;
      contact.telephones = telephones;
      contact.emails = emails;
      console.log("test " + contact._id);
      contact.save().then(() => {
        console.log("contact modifié");
        res.redirect("/");
      });
    });
    //res.redirect("/");
  } else {
    console.log("heypls");
    var newContact = {
      avatar: avatar,
      nom: req.body.nom,
      prenom: req.body.prenom,
      description: req.body.description,
      telephones: telephones,
      emails: emails
    };
    console.log(newContact);
    var contact = new entry(newContact);
    contact.save().then(() => {
      console.log("contact crée");
      res.redirect("/");
    });
  }
});

module.exports = router;
