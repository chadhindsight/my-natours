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

const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App  is running on port ${port}!`);
});

process.on('unhandledRejection', err =>{
    console.log('UNHANDLED REJECTION! Shutting down...')
    console.log(err);
    ServiceWorkerRegistration.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException', err =>{
    console.log('UNHANDLED Exception! Shutting down...')
    console.log(err.name, err.message);
    ServiceWorkerRegistration.close(() => {
        process.exit(1);
    })
})