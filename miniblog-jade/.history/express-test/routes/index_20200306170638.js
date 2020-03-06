var express = require('express');
var router = express.Router();
// const mysql=require('../db/mysql')
const mysql=require('mysql')
const {MYSQL_CONF}=require('../conf/db')
const con=mysql.createConnection(MYSQL_CONF)
/* GET home page. */
// 当get请求访问 /路由时，（render是 用jade渲染）渲染index的jade文件，第一个参数：jade文件名称，第一个参数：传入jade文件 的参数
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'meibaorui love caorui' ,user:{name:"meibaorui",fansCount:10,flowsCount:12}});
// });
// router.get('/test',function(req,res,next){
//   res.render('test',{title:"test",user:{name:"meibaorui",fansCount:10,flowsCount:12}})
// })
//博客列表页
router.get('/list', function(req, res, next) {
  res.render('list', { title: '博客',username:'cr' });
});
// get博客列表list
router.get('/listget', function(req, res, next) {
  con.query(`select * from blog;`,function(err,result){
    if(err){
      console.log(err);
    }
    console.log(result)
    res.json(result)
  });
});
// 博客详情页
// router.get('/detail', function(req, res, next) {
//   res.render('detail', { title: '博客',bolgtitle:"111",bolgcontent:222 });
// });
// get博客详情detail
router.get('/detailget', function(req, res, next) {
  var id=req.query.thisid
  console.log("thisid:",req.query.thisid);
  con.query(`select * from blog where id=${id};`,function(err,result){
    if(err){
      console.log(err);
    }
    console.log("result[0].title",result[0].title)
    router.get('/detail', function(req, res, next) {
      res.render('detail', { title: '博客',bolgtitle:result[0].title,bolgcontent:result[0].content});
  });
    // res.json(result)
  });
});
// 博客登录页
router.get('/login', function(req, res, next) {
  res.render('login', { title: '博客' });
});
// 博客编辑页
router.get('/edit', function(req, res, next) {
  res.render('edit', { title: '博客',bolgtitle:"111",bolgcontent:222 });
});
module.exports = router;
