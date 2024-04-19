const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
    name: String,
    nameYouMember: String,
    UserName: String,
    email: String,
    pass: String,
    role: String,
    id_device: String
});


// Create a model based on that schema
const Article = mongoose.model("RAQAccounts", articleSchema);


// export the model
module.exports = Article; 