const express = require("express");
const mongoose = require("mongoose");
const { Videos } = require("./video.model.js");
const { User } = require("./user.model");
const { Schema } = mongoose;

const LikedVideosSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  LikedVideosArray: [{ _id: { type: Schema.Types.ObjectId, ref: "Videos" } }],
});

const LikedVideos = mongoose.model("Likedvideo", LikedVideosSchema);

module.exports = { LikedVideos };
