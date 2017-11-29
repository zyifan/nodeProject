var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var $util = require('../public/js/util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.getAll().then(function(val){
    for(let i=0;i<val.users.length;i++){
      val.users[i].create_date = $util.coverDate(new Date(val.users[i].create_date));
    }
    res.render('users',val);
  }).catch(next);
});

module.exports = router;