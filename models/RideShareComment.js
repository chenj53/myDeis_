'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var RideShareCommentSchema = Schema( {
  userId: ObjectId,
  userName: String,
  createdAt: Date,
  comment: String,
  StartCity: String,
  StartState: String, //title
  StartZip: String,



} );

module.exports = mongoose.model( 'RideShareComment', RideShareCommentSchema );
