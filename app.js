
//Express API
const express = require('express');
const app = express();





const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const parking = require('./routes/parkings');
const user = require('./routes/users');
const steden = require('./routes/steden');
const index = require('./routes/index');
const auth = require('./routes/auth');
const fs = require('fs');
const port = process.env.PORT || 4500;


app.use('/', index);
app.use('/api/parkings', parking);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/steden', steden);
app.use(helmet());

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/opdrachtNode')
.then(()=> console.log('Verbonden met MongoDB'))
.catch(err => console.error('Kan niet verbinden met DB ...', err))

console.log('App: ' + config.get('name'))
console.log('App host: ' + config.get('mail.host'))


app.listen(port, ()=> console.log('Listening on port ' + port ))
