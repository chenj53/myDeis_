'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var furnitureCommentSchema = Schema( {
  userId: ObjectId,
  postId: ObjectId,
  userName: String,
  comment: String,
  createdAt: Date
} );

module.exports = mongoose.model( 'FurnitureComment', furnitureCommentSchema );
