
let $util = require('../public/js/util');
console.log('util...');
console.log($util.coverDate(new Date()));

module.exports = function(app){
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index');
  });
  app.use('/user',require('./users'))//用户
  // 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
      // res.status(404).render('404');
      res.render('error');
		}
	});
};