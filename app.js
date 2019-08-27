const fs = require('fs')
const express = require('express');
const morgan = require('morgan');
const app = express();

// MIDDLEWARES SECTION
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) =>{
    console.log('Hello from the middleware');
    // next() signals for your middleware to move on
    next();
})
app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
})
// read tour data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// ROUTE HANDLERS SECTION
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        requestedAt: req.requestTime,
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
    console.log(req.params);
    // Multiply a string that has a number inside of it to make it a Number datatype;
    const id = req.params.id * 1;
    const tour = tours.find(el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }

    });
}
// Defining routes. The get route is up first
// Add a new tour to our data
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    // Allows you to create a new object from merging two other objects
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        })
    }
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        })
    }

    res.status(200).json({
        status: 'success',
        data: null
    })
}

const getAllUsers = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}
// Old way, but still valid
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour)
// app.post("/api/v1/tours", createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route(`/`).get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
userRouter.route('/api/v1/users').get(getAllUsers).post(createUser);
userRouter.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});
// NB: We're building the API first