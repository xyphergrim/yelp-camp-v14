//================
// AUTH ROUTES
//================
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// REGISTER ROUTE
router.get("/register", function(req, res){
    res.render("register");
})

// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN ROUTES
// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// User Profile Page Route
router.get("/profile", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, null, {sort: {createdAt: -1}}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("profile", {campgrounds: allCampgrounds});
        }
    });
});

module.exports = router;