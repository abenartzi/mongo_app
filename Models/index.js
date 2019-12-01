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
const mongoUri = process.env.MONGODB_URI || "mongodb://heroku_mh0m3qpk:28qruprog666r4frdfj4i74cs@ds039211.mlab.com:39211/heroku_mh0m3qpk";
mongoose.connect(mongoUri, {useNewUrlParser: true})
.catch(() => process.exit(1));

require ('./post');
require ('./user');
