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
        notifyClose: function() {
            alert("here");
        }
    }).show();
})();
