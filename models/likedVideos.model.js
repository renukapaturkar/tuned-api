const express = require("express");
const mongoose = require("mongoose");
const { Videos } = require("./video.model.js");
const { Schema } = mongoose;

const LikedVideosSchema = new Schema({
  LikedVideosArray: [
     { _id: String,  LikedVideos:{ type: Schema.Types.ObjectId, ref: "Videos" } }

  ]
});

const LikedVideos = mongoose.model("Likedvideo", LikedVideosSchema);

module.exports = { LikedVideos };
