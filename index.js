(function() {
    if (!Notify.isSupported) {
        return;
    }
    if (Notify.permissionLevel == "default") {
        Notify.requestPermission();
    }
    new Notify("Hello", {
        body: "World",
        icon: "alert.ico",
        timeout: 2,
        notifyClose: function() {
            alert("closed");
        },
        notifyClick: function() {
            alert("clicked");
        }
    }).show();
})();
