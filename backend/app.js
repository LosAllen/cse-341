const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const path = require('path');
const swaggerRoutes = require('./routes/swagger');
const cors = require('cors');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  // Serve static files from the frontend folder
  .use(express.static(path.join(__dirname, '../frontend')))
  // Serve index.html for the root route
  .get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  })
  .use('/', require('./routes'))
  .use(cors())
  .use(swaggerRoutes);

// Initialize the database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
