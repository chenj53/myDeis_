'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var RideShareCommentSchema = Schema( {
  userId: ObjectId,
  userName: String,
  postId: ObjectId,
  comment: String,
  commentCreated: Date,




} );

module.exports = mongoose.model( 'RideShareComment', RideShareCommentSchema );
