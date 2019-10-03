var express = require('express');
var router = express.Router();
var mongo = require('./../bin/mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  var ctNbr = 0;
  var lastCts = mongo.modele();
  lastCts.find({}, (err,users) => {

    console.log(users);
    ctNbr = users.length;
    res.render('index', {contactNbr: ctNbr, 
      lastContacts: users.reverse()});
  });
});

router.get('/changeContact', function(req, res, next) {
  var lastCts = mongo.modele();
  lastCts.findOne({}, (err,user) => {

    console.log(user);
    
      res.render('changeContact', {user: user});
  });
});

router.get('/contact/:id', function(req, res, next) {
  var lastCts = mongo.modele();
  lastCts.findOne({_id: req.params.id}, (err,user) => {

    console.log(user);
    
      res.render('contact', {user: user});
  });
});

module.exports = router;
