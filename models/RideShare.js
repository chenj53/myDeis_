'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var RideShareSchema = Schema( {
  userId: ObjectId,
  userName: String,
  rideCreated: Date,
  post: String,
  StartCity: String,
  StartState: String, //title
  StartZip: String,
  Destination: String,
  PickupDate: String,
  rideContact: String,
  rideContactInfo: String,
  StartAddress: String,
  PickupTime: String,
  AmPm: String,
  DestinationCity: String,
  DestinationState: String,
  Car: String,





} );

module.exports = mongoose.model( 'RideShare', RideShareSchema );
