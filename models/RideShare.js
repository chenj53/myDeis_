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
  contact: String,
  contactInfo: String,
  StartAddress: String,
  PickupTime: String,
  AmPm: String,
  DestinationCity: String,
  DestinationState: String,




} );

module.exports = mongoose.model( 'RideShare', RideShareSchema );
