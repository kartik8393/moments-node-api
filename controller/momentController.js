const  { successResponse,errorResponse } = require('../helper/index');
const { Moment } = require('../models/moments');
const { User } = require('../models/users');
var mongoose = require('mongoose');
const { createImage } = require('../helper/globalFunctions')


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

        let image_name=await createImage(req.body.image,req.body.title+Date.now())
        const moment = new Moment({
            image: image_name,
            title: req.body.title,
            tags: req.body.tags,
            user: req.body.user
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



