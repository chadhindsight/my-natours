const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES SECTION!
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${_dirname}/public`));

app.use((req, res, next) =>{
    console.log('Hello from the middleware');
    // next() signals for your middleware to move on
    next();
})
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

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
