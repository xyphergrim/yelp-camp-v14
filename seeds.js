var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
        description: "Spicy jalapeno bacon ipsum dolor amet burgdoggen brisket " +
        "jowl boudin beef ribs shankle. Turkey short ribs prosciutto chuck pork chop pig kielbasa rump doner. " +
        "Venison pastrami filet mignon kielbasa sausage kevin ball tip alcatra jowl doner tongue pancetta " +
        "biltong andouille. Drumstick ball tip meatball, jowl biltong brisket kielbasa sirloin corned beef " +
        "pastrami pork chop bresaola turducken meatloaf shankle. Pastrami swine ham hock pork belly alcatra " +
        "chuck. Beef shank boudin, rump filet mignon porchetta tail swine. Sirloin brisket capicola sausage " +
        "cupim boudin. Shankle pastrami shoulder ground round cow p"
    },
    {
        name: "Sunset Isle",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Spicy jalapeno bacon ipsum dolor amet burgdoggen brisket " +
        "jowl boudin beef ribs shankle. Turkey short ribs prosciutto chuck pork chop pig kielbasa rump doner. " +
        "Venison pastrami filet mignon kielbasa sausage kevin ball tip alcatra jowl doner tongue pancetta " +
        "biltong andouille. Drumstick ball tip meatball, jowl biltong brisket kielbasa sirloin corned beef " +
        "pastrami pork chop bresaola turducken meatloaf shankle. Pastrami swine ham hock pork belly alcatra " +
        "chuck. Beef shank boudin, rump filet mignon porchetta tail swine. Sirloin brisket capicola sausage " +
        "cupim boudin. Shankle pastrami shoulder ground round cow p"
    },
    {
        name: "Mount Dagger",
        image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "Spicy jalapeno bacon ipsum dolor amet burgdoggen brisket " +
        "jowl boudin beef ribs shankle. Turkey short ribs prosciutto chuck pork chop pig kielbasa rump doner. " +
        "Venison pastrami filet mignon kielbasa sausage kevin ball tip alcatra jowl doner tongue pancetta " +
        "biltong andouille. Drumstick ball tip meatball, jowl biltong brisket kielbasa sirloin corned beef " +
        "pastrami pork chop bresaola turducken meatloaf shankle. Pastrami swine ham hock pork belly alcatra " +
        "chuck. Beef shank boudin, rump filet mignon porchetta tail swine. Sirloin brisket capicola sausage " +
        "cupim boudin. Shankle pastrami shoulder ground round cow p"
    }
]

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;