// Retrieve
// const MongoClient = require('mongodb').MongoClient;
//
// function connect() {
//     // Connect to the db server:
//     return MongoClient.connect("mongodb://heroku_mjrklbvl:6an38k795kgunjropt3673dhm@ds033579.mlab.com:33579/heroku_mjrklbvl",{useUnifiedTopology:true}) //Promise
//         //Connect to specific db inside server
//         .then(mongo => mongo.db('heroku_mjrklbvl'))
//         //Close the app in case something is not working
//         .catch(() => process.exit(1));
// }
//
// module.exports = {connect};

//New with mongoose

const mongoose = require('mongoose');
mongoose.connect("mongodb://heroku_mjrklbvl:6an38k795kgunjropt3673dhm@ds033579.mlab.com:33579/heroku_mjrklbvl", {useNewUrlParser: true})
.catch(() => process.exit(1));

mongoose.model('User', {
  name:{
      type:String,
      required:true,
      unique:true,
      validate(value){
          return value.includes('@');
      },
  },
  username:String,
  password:String,
  birthDate:Date,
  gender: {
      type:String,
          enum:['f','m']
    },
    githubLink:String,
    about:String
});
