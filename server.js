// This file is only invovles server stuff like ports, etc. Express stuff is done in app.js
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

console.log(process.env);

const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App  is running on port ${port}!`);
});