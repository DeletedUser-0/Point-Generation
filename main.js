var game = {
    points: {
        total: 0,
        perTick: 0.025,
    },
    upgrade1: {
        cost: 12.5,
        level: 0,
    },
    upgrade2: {
        cost: 100,
        level: 0
    }
};

function addPoints() {
    game.points.total += game.points.perTick;
};

function ui() {
    document.getElementById("points").innerHTML = `You have ${game.points.total.toPrecision(3)} points.`;
    document.getElementById("PPS").innerHTML = `You are earning ${(game.points.perTick * 40).toPrecision(3)} points per second.`;
    document.getElementById("upgrade1").innerHTML = `Cost: ${(game.upgrade1.cost.toPrecision(3))} (${(game.upgrade1.cost / (game.points.perTick * 40)).toPrecision(3)}s) <br> Level: ${(game.upgrade1.level.toFixed(0))}`;
    document.getElementById("upgrade2").innerHTML = `Cost: ${(game.upgrade2.cost.toPrecision(3))} (${(game.upgrade2.cost / (game.points.perTick * 40)).toPrecision(3)}s) <br> Level: ${(game.upgrade2.level.toFixed(0))}`;
};

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

var mainGameLoop = window.setInterval(function () {
    addPoints();
}, 25);