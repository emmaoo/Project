var express = require('express');
var router = express.Router();
var users = [];
router.get('/signup',function(req,res){
    res.render('signup.html',{title:'用户注册'})
})
router.post('/signup',function(req,res){
    var user = req.body;
    users.push(user);
    res.redirect('/user/signin')
})
router.get('/signin',function(req,res){
    res.render('signin.html',{title:'用户登录'})
})
router.post('/signin',function(req,res){
    var user = req.body;
    var existUser = users.find(function(item){
        return users.name ==item.name && users.password == item.password
    })
    if(existUser){
        res.redirect('/user/welcome');
    }else{
        res.redirect('/user/signin');
    }
})
router.get('/welcome',function(req,res){
    res.render('welcome.html',{title:'欢迎'})
})
module.exports =router;