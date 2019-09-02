// This file is only invovles server stuff like ports, etc. Express stuff is done in app.js
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

console.log(process.env)
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});