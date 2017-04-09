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
    var newUser = new User({username: req.body.username, email: req.body.email});
    
    // User.find({}).where("email").equals(newUser.email).exec(function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("Email is already in use");
    //         // return res.redirect("/register");
    //     }
    // });
    
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
    Campground.find({}, null, {sort: {createdAt: -1}}).where("author.id").equals(req.user.id).exec(function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("profile", {campgrounds: campgrounds, page: "profile"});
        }
    });
});

// update user's theme
router.get("/theme", function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if(err) {console.log(err)}
        user.theme = setTheme(user.theme);
        user.save();
        req.login(user, function(err) {
            if(err) { console.log(err)}
            res.status(200).json(user.theme);
        });
    });
});

// update user's favorites array
router.get("/favorites/:id", function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err) {console.log(err)}
        // if the favorite doesn't exist yet, add it
        var favoriteIndex = user.favorites.indexOf("/campgrounds/"+req.params.id);
        if(favoriteIndex === -1) {
            user.favorites.push("/campgrounds/"+req.params.id);
        } else {
            // otherwise delete it
            user.favorites.splice(favoriteIndex, 1);
        }
        user.save();
        console.log("Favorites: " + user.favorites);
        res.status(200).json('Success!');
    });
});

// YelpCamp About Page Route
router.get("/about", function(req, res) {
    res.render("about");
});

// YelpCamp Contact Page Route
router.get("/contact", function(req, res) {
    res.render("contact");
});

function setTheme(color) {
    if(color === "green") {
        return "blue";
    } else if (color === "blue") {
        return "dark";
    } else {
        return "green";
    }
}

module.exports = router;