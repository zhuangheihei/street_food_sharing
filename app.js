var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    Streetfood  = require("./models/streetfood"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    session = require("express-session"),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override");
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    streetfoodRoutes = require("./routes/streetfoods"),
    indexRoutes      = require("./routes/index");

//we should use different database for development and production
// Use this to prevent username and password of database from being seen.
var url = process.env.DATABASEURL; 
// var url = "mongodb://localhost/street_food";
mongoose.connect(url); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
//seedDB();


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I love Xiao Wangwang!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});


app.use("/", indexRoutes);
app.use("/streetfoods", streetfoodRoutes);
app.use("/streetfoods/:id/comments", commentRoutes);

// process.env.PORT means the environment where this code being run
// so process.env.PORT on cloud 9 maybe different from that in Heroku
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The StreetFood Server Has Started!");
});