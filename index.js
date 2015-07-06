var Interrupt = function() {
    var self = this;
    self.notify_granted = ko.observable(false);
    
    self.checkPermission = function() {
        if (!Notify.isSupported) {
            alert("お使いのブラウザーでは通知機能が使えません");
            return;
        }
        if (Notify.permissionLevel == "granted") {
            self.notify_granted(true);
        }
        else {
            Notify.requestPermission(function() {
                self.notify_granted(true);
            });
        }
    };
};

var interrupt = new Interrupt();
ko.applyBindings(interrupt);


setTimeout(function() {return;
    new Notify("割り込みＯＫ？", {
        body: "割り込み歓迎の場合はクリックしてください。",
        icon: "alert.ico",
        timeout: 5,
        notifyClose: function() {
            alert("closed");
        },
        notifyClick: function() {
            alert("clicked");
        }
    }).show();
}, 3000);

