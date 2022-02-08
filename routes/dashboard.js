const express = require('express');

const router  = express.Router();

const session = require('express-session'); 

const mongoose = require('mongoose');

const userSchema = require('../models/schema.js');

const currUserSchema = require('../models/productSchema');

let User = mongoose.model('list',userSchema);

const fetchPrice = require("../priceChecker.js");

let currUser ;




router.get("/", async (req, res) => {

    console.log(req.session);
    if(req.session.name !== undefined){
        loggedInUser = req.session.name;
        currUser = mongoose.model(loggedInUser,currUserSchema,loggedInUser);
        let completeList = await currUser.find({});
        res.render("dashboard",{list: completeList});
    }
    else{
        res.redirect("/login");
    }
    
})


module.exports = router;