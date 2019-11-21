// Retrieve
const MongoClient = require('mongodb').MongoClient;

let db;
let users;

// Connect to the db
MongoClient.connect("mongodb://heroku_mjrklbvl:6an38k795kgunjropt3673dhm@ds033579.mlab.com:33579/heroku_mjrklbvl",{useUnifiedTopology:true}) //Promise
    .then(mongo => mongo.db('heroku_mjrklbvl'))
    .then(myAppDB => db = myAppDB)
    .then(() => {
            users = db.collection('users');
    })
    .then(() => console.log('db is connected!' ))
    .catch(() => process.exit(1));

function getUserByName(name) {
    return users.find({name}).toArray()
}
