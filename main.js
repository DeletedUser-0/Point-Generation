class Game {
    constructor(data) {
        this.time = data?.time || 0;

        this.points = {
            total: data?.points?.total || 0,
            perTick: data?.points?.perTick || 0.02,
            upgradebonus: data?.points?.upgradebonus || 1,
            max: data?.points?.max || 7.777,
        };

        this.upgrade1 = {
            cost: data?.upgrade1?.cost || 7.77,
            level: data?.upgrade1?.level || 0,
            increase: data?.upgrade1?.increase || 1.1,
            increase2: data?.upgrade1?.increase2 || 1.1,
        };

        this.upgrade2 = {
            cost: data?.upgrade2?.cost || 100,
            level: data?.upgrade2?.level || 0,
        };

        this.Ppoints = {
            total: data?.Ppoints?.total || 0,
            earn: data?.Ppoints?.earn || 0,
            reset: data?.Ppoints?.reset || 0,
            time: data?.Ppoints?.time || 0,
            max: data?.Ppoints?.max || 0,
            generatorpoints: data?.Ppoints?.generatorpoints || 0,
            generatormultiplier: data?.Ppoints?.generatormultiplier || 0,
            generatortick: data?.Ppoints?.generatortick || 0.02,
        };

        this.PrestigeUpgrade1 = {
            cost: data?.PrestigeUpgrade1?.cost || 1,
            level: data?.PrestigeUpgrade1?.level || 0,
            effectiveness: data?.PrestigeUpgrade1?.effectiveness || 1
        };

        this.PrestigeUpgrade2 = {
            cost: data?.PrestigeUpgrade2?.cost || 4.5,
            level: data?.PrestigeUpgrade2?.level || 0,
            effectiveness: data?.PrestigeUpgrade2?.effectiveness || 1
        };

        this.PrestigeUpgrade3 = {
            cost: data?.PrestigeUpgrade3?.cost || 2.5,
            level: data?.PrestigeUpgrade3?.level || 0,
            effectiveness: data?.PrestigeUpgrade3?.effectiveness || 1
        };

        this.PrestigeUpgrade4 = {
            cost: data?.PrestigeUpgrade4?.cost || 1,
            level: data?.PrestigeUpgrade4?.level || 0,
            effectiveness: data?.PrestigeUpgrade4?.effectiveness || 1
        };

        this.PrestigeUpgrade5 = {
            cost: data?.PrestigeUpgrade5?.cost || 1.5,
            level: data?.PrestigeUpgrade5?.level || 0,
            effectiveness: data?.PrestigeUpgrade5?.effectiveness || 1
        };

        this.PrestigeUpgrade6 = {
            cost: data?.PrestigeUpgrade6?.cost || 316228,
            level: data?.PrestigeUpgrade6?.level || 0,
        };

        this.PrestigeUpgrade7 = {
            cost: data?.PrestigeUpgrade7?.cost || 500,
            level: data?.PrestigeUpgrade7?.level || 0,
            effectiveness: data?.PrestigeUpgrade7?.effectiveness || 0,
        };
    }
}

var game = new Game();

function addPoints() {
    game.points.total = Decimal.add(game.points.perTick, game.points.total);
    game.points.perTick = Decimal.times(0.02, game.PrestigeUpgrade1.effectiveness).times(game.points.upgradebonus).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness);
    game.time = Decimal.add(0.02, game.time);
    game.Ppoints.time = Decimal.add(0.02, game.Ppoints.time);
    game.PrestigeUpgrade7.effectiveness = (Decimal.times(game.Ppoints.earn, Decimal.divide(game.PrestigeUpgrade7.level, 250)).pow(Decimal.add(Decimal.times(0.01, game.PrestigeUpgrade7.level), 1)));
    game.Ppoints.total = Decimal.add(game.Ppoints.total, game.PrestigeUpgrade7.effectiveness)
};

function addPPoints() {
    if (Decimal.compare(game.points.total, 1e9) >= 0) {
        game.Ppoints.total = Decimal.add(game.Ppoints.earn, game.Ppoints.total);
        game.points.total = 0;
        game.points.perTick = Decimal.times(game.PrestigeUpgrade1.effectiveness, 0.02).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness);
        game.upgrade1.cost = new Decimal("10");
        game.upgrade1.level = new Decimal("0");
        game.upgrade2.cost = new Decimal("100");
        game.upgrade2.level = new Decimal("0");
        game.points.upgradebonus = new Decimal("1");
        game.Ppoints.reset += 1;
        game.Ppoints.time = 0;
        game.upgrade1.increase = 1.1;
    } else {
        alert("You can't prestige now!");
    };
};

