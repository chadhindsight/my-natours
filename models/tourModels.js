const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');
const validator = require('validator');


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'As tour name must have less or equal than 40 chars'],
        minLength: [10, 'A tour name must have more than or equal to 10 chars!'],
        validate: [validator.isAlpha, 'Tour name must only have characters!']
    },
    slug: String,
    duration: {
        type: Number,
        required: true,
        message: "Tour must have a duration"
    },
    maxGroupSize: {
        type: Number,
        required: true,
        message: "Tour must have a group size"
    },
    difficulty:{
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty should be specified'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        max: [5, 'rating must be below 5.0'],
        min: [1, 'rating must be above one']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.6
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (v) {
                return v < this.price
            },
            message: 'Discount price should be less than regular price'
        }
    },
    summary: {
        type: String,
        trim: true,
        required: true,
        message: "A tour must have a desctiption"
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        require: [true, 'A tour needs to have a cover image']
    },
    images: [String],
    createAt: { 
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
   toJson: {virtuals: true},
   toObject: {virtuals: true} 
});

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
})
// This runs before .save() and .create() are run
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true });

    next();
})
// Query Middleware for the secret tours
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });

    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function (docs, next) {
    // console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});
// Aggregation Middleware!
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({$match: { secretTour: {$ne: true} }});
    console.log(this.pipeline());
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
