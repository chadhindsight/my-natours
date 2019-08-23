const fs = require('fs')
const express = require('express');

const app = express();
app.use(express.json());

// read tour data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Defining routes. Get route is up first
app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
})

// Add a new tour to our data
app.post("api/v1/tours", (req, res) =>{
    req
})

const port = 3000;
app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});
// NB: We're building the API first