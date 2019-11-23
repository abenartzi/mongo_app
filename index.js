const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./Models');

const app = express();
const port = 3000;

app.use(morgan('combined')); // Writes to the console log(Combined is how it write the log)
app.use(cors()); // Allows access to all sites.
app.use(bodyParser.json()); // Replaces the use of parsing and stringify

require('./routes/users')(app); //calls the function


app.listen(port, () => console.log(`app listening on port ${port}!`));



// connect().then(db => {
//     // console.log('db is connected');
//
// });

