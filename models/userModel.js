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
    pw: {
        type:String,
        required: [true, 'provide a password'],
        minlength: 8
    },
    pwconfirm: {
        type: String,
        required: [true, 'confirm your password'],
        validate: {
            //This only works on save
            validator: function (el) {
                return el === this.password;
            },
            message: 'Both password fields must match!'
        }
    }
});
    userSchema.pre('save', async function(next){
        if(this.isModified('password')) {return next}

        this.password = await bcrypt.hash(this.password, 12);
    })

const User = mongoose.model("User", userSchema);
//Export user model so it can be used in other files
module.exports = User;