var roomModule = require('./Room.js');

module.exports = new function () {
    var roomList = [];
    this.RoomCount = 0;

    this.AddRoom = function (room) {
        room.CallBack_EmptyRoom = this.RemoveRoom;
        var hasArray = roomList.filter(function (e, i, a) {
            return e.RoomID == room.RoomID;
        });
        
        if (hasArray.length == 0) {
            roomList.push(room);
            this.RoomCount = roomList.length;
        }
    }
    
    this.RemoveRoom = function (room) {
        roomList.forEach(function (e, i, a) {

            if (room.RoomID == e.RoomID) {
                delete roomList[i];
                this.RoomCount = --roomList.length;
                return false;
            }

            return true;
        });
    }
    
    this.ExistRoom = function (roomname) {
        
        if (roomList.length == 0) {
            return false;
        }

        var list = roomList.filter(function (e, i, a) {
            return e.RoomName == roomname;
        });

        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    
    this.GetRoom = function (key) {
        var itemList = roomList.filter(function (e, i, a) { return e.RoomID == key; });
        if (itemList.length == 0) {
            return null;
        }
        else {
            return itemList[0];
        }
    }
    
    this.GetRoomList = function () {
        return roomList;
    }

    this.GetRoomListJson = function () {
        var list = [];

        for (var i = 0; i < roomList.length; i++) {
            var json = {
                roomID : roomList[i].RoomID, 
                roomName: roomList[i].RoomName, 
                memberCount: roomList[i].MemberCount
            };
            list.push(json);
        }

        return list;
    }
}