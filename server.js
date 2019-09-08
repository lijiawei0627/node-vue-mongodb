const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/users')
const profiles = require('./routes/profiles')
const info = require('./routes/info')
const passport = require('passport')

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", routes);
app.use('/api/profiles', profiles)
app.use('/api/info', info)

// 将用户上传的图片暴露出去，为应用程序提供静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.static('./dist'));
// passport初始化
app.use(passport.initialize());

require('./config/possport')(passport);


// app.get('/', (req, res) => {
//   res.send('hello world')
// });


let port = 5000; // 5000端口

app.listen (port, () => {
  console.log(`Server run on port ${port}`)
})