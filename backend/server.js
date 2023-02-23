const dotenv = require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Userdetails = require("./model/userModel");
const Booking = require("./model/bookingModel");
const upload = require("./middlewares/multer");
const UserDetails = require("./model/userModel");
const cloudinary = require('./utils/cloudinary')
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//       },
//     filename: (req,file,cb)=>{
//         cb(null, file.originalname);
//     },
// });

// const fileFilter = (req, file, cb)  => {
//     const allowedFileTypes = ['image/ jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
// const upload = multer({Storage,fileFilter});

const PORT = process.env.PORT || 5000;
  
app.get("/",(req,res)=>{
    res.send("landing page");
});

// app.post("/api/userdetails",async(req,res)=>{
//     try {
//         const userdetails = await Userdetails.create(req.body);
//         res.status(200).json(userdetails)
//     } catch (error) {
//         res.status(500).json({msg: error.message})
//     }
// })
app.post("/api/userdetails",async(req,res)=>{
    try {
        const {path} =req.file;  
        const result = await cloudinary.uploader.upload(path); 
        // console.log(result.public_id);
        const userdetails = new UserDetails({
            _id:req.body.phone,
            name:req.body.name,
            image:result.secure_url,
            cloudinaryID: result.public_id,
            DOB:req.body.DOB,
            TOB:req.body.TOB,
            COB:req.body.COB,
            SOB:req.body.SOB,
        });
        // console.log(userdetails);
        await userdetails.save();
        // removed the uploaded image from the uploads folder
        fs.unlinkSync(path); 
        res.status(201).json(userdetails)
        } 
    catch (error) {
           console.log(error);
        }
})

app.post("/api/bookingdetails",async(req,res)=>{
    try {
        const bookingdetails = await Booking.create(req.body);
        res.status(200).json(bookingdetails)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

app.get("/api/userdetails/:id",async(req,res) =>{
    try {
        const {id} = req.params;
        const userdetails = await Userdetails.findById(id);
        if(!userdetails){
            return res.status(404).send(`the userdetails with id: ${id} not found`)
        }
        return res.status(200).json(userdetails);
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
})

//update a user
// app.put("/api/userdetails/:id",upload.single('image'),async(req,res) =>{
//     try {
//         const {id} = req.params;
//         const update = req.body;
//         // if(req.file){
//         //     update.image = req.file.filename;
//         // }
//         const userdetails = await Userdetails.findByIdAndUpdate(
//             {_id:id}, update, {new:true}
//         );
//         // console.log(req.body);
//         // console.log(userdetails);
//         if(!userdetails){
//             res.status(404).send(`the userdetails with phone no: ${id} not found`)
//         }
//         // res.setHeader("Cache-Control", "no-cache"); 
//         res.status(200).json(userdetails);
//     } catch (error) {
//         res.status(500).json({msg:error.message})
//     }
// });
app.put("/api/userdetails/:id",upload.single('image'),async(req,res) =>{
    console.log('hey');
    let userdetails = await UserDetails.findById(req.params.id).exec();

    await cloudinary.uploader.destroy(userdetails.cloudinaryID);
    let result
    if(req.file){
        result = await cloudinary.uploader.upload(req.file.path)
    }
    const data = {
        _id: req.params.id,
        name: req.body.name || userdetails.name,
        image: result?.secure_url || userdetails.image,
        cloudinaryID: result?.public_id || userdetails.cloudinaryID,
        DOB:req.body.DOB || userdetails.DOB,
        TOB:req.body.TOB || userdetails.TOB,
        COB:req.body.COB || userdetails.COB,
        SOB:req.body.SOB || userdetails.SOB,
    }
    userdetails = await UserDetails.findByIdAndUpdate(req.params.id,data,{new:true})
    if(req.file){
        fs.unlinkSync(req.file.path)
    }
    res.status(200).json(userdetails)
});

// app.post("/store-image", async (req, res) => {
//     try {
//       const { image } = req.body;
//       if (!image) {
//         return res.status(400).json({ msg: "Please enter an icon url" });
//       }
//       let newImage = new Image({
//         image,
//       });
//       newImage = await newImage.save();
//       res.json(newImage);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

// app.post("/api/userdetails",async(req,res)=>{
//     console.log(req.body);
//     res.send("user created");
// })
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            app.listen(PORT,()=>{
                console.log("server running");
            })
        })
        .catch((err)=>console.log(err))