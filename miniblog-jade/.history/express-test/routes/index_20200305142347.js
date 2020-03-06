var express = require('express');
var router = express.Router();

/* GET home page. */
// 当get请求访问 /路由时，（render是 用jade渲染）渲染index的jade文件，第一个参数：jade文件名称，第一个参数：传入jade文件 的参数
router.get('/', function(req, res, next) {
  res.render('index', { title: 'meibaorui love caorui' ,user:{name:"meibaorui",fansCount:10,flowsCount:12}});
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: '博客',username: });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: '新建博客' });
});

router.get('/test',function(req,res,next){
  res.render('test',{title:"test",user:{name:"meibaorui",fansCount:10,flowsCount:12}})
})
module.exports = router;
