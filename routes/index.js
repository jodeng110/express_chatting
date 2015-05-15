var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
      namespace : "main",
      title: 'nodejs - 메인페이지'
  });
});

module.exports = router;
