const { successResponse, errorResponse } = require('../helper/index');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr("SECRETKEY");
const { User } = require('../models/users');
const e = require('express');


// LOGIN API
module.exports.login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    }).lean()
    // CHECK IF USER EXISTS
    if (user == null || user == undefined) {
        errorResponse(req, res, "User does not exist", 204)
        return;
    }

    // DECRYPT USER PASSWORD
    console.log(user)
    const decryptedpassword = cryptr.decrypt(user.password);

    if (decryptedpassword == req.body.password) {
        delete user.password
        // SIGN A JWT TOKEN AND SEND IT BACK
        const token = await jwt.sign({_id:user._id},"TOKENSECRET");
        user.token=token
        successResponse(req, res, user)
    }
    else {
        errorResponse(req, res, { err: "Invalid Credentials" })
    }  
}

// REGISTER API
module.exports.register = async (req, res) => {
    
    const checkEmail = await User.findOne({
        email: req.body.email
    })

    // CHECK IF EMAIL ALREADY EXISTS
    if (checkEmail != null || checkEmail != undefined) {
        errorResponse(req, res, "Email already exist", 204)
        return;
    }
    // ENCRYPT THE PASSWORD BEFORE SAVING IN DATABASE
    const encryptedPassword = cryptr.encrypt(req.body.password);
    let savedUser = {}
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            email: req.body.email,
            password: encryptedPassword,
        })
        savedUser = await user.save()
        console.log(savedUser)
        delete savedUser._doc['password']
    } catch (error) {
        errorResponse(req, res, error, 201)
    }
    successResponse(req, res, savedUser)
}