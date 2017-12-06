var express = require('express');
var router = express.Router();
var $util = require('../public/js/util');

var userModel = require('../models/user');

// ejs模板渲染
/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.getAll().then(function(val){
    for(let i=0;i<val.users.length;i++){
      val.users[i].create_date = $util.coverDate(new Date(val.users[i].create_date));
    }
    res.render('users',val);
  }).catch(next);
});


// 接口……
// 查询所有用户
router.get('/queryAll', function(req, res, next) {
  userModel.queryAll(req, res, next);
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
  userModel.add(req, res, next);
});

// 查找单个用户
router.get('/query', function(req, res, next) {
  userModel.queryById(req, res, next);
});

// 删除用户
router.get('/deleteUser', function(req, res, next) {
  userModel.delete(req, res, next);
});

// 更新用户
router.post('/updateUser', function(req, res, next) {
  userModel.update(req, res, next);
});

module.exports = router;