const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
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
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
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
        require: [true, 'A tour must have a cover image']
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
// Query Middleware for secret tours
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
    console.log(this);
    next()
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
