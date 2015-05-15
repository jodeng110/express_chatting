module.exports = function (server){
    this.io = require('socket.io').listen(server);
    var rooms = require('./RoomCollection.js');

    io.on('connection', function (socket) {
        
        socket.on('InitMember', function (data) {
            var room = rooms.GetRoom(data.roomID);
            var member = room.GetMember(data.midx);

            this.room = room;
            this.member = member;
            member.socket = this;
        });
        
        socket.on('OutMemver', function (data) {
            var room = rooms.GetRoom(data.roomID);
            if (room == null)
                return;
            var member = room.GetMember(data.midx);
            if (member == null)
                return;
            room.RemoveMember(member);
        });

        socket.on('SenMessage', function (msg) {
            var room = this.room;
            var members = this.room.GetMemgerList();
            var sendername = this.member.nickname;
            members.forEach(function (e, i, a) {
                if (e.socket.connected) {
                    e.socket.emit('ReciveMessage', { msg: msg, sender: sendername });
                }
                else {
                    room.RemoveMember(e);
                }
            });
        });
    });
}