const mongoose = require('mongoose');
const UserEmailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you have a User model and userId refers to _id of User
        ref: 'User', // Reference to User model
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures each email is unique
    },
    verified: {
        type: Boolean,
        default: false // Indicates whether the email is verified or not
    }
});
const addSchema = mongoose.Schema({
    username:{
        type:String,
    },
    password1:{
        type:String
    },
    gend:{
        type:String,
    },
    adhar:{
        type:Number,
    },
    mobile:{
        type:Number,
    },
    Trustedp:{
        type:Number,
    },
    Mail:{
        type:String,
    },
    Village:{
        type:String
    },
    Pincode:{
        type:Number,
    }
})
const Admin = mongoose.model('disaster',addSchema);
module.exports = Admin;
const UserEmail = mongoose.model('UserEmail', UserEmailSchema);
module.exports = UserEmail;