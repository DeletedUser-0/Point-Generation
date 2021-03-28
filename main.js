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
    Ppoints: {
        total: 0,
        earn: 0,
    }
};

function addPoints() {
    game.points.total = Decimal.add(game.points.perTick, game.points.total);
};

function addPPoints() {
    if (Decimal.compare(game.points.total, 1e9) >= 0) {

    }
}

function ui() {
    document.getElementById("points").innerHTML = `You have ${notate(game.points.total)} points.`;
    document.getElementById("PPS").innerHTML = `You are earning ${notate3(Decimal.times(game.points.perTick, 100))} points per second.`;
    document.getElementById("upgrade1").innerHTML = `Cost: ${notate(game.upgrade1.cost)} (${notate2(Decimal.divide(game.upgrade1.cost, Decimal.times(game.points.perTick, 100)))}s) <br> Level: ${game.upgrade1.level}`;
    document.getElementById("upgrade2").innerHTML = `Cost: ${notate(game.upgrade2.cost)} (${notate2(Decimal.divide(game.upgrade2.cost, Decimal.times(game.points.perTick, 100)))}s) <br> Level: ${game.upgrade2.level}`;
};

function notate(n = 0) {
    if (!(n instanceof Decimal)) n = new Decimal(n);
    let e = n.exponent;
    let m = n.mantissa.toFixed(e >= 0 ? e : 0);

    if (e < 9) { return (m * 10 ** e).toLocaleString('pt-BR'); }
    return `${m.toPrecision(3)}x10<sup>${e}</sup>`;
}

function notate2(n) {
    return (n.mantissa * Math.pow(10, n.exponent)).toFixed(1);
}

function notate3(n) {
    n = new Decimal(n);
    let e = n.exponent;
    let m = n.mantissa
    if (e < 3) return (Math.pow(10, e) * m).toPrecision(3);
    return `${m.toFixed(2)}x10<sup>${e}</sup>`
}

function Save() {
        saveData = game;
        localStorage.saveData = JSON.stringify(saveData);
}

function Load() {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    game = saveData;
    console.log("Save loaded");
    return saveData.obj || "default";
}

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

var mainGameLoop = window.setInterval(function () {
    addPoints();
}, 10);
