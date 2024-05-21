
//Express API
const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const config = require('config');
const port = process.env.PORT || 4500;



// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
.then(()=> console.log('Verbonden met MongoDB'))
.catch(err => console.error('Kan niet verbinden met DB ...', err))

console.log('App: ' + config.get('name'))
console.log('App host: ' + config.get('mail.host'))

app.use(router);

app.listen(port, ()=> console.log('Listening on port ' + port ))
