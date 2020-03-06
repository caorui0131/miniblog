var express = require('express');
var router = express.Router();

/* GET home page. */
// 当get请求访问 /路由时，（renders）
router.get('/', function(req, res, next) {
  res.render('index', { title: 'meibaorui love caorui' });
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: '博客列表' });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: '新建博客' });
});
module.exports = router;
