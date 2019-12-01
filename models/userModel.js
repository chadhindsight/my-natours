const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"]
    },
    email: {
        type: String,
        required: [true, "Please tell us your name"],
        unique: true,
        // transform all emails to lower
        lowercase: true,
        validate: [validator.isEmail, 'Enter valid email!']
    },
    photo:String,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    pw: {
        type:String,
        required: [true, 'provide a password'],
        minlength: 8,
        select: false
    },
    pwconfirm: {
        type: String,
        required: [true, 'confirm your password'],
        validate: {
            //This only works on save
            validator: function (el) {
                return el === this.pw;
            },
            message: 'Both password fields must match!'
        }
    },
    pwChangedAt: Date
});
    userSchema.pre('save', async function(next){
        // Only runs when password is modified
        if(this.isModified('password')) {return next}
        // Hash password with cost of 1w
        this.pw = await bcrypt.hash(this.pw, 12);
        // Remove pw confirm field from DB
        this.pwconfirm = undefined;
        next();
    })
 userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
     return await bcrypt.compare(candidatePassword, userPassword);
 }
 userSchema.methods.changedPWAfter = function(JWTTimeStamp) {
     if (this.pwChangedAt) {
         const changeTimestamp = parseInt(
             this.pwChangedAt.getTime() /1000, 
            10
             );
         
             console.log(this.pwChangedAt, JWTTimeStamp);
             return JWTTimeStamp < changeTimestamp 
     }

    return false;
 }
const User = mongoose.model("User", userSchema);
//Export user model so it can be used in other files
module.exports = User;