const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDBConnection} = require('./data/db.connect.js');



const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
const port = 3000;

const videos = require('./routes/videos.router.js');
const likedVideos = require('./routes/likedVideos.router.js');
const watchLater = require('./routes/watchlater.router.js');

initializeDBConnection();
app.use('/videos', videos);
app.use('/likedvideos', likedVideos);
app.use('/watchlater', watchLater); 




app.get('/', (req, res) => res.json({hello: "world"}));

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));