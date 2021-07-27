const express = require("express");
const router = express.Router();
const { LikedVideos } = require("../models/likedVideos.model.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = req.user;
      const data = await LikedVideos.findOne({ user: user._id }).populate(
        "LikedVideosArray._id"
      );
      if (!data) {
        res.status(404).json({ success: false, message: "Data was not found" });
      } else {
        res.status(200).json({ success: true, likedVideoData: data });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server error",
          errMessage: error.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const videoLiked = req.body;
      const user = req.user;
      const newItem = new LikedVideos({
        user: user._id,
        LikedVideosArray: [{ _id: videoLiked.LikedVideosArray._id }],
      });
      const savedItem = await newItem.save();
      const data = await LikedVideos.findOne({ user: user._id }).populate(
        "LikedVideosArray._id"
      );
      res.status(200).json({ success: true, likedVideoData: data });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server error",
          errMessage: error.message,
        });
    }
  });

router
  .route("/:likedPlaylistId")
  .get(async (req, res) => {
    try {
      const user = req.user;
      const data = await LikedVideos.findOne({ user: user._id }).populate(
        "LikedVideosArray._id"
      );
      if (!data) {
        res
          .status(404)
          .json({ success: false, message: "Playlist data cannot be found" });
      }
      res.status(200).json({ success: true, likedVideoData: data });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server error",
          errMessage: error.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const { LikedVideosArray } = req.body;
      const user = req.user;
      const data = await LikedVideos.findOneAndUpdate(
        { user: user._id },
        { $addToSet: { LikedVideosArray: LikedVideosArray } }
      );
      const savedData = await LikedVideos.findOne({ user: user._id }).populate(
        "LikedVideosArray._id"
      );
      res.status(200).json({ success: true, likedVideoData: savedData });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          errMessage: error.message,
        });
    }
  });

router.route("/:likedPlaylistId/:videoId").delete(async (req, res) => {
  try {
    const { videoId } = req.params;
    const user = req.user;
    const data = await LikedVideos.findOneAndUpdate(
      { user: user._id },
      { $pull: { LikedVideosArray: { _id: videoId } } }
    );
    const savedData = await LikedVideos.findOne({ user: user._id }).populate(
      "LikedVideosArray._id"
    );
    res.status(200).json({ success: true, likedVideosData: savedData });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        errMessage: error.message,
      });
  }
});

module.exports = router;
