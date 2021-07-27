const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {CustomPlaylist} = require('../models/customplaylist.model.js')


router.route('/')
.get(async(req, res)=> {
    try {
        const playlists = await CustomPlaylist.find({});
    if(!playlists){
        res.status(404).json({success: false, message: "Cannot find the playlist Data."});

    }else {
        res.json({success: true, playlistData : playlists})
    }

    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message})
    }    
})

.post(async(req, res)=> {
    try {
        const newPlaylistData = req.body;
        const newPlaylist = new CustomPlaylist(newPlaylistData);
        const savedPlaylist = await newPlaylist.save();
        console.log(newPlaylist, "new playlist")
        console.log(savedPlaylist)
        const data = await CustomPlaylist.findById(savedPlaylist._id).populate("Playlists")
        res.json(data);
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message})
    }
})


// router.route(':/playlistId')
// .post(async(req, res)=> {
//     const {playlistId} = req.params;
//     const {}
// })

module.exports = router;