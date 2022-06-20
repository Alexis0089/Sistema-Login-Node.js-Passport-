const mongoose = require('mongoose');
const { mongodb } = require('./keys');

//Error
//mongoose.connect(mongodb.URI, {useNewUrlParser: true})
mongoose.connect(mongodb.URI, {})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));