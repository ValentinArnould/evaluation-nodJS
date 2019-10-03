var express = require("express");
var router = express.Router();
var mongo = require("./../bin/mongo");

/* GET home page. */
router.get("/", function(req, res, next) {
  var ctNbr = 0;
  var lastCts = mongo.modele();
  lastCts.find({}, (err, users) => {
    console.log(users);
    ctNbr = users.length;
    res.render("index", { contactNbr: ctNbr, lastContacts: users.reverse() });
  });
});

router.get("/changeContact/:id", function(req, res, next) {
  if (req.params.id != "newOne") {
    var lastCts = mongo.modele();
    lastCts.findOne({_id: req.params.id}, (err, user) => {
      console.log(user);

      res.render("changeContact", { user: user });
    });
  } else {
    res.render("changeContact", {
      user: {
        _id: "newOne",
        avatar: "",
        nom: "",
        prenom: "",
        description: "",
        telephones: [{ nom: "", telephone: "" }],
        emails: [{ nom: "", email: "" }]
      }
    });
  }
});

router.get("/contact/:id", function(req, res, next) {
  var lastCts = mongo.modele();
  lastCts.findOne({ _id: req.params.id }, (err, user) => {
    console.log(user);

    res.render("contact", { user: user });
  });
});

router.get("/contacts", function(req, res, next) {
  var ctNbr = 0;
  var lastCts = mongo.modele();
  lastCts.find({}, (err, users) => {
    console.log(users);
    ctNbr = users.length;
    res.render("contacts", { contactNbr: ctNbr, Contacts: users });
  });
});

module.exports = router;
