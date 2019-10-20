const User = require('./../models/userModel');

exports.signup = async (req, res, next) =>{
    //Create a new user doc based on the user model that will have the fields populated by the values from req.body
    const newUser = await User.create(req.body)
}