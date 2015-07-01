(function() {
    if (!Notify.isSupported) {
        return;
    }
    if (Notify.permissionLevel == "default") {
        Notify.requestPermission();
    }
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
})();
