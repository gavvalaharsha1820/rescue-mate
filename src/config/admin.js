const mongoose = require("mongoose");
const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv:.mongodb.net/');
         console.log("Database connected ");
    } 
    catch (error) {
        console.error("ERROR in connecting db!");
    }
}
module.exports = connectToDB; 
