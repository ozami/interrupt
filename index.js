(function() {
    if (!notify.isSupported) {
        return;
    }
    if (notify.permissionLevel() == notify.PERMISSION_DEFAULT) {
        notify.requestPermission();
    }
    notify.config({autoClose: 2000});
    notify.createNotification("hello", {
        body: "world"
    });
})();
