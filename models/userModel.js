const mongoose = require('mongoose');
const validator = require('validator');

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
            // only works on save
            validator: function (el) {
                return el === this.password;
            }
        }
    }
});

const User = mongoose.model("User", userSchema);
//Export user model so it can be used in other files
module.exports = User;