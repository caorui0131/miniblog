var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'meibaorui love caorui' });
});

router.get('/list', function(req, res, next) {
  res.render('index', { title: 'meibaorui love caorui' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'meibaorui love caorui' });
});
module.exports = router;
