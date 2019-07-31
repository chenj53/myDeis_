var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var apikey = require('./config/apikey');

// AUTHENTICATION MODULES
session = require("express-session"),
bodyParser = require("body-parser"),
User = require( './models/User' ),
flash = require('connect-flash')
// END OF AUTHENTICATION MODULES
MONGOLAB_URI = "mongodb://heroku_w4sxst21:l3jbvnggf9fp7vfns81bk06dam@ds253567.mlab.com:53567/heroku_w4sxst21"
LOCAL_URI = 'mongodb://localhost/mydeis'

const mongoose = require( 'mongoose' );
mongoose.connect( MONGOLAB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});


const profileController = require('./controllers/profileController')
const forumPostController = require('./controllers/forumPostController')
const RideShareController = require('./controllers/RideShareController')
const furniturePostController = require('./controllers/furniturePostController')
const otherPostController = require('./controllers/furniturePostController')


// Authentication
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// here we set up authentication with passport
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/*************************************************************************
     HERE ARE THE AUTHENTICATION ROUTES
**************************************************************************/

app.use(session({ secret: 'zzbbyanana' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));



const owners = ["chenj53@brandeis.edu", "jaytseng@brandeis.edu", "tristantseng@brandeis.edu", "yutdong@brandeis.edu" ]

// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.title="MyDeis"
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      res.locals.user = req.user
      res.locals.loggedIn = true
    }
  else {
    res.locals.loggedIn = false
  }
  //console.log('req.user = ')
  //console.dir(req.user)
  res.locals.status = 'none'
  if (req.user){
       if (owners.indexOf(req.user.googleemail)>-1){
         console.log("Owner has logged in")
         res.locals.status = 'owner'
       }
       else {
         console.log('student has logged in')
         res.locals.status = 'student'
       }
  }
  console.log("res.locals = "+JSON.stringify(res.locals))

  next()
})

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });



// here are the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})



app.get('/login', function(req,res){
  res.render('login',{})
})



// route for logging out
app.get('/logout', function(req, res) {
        req.session.destroy((error)=>{console.log("Error in destroying session: "+error)});
        console.log("session has been destroyed")
        req.logout();
        res.redirect('/');
    });


// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        })
      );


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      res.locals.loggedIn = true
      return next();
    } else {
      console.log("user has not been authenticated...")
      res.redirect('/login');
    }
}

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn,
    function(req, res) {
        res.redirect('showProfile/'+req.user._id)
    });

app.get('/editProfile',isLoggedIn, (req,res)=>{
  res.render('editProfile')
})

app.get('/editPost/:id',isLoggedIn, (req,res)=>{
    res.render('editPost')
})

app.post('/processedit',isLoggedIn,forumPostController.update);

app.get('/profiles', isLoggedIn, profileController.getAllProfiles);

app.get('/showProfile/:id',
        profileController.addProfile,
        profileController.addPosts,
        profileController.addRides,
        (req,res) => {
          res.render( 'showProfile',
               { title:"Profile"
          } );
        })



app.post('/updateProfile',profileController.update)
app.post('/updatePost',forumPostController.update)


// add page for editProfile and views
// add router for updateProfile and send browser to /profie

// END OF THE AUTHENTICATION ROUTES

app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.headers)
  next()
});



app.get('/about', function(req, res, next) {
  res.render('about');
});

app.get('/', function(req, res, next) {
  res.render('index',{title:"Home Page"});
});


app.post('/processbook',forumPostController.saveForumPost)


//app.post('/processfurniture',furniturePostController.saveFurniturePost)

//app.post('/processother',otherPostController.saveOtherPost)







app.get('/market',forumPostController.getAllForumPosts)

//app.get('/market',furniturePostController.getAllFurniturePosts)

//app.get('/market',otherPostController.getAllOtherPosts)




app.post('/market',forumPostController.saveForumPost)

//app.post('/market',furniturePostController.saveFurniturePost)

//app.post('/market',otherPostController.saveOtherPost)



//app.post('/forumDelete',forumPostController.deleteForumPost)

app.get('/showPost/:id',
        forumPostController.attachAllForumComments,
        forumPostController.showOnePost,
)

app.post('/saveForumComment',forumPostController.saveForumComment)

app.get('/deletePost/:postid',forumPostController.deletePost)



app.use('/deleteRideShare/:postid',RideShareController.deleteRideShare)

app.get('/rideShare',isLoggedIn, RideShareController.getAllRideShares)

app.post('/rideShare',RideShareController.saveRideShare)

app.get('/showRide/:id',
        RideShareController.attachAllRideShareComment,
        RideShareController.showOneRide)

app.post('/saveRideShareComment',RideShareController.saveRideShareComment)






app.get('/SellItem', function(req, res, next) {
  res.render('SellItem',{title:"SellItem"});
});

app.get('/BookSell', isLoggedIn, function(req, res, next) {
  res.render('Booksell',{title:"BookSell"});
});

app.get('/FurnitureSell', isLoggedIn, function(req, res, next) {
  res.render('FurnitureSell',{title:"Furniture Sell"});
});

app.get('/OtherSell', isLoggedIn, function(req, res, next) {
  res.render('OtherSell',{title:"OtherSell"});
});


app.get('/Market', function(req, res, next) {
  res.render('Market',{title:"Market"});
});


app.get('/Interested/:postId', function(req, res, next) {
  res.render('Interested',{title:"Interested"});
});

app.get('/RideShareForm', function(req, res, next) {
  res.render('RideShareForm',{title:"RideShareForm"});
});

app.get('/Events', function(req, res, next) {
  res.render('Events',{title:"Events"});
});

app.get('/Housing', function(req, res, next) {
  res.render('Housing',{title:"Housing"});
});

app.get('/Academic', function(req, res, next) {
  res.render('Academic',{title:"Academic"});
});

app.get('/Confessions', function(req, res, next) {
  res.render('Confessions',{title:"Confessions"});
});

app.get('/Gaming', function(req, res, next) {
  res.render('Gaming',{title:"Gaming"});
});

app.get('/Sports', function(req, res, next) {
  res.render('Sports',{title:"Sports"});
});



app.get('/sellwhat', function(req, res, next) {
  res.render('sellwhat',{title:"sellwhat"});
});


app.get('/index2.0', function(req, res, next) {
  res.render('index2.0',{title:"index2.0"});
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
