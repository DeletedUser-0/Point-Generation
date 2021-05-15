function showPPS() {
    if (game.settings.showPerTick === "true") {
        game.settings.showPerTick === "false";
    } else {
        game.settings.showPerTick === "true";
    }
}

if (game.settings.showPerTick === "true") {
    document.querySelector("PPS").style.display = "block";
} else {
    document.querySelector("PPS").style.display = "none";
}