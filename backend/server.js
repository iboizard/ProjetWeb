const express = require('express');
const { sequelize } = require('./models'); // Use CommonJS require


// Initialisation serveur
const app = express();
const port = 3000;

// Synchronize the database and start the server
// ----- IMPORTANT NOTE -----
// Using { force: true } only if we want to drop and recreate tables
// --------------------------
sequelize.sync({ force: true }) 
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });


// Define your routes and middleware below this
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
