
let loggedInUser = "";

const express = require("express");

const session = require("express-session");

const MongoStore = require("connect-mongo");

const axios = require("axios").default;

const bcrypt = require('bcrypt');

const saltRounds = 10;

const bodyParser = require("body-parser");

const puppeteer = require("puppeteer");

const $ = require("cheerio");

const CronJob = require("cron").CronJob;

const nodemailer = require("nodemailer");

const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");

const fetchPrice = require("./priceChecker.js");

const mail = require("./sendMail.js");

const app = express();

// const MongoStore = require("connect-mongo")(session);

require('dotenv').config();

const port = process.env.PORT;

 function makeid(length) {
      var result  = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

const mongoUrl = process.env.mongoUrl;

mongoose.connect(mongoUrl, {

  useNewUrlParser: "true",

})

mongoose.connection.on("error", err => {

  console.log("err", err)

})

mongoose.connection.on("connected", (err, res) => {

  console.log("mongoose is connected")

})

app.use(
  session({
    // store: new MongoStore({
    //     url: "mongodb://localhost:27017/priceTracker"
    // }),
    secret: makeid(10),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
            mongoUrl: mongoUrl,
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'native',
        })
  })
);

const userSchema = require('./models/schema.js');

const currUserSchema = require('./models/productSchema');

let User = mongoose.model('list',userSchema);

let currUser ;

// register routes

app.use("/register",require("./routes/register"));

app.use("/homepage",require("./routes/homepage"));

app.use("/dashboard",require("./routes/dashboard"));

app.use("/delete",require("./routes/delete"));


// login routes

app.get("/login",async(req, res) => {
    res.render("login");
})

app.post("/login", async(req, res) => {
    User.findOne({ username: req.body.username},  (err, data) => {
        if(err){
            return res.redirect("/login");
        }
        console.log(data);
        if(data==null){
            return res.render("login");
        }
        else{
            bcrypt.compare(req.body.password,data.password, function(err,retVal){
                if(err){
                    console.log(err.message);
                }
                console.log(retVal);
                if(retVal==true){
                    req.session.name = req.body.username;
                    loggedInUser = req.body.username;
                    console.log(loggedInUser);
                    currUser = mongoose.model(loggedInUser,currUserSchema,loggedInUser);
                    console.log(currUser);
                    return res.redirect("/homepage");
                }
                else{
                    res.redirect("/login");
                }
            });
            // console.log(retVal);
            
        }
        
    });
})

// Logout routes

app.get("/logout", async(req, res) => {
    req.session.destroy();
    loggedInUser = "";
    res.redirect("/login");
})


////////////////////////////////////////////////////////////////////////////

 setInterval( async () =>{
     console.log("in the function da");
    //  console.log(session);
     if(loggedInUser!=""){
         let completeList = await currUser.find({});
         let mailDetails = {
            from: process.env.mailId,
            to: '',
            subject: 'Test mail',
            text: 'Node.js testing mail for GeeksforGeeks'
        };
        completeList.forEach( async (details) => {
            let vals = [];

            while(vals.length==0){
                vals = await fetchPrice(details.url,1383);
            }
            let actualPrice = parseInt(vals[0]); let expectedPrice = parseInt(details.price);
            console.log(vals);
            if(actualPrice<=expectedPrice){
                console.log("price takkuva undi ra kuyya product url emo ",details.url);
                // mailDetails.to=
                let currentUserDetails = await User.findOne({username:loggedInUser});
                mailDetails.to=currentUserDetails.email;
                mailDetails.subject="Price drop for the product "+details.url;
                mailDetails.text = "current price of the product is "+vals[0];
                mail.sendMail(mailDetails, function(err, data) {
                    if(err) {
                        console.log('Error Occurs');
                    } else {
                        console.log('Email sent successfully');
                    }
                });

            }
        })
     }
 },1000*60*60*12);


//  let priceChckerMailSender = 

 console.log(loggedInUser);

app.listen(3000);