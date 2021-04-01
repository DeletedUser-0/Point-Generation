var game = {
    time: 0,
    points: {
        total: 0,
        perTick: 0.02,
        upgradebonus: 1,
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
        reset: 0,
    },
    PrestigeUpgrade1: {
        cost: 1,
        level: 0,
        effectiveness: 1,
    },
};

function addPoints() {
    game.points.total = Decimal.add(game.points.perTick, game.points.total);
    game.Ppoints.earn = Decimal.pow(1.1, Decimal.log10(game.points.total)).div(2.35794769)
    game.points.perTick = Decimal.times(0.02, game.PrestigeUpgrade1.effectiveness).times(game.points.upgradebonus);
    game.time = Decimal.add(0.01, game.time);
};

function addPPoints() {
    if (Decimal.compare(game.points.total, 1e9) >= 0) {
        game.Ppoints.total = Decimal.add(game.Ppoints.earn, game.Ppoints.total);
        game.points.total = 0;
        game.points.perTick = Decimal.times(game.PrestigeUpgrade1.effectiveness, 0.02);
        game.upgrade1.cost = new Decimal("10");
        game.upgrade1.level = new Decimal("0");
        game.upgrade2.cost = new Decimal("100");
        game.upgrade2.level = new Decimal("0");
        game.points.upgradebonus = new Decimal("1");
        game.Ppoints.reset += 1;
    } else {
        alert("You can't prestige now!");
    };
};

function ui() {
    document.getElementById("points").innerHTML = `You have ${notate(game.points.total)} points.`;
    document.getElementById("PPS").innerHTML = `You are earning ${notate3(Decimal.times(game.points.perTick, 50))} points per second.`;
    document.getElementById("upgrade1").innerHTML = `Cost: ${notate(game.upgrade1.cost)} (${notate2(Decimal.divide(game.upgrade1.cost, Decimal.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade1.level}`;
    document.getElementById("upgrade2").innerHTML = `Cost: ${notate(game.upgrade2.cost)} (${notate2(Decimal.divide(game.upgrade2.cost, Decimal.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade2.level}`;
    if ((Decimal.compare(game.Ppoints.reset, 0) > 0) || (Decimal.compare(game.points.total, 1e9) >= 0)) {
        document.getElementById("Ppoints").innerHTML = `You have <strong>${notate(game.Ppoints.total)}</strong> Prestige Points.`;
    } else {
        document.getElementById("Ppoints").innerHTML = `This space will be unlocked when you have 1.000.000.000 Points.`;
    };

    if (Decimal.compare(game.points.total, 1e9) < 0) {
        document.getElementById("Ppointsreset").innerHTML = `${(Decimal.divide(Decimal.log10(game.points.total), 9).times(100)).toFixed(2)}% completed.`;
    } else {
        document.getElementById("Ppointsreset").innerHTML = `Prestige to gain ${notate(game.Ppoints.earn)} Prestige Points.`;
    };

    if (Decimal.compare(game.Ppoints.reset, 1) >= 0) {
        document.getElementById("upgrade3").innerHTML = `Increase points multiplier income based on total time played. <br> Effect: ${game.PrestigeUpgrade1.effectiveness.toPrecision(4)}x <br> Cost: ${notate(game.PrestigeUpgrade1.cost)} Prestige Points.`;
    } else {
        document.getElementById("upgrade3").innerHTML = `???`;
    };
    game.PrestigeUpgrade1.effectiveness = Decimal.pow(game.time, 0.1).pow(game.PrestigeUpgrade1.level);
    document.getElementById("time").innerHTML = `Total time played: ${notate(game.time)} seconds.`
};

function notate(n = 0) {
    if (!(n instanceof Decimal)) {
        n = new Decimal(n);
    }
    let e = n.exponent;
    let m = n.mantissa;

    if (e < 9) {
        return (m.toFixed(e >= 0 ? e : 0) * 10 ** e).toLocaleString('pt-BR');
    };
    return `${m.toPrecision(3)}x10<sup>${e}</sup>`;
};

function notate2(n) {
    return (n.mantissa * Math.pow(10, n.exponent)).toFixed(1);
};

function notate3(n) {
    n = new Decimal(n);
    let e = n.exponent;
    let m = n.mantissa;
    if (e < 3) return (Math.pow(10, e) * m).toPrecision(3);
    return `${m.toFixed(2)}x10<sup>${e}</sup>`;
};

function Save() {
    saveData = game;
    localStorage.saveData = JSON.stringify(saveData);
};

function Load() {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    game = saveData;
    console.log("Save loaded");
    return saveData.obj || "default";
};

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

var mainGameLoop = window.setInterval(function () {
    addPoints();
}, 20);

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
