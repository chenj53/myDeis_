'use strict';
const RideShare = require( '../models/RideShare' );
const RideShareComment = require( '../models/RideShareComment' );

exports.saveRideShare = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a ride request.")
  }

  let newRideShare = new RideShare(
   {



    userId: req.user._id,
    userName: req.user.googlename,
    post: req.body.post, //title
    rideCreated:  new Date(),
    StartCity: req.body.StartCity,
    StartState: req.body.StartState,
    StartZip: req.body.StartZip,
    StartAddress: req.body.StartAddress,
    Destination: req.body.Destination,
    PickupDate: req.body.PickupDate,
    rideContact: req.body.rideContact,
    rideContactInfo: req.body.rideContactInfo,
    PickupTime: req.body.PickupTime,
    DestinationCity: req.body.DestinationCity,
    DestinationState: req.body.DestinationState,
    Car: req.body.Car,





   }
  )


  //console.log("skill = "+newSkill)

  newRideShare.save()
    .then( () => {
      res.redirect( 'RideShare' );
    } )
    .catch( error => {
      res.send( "RideShareError is "+error );
    } );
};


// this displays all of the skills
exports.getAllRideShares = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("hello hello hello hello")
  RideShare.find({}).sort({rideCreated: -1})

    .exec()
    .then( ( rides) => {
      res.render( 'RideShare', {
          title:"RideShareSchema",rides:rides
        } );
      } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

exports.deleteRideShare = (req, res) => {
  console.log("in deleteRideShare")
  let deleteId = req.params.postid
  console.log(deleteId)
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      RideShare.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/RideShare')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      RideShare.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/RideShare')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('/RideShare')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};


// this displays all of the skills
exports.showOneRide = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  RideShare.findOne({_id:id})
    .exec()
    .then( ( Ride ) => {
      res.render( 'RideShareComment', {
        post:Ride, title:"Ride Share"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};


exports.saveRideShareComment = (req,res) => {
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a ride.")
  }

  let newRideShareComment = new RideShareComment(
   {
    userId: req.user._id,
    postId: req.body.postId,
    userName:req.user.googlename,
    comment: req.body.comment,
    commentCreated: new Date(),

   }
  )

  //console.log("skill = "+newSkill)

  newRideShareComment.save()
    .then( () => {
      res.redirect( 'showRide/'+req.body.postId );
    } )
    .catch( error => {
      res.send( error );
    } );
}




// this displays all of the skills
exports.attachAllRideShareComment = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("in aAFC with id= "+req.params.id)
  var ObjectId = require('mongoose').Types.ObjectId;
  RideShareComment.find({postId:ObjectId(req.params.id)}).sort({commentCreated:-1})
    .exec()
    .then( ( comments ) => {
      console.log("comments.length=")
      console.dir(comments.length)
      res.locals.comments = comments
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
