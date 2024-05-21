
//Express API
const express = require('express');
const app = express();





const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const parking = require('./routes/parkings');
const fs = require('fs');
const port = process.env.PORT || 4500;



app.use('/api', parking);
app.use(helmet());

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/opdrachtNode')
.then(()=> console.log('Verbonden met MongoDB'))
.catch(err => console.error('Kan niet verbinden met DB ...', err))

console.log('App: ' + config.get('name'))
console.log('App host: ' + config.get('mail.host'))


app.listen(port, ()=> console.log('Listening on port ' + port ))
