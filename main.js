var game = {
    points: {
        total: 0,
        perTick: 0.01,
    },
    upgrade1: {
        cost: 10,
        level: 0,
    },
    upgrade2: {
        cost: 100,
        level: 0
    },
};

function addPoints() {
    game.points.total = Decimal.add(game.points.perTick, game.points.total);
};

function ui() {
    document.getElementById("points").innerHTML = `You have ${notate(game.points.total)} points.`;
    document.getElementById("PPS").innerHTML = `You are earning ${notate(Decimal.times(game.points.perTick, 100))} points per second.`;
    document.getElementById("upgrade1").innerHTML = `Cost: ${notate(game.upgrade1.cost)} (${notate3(Decimal.divide(game.upgrade1.cost, Decimal.times(game.points.perTick, 100)))}s) <br> Level: ${notate2(game.upgrade1.level)}`;
    document.getElementById("upgrade2").innerHTML = `Cost: ${notate(game.upgrade2.cost)} (${notate3(Decimal.divide(game.upgrade2.cost, Decimal.times(game.points.perTick, 100)))}s) <br> Level: ${notate2(game.upgrade2.level)}`;
};

function notate(n) {
    var e = n.exponent;
    if (e < 3) return (n.mantissa * Math.pow(10, e)).toPrecision(3);
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function notate2(n) {
    return (n.mantissa * Math.pow(10, n.exponent)).toFixed(0);
}

function notate3(n) {
    return (n.mantissa * Math.pow(10, n.exponent)).toFixed(1);
}

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

var mainGameLoop = window.setInterval(function () {
    addPoints();
}, 10);
