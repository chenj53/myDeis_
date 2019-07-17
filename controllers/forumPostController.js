'use strict';
const ForumPost = require( '../models/ForumPost' );
const ForumComment = require( '../models/ForumComment' );
const OtherPost = require( '../models/OtherPost' );
const FurnitureBuy = require( '../models/FurnitureBuy' );

exports.saveForumPost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to the forum.")
  }

  let newForumPost = new ForumPost(
   {



    userId: req.user._id,
    userName: req.user.googlename,
    post: req.body.post, //title
    createdAt:  new Date(),
    price: req.body.price,
    condition: req.body.condition,
    contact: req.body.contact,
    contactinfo: req.body.contactinfo,
    course: req.body.course,
    descirbtion: req.body.descirbtion,
    FDescription: req.body.FDescription,
    FPrice: req.body.FPrice,
    FPicture: req.body.FPicture,
    FCondition: req.body.FCondition,
    FContact: req.body.FContact,
    FContactInfo:req.body.FContactInfo,
    otherContact: req.body.otherContact,
    otherContactInfo: req.body.otherContactInfo,
    otherItem: req.body.otherItem,
    otherPicture: req.body.otherPicture,
    otherDescription: req.body.otherDescription,
    otherCondition:req.body.otherCondition,
    otherPrice: req.body.otherPrice,



   }
  )
  console.log("formumPost is ")
  console.log("Price =" + req.body.price)
  console.log("Price =" + req.body.descirbtion)
  console.dir(newForumPost)

  //console.log("skill = "+newSkill)

  newForumPost.save()
    .then( () => {
      res.redirect( 'market' );
    } )
    .catch( error => {
      res.send( "ForumPostError is "+error );
    } );
};


// this displays all of the skills
exports.getAllForumPosts = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("hello hello hello hello")
  ForumPost.find({}).sort({createdAt: -1})

    .exec()
    .then( ( posts) => {
      res.render( 'market', {
          title:"market",posts:posts
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


exports.deletePost = (req, res) => {
  console.log("in deletePost")
  let deleteId = req.params.postid

  ForumPost.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/showPost/'+req.user._id)})
           .catch((error)=>{res.send(error)})
}




exports.deleteForumPost = (req, res) => {
  console.log("in deleteForumPost")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      ForumPost.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/market')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      ForumPost.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/market')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('/market')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};


// this displays all of the skills
exports.showOnePost = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  ForumPost.findOne({_id:id})
    .exec()
    .then( ( forumPost ) => {
      res.render( 'forumPost', {
        post:forumPost, title:"Forum Post"
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


exports.saveForumComment = (req,res) => {
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a product.")
  }

  let newForumComment = new ForumComment(
   {
    userId: req.user._id,
    postId: req.body.postId,
    userName:req.user.googlename,
    comment: req.body.comment,
    createdAt: new Date()
   }
  )

  //console.log("skill = "+newSkill)

  newForumComment.save()
    .then( () => {
      res.redirect( 'showPost/'+req.body.postId );
    } )
    .catch( error => {
      res.send( error );
    } );
}




// this displays all of the skills
exports.attachAllForumComments = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("in aAFC with id= "+req.params.id)
  var ObjectId = require('mongoose').Types.ObjectId;
  ForumComment.find({postId:ObjectId(req.params.id)}).sort({createdAt:-1})
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
