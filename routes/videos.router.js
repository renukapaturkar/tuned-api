const express = require("express");
const router = express.Router();
const { Videos } = require("../models/video.model.js");


router
  .route("/")
  .get(async (req, res) => {
    try {
      const videos = await Videos.find({});
      res.json({ success: true, videos });
    } catch (error) {
      res
        .satatus(500)
        .json({
          success: false,
          message: "Internal Server Error",
          errorMessage: error.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const video = req.body;
      const newVideo = new Videos(video);
      const savedVideo = await newVideo.save();
      res.json({ success: true, savedVideo });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal server Error",
          errorMessage: error.messsage,
        });
    }
  });

router.route("/:videoid").get(async (req, res) => {
  try {
    const { videoid } = req.params;
    console.log(videoid);
    const data = await Videos.findById(videoid);
    console.log(data);
    if (!data) {
      res
        .status(400)
        .json({
          success: false,
          message: "could not find the video",
          errorMessage: error.message,
        });
    }
    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        errorMessage: error.message,
      });
  }
});

module.exports = router;
