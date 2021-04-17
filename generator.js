function Addpoints() {
    if (Decimal.compare(game.Ppoints.total, 2500) >= 0) {
        game.Ppoints.generatorpoints = Decimal.add(game.Ppoints.generatorpoints, game.Ppoints.generatortick);
    }
};

var mainGameLoop = window.setInterval(function() {
    Addpoints();
}, 20);

function multiplier() {
    if (Decimal.compare(game.Ppoints.total, 2500) >= 0) {
        game.Ppoints.generatormultiplier = Decimal.pow(10, game.points.total.exponent / 1000 - 0.7).times(5);
    }
};
