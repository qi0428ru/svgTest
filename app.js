var express = require('express');
var path = require('path');
var ejs = require('ejs');
/**********************基础点********************************/
//基本图形
var base = require('./routes/base');
//动画
var animate = require('./routes/animate');

/************************svg合成***********************************/
//使用svg-symbols组合svg
var symbols = require('./routes/index');
var walkWay = require('./routes/walkWay');
//使用svg-sprite组合svg
//生成的svg组合片段添加到html中
var sprite = require('./routes/sprite');
//使用svg-store组合svg
//生成css样式引用
var store = require('./routes/store');

//拖动
var drag = require('./routes/drag');


var app = express();

var env = process.env.NODE_ENV || 'development';

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', '.html');

app.use('/',base);
app.use('/animate',animate);

app.use('/symbols', symbols);
app.use('/store', store);
app.use('/walkway', walkWay);
app.use('/sprite', sprite);

app.use('/drag',drag);
//重要！！！涉及到页面中引入文件的书写方式
//设置public文件夹为存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3004, function() {
  console.log('Express server listening on port 8080');
});

module.exports = app;
