const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();
const mysql = require('mysql');
const config = require('../config.json');

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  });
app.use(express.static('./'));

app.get('/', (req, res) => {
    
    res.redirect('/index.html');
});

app.post('/register', (req, res)=>{
    const { region, phone } = req.body;
    if (!region || !phone) {
        return res.status(500).json({ error: '参数不完整', code: 400 });
    }
    connection.query(
          'SELECT * FROM user WHERE region = ? AND phone = ?',
          [region, phone],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: '提交失败,数据库查询出错', code: 400 });
            }
      
            // 如果数据库中不存在相同的 region 和 phone 值,则插入新数据
            if (results.length === 0) {
              connection.query(
                'INSERT INTO user (region, phone) VALUES (?, ?)',
                [region, phone],
                (error, results, fields) => {
                  if (error) {
                    console.error(error);
                    return res.status(500).json({ error: error, code: 400 });
                  }
                  console.log(`收到手机号: ${phone}, 地区: ${region}`);
                  res.json({ message: '提交成功', code: 200 });
                }
              );
            } else {
              res.json({ error: '手机号和地区已存在', code: 400 });
            }
          }
        );
  })

const options = {
    key: fs.readFileSync('./key/mahjong.key'),
    cert: fs.readFileSync('./key/mahjong.crt'),
    ca: fs.readFileSync('./key/mahjong.ca-bundle') // 如果需要
};

https.createServer(options, app).listen(443, () => {
    console.log('Server is running on https://localhost:443');
});