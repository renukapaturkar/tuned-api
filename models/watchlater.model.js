const mongoose = require("mongoose");
const { Videos } = require("./video.model.js");
const { User } = require("./user.model");
const { Schema } = mongoose;

const WatchLaterSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  WatchLaterArray: [{ _id: { type: Schema.Types.ObjectId, ref: "Videos" } }],
});

const WatchLater = mongoose.model("WatchLater", WatchLaterSchema);

module.exports = { WatchLater };
