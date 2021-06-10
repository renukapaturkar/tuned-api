const express = require('express');
const router = express.Router();
const { Watchlater, WatchLater } = require('../models/watchlater.model.js');

router.route('/')
.get(async(req,res)=> {
    try {
        const data = await WatchLater.find({});
        if(!data){
            res.status(404).json({success: false, message: "data not found"})
        }else {
            res.json({success: true, watchlaterdata: data})
        }
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message})
    }
})

.post(async(req, res)=> {
    try{
        const watchlater = req.body;
        const newItem = new WatchLater(watchlater);
        const savedVideo = await newItem.save();
        const savedItems = await WatchLater.findById(savedVideo._id).populate("WatchLaterArray.WatchLaterVideos");
        res.json({success: true, watchlaterdata: savedItems});
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
    }
}); 


router.route('/:watchLaterPlaylistId')
.get(async(req,res)=> {
    try{
        const {watchLaterPlaylistId} = req.params;
        const data = await WatchLater.findById(watchLaterPlaylistId).populate("WatchLaterArray.WatchlaterVideos");
        if(!data){
             res.status(404).json({success: false, message: "data not found"});
        }else {
            res.json({success: true, watchlaterdata: data})
        }
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
    }
})

.post(async(req, res)=>{
    try {
        const {WatchLaterArray} = req.body;
        const {watchLaterPlaylistId} = req.params;
        const data = await WatchLater.findById(watchLaterPlaylistId);
        await data.WatchLaterArray.push(WatchLaterArray);
        await data.save();
        const savedData = await WatchLater.findById(watchLaterPlaylistId).populate("WatchlaterArray.WatchlaterVideos");
        res.json({success: true, watchlaterdata: savedData})
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
    }
})



module.exports = router;