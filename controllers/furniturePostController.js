'use strict';
const FurnitureComment = require( '../models/FurnitureComment' );
const FurniturePost = require( '../models/FurniturePost' );




exports.saveFurniturePost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post an item for sale.")
  }

  let newFurniturePost = new FurniturePost(
   {

    userId: req.user._id,
    userName: req.user.googlename,
    post: req.body.post, //title
    createdAt:  new Date(),
    price: req.body.price,
    condition: req.body.condition,
    contact: req.body.contact,
    contactInfo: req.body.contactInfo,
    course: req.body.course,
    description:req.body.description,
    picture: req.body.picture,
    product: req.body.product,
    itemPic: req.body.itemPic,
    status: req.body.status,

  })


  console.log("furniturePost is ")
  console.log("Price =" + req.body.price)
  console.log("Price =" + req.body.description)
  console.dir(newFurniturePost)

  //console.log("skill = "+newSkill)

  newFurniturePost.save()
    .then( () => {
      res.redirect( 'market' );
    } )
    .catch( error => {
      res.send( "FurniturePostError is "+error );
    } );
};


// this displays all of the skills
exports.getAllFurniturePosts = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("hello hello hello hello")
  FurniturePost.find({}).sort({createdAt: -1})

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

  FurniturePost.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/showProfile/'+req.user._id)})
           .catch((error)=>{res.send(error)})
}




exports.deleteFurniturePost = (req, res) => {
  console.log("in deleteFurniturePost")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      FurniturePost.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/market')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      FurniturePost.deleteMany({_id:{$in:deleteId}})
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
  FurniturePost.findOne({_id:id})
    .exec()
    .then( ( furniturePost ) => {
      res.render( 'furniturePost', {
        post:furniturePost, title:"FurniturePost"
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


exports.saveFurnitureComment = (req,res) => {
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a product.")
  }

  let newFurnitureComment = new FurnitureComment(
   {
    userId: req.user._id,
    postId: req.body.postId,
    userName:req.user.googlename,
    comment: req.body.comment,
    createdAt: new Date()
   }
  )

  //console.log("skill = "+newSkill)

  newFurnitureComment.save()
    .then( () => {
      res.redirect( 'showPost/'+req.body.postId );
    } )
    .catch( error => {
      res.send( error );
    } );
}




// this displays all of the skills
exports.attachAllFurnitureComments = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("in aAFC with id= "+req.params.id)
  var ObjectId = require('mongoose').Types.ObjectId;
  FurnitureComment.find({postId:ObjectId(req.params.id)}).sort({createdAt:-1})
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



// exports.update = ( req, res ) => {
//
//   posts.findOne(req.body.postId)
//   .exec()
//   .then((p) => {
//
//     p.post: req.body.post, //title
//     p.createdAt:  new Date(),
//     p.price: req.body.price,
//     p.condition: req.body.condition,
//     p.contact: req.body.contact,
//     p.contactinfo: req.body.contactinfo,
//     p.course: req.body.course,
//     p.descirbtion: req.body.descirbtion,
//
//
//     p.save()
//     .then(() => {
//       res.redirect( '/profile' );
//     })
//
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
// };
