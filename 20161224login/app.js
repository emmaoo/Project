var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();//app是一个监听函数
//设置模板
app.set('view engine','html');
//设置模板存放目录
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use(express.static(path.resolve('public')));
var user = require('./routes/user');
//如果模板的后缀是html的话，使用ejs来进行渲染（ejs提供的函数）
app.use(bodyParser.urlencoded({extended:true}));//如果不知道格式吧四种处理方法都写上
app.use('/user',user);
app.listen(8080);