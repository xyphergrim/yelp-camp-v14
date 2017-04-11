//===================
// CAMPGROUND ROUTES
//===================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");
var Comment = require("../models/comment");

// Define escapeRefex function for search feature
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// INDEX - show all campgrounds
router.get("/", function(req, res){
    if(req.query.search && req.xhr){
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.status(200).json(allCampgrounds);
            }
        });
    } else {
        //Get all campgrounds from DB
        Campground.find({}, null, {sort: {createdAt: -1}}, function(err, allCampgrounds){
            // null, {sort: {createdAt: -1}}
            if(err){
                console.log(err);
            } else {
                if(req.xhr){
                    res.json(allCampgrounds);
                } else {
                    res.render("campgrounds/index", {campgrounds: allCampgrounds});
                }
            }
        });
    }
});

// CREATE - add new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //res.send("YOU HIT THE POST ROUTE");
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   
   geocoder.geocode(req.body.location, function(err, data){
       if(err){
           console.log(err);
       } else {
           var lat = data.results[0].geometry.location.lat;
           var lng = data.results[0].geometry.location.lng;
           var location = data.results[0].formatted_address;
           var newCampground = {name: name, price: price, image: image, description: desc, author: author, 
               location: location, lat: lat, lng: lng
           };
           // Create a new campground and save to DB
           Campground.create(newCampground, function(err, newlyCreated){
               if(err){
                   console.log(err);
               } else {
                   // redirect back to campgrounds page
                   console.log(newlyCreated);
                    res.redirect("/campgrounds");
               }
           });
       }
   });
});

// NEW - show form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            Comment.remove({
                _id: {
                    $in: foundCampground.comments
                }
            }, function(err, result){
                if(err){
                    console.log(err);
                }
            });
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;