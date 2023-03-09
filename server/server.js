require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const prefix = process.env.ROUTE_PREFIX || '/api'


console.log(prefix)

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get(prefix + '/test', (req, res) => {
  res.send({ express: 'TEST' }); 
}); 
