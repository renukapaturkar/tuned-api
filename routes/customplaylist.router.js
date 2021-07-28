const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {CustomPlaylist} = require('../models/customplaylist.model.js')


router.route('/')
.get(async(req, res)=> {
    try {
        const user = req.user;
        const playlists = await CustomPlaylist.find({user:user._id})
    if(!playlists){
        res.status(404).json({success: false, message: "Cannot find the playlist Data."});

    }else {
        res.status(200).json({success: true, playlistData : playlists})
    }

    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message})
    }    
})

.post(async(req, res)=> {
    try {
        const playlist = req.body;
        console.log(playlist)
        const user = req.user;
        const newPlaylist = await new CustomPlaylist({user: user._id, name:playlist.name, videos:{_id:playlist.videos._id}});
        const savedPlaylist = await newPlaylist.save();
        console.log(newPlaylist, "new playlist")
        console.log(savedPlaylist, "saved playlist at 31")
        const data = await CustomPlaylist.findOne({user: user._id}).populate("vidoes._id")
        console.log(data, "line 33")
        res.status(200).json({success: true, playlistData: data});
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message})
    }
})


router.route('/:playlistId')
.post(async(req, res)=> {
    try {
        const {playlistId} = req.params;
        const playlist = req.body;
        console.log("videodata", playlist, playlistId)
        const user = req.user;
        await CustomPlaylist.updateOne({"user": user._id, "_id":playlistId}, {$addToSet:{"videos":playlist}} )
        const data = await CustomPlaylist.findOne({user:user._id}).populate("videos")
        console.log("line 50 - data",data);
        res.status(200).json({success: true, playlistData: data})

    }catch(error){
        res.status(500).json({success: false, message: "unable to store data", errMessage:error.message})
    }
})



router.route("/:playlistId/:videoId")
.delete(async(req,res)=> {
    try {
        const {playlistId, videoId} = req.params;
        const user = req.user;
        await CustomPlaylist.updateOne({"user":user._id, "_id":playlistId}, {$pull: {videos:{_id: videoId}}});
        const data = await CustomPlaylist.findOne({user: user._id}).populate("videos");
        res.status(200).json({success: true, playlistData: data})
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message})
    }


})

module.exports = router;