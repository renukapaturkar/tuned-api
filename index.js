const express = require('express')
const cors = require('cors')
const { initializeDBConnection} = require('./data/db.connect.js');



const app = express()
const port = 3000;
app.use(express.json())
const videos = require('./routes/videos.router.js');

initializeDBConnection();
app.use('/videos', videos);




app.get('/', (req, res) => res.json({hello: "world"}))

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`))