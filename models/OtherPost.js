'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var otherPostSchema = Schema( {
  userId: ObjectId,
  userName: String,
  post: String, //title
  postId: String, //title
  createdAt: Date,
  price: Number,
  condition: String,
  contact: String,
  contactInfo: String,
  course: String,
  description: String,
  picture: String,
  product: String,




} );

module.exports = mongoose.model( 'OtherPost', otherPostSchema );
