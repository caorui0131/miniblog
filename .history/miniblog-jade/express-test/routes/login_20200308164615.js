var express = require('express');
var router = express.Router();
// const mysql=require('../db/mysql')
const mysql=require('mysql')
const {MYSQL_CONF}=require('../conf/db')
const con=mysql.createConnection(MYSQL_CONF)
