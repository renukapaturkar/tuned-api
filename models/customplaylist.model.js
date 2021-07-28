const express = require("express");
const mongoose = require("mongoose");
const { Videos } = require("./video.model.js");
const { Schema } = mongoose;

const CustomPlaylistSchema = new Schema({
  user: {type:Schema.Types.ObjectId, ref: 'User'},
  name:{type:String},
  videos: [{_id:{type: Schema.Types.ObjectId, ref: "Videos"}}],
}, {timestamps:true});

const CustomPlaylist = mongoose.model("CustomPlaylist", CustomPlaylistSchema);

module.exports = { CustomPlaylist };
