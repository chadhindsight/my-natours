const Tour = require('./../models/tourModels');

// CheckBody middleware checks for name and price properties in the body

exports.getAllTours = async (req, res) => {
    try {
        // First we build the query
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el])
                
        const query = await Tour.find(queryObj);

        // Execute the query
        const tours = await query;

        // Send Response
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

exports.getTour = async (req, res) => {
    // Multiply a string that has a number inside of it to make it a Number datatype;

   try {
    const tour = await Tour.findById(req.params.id)

       res.status(200).json({
           status: 'success',
           data: {
               tour
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

exports.updateTour =  async (req, res) => {
   try{
     const tour = Tour.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true
     })
       res.status(200).json({
           status: 'success booty',
           data: {
               tour
           }
       })
   }

   catch(err) {
       res.status(400).json({
           status: 'Fail',
           message: "Invalid data set"
       })
   }
}

exports.deleteTour = async (req, res) => {
    try {
       await Tour.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            data: null
        })
    }

    catch(err){
        res.status(400).json({
            status: 'Fail',
            message: "Invalid data set"
        })
    }
}