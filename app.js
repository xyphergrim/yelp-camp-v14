var morgan          = require("morgan"),
    express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    flash           = require("connect-flash"),
    seedDB          = require("./seeds");
    
// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

var port = process.env.PORT || "3000";
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v13";
mongoose.connect(url); // local Cloud9 Dev DB

app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB(); // seed the database

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "this is the best secret for any app ever!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done){
//     User.findOne({email: email}, function(err, user){
//         if(err){
//             console.log(err);
//         } else {
//         }
//     });
    
//     User.authenticate();
// }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to run for every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    if(req.user) {
        res.locals.theme = req.user.theme;
    } else {
        res.locals.theme = "green";
    }
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, process.env.IP, function(){
    console.log("YelpCamp server has started");
});