const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// All the related routes & controllers being used with them!
router.route('top-5-cheap').get(tourController.getAllTours);
router.route(`/`).get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;