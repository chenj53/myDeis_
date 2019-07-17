'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var  OtherPostSchema = Schema( {
  userId: ObjectId,
  postId: ObjectId,
  otherDescription: String,
  otherPrice: String,
  otherPicture: String,
  otherContact: String,
  otherContactInfo: String,
  otherItem: String,
  otherCondition: String,
  createdAt: Date,



} );

module.exports = mongoose.model( 'OtherPost', OtherPostSchema );
