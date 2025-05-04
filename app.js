const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandling = require('./controller/errorController');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// 3. ROUTE
app.use('/api/v1/users', userRouter);
app.get('/', (req, res) => res.send('OK'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandling);

// 4. SERVER
module.exports = app;
