const  { successResponse,errorResponse } = require('../helper/index');
const { Moment } = require('../models/moments');
const { User } = require('../models/users');
var mongoose = require('mongoose');
const { createImage ,deleteImage } = require('../helper/globalFunctions')
const fs = require('fs');

//ADD CENTER
module.exports.newMoment = async(req,res)=>{
    let savedMoment = {}
    let user = null
    if (mongoose.Types.ObjectId.isValid(req.body.user)) {
        user = await User.findById(req.body.user)
        if (!user) {
            errorResponse(req, res, "User does not exist", 204)
            return;
        }
    }
    else {
        errorResponse(req, res, "Invalid User Id", 204)
        return;
    }
    
    if(!user){
        errorResponse(req, res, "User does not exist", 204)
        return;
    }
    try {

        let image_name=await createImage(req.body.image,req.body.title.replace(" ","")+Date.now())
        const moment = new Moment({
            image: image_name,
            title: req.body.title,
            tags: req.body.tags,
            user: req.body.user,
            comment:req.body.comment
        })
        savedMoment = await moment.save()
    } catch (error) {
        errorResponse(req, res, error, 204)
    }
     successResponse(req,res,savedMoment);
   
 };

module.exports.getAll = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.query.user)){
        const momentList=await Moment.find({
            user:req.query.user
        })
        successResponse(req,res,momentList);
    }
    else{
        errorResponse(req, res, "Invalid User Id", 204)
        return;
    }
}

module.exports.getOne = async (req, res) => {
    console.log(req.query.id)
    if (mongoose.Types.ObjectId.isValid(req.query.id)){
        
        const moment=await Moment.findOne({_id:req.query.id})
        successResponse(req,res,moment);
    }
    else{
        errorResponse(req, res, "Invalid User Id", 204)
        return;
    }
}

function isBase64(str) {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

module.exports.update = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.query.id)){
        const moment=await Moment.findOne({
            _id:req.query.id
        })
        if(!moment){
            errorResponse(req, res, "Invalid Moment Id", 204)
            return;
        }
        if(req.body.newImage!="" && req.body.newImage!=undefined){
            let image_name=await createImage(req.body.newImage,req.body.title.replace(" ","")+Date.now())
            moment.image=image_name
        }
        moment.tags=req.body.tags;
        moment.title=req.body.title;
        moment.comment=req.body.comment;
        moment.save()
        successResponse(req,res,moment);
    }
    else{
        errorResponse(req, res, "Invalid Moment Id", 204)
        return;
    }
}

module.exports.deleteImage= async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.id)){
        const moment=await Moment.findOne({
            _id:req.body.id
        })
        if(!moment){
            errorResponse(req, res, "Invalid Moment Id", 204)
            return;
        }
        if(moment.image==req.query.name){
            deleteImage(req.query.name)
            moment.image=undefined;
            moment.save()
            successResponse(req,res,moment);
        }
        else{
            errorResponse(req, res, "Delete unsuccessful", 204)
            return;
        }
    }
}

module.exports.delete = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.query.id)) {
        const moment = await Moment.deleteOne({ _id: req.query.id })
        if (!moment) {
            errorResponse(req, res, "Invalid Moment Id", 204)
            return;
        }
        else {
            successResponse(req, res, moment);
        }
    }
    else {
        errorResponse(req, res, "Invalid Moment Id", 204)
        return;
    }
}





