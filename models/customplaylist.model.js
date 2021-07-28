const express = require("express");
const mongoose = require("mongoose");
const { Videos } = require("./video.model.js");
const { Schema } = mongoose;

const CustomPlaylistSchema = new Schema({
  name: { type: String, required: true },
  Playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Videos" }],
});

const CustomPlaylist = mongoose.model("CustomPlaylist", CustomPlaylistSchema);

module.exports = { CustomPlaylist };
