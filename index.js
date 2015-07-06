var Interrupt = function() {
    var self = this;
    self.notify_granted = ko.observable(false);
    self.interrupt_timer = ko.observable(null);
    self.next_notify = ko.observable(null);
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
    
    self.startInterruptOk = function() {
        if (self.interrupt_timer()) {
            return;
        }
        self.next_notify(new Date().addMinutes(5));
        self.interrupt_timer(
            setInterval(function() {
                if (self.next_notify().isFuture()) {
                    return;
                }
                new Notify("割り込みＯＫ？", {
                    body: "割り込まれても大丈夫な場合はクリックしてください。",
                    icon: "alert.ico",
                    timeout: 10,
                    notifyClose: function() {
                        //alert("closed");
                    },
                    notifyClick: function() {
                        self.next_notify(new Date().addMinutes(5));
                    }
                }).show();
            }, 2000)
        );
    };
};

var interrupt = new Interrupt();
ko.applyBindings(interrupt);
