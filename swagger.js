const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Parking API',
    description: 'Dit is een API voor het vak Node.js'
  },
  host: 'localhost:4510'
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/auth.js', './src/routes/index.js', './src/routes/parkings.js', './src/routes/registration.js', './src/routes/steden.js', './src/routes/users.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);