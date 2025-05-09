const express = require('express');
const path = require('path');
const AppError = require('./utils/appError');
const globalErrorHandling = require('./controller/errorController');

const userRouter = require('./routes/userRoutes');
const dokterRoutes = require('./routes/dokterRoutes');
const janjiTemuRoutes = require('./routes/janjiTemuRoutes');
const pemeriksaanRoutes = require('./routes/pemeriksaanRoutes');
const notifikasiRoutes = require('./routes/notifikasiRoutes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// 3. ROUTE
app.use('/api/v1/users', userRouter);
app.use('/api/v1/doctors', dokterRoutes);
app.use('/api/v1/janjiTemu', janjiTemuRoutes);
app.use('/api/v1/pemeriksaan', pemeriksaanRoutes);
app.use('/api/v1/notifikasi', notifikasiRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandling);

// 4. SERVER
module.exports = app;
