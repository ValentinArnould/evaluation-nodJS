const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/annuaire";
const dbName = "annuaire";
const Contact = mongoose.model("Contact", {
  avatar: String,
  nom: String,
  prenom: String,
  description: String,
  telephones: [{ nom: String, telephone: String }],
  emails: [{ nom: String, email: String }]
});

class mongo {
  constructor() {
    /*pardon,
        j'ai beaucoup de difficultés
        pour créer des requêtes en base à la main
        je préfère ne pas faire confiance en mes talents
        */
    if (!mongo.instance) {
      mongo.instance = mongoose.connect(url, { useNewUrlParser: true });
    }
  }
  modele() {
      return Contact;
  }
}

module.exports = new mongo();
