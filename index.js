var Interrupt = function() {
    var self = this;
    self.notify_granted = ko.observable(false);
    self.interrupt_ok = ko.observable(false);
    self.next_notify_time = ko.observable(null);
    self.is_start_button_enabled = ko.computed(function() {
        return self.notify_granted() && !self.interrupt_ok();
    });
    
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
        if (self.interrupt_ok()) {
            return;
        }
        self.interrupt_ok(true);
        var interval = 3000;//5 * 60 * 1000;
        var loop = function() {
            self.next_notify_time(new Date().addMilliseconds(interval));
            var next_notify = setTimeout(function() {
                var notify = new Notify("割り込みＯＫ？", {
                    body: "割り込みが入ってもよい場合はクリックしてください。",
                    icon: "alert.ico",
                    notifyClick: function() {
                        loop();
                    }
                });
                notify.show();
                var timeout = setTimeout(function() {
                    notify.close();
                    self.stopInterruptOk();
                }, 10 * 1000);
            }, interval);
        };
        loop();
    };
    
    self.stopInterruptOk = function() {
        if (!self.interrupt_ok()) {
            return;
        }
        self.interrupt_ok(false);
    }
};

var interrupt = new Interrupt();
ko.applyBindings(interrupt);
interrupt.checkPermission();
