const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema(
    {
        _id:{
            type:"String",
            required: [true,"don't leave the field empty"]
        },
        name:{
            type:String,
            required: [true,"don't leave the field empty"]
        },
        DOB:{
            type:String,
            required: [true,"don't leave the field empty"]
        },
        TOB:{
            type:String,
            required: [true,"don't leave the field empty"]
        },
        COB:{
            type:String,
            required: [true,"don't leave the field empty"]
        },
        SOB:{
            type:String,
            required: [true]
        },
        HandImage:{
            type:String,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)


const Booking = mongoose.model("booking",bookingSchema)
module.exports = Booking