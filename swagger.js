const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Parking API',
    description: 'Dit is een API voor het vak Node.js'
  },
  host: 'localhost:4500'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/auth.js', './routes/index.js', './routes/parkings.js', './routes/registration.js', './routes/steden.js', './routes/users.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);