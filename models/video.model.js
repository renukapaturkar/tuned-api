const express = require('express');
const mongoose  = require('mongoose');
const {Schema } = mongoose;

const VideosSchema = new Schema({
    video_id: {type: String, required: "cannot enter details without 'video_id', please enter all detils of video"},
    title: {type: String, required: "cannot enter details without 'title', please enter all detils of video"},
    category: {type: String, required:"cannot enter details without 'category', please enter all detils of video" },
    description: {type:String, required: "cannot enter details without 'description', please enter all detils of video"}
})

const Videos = mongoose.model('Videos', VideosSchema);

module.exports = {Videos}