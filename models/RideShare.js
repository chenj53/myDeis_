'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var RideShareSchema = Schema( {
  userId: ObjectId,
  userName: String,
  createdAt: Date,
  post: String,
  StartCity: String,
  StartState: String, //title
  StartZip: String,
  Destination: String,
  PickupDate: String,




} );

module.exports = mongoose.model( 'RideShare', RideShareSchema );
