require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WORKING' });
});

let server;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
  );
}

// Code below for creating tables on db, should begin on the very first time

// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     // await sequelize.sync({ force: true }); // Activate this string for clearing data in db on heroku
//   } catch (e) {
//     console.log(e);
//   }
// };

// start();

module.exports = {
  app,
  server,
};
