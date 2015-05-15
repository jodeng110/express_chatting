var express = require('express');
var router = express.Router();
var room = require('../AppCode/Room.js');
var roomCollection = require('../AppCode/RoomCollection.js');
var db = require('../AppCode/DbController.js');

router.get('/', function (req, res, next) {
    
    if (!req.session.userinfo) {
        res.redirect('/login');
        return;
    }

    var list = roomCollection.GetRoomListJson();

    res.render('chatting_step1', {
        namespace : "chattingStep1",
        title: 'nodejs - 채팅방목록',
        rooms: list
    });
});

router.post('/', function (req, res, next) {
    var roomname = req.param('roomname');

    if (roomCollection.ExistRoom(roomname)) {
        
        res.render('chatting_step1', {
            namespace : "chattingStep1",
            title: 'nodejs - 채팅방목록',
            rooms: roomCollection.GetRoomListJson(),
            msg: '동일한 방이 존재합니다.'
        });
    }
    else {
        var newroom = new room(roomname);
        //newroom.AddMember(req.session.userinfo);
        roomCollection.AddRoom(newroom);

        res.redirect('/chatting/room?roomID=' + newroom.RoomID);
    }

});

router.get('/room', function (req, res, next) {
    var roomID = req.param("roomID");

    var room = roomCollection.GetRoom(roomID);
    room.AddMember(req.session.userinfo);

    res.render('chatting_step2', {
        namespace : "chattingStep2",
        title: 'nodejs - 채팅방입장 채팅하기',
        roomID: roomID,
        midx: req.session.userinfo.idx
    });
});

module.exports = router;
