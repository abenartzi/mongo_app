const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {connect} = require('./Models');


connect().then(db => {
    console.log('db is connected');
    const app = express();
    const port = 3000;

    app.use(morgan('combined')); // Writes to the console log(Combined is how it write the log)
    app.use(cors()); // Allows access to all sites.
    app.use(bodyParser.json()); // Replaces the use of parsing and stringify

    app.get('/api/users', (req, res) => {
        db.collection('users')
            .find({})
            .toArray()
            .then(list => res.json(list).end())
    });
    app.listen(port, () => console.log(`app listening on port ${port}!`));
});

