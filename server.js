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



// const testTour = new Tour({
//     name: 'The Park Camper',
//     rating: 4.7,
//     price: 500
// })

// testTour.save().then(doc =>{
//     console.log(doc);
// }).catch(err =>{
//     console.log('ERROR', err)
// });

const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App  is running on port ${port} ${process.env.DATABASE_PW}!`);
});