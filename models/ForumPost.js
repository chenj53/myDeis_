'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var forumPostSchema = Schema( {
  userId: ObjectId,
  userName: String,
  post: String, // title
  createdAt: Date,
  price: Number,
  course: String,
  condition: String,
  contact: String,
} );

module.exports = mongoose.model( 'ForumPost', forumPostSchema );
