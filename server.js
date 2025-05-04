const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!!! Shutting down....');
  console.log(err.name, err.message);
  console.log(err.stack); // Add this line to see the full stack trace
  process.exit(1);
});

dotenv.config({ path: '.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB)
  .then(() => console.log('DB CONNECT SUCCESS'))
  .catch(err => {
    console.log('DB CONNECTION ERROR:', err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!!! Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
