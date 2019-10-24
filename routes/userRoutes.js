express = require('express');
const userController = require('./../controllers/userController');
const authenticationController = require('./../controllers/authenticationController');

router = express.Router();

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);
// export the router so it can be used in app.js
module.exports = router;