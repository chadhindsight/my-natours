const Tour = require('./../models/tourModels');

// CheckBody middleware checks for name and price properties in the body

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    }
    catch(err) {
        res.status(404).json({
            statusl: 'fail',
            message: err
        })
    }
    
}

exports.getTour = (req, res) => {
    console.log(req.params);
    // Multiply a string that has a number inside of it to make it a Number datatype;

    res.status(200).json({
        status: 'success'
    });
}

// Add a new tour to our data
exports.createTour = async (req, res) => {
   try { const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            } 
        })
    } catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: "Invalid data set"
        })
    }
}

exports.updateTour = (req, res) => {
   res.status(200).json({
       status: 'success booty',
       data: {
           tour: "<Updated tour here...>"
       }
   })
}

exports.deleteTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: null
    })
}