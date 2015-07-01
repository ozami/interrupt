(function() {
    if (!notify.isSupported) {
        return;
    }
    if (notify.permissionLevel() == notify.PERMISSION_DEFAULT) {
        notify.requestPermission();
    }
})();
