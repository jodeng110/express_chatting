var express = require('express');
var router  = express.Router();
var db = require('../AppCode/DbController.js');

// routerㅇ
router.get('/', function(req, res, next) {
	res.render('join/index', {
		namespace : "join",
		title: 'nodejs - 회원가입'
	});
});

router.post('/', function (req, res, next) {
    db.insertMember(req.body.email, req.body.password, req.body.nickname, function (result, err) {
        if (err || !result) {
            res.redirect('/join/fail');
        }
        else {
            res.redirect('/join/success');
        }
    });
});

router.get('/success', function(req, res, next) {
    res.render('join/success', {
        namespace : "join",
        title     : 'nodejs - 회원가입 성공',
        message   : "회원가입이 완료되었습니다."
    });
});

router.get('/fail', function(req, res, next) {
    res.render('join/index', {
        namespace : "join",
        title: 'nodejs - 회원가입 실패',
        message   : "회원가입이 실패하였습니다. 다시 시도해 주세요."
    });
});

module.exports = router;
