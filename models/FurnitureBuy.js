'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var FurnitureBuySchema = Schema( {
  userId: ObjectId,
  postId: ObjectId,
  FDescription: String,
  FPrice: String,
  FCondition: String,
  FPicture: String,
  FContact: String,
  FContactInfo: String,
  createdAt: Date,

} );

module.exports = mongoose.model( 'FurnitureBuy', FurnitureBuySchema );
