const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserDetailsSchema = new Schema({
    _id:String,
    name:String,
    image:String,
    cloudinaryID:String,
    DOB:String,
    TOB:String,
    COB:String,
    SOB:String,
})

module.exports = mongoose.model("UserDetails",UserDetailsSchema)