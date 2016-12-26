var express= require('express');
var router = express.Router();
var fs = require('fs');
var session = require('express-session');
function getUsers(callback){
    fs.readFile('./user.json','utf8',function(err,data){
        if(err){
            callback([]);
        }else{
            callback(JSON.parse(data));
        }
    })
}
function setUsers(data,callback){
    fs.writeFile('./user.json',JSON.stringify(data),callback);
}
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'mmm'
}));
router.get('/signup',function(req,res){
    res.render('signup.html',{
        title:'注册',
        error:req.session.errorup,
    })
});
router.post('/signup',function(req,res){
    req.session.errorup='';
    var user = req.body;
    getUsers(function(data){
        var dataUser = data.find(function(item){
            return item.username == user.username;
        });
        if(dataUser){
            req.session.errorup='账号已经存在，请重新注册';
            res.redirect('/user/signup')
        }else{
            data.push(user);
            setUsers(data,function(){
                res.redirect('/user/signin')
            })
        }
    })
});
router.get('/signin', function (req,res) {
    res.render('signin.html',{
        title:'登录',
        error:req.session.errorin,
    })
});
router.post('/signin',function(req,res){
    req.session.errorin = '';
    var user = req.body;
    getUsers(function(data){
        var existUser = data.find(function(item){
            return item.username == user.username && item.password == user.password;
        });
        if(existUser){
            req.session.username = user.username;
            res.redirect('/user/welcome');
        }else{
            req.session.errorin = '登录失败，请重新输入';
            res.redirect('/user/signin')
        }
    })
});
router.get('/welcome',function(req,res){
    res.render('welcome.html',{
        title:'welcome',
        username:req.session.username
    })
});
module.exports = router;
