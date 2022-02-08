const express = require('express');

const router  = express.Router();

const session = require('express-session'); 

const mongoose = require('mongoose');

const userSchema = require('../models/schema.js');

const currUserSchema = require('../models/productSchema');

let User = mongoose.model('list',userSchema);

const fetchPrice = require("../priceChecker.js");

let currUser ;

router.get("/", async(req, res) => {
    console.log(req.session);
    if(req.session.name !== undefined){
        loggedInUser = req.session.name;
        currUser = mongoose.model(loggedInUser,currUserSchema,loggedInUser);
        res.render("homepage",{username: loggedInUser});
    }
    else{
        res.redirect("/login");
    }
    
})


router.post("/", async(req, res) => {

    currUser = mongoose.model(loggedInUser,currUserSchema,loggedInUser);

    let vals = [];

    while(vals.length==0){
        vals = await fetchPrice(req.body.url,1383);
    }

    console.log(vals+"");

    let curruser = new currUser({
        url: req.body.url,
        price: req.body.rs,
        ID: makeid(10),
        photo: vals[2],
        title: vals[1],
    })

    try{
        console.log(currUser);
        await curruser.save();
        console.log(currUser);
        // console.log(user._id);
        res.redirect("http://localhost:3000/dashboard");
    } catch(err){
        // console.log(err);
        res.send(err);
    }
})

module.exports = router;
