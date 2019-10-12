const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES SECTION!
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

// Old way, but still valid
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour)
// app.post("/api/v1/tours", createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES!
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Runs for all uncatched http verbs
app.all('*', (req, res, next) =>{
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on server`
    // })
    const err = new Error(`Can't find ${req.originalUrl} on server`)
    err.status = 'fail'
    err.statusCode = 404;

    next(err);
});

app.use((err, req, res, next) =>{
    //Set the error equal to whatever error is received!
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
})
module.exports = app;
