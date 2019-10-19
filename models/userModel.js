const mongoose = require('mongoose');
// name, email, photo, pw, pwconfirm

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
        lowercase: true
    },
    photo: String,
    pw: String,
    pwconfirm: Boolean
})

const User = mongoose.model("User", userSchema);
//Export user model so it can be used in other files
module.exports = User;