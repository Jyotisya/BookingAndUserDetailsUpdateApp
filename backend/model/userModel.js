const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        _id:{
            type:"String",
            required: [true,"don't leave the field empty"]
        },
        name:{
            type:String,
            required: [true,"don't leave the field empty"]
        },
        img:
        {
            type:String
            // data: Buffer,
            // contentType: String
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
        }
    },
    {
        timestamps: true
    }
)


const UserDetails = mongoose.model("UserDetails",userSchema)
module.exports = UserDetails