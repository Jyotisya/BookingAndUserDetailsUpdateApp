const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        _id:String,
        name:String,
        image:String,
        cloudinaryID:String,
        DOB:String,
        TOB:String,
        COB:String,
        SOB:String,
    },
    {
        timestamps: true
    }
)


const UserDetails = mongoose.model("UserDetails",userSchema)
module.exports = UserDetails