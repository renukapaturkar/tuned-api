const express = require("express");
const { LikedVideos } = require("../models/likedVideos.model.js");
const router = express.Router();
const { WatchLater } = require("../models/watchlater.model.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = req.user;

      const data = await WatchLater.findOne({ user: user._id }).populate(
        "WatchLaterArray._id"
      );
      if (!data) {
        res.status(404).json({ success: false, message: "data not found" });
      } else {
        res.status(200).json({ success: true, watchlaterdata: data });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          errMessage: error.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const watchlater = req.body;
      console.log("watchlater", watchlater);
      user = req.user;
      const newItem = new WatchLater({
        user: user._id,
        WatchLaterArray: [{ _id: watchlater.WatchLaterArray._id }],
      });
      const savedItem = await newItem.save();
      const data = await WatchLater.findOne({ user: user._id }).populate(
        "WatchLaterArray._id"
      );
      console.log("data line 30 ", data);
      res.status(200).json({ success: true, watchlaterdata: data });
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

router
  .route("/:watchLaterId")
  .get(async (req, res) => {
    try {
      const user = req.user;
      const data = await WatchLater.findOne({ user: user._id }).populate(
        "WatchLaterArray._id"
      );
      if (!data) {
        res.status(404).json({ success: false, message: "data not found" });
      } else {
        res.status(200).json({ success: true, watchlaterdata: data });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          errMessage: error.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const { WatchLaterArray } = req.body;
      const user = req.user;
      const data = await WatchLater.findOneAndUpdate(
        { user: user._id },
        { $addToSet: { WatchLaterArray: WatchLaterArray } }
      );
      const savedData = await WatchLater.findOne({ user: user._id }).populate(
        "WatchLaterArray._id"
      );
      res.status(200).json({ success: true, watchlaterdata: savedData });
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

router.route("/:watchLaterPlaylistId/:videoId").delete(async (req, res) => {
  try {
    const { watchLaterPlaylistId, videoId } = req.params;
    const user = req.user;
    const data = await WatchLater.findOneAndUpdate({
      user: user._id,
      $pull: { WatchLaterArray: { _id: videoId } },
    });
    const savedData = await WatchLater.findOne({ user: user._id }).populate(
      "WatchLaterArray._id"
    );
    res.status(200).json({ success: true, watchlaterdata: savedData });
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
