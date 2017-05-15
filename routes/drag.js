var express = require('express');
var router = express.Router();
//var drag = require('../public/script/drag')

/* GET home page. */
router.get('/', function(req, res) {
   //res.send('hello world')
   res.render('drag');
});

module.exports = router;