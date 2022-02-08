const express = require('express');

const router  = express.Router();

const session = require('express-session'); 

const mongoose = require('mongoose');

const userSchema = require('../models/schema.js');

const currUserSchema = require('../models/productSchema');

let User = mongoose.model('list',userSchema);

const fetchPrice = require("../priceChecker.js");

let currUser ;

router.get("/:id", async (req, res) => {

    loggedInUser = req.session.name;

    currUser = currUser = mongoose.model(loggedInUser,currUserSchema,loggedInUser);
    try{
        await currUser.deleteOne({ID: req.params.id},(err)=>{
            if(err){
                console.log(err);
            }
        })
    }
    catch(err){
        console.log("error aya bhai isme ",err);
    }
    res.redirect("/dashboard");
})

module.exports = router;