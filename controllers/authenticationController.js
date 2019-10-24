const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async(req, res, next) =>{
    //Create a new user doc based on the user model that will have the fields populated by the values from req.body
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        pw: req.body.pw,
        pwconfirm: req.body.pwconfirm
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECTRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = (req,res,next) =>{
    const { email, password } = req.body;

}