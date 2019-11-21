// Retrieve
const MongoClient = require('mongodb').MongoClient;

function connect() {
    // Connect to the db server:
    return MongoClient.connect("mongodb://heroku_mjrklbvl:6an38k795kgunjropt3673dhm@ds033579.mlab.com:33579/heroku_mjrklbvl",{useUnifiedTopology:true}) //Promise
        //Connect to specific db inside server
        .then(mongo => mongo.db('heroku_mjrklbvl'))
        //Close the app in case something is not working
        .catch(() => process.exit(1));
}

module.exports = {connect};

