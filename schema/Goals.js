const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
    name: String,
    des: String,
    body: String,
    StartTime: String,
    EndTime: String,
    member1: String,
    member2: String,
    member3: String,
    member4: String,
    member5: String
});


// Create a model based on that schema
const Article = mongoose.model("RAQGoals", articleSchema);


// export the model
module.exports = Article; 