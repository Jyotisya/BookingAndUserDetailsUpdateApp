const express = require('express');
const UserDetails = require('../models/UserDetails');
const Booking = require("../models/bookingModel");
const cloudinary = require('../utils/cloudinary')
const router = express.Router();
const fs = require('fs');
const upload= require('../middlewares/multer');

// const { findByIdAndUpdate } = require('../models/UserDetails');

const getAllUserDetails = async(req,res) => {
    try {
        let userDetails = await UserDetails.find({}).exec();
        if (!userDetails) {
            return res.status(404).json({error: "No user details found"});
        }
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
  
const createBooking = async(req,res) => {
    // console.log("bookingdetails called!!!");
    try {
        const bookingdetails = await Booking.create(req.body);
        res.status(200).json(bookingdetails)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
const editUserDetails = async(req,res) => {
    console.log(req.body);
    try {
    // res.send("you have all the contacts")
    let userDetails = await UserDetails.findById(req.params.id).exec();
    if(!userDetails){
        return res.status(404).json({error:"user not found"});
    }
    let result
    if(req.file){
        console.log("an image received");
        result = await cloudinary.uploader.upload(req.file.path,{ upload_preset: 'x6uwsasp' });
        if (userDetails.cloudinaryID) {
            await cloudinary.uploader.destroy(userDetails.cloudinaryID);
          }
    }
    // console.log(req.body)
    const data = {
        _id: req.params.id,
        name: req.body.name || userDetails.name,
        image: result?.secure_url || userDetails.image,
        cloudinaryID: result?.public_id || userDetails.cloudinaryID,
        DOB:req.body.DOB || userDetails.DOB,
        TOB:req.body.TOB || userDetails.TOB,
        COB:req.body.COB || userDetails.COB,
        SOB:req.body.SOB || userDetails.SOB,
    }
    userDetails = await UserDetails.findByIdAndUpdate(req.params.id,data,{new:true})

    if(req.file){
        fs.unlinkSync(req.file.path)
    }
    // console.log(userDetails)
    res.status(200).json(userDetails)
    } catch(err){
        console.log(err);
    }
}
const addUserDetails = async(req,res) => {
    try {
        const {path} =req.file;  
        const result = await cloudinary.uploader.upload(path,{ upload_preset: 'x6uwsasp' }); 
        // console.log(result.public_id);
        const userDetails = new UserDetails({
            _id:req.body.phone,
            name:req.body.name,
            image:result.secure_url,
            cloudinaryID: result.public_id,
            DOB:req.body.DOB,
            TOB:req.body.TOB,
            COB:req.body.COB,
            SOB:req.body.SOB,
        });
        console.log(userDetails);
        await userDetails.save();
        // removed the uploaded image from the uploads folder
        fs.unlinkSync(path); 
        res.status(201).json(userDetails)
        } catch (error) {
            console.log("error occured");
           console.log(error);
        }
    };

const deleteUserDetails = (req,res) => {
    res.send("you have all the userDetails")
}
const getSingleUserDetails = async(req,res) => {
    // res.send("you have all the userDetails")
    const userDetails = await UserDetails.findById(req.params.id).exec()
    if(!userDetails){
        return res.status(404).json({error:"No user details found"})
    }
    res.status(200).json(userDetails);
}

module.exports = {
    getAllUserDetails,
    editUserDetails,
    addUserDetails,
    deleteUserDetails,
    getSingleUserDetails,
    createBooking
}