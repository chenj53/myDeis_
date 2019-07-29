'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var forumPostSchema = Schema( {
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
  itemPic: String,
  product: String,
  status: String,
  interest: String,




} );

module.exports = mongoose.model( 'ForumPost', forumPostSchema );
