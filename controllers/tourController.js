const Tour = require('./../models/tourModels');

exports.aliasTopTours = (req,res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name.price,ratingsAverage,summary,difficulty'
    next();
}

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString;
    }
    filter() {
    const queryObj = { ...this.queryString};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el])

    // Advanced Filtering!
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    
    this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    }
}

exports.getAllTours = async (req, res) => {
    try {
        console.log(req.query)       

        // Sorting!
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        }
        else {
            query.sort('-createdAt')
        }
        
        // Field Limiting
        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            // Projecting
            query = query.select(fields);
        }
        else{
            query = query.select('')
        }

        // Pagination
        // Multiply by one to convert a string to number
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page) {
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) throw new Error('Page does not exist!')
        }

        // Execute the query
        const features = new APIFeatures(Tour.find(), req.query).filter();
        const tours = await features.query;

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
            message: "Invalid data set bruh"
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