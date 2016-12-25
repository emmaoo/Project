var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
var user=[
    {name:'注册'},
    {name:'登录'},
    {name:'welcome'},
];
var users=[];
app.use(function(req,res,next){
    res.setHeader('Content-type','text/html;charset=utf8');
    next();
})
app.get('/signup',function(req,res){
    res.render('signup.ejs',{user:user});
});
app.post('/signup',function(req,res){
    if(req.body){
        users.push(req.body)
    }
    res.redirect('/signin');
})
app.get('/signin',function(req,res){
    res.render('signin.ejs',{user:user});
})

app.post('/signin',function(req,res) {
    for(var i= 0;i<users.length;i++){
        var layer = users[i];
        if(layer.name==req.body.name && layer.password==req.body.password){
            res.redirect('/welcome');
        }
    }
})
app.get('/welcome',function(req,res){
    res.render('welcome.ejs',{user:user});
})
app.listen(8080);
