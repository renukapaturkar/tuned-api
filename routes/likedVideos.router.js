const express = require('express');
const router = express.Router();
const {LikedVideos} = require('../models/likedVideos.model.js');

router.route('/')
.get(async(req, res)=> {
    try {
        const data = await LikedVideos.find({});
        if(!data){
            res.status(404).json({success: false, message: "Data was not found"});
        }else {
            res.json({success: true, likedVideoData: data})
        }
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server error", errMessage: error.message})
    }
})

.post(async(req, res)=> {
    try {
        const videoLiked = req.body;
        const newItem = new LikedVideos(videoLiked);
        const savedVideo = await newItem.save();
        const savedItems = await LikedVideos.findById(savedVideo._id).populate("LikedVideosArray.LikedVideos");
        res.json({success: true, likedVideoData: savedItems});
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server error", errMessage: error.message});
    }
});

router.route('/:likedPlaylistId')
.get(async(req, res)=> {
    try {
        const {likedPlaylistId} = req.params;
        const data = await LikedVideos.findById(likedPlaylistId).populate("LikedVideosArray.LikedVideos"); 
        if(!data){
            res.status(404).json({success: false, message: "Playlist data cannot be found"});
        }
        res.json({success: true, likedVideoData: data});
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server error", errMessage: error.message});
    }
})

.post(async(req, res)=> {
    try {
    const {LikedVideosArray} = req.body;
    console.log("likedArray", LikedVideosArray)
    const {likedPlaylistId} = req.params;
    console.log("playlistId",likedPlaylistId)
    const data = await LikedVideos.findById(likedPlaylistId);
    console.log("data", data)
    await data.LikedVideosArray.push(LikedVideosArray);
    await data.save();
    const savedData = await LikedVideos.findById(likedPlaylistId).populate("LikedVideosArray.LikedVideos");
        console.log("saveddata", savedData)
    res.json({success: true, likedVideoData: savedData});
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
    }
});



module.exports = router;

