const config = {
    mongoUri: process.env.MONGODB_URI || "mongodb://heroku_mh0m3qpk:28qruprog666r4frdfj4i74cs@ds039211.mlab.com:39211/heroku_mh0m3qpk",
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'dfaksdhfaskfhak'
};

module.exports = config;