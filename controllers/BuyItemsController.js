'use strict';
const RecipesPost = require( '../models/RecipesPost' );
const RecipesComment = require( '../models/RecipesComment' );


exports.saveRecipesPost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a recipe.")
  }

  let newRecipesPost = new RecipesPost(
   {
    userId: req.user._id,
    userName: req.user.googlename,
    dishName: req.body.dishName,
    post:req.body.post,
    createdAt: new Date(),
    dishDescription: req.body.dishDescription,
    Ingredients: req.body.Ingredients,
   }
  )

  //console.log("skill = "+newSkill)

  newRecipesPost.save()
    .then( () => {
      res.redirect( 'recipes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


// this displays all of the skills
exports.getAllRecipesPosts = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  RecipesPost.find({}).sort({createdAt: -1})
    .exec()
    .then( ( posts ) => {
      res.render('recipes',{posts:posts,title:"recipes"})
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

exports.deleteRecipesPost = (req, res) => {
  console.log("in deleteRecipesPost")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      RecipesPost.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      RecipesPost.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('/recipes')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};


// this displays all of the skills
exports.showOneRecipe = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  RecipesPost.findOne({_id:id})
    .exec()
    .then( ( RecipesPost ) => {
      res.render( 'RecipesPost', {
        post:RecipesPost, title:"Recipe Post"
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


exports.saveRecipesComment = (req,res) => {
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a recipe.")
  }

  let newRecipesComment = new RecipesComment(
   {
    userId: req.user._id,
    postId: req.body.postId,
    userName:req.user.googlename,
    comment: req.body.comment,
    createdAt: new Date(),
    dishDescription: req.body.dishDescription,
    Ingredients: req.body.Ingredients,
    dishName: req.body.dishName,


   }
  )

  //console.log("skill = "+newSkill)

  newRecipesComment.save()
    .then( () => {
      res.redirect( 'showPost/'+req.body.postId);
    } )
    .catch( error => {
      res.send( error );
    } );
}




// this displays all of the skills
exports.attachAllRecipesComments = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("in aAFC with id= "+req.params.id)
  var ObjectId = require('mongoose').Types.ObjectId;
  RecipesComment.find({postId:ObjectId(req.params.id)}).sort({createdAt:-1})
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
