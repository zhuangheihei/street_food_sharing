var express = require("express");
var router  = express.Router();
var Streetfood = require("../models/streetfood");
var middleware = require("../middleware");
var request = require("request");

//INDEX - show all streetfoods
router.get("/", function(req, res){
    // Get all streetfoods from DB
    Streetfood.find({}, function(err, allStreetfoods){
       if(err){
           console.log(err);
       } else {
        //   request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body); // Show the HTML for the Modulus homepage.
        //         res.render("streetfoods/index",{streetfoods:allStreetfoods});
        //     }
        // });
        // console.log(allStreetfoods);
        res.render("streetfoods/index",{streetfoods:allStreetfoods});
       }
    });
});

//CREATE - add new streetfood to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to streetfoods array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newStreetfood = {name: name, image: image, description: desc, author:author}
    // Create a new streetfood and save to DB
    Streetfood.create(newStreetfood, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to streetfoods page
            console.log(newlyCreated);
            res.redirect("/streetfoods");
        }
    });
});


//NEW - show form to create new streetfood
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("streetfoods/new"); 
});


// SHOW - shows more info about one streetfood
router.get("/:id", function(req, res){
    //find the streetfood with provided ID
    Streetfood.findById(req.params.id).populate("comments").exec(function(err, foundStreetfood){
        if(err){
            console.log(err);
        } else {
            console.log(foundStreetfood)
            //render show template with that streetfood
            res.render("streetfoods/show", {streetfood: foundStreetfood});
        }
    });
});

router.get("/:id/edit", middleware.checkUserStreetfood, function(req, res){
    console.log("IN EDIT!");
    //find the streetfood with provided ID
    Streetfood.findById(req.params.id, function(err, foundStreetfood){
        if(err){
            console.log(err);
        } else {
            //render show template with that streetfood
            res.render("streetfoods/edit", {streetfood: foundStreetfood});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.desc};
    Streetfood.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, streetfood){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/streetfoods/" + streetfood._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;

