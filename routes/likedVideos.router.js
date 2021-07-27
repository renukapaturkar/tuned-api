const express = require('express');
const router = express.Router();
const {LikedVideos} = require('../models/likedVideos.model.js');

router.route('/')
.get(async(req, res)=> {
    try {
        const user = req.user;
        console.log(user)
        const data = await LikedVideos.findOne({user: user._id}).populate("LikedVideosArray.LikedVideos");
        console.log(data)
        if(!data){
            res.status(404).json({success: false, message: "Data was not found"});
        }else {
            res.status(200).json({success: true, likedVideoData: data})
        }
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server error", errMessage: error.message})
    }
})

.post(async(req, res)=> {
    try {
        const videoLiked = req.body;
        console.log("videoLiked",videoLiked)
        const user = req.user;
        const newItem = new LikedVideos({user: user._id, LikedVideosArray:[{LikedVideos:videoLiked.LikedVideosArray._id}]})
        console.log("newItem",newItem)
        const savedItem = await newItem.save();
        const data = await LikedVideos.findOne({user: user._id}).populate("LikedVideosArray.LikedVideos")
        console.log("data", data)
        res.status(200).json({success: true, likedVideoData: data});
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
    const {likedPlaylistId} = req.params;
    const data = await LikedVideos.findById(likedPlaylistId);
    await data.LikedVideosArray.push(LikedVideosArray);
    await data.save();
    const savedData = await LikedVideos.findById(likedPlaylistId).populate("LikedVideosArray.LikedVideos");
    res.json({success: true, likedVideoData: savedData});
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
    }
});

router.route('/:likedPlaylistId/:videoId')
.delete(async(req, res)=> {
    try {
        const {likedPlaylistId, videoId} = req.params;
        const updatedLikedPlaylist = await LikedVideos.findById(likedPlaylistId).updateOne(
            {"LikedVideosArray._id" : videoId},
            {$pull : {LikedVideosArray : {LikedVideos: videoId}}}        
            );
        const data = await LikedVideos.findById(likedPlaylistId).populate("LikedVideosArray.LikedVideos");
        res.json({success: true, likedVideosData: data});

    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
    }
});

module.exports = router;

