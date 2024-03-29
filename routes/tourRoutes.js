const express = require('express');
const tourController = require('./../controllers/tourController');
const authenticationController = require('./../controllers/authenticationController');


const router = express.Router();

// All the related routes & controllers being used with them
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route(`/`).get(authenticationController.protect,tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(authController.protect,authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

module.exports = router;