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
  con.query(`select * from blog;`,function(err,result){
    if(err){
      console.log(err);
    }
    console.log("listgetresult:",result)
    // 渲染list.jade
    res.render('list', { title: '博客',username:'cr',result});
  });
});
// get博客列表list
// router.get('/listget', function(req, res, next) {
//   con.query(`select * from blog;`,function(err,result){
//     if(err){
//       console.log(err);
//     }
//     console.log("listgetresult:",result)
//     res.json(result)
//   });
// });
// 博客详情页
router.get('/detail', function(req, res, next) {
  var id=req.query.id;
  console.log("id:",id);
  con.query(`select * from blog where id=${id};`,function(err,result){
    if(err){
      console.log(err);
    }
    console.log("result[0].title",result[0].title)
    // 博客详情页
    res.render('detail', { title: '博客',bolgtitle:result[0].title,bolgcontent:result[0].content});
    // res.json(result)
  });
  // res.render('detail', { title: '博客',bolgtitle:"111",bolgcontent:222 });
});
// get博客详情detail
// router.get('/detailget', function(req, res, next) {
//   var id=req.query.thisid
//   console.log("thisid:",req.query.thisid);
//   con.query(`select * from blog where id=${id};`,function(err,result){
//     if(err){
//       console.log(err);
//     }
//     console.log("result[0].title",result[0].title)
//     // 博客详情页
//     router.get('/detail', function(req, res, next) {
//       res.render('detail', { title: '博客',bolgtitle:result[0].title,bolgcontent:result[0].content});
//     });
//     // res.json(result)
//   });
// });
// 博客登录页
router.get('/login', function(req, res, next) {
  res.render('login', { title: '博客' });
});
// 博客编辑页
router.get('/edit', function(req, res, next) {
  con.query(`select * from blog where author=${username};`,function(err,result){
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
  var title = req.body.title;
  var content = req.body.content;
  var id = req.body.id;
  con.query(`update blog set title='${title}',content='${content}' where id='${id}';`,function(err,result){
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
  var id = req.body.id;
  con.query(`update blog set ispublish='1' where id='${id}';`,function(err,result){
    if(err){
      console.log(err);
    }
    // 博客详情页
  });
  res.redirect('/edit')
});
// 下撤博客编辑页信息
router.post('/unpublish',function(req,res){
  var id = req.body.id;
  con.query(`update blog set ispublish='0' where id='${id}';`,function(err,result){
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
  var id = req.body.id;
  con.query(`delete from blog where id='${id}';`,function(err,result){
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
  con.query(`insert into blog (title) values ('未命名');`,function(err,result){
    if(err){
      console.log(err);
    }
    // 博客详情页
  });
  res.redirect('/edit')
});

// 退出登录
router.post("/logout",function(req, res, next){
  res.cookie('name','',{path:'/',expires: new Date(Date.now()-1000),httpOnly:true})
  res.cookie('name2','',{path:'/',expires: new Date(Date.now()-1000)})
  res.json("logout 成功")
})
// 登录验证
router.post("/login",function(req, res, next){
    try{
        var username=req.body.username
        var password=req.body.password
        console.log("username:",username)
    }catch(err){
        res.json({code:500});
    }
    var username=req.body.username
    var password=req.body.password
    console.log("username:",username)
    con.query(`select username,password from user where username='${username}'and password='${password}';`,function(err,result){
      console.log("result:",result)
      if(result&&result.length>0){
        // res.setHeader('Set-Cookie',`name=${username};path=/;httpOnly;`)
        // response.addHeader("Set-Cookie", `name=${username}; Path=/; HttpOnly`);
        // 同时设2个cookie，取前端能改的name2展示前端页面（改了也无所谓因为 取不到后端的值），取前端改不了的cookie的username查询用户列表
        res.cookie('name',username,{path:'/',expires: new Date(Date.now()+900000),httpOnly:true})
        res.cookie('name2',username,{path:'/',expires: new Date(Date.now()+900000)})
        console.log('setHeader')
        res.json(result[0])
        console.log('result[0]:',result[0])
      }else{
        res.json(null);
      }
      
    })
})
module.exports = router;
