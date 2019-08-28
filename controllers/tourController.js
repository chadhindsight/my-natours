const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

// Add a new tour to our data
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        })
    }
}

exports.deleteTour = (req, res) => {
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