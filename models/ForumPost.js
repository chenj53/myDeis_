'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var forumPostSchema = Schema( {
  userId: ObjectId,
  userName: String,
  post1: String,
  post2: Number,
  createdAt: Date

} );

module.exports = mongoose.model( 'ForumPost', forumPostSchema );
