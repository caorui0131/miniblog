// 引用mysql
const mysql=require("mysql")
// 创建链接对象
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Cr18811657411",
    port:"3306",
    database:'miniblog'
})

// 开始连接
con.connect()

// 执行sql语句
// const sql='select * from todolists;'
const sql=`select * from blog;`
con.query(sql,(err,result,fields)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(result)
    console.log(fields)
})

var result = con.query(sql);
con.query(sql,function(err,result){

})

// var result= jiafaqi(1,2,meibaorui);

// function jiafaqi(v1,v2,sayer){
//     var v3=v1+v2;
//     sayer(v3);
// }

// function meibaorui(content){
//     console.log("梅葆瑞说答案是："+content)
// }

// function caorui(content){
//     return "曹蕊说答案是："+content;
// }

// function query(sql,callback){
//     var result=sdfsdfsd(sql);
//     var err="sfrsd";
//     callback(err,result);
// }
// 关闭连接
con.end()