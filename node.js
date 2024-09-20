const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();

app.use(cors());
app.use(express.static('./'));

app.get('/', (req, res) => {
    
    res.redirect('/Frontend/mahjong/index.html');
});

const options = {
    key: fs.readFileSync('./key/mahjong.key'),
    cert: fs.readFileSync('./key/mahjong.crt'),
    ca: fs.readFileSync('./key/mahjong.ca-bundle') // 如果需要
};

https.createServer(options, app).listen(8080, () => {
    console.log('Server is running on https://localhost:8080');
});