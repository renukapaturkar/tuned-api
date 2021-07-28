const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth.router");
const { initializeDBConnection } = require("./data/db.connect.js");
const { authVerify } = require("./middleware/authVerify");

const app = express();
app.use(express.json());

app.use(cors());

const videos = require("./routes/videos.router.js");
const likedVideos = require("./routes/likedVideos.router.js");
const watchLater = require("./routes/watchlater.router.js");
const customplaylist = require("./routes/customplaylist.router.js");

initializeDBConnection();

app.use("/videos", videos);
app.use(authRouter);
app.use("/likedvideos", authVerify, likedVideos);
app.use("/watchlater", authVerify, watchLater);
app.use("/customplaylist", authVerify, customplaylist);

app.get("/", (req, res) =>
  res.send("API Server for Think Tunes - Video Library")
);

app.listen(process.env.PORT || port, () =>
  console.log(
    `think-tunes app listening at http://localhost:${process.env.PORT}`
  )
);