function ui() {
    document.getElementById("points").innerHTML = `You have ${notate(game.points.total)} points.`;
    document.getElementById("PPS").innerHTML = `You are earning ${notate(Decimal.times(game.points.perTick, 50))} points per second (+${(Decimal.divide(game.points.perTick.times(50), game.points.total).times(100)).toPrecision(3)}%/s).`;
    if (Decimal.compare(game.PrestigeUpgrade5.level, 0) == -1) {
        document.getElementById("increase1").innerHTML = `Receive 10% more points.`
    } else if ((Decimal.compare(game.upgrade1.increase2, 1.1) >= 0) && Decimal.compare(game.upgrade1.increase2, 2) == -1) {
        document.getElementById("increase1").innerHTML = `Receive ${Decimal.sub(game.upgrade1.increase2, 1).times(100).toFixed(2)}% more points.`
    } else {
        document.getElementById("increase1").innerHTML = `Receive ${notate3(game.upgrade1.increase2)} times more points.`
    }
    document.getElementById("upgrade1").innerHTML = `Cost: ${notate(game.upgrade1.cost)} (${notate2(Decimal.divide(game.upgrade1.cost, Decimal.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade1.level}`;
    if (Decimal.compare(game.upgrade1.increase, 2) <= 0) {
        document.getElementById("buy1").innerHTML = `Buy (+${(Decimal.sub(game.upgrade1.increase, 1).times(100).toFixed(2))}%)`;
    } else {
        document.getElementById("buy1").innerHTML = `Buy (x${notate3(game.upgrade1.increase)})`;
    }
    document.getElementById("upgrade2").innerHTML = `Cost: ${notate(game.upgrade2.cost)} (${notate2(Decimal.divide(game.upgrade2.cost, Decimal.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade2.level}`;
    if ((Decimal.compare(game.Ppoints.reset, 0) > 0) || (Decimal.compare(game.points.total, 1e9) >= 0)) {
        document.getElementById("Ppoints").innerHTML = `You have <strong>${notate(game.Ppoints.total)}</strong> Prestige Points.`;
    } else {
        document.getElementById("Ppoints").innerHTML = `This space will be unlocked when you have 1.000.000.000 Points.`;
    };

    if (Decimal.compare(game.points.total, 1e9) < 0) {
        document.getElementById("Ppointsreset").innerHTML = `${(Decimal.divide(Decimal.log10(game.points.total), 9).times(100)).toFixed(2)}% completed.`;
    } else if (Decimal.compare(game.PrestigeUpgrade7.level, 0) == 0) {
        document.getElementById("Ppointsreset").innerHTML = `Prestige to gain ${notate(game.Ppoints.earn)} Prestige Points.`;
    } else {
        document.getElementById("Ppointsreset").innerHTML = `You are earning ${notate(Decimal.times(game.PrestigeUpgrade7.effectiveness, 50))} Prestige Points per second.`
    };

    if (Decimal.compare(game.Ppoints.reset, 1) >= 0) {
        document.getElementById("upgrade3").innerHTML = `Increase points multiplier income based on time played. <br> <br> ${notate4(game.PrestigeUpgrade1.effectiveness)} times more <br> Cost: ${notate3(game.PrestigeUpgrade1.cost)} Prestige Points.`;
        document.getElementById("upgrade4").innerHTML = `Increase points multiplier income based on time played during this prestige. <br> <br> ${notate4(game.PrestigeUpgrade2.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade2.cost)} Prestige Points.`;
        document.getElementById("upgrade5").innerHTML = `Earn 3x more points. <br> <br> ${notate4(game.PrestigeUpgrade3.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade3.cost)} Prestige Points.`;
        document.getElementById("upgrade6").innerHTML = `You earn more points based on your max points amount. <br> <br> ${notate4(game.PrestigeUpgrade4.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade4.cost)} Prestige Points.`;
        document.getElementById("upgrade7").innerHTML = `First points upgrade is stronger. <br> <br> Cost: ${notate(game.PrestigeUpgrade5.cost)} Prestige Points.`;
    } else {
        document.getElementById("upgrade3").innerHTML = `???`;
        document.getElementById("upgrade4").innerHTML = `???`;
        document.getElementById("upgrade5").innerHTML = `???`;
        document.getElementById("upgrade6").innerHTML = `???`;
        document.getElementById("upgrade7").innerHTML = `???`;
    };

    if ((Decimal.compare(game.Ppoints.total, 250) >= 0) || (Decimal.compare(game.PrestigeUpgrade7.level, 1) >= 0)) {
        document.getElementById("upgrade9").innerHTML = `You earn more Prestige Points automatically based on your current points. <br> <br> Effectiveness: ${notate(Decimal.times(game.PrestigeUpgrade7.effectiveness, 50))} pp/s<br> Cost: ${notate(game.PrestigeUpgrade7.cost)} Prestige Points.`;
    } else {
        document.getElementById("upgrade9").innerHTML = `??? <br> <br> Unlocked at 500 Prestige Points.`;
    }

    document.getElementById("time").innerHTML = `Total time played: ${notate(game.time)} seconds.`;
    document.getElementById("total").innerHTML = `Total points income: ${notate(Decimal.times(game.PrestigeUpgrade1.effectiveness, game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness))}x`;
    document.getElementById("max").innerHTML = `Maximum points reached: ${notate(game.points.max)}`
};

