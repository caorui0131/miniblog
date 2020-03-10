var express = require('express');
var router = express.Router();
// const mysql=require('../db/mysql')
const mysql=require('mysql')
const {MYSQL_CONF}=require('../conf/db')
const con=mysql.createConnection(MYSQL_CONF)


// 博客编辑页
router.get('/', function(req, res, next) {
var username=req.cookies.name;
con.query(`select * from blog where author='${username}';`,function(err,result){
    if(err){
    console.log(err);
    }
    console.log("listgetresult:",result)
    // 渲染list.jade
    res.render('edit', { title: '博客',username:'cr',result});
});
});
// 保存博客编辑页信息(通过form)
router.post('/edit',function(req,res){
var username=req.cookies.name;
var title = req.body.title;
var content = req.body.content;
var id = req.body.id;
con.query(`update blog set title='${title}',content='${content}' where id='${id}' and author='${username}';`,function(err,result){
    if(err){
    console.log(err);
    }
    console.log(id+":"+title+":"+content);
    // 博客详情页
});
res.redirect('/edit')
});
// 发布博客编辑页信息
router.post('/publish',function(req,res){
var username=req.cookies.name;
var id = req.body.id;
con.query(`update blog set ispublish='1' where id='${id}' and author='${username}';`,function(err,result){
    if(err){
    console.log(err);
    }
    // 博客详情页
});
res.redirect('/edit')
});
// 下撤博客编辑页信息
router.post('/unpublish',function(req,res){
var username=req.cookies.name;
var id = req.body.id;
con.query(`update blog set ispublish='0' where id='${id}' and author='${username}';`,function(err,result){
    if(err){
    console.log(err);
    }
    console.log("id",id);
    // 博客详情页
});
res.redirect('/edit')
});
// 删除博客编辑页信息
router.post('/delete',function(req,res){
var username=req.cookies.name;
var id = req.body.id;
con.query(`delete from blog where id='${id}' and author='${username}';`,function(err,result){
    if(err){
    console.log(err);
    }
    console.log("id",id);
    // 博客详情页
});
res.redirect('/edit')
});
// 新建博客编辑页信息
router.post('/newblog',function(req,res){
var username=req.cookies.name;
con.query(`insert into blog (title,author) values ('未命名','${username}');`,function(err,result){
    if(err){
    console.log(err);
    }
    // 博客详情页
});
res.redirect('/')
});

module.exports = app;