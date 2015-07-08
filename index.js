var Interrupt = function() {
    var self = this;
    self.notify_granted = ko.observable(false);
    self.interrupt_ok = ko.observable(false);
    self.minutes_until_next_notify = ko.observable(null);
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
        var interval = 5 * 60 * 1000;
        var loop = function() {
            clearInterval(update_minutes_interval);
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
                }, 15 * 1000);
            }, interval);
            var next_notify_time = new Date().addMilliseconds(interval + 59 * 1000);
            var updateMinutes = function() {
                self.minutes_until_next_notify(next_notify_time.minutesFromNow());
            };
            updateMinutes();
            var update_minutes_interval = setInterval(updateMinutes, 10 * 1000);
            self.interrupt_ok(true);
        };
        loop();
    };
    
    self.stopInterruptOk = function() {
        if (!self.interrupt_ok()) {
            return;
        }
        self.interrupt_ok(false);
    };
    
    self.toggleInterruptOk = function() {
        if (self.interrupt_ok()) {
            self.stopInterruptOk();
        }
        else {
            self.startInterruptOk();
        }
    };
};

var interrupt = new Interrupt();
ko.applyBindings(interrupt);
interrupt.checkPermission();
