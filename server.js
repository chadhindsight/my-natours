// This file is only invovles server stuff like ports, etc. Express stuff is done in app.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Allows you to specify the file location to configure you environment varialbe
dotenv.config({path: './config.env'});

const app = require('./app');

console.log(process.env);

const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App  is running on port ${port}!`);
});