function notate(n = 0) {
    if (!(n instanceof Decimal)) {
        n = new Decimal(n);
    }
    let e = n.exponent;
    let m = n.mantissa;

    if (e < 9) {
        return (m.toFixed(e >= 0 ? e : 1) * 10 ** e).toLocaleString('pt-BR');
    };
    return `${m.toPrecision(3)}x10<sup>${e}</sup>`;
};

function notate2(n) {
    return (n.mantissa * Math.pow(10, n.exponent)).toFixed(2);
};

function notate3(n) {
    n = new Decimal(n);
    let e = n.exponent;
    let m = n.mantissa;
    if (e < 3) return (Math.pow(10, e) * m).toPrecision(3);
    return `${m.toFixed(2)}x10<sup>${e}</sup>`;
};

function notate4(n) {
    n = new Decimal(n);
    let e = n.exponent;
    let m = n.mantissa;
    if (e < 3) return (Math.pow(10, e) * m).toPrecision(4);
    return `${m.toFixed(2)}x10<sup>${e}</sup>`;
};

function Save() {
    saveData = game;
    localStorage.saveData = JSON.stringify(saveData);
};

function Load() {
    game = new Game(JSON.parse(localStorage.saveData));
    console.log("Save loaded");
    return saveData.obj || "default";
};

var mainGameLoop = window.setInterval(function() {
    ui();
}, 1);

var mainGameLoop = window.setInterval(function() {
    addPoints();
}, 20);

var mainGameLoop = window.setInterval(function() {
    if (Decimal.compare(game.points.total, game.points.max) >= 0) {
        game.points.max = game.points.total;
    };
}, 1);

var mainGameLoop = window.setInterval(function() {
    if (Decimal.compare(game.Ppoints.total, game.Ppoints.max) >= 0) {
        game.Ppoints.max = game.Ppoints.total;
    };
}, 1);

function recalculate() {
    game.PrestigeUpgrade1.effectiveness = Decimal.pow(game.time, 0.15).pow(game.PrestigeUpgrade1.level);
    game.PrestigeUpgrade2.effectiveness = Decimal.pow(Decimal.add(game.Ppoints.time, 1), 0.4).pow(game.PrestigeUpgrade2.level);
    if (Decimal.compare(game.points.total, 1e9) >= 0 || (Decimal.compare(game.Ppoints.reset, 0) == 1)) {
        game.PrestigeUpgrade4.effectiveness = (Decimal.pow(10, Decimal.log10(game.points.max) / 80 - 0.7).times(1.3725).add(1)).pow(Decimal.add(game.PrestigeUpgrade4.level, 1));
        game.Ppoints.earn = Decimal.pow(10, Decimal.log10(game.points.total) / 27 - 0.7).times(2.3263).times(Decimal.add(game.Ppoints.generatormultiplier, 1.0001));
    }
}

var mainGameLoop = window.setInterval(function() {
    recalculate();
}, 1);

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

key('p', function() {
    if (Decimal.compare(game.points.total, 1e9) >= 0) {
        game.Ppoints.total = Decimal.add(game.Ppoints.earn, game.Ppoints.total);
        game.points.total = 0;
        game.points.perTick = Decimal.times(game.PrestigeUpgrade1.effectiveness, 0.02).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness);
        game.upgrade1.cost = new Decimal("10");
        game.upgrade1.level = new Decimal("0");
        game.upgrade2.cost = new Decimal("100");
        game.upgrade2.level = new Decimal("0");
        game.points.upgradebonus = new Decimal("1");
        game.Ppoints.reset += 1;
        game.Ppoints.time = 0;
        game.upgrade1.increase = 1.1;
    } else {
        alert("You can't prestige now!");
    };
});
