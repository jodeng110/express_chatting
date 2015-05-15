var member = require('./Member.js');

module.exports = function (roomName) {
    var memberList = [];
    this.RoomID = generateGUID();
    this.RoomName = roomName;
    this.MemberCount = 0;
    
    this.CallBack_EmptyRoom;

    function generateGUID() {
        var getUid = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (getUid() + getUid() + "-" + getUid() + "-" + getUid() + "-" + getUid() + "-" +
                getUid() + getUid() + getUid()).toUpperCase();
    }

    this.AddMember = function (userinfo) {
        

        var hasArray = memberList.filter(function (e, i, a) {
            return e.email == userinfo.email;
        });
        
        if (hasArray.length == 0) {
            memberList.push(userinfo);
            this.MemberCount = memberList.length;
        }
    }

    this.RemoveMember = function (userinfo) {

        memberList.forEach(function (e, i, a) {
            if (e.email == userinfo.email) {
                delete memberList[i];
                this.MemberCount = --memberList.length;
                return false;
            }

            return true;
        });

        if (memberList.length == 0 || this.CallBack_EmptyRoom != null) {
            this.CallBack_EmptyRoom(this);
        }
    }

    this.GetMemgerList = function () {
        return memberList;
    }

    this.GetMember = function (midx) {
        var idx = parseInt(midx);
        var list = memberList.filter(function (e, i, a) { return e.idx == idx; });
        if (list == null || list.length == 0) {
            return null;
        }
        else {
            return list[0];
        }
    }
}