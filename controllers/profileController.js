'use strict';
const User = require( '../models/User' );
const ForumPost = require( '../models/ForumPost' );
const RideShare = require('../models/RideShare');
const axios = require('axios');


exports.update = ( req, res ) => {

  User.findOne(res.locals.user._id)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    p.userName = req.body.userName
    p.profilePicURL = req.body.profilePicURL
    p.zipcode = req.body.zipcode


    p.lastUpdate = new Date()
    p.save()
    .then(() => {
      res.redirect( '/profile' );
    })

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
};

exports.getAllProfiles = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  User.find()
    .exec()
    .then( ( profiles ) => {
      res.render( 'profiles', {
        profiles:profiles, title:"Profiles"
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

// this displays all of the skills
exports.getOneProfile = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  User.findOne({_id:id})
    .exec()
    .then( ( profile ) => {
      res.render( 'showProfile', {
        profile:profile, title:"Profile"
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


exports.addProfile = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  User.findOne({_id:id})
    .exec()
    .then( ( profile ) => {
      res.locals.profile = profile
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



exports.addPosts = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  const id = res.locals.profile._id
  console.log('the id is '+id)
  ForumPost.find({userId:id})
    .exec()
    .then( ( posts ) => {
      res.locals.posts = posts
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


exports.addRides = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  const id = res.locals.profile._id
  console.log('the id is '+id)
  RideShare.find({userId:id})
    .exec()
    .then( ( rides ) => {
      res.locals.rides = rides
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
