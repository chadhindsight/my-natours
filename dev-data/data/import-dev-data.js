const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

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

    // READ JSON FILE
    const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

    // IMPORT DATA FROM DB
    const importData = async () =>{
        try {
            await Tour.create(tours);

        }
        catch(err) {
            console.log(err);
        }
    }
    // DELETE DATA FROM COLLECTION 