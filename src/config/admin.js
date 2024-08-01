const mongoose = require("mongoose");
const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Bharath8978:Bharath1234567@cluster0.yo4vbf6.mongodb.net/');
         console.log("Database connected ");
    } 
    catch (error) {
        console.error("ERROR in connecting db!");
    }
}
module.exports = connectToDB; 