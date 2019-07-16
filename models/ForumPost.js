'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var forumPostSchema = Schema( {
  userId: ObjectId,
  userName: String,
  post: String, //title
  createdAt: Date,
  price: Number,
  condition: String,
  contact: String,
  contactinfo: String,
  course: String,
  descirbtion: String,
  itemPic: String,
  FDescription: String,
  FPrice: String,
  FCondition: String,
  FPicture: String,
  FContact: String,
  FContactInfo: String,
  otherDescription: String,
  otherPrice: String,
  otherPicture: String,
  otherContact: String,
  otherContactInfo: String,
  otherItem: String,




} );

module.exports = mongoose.model( 'ForumPost', forumPostSchema );
