const{promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id}, process.env.JWT_SECTRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
exports.signup = catchAsync(async(req, res, next) =>{
    //Create a new user doc based on the user model that will have the fields populated by the values from req.body
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        pw: req.body.pw,
        pwconfirm: req.body.pwconfirm
    });

    const token = signToken(newUser._id);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async(req,res,next) => {
    const { email, pw } = req.body;

    // Check if email and password exist
    if(!email || !pw) {
        return next(new AppError("Please provide email & password", 400));
    }
    // Check if user exists & the password is right!
    const user = await User.findOne({email}).select('+pw');

    if (!user || ! await user.correctPassword(pw, user.pw)) {
        return next(new AppError("The email or password is incorrect!", 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    // 2) Verification token!
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPWAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});