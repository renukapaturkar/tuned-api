const mongoose = require('mongoose');
const { Videos } = require('./video.model.js');
const {Schema} = mongoose;

const WatchLaterSchema = new Schema({
    WatchLaterArray: [
        {_id: String, WatchLaterVideos: {type: Schema.Types.ObjectId, ref: "Videos"}}
    ]
});

const WatchLater = mongoose.model("WatchLater", WatchLaterSchema);

module.exports = { WatchLater };