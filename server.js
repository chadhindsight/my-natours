// This file is only invovles server stuff like ports, etc. Express stuff is done in app.js
const app = require('./app');

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});