// This file only invovles server stuff like ports, etc. Express stuff is done in app.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<password>', 
    process.env.DATABASE_PW);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

const tourSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number
})

const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App  is running on port ${port} ${process.env.DATABASE_PW}!`);
});