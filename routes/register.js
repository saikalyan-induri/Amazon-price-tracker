const express = require('express');

const router  = express.Router();

const session = require('express-session');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const mongoose = require('mongoose');

const userSchema = require('../models/schema.js');

const currUserSchema = require('../models/productSchema');

let User = mongoose.model('list',userSchema);

const fetchPrice = require("../priceChecker.js");

let currUser ;

//fetchPrice("https://www.amazon.in/dp/B0999S3MD4/ref=s9_acsd_al_bw_c2_x_2_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-4&pf_rd_r=X0H77FFZNBJSYFWEE9Q8&pf_rd_t=101&pf_rd_p=f7a49dc2-3d84-41a5-bb47-82723963745b&pf_rd_i=22938665031",12345);

// register routes

router.get("/", (req, res) => {
    res.render("register");
})

router.post("/", async(req, res) => {

    // console.log(req.session);

    let password = await bcrypt.hash(req.body.password, saltRounds);
    
    let user = new User({
        email: req.body.email,
        username : req.body.username,
        password : password,
    })
    try{
        await user.save();
        res.redirect("http://localhost:3000/login");
    } catch(err){
        res.redirect("/register");
    }

})

module.exports = router;