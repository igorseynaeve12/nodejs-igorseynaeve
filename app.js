
//Express API
const express = require('express');
const app = express();





const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
//routes
const parking = require('./routes/parkings');
const user = require('./routes/users');
const steden = require('./routes/steden');
const index = require('./routes/index');
const auth = require('./routes/auth');
const registration = require('./routes/registration');



const fs = require('fs');
const port = process.env.PORT || 4500;



app.use('/', index);
app.use('/api/parkings', parking);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/steden', steden);
app.use('/api/registrations', registration);

app.use(helmet());

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://seynaeveigor:4G38DrHcHHU9oyJn@apiparking.hpmjz9e.mongodb.net/opdrachtNode')
.then(()=> console.log('Verbonden met MongoDB'))
.catch(err => console.error('Kan niet verbinden met DB ...', err))

console.log('Api beschikbaar op: ' + 'http://localhost:' + port)


app.listen(port, ()=> console.log('Listening on port ' + port ))
