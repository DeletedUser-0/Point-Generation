class Game {
    constructor(data) {
        this.time = data?.time || 0;

        this.points = {
            total: data?.points?.total || 0,
            perTick: data?.points?.perTick || 0.02,
            upgradebonus: data?.points?.upgradebonus || 1,
            max: data?.points?.max || 0,
        };

        this.upgrade1 = {
            cost: data?.upgrade1?.cost || 10,
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
        };

        this.PrestigeUpgrade1 = {
            cost: data?.PrestigeUpgrade1?.cost || 1,
            level: data?.PrestigeUpgrade1?.level || 0,
            effectiveness: data?.PrestigeUpgrade1?.effectiveness || 1
        };

        this.PrestigeUpgrade2 = {
            cost: data?.PrestigeUpgrade2?.cost || 10,
            level: data?.PrestigeUpgrade2?.level || 0,
            effectiveness: data?.PrestigeUpgrade2?.effectiveness || 1
        };

        this.PrestigeUpgrade3 = {
            cost: data?.PrestigeUpgrade3?.cost || 100,
            level: data?.PrestigeUpgrade3?.level || 0,
            effectiveness: data?.PrestigeUpgrade3?.effectiveness || 1,
            multiplier: data?.PrestigeUpgrade3.multiplier || 10,
        };

        this.PrestigeUpgrade4 = {
            cost: data?.PrestigeUpgrade4?.cost || 1000,
            level: data?.PrestigeUpgrade4?.level || 0,
            effectiveness: data?.PrestigeUpgrade4?.effectiveness || 1
        };

        this.PrestigeUpgrade5 = {
            cost: data?.PrestigeUpgrade5.cost || 100000,
            level: data?.PrestigeUpgrade5?.level || 0,
            effectiveness: data?.PrestigeUpgrade5?.effectiveness || 0,
        };

        this.generator = {
            total: data?.generator?.total || 1,
            multiplier: data?.generator?.multiplier || 1.0002,
            translate: data?.generator?.translate || 1,
            exponent: data?.generator?.exponent || 0.33333333333333333333333333,
            limit: data?.generator?.limit || 1e300,
        };

        this.gupgrade1 = {
            cost: data?.gupgrade1?.cost || 1.75,
            level: data?.gupgrade1?.level || 0,
        };

        this.gupgrade2 = {
            cost: data?.gupgrade2?.cost || 3.16227766e7,
            level: data?.gupgrade2?.level || 0,
        };

        this.gupgrade4 = {
            cost: data?.gupgrade4?.cost || new OmegaNum("1e500"),
            level: data?.gupgrade4?.level || 0,
        };

        this.gupgrade5 = {
            cost: data?.gupgrade5?.cost || 1e100,
            level: data?.gupgrade5?.level || 0,
        };

        this.gupgrade6 = {
            cost: data?.gupgrade6?.cost || 1e150,
            level: data?.gupgrade6?.level || 0,
        };

        this.gupgrade7 = {
            cost: data?.gupgrade7?.cost || new OmegaNum("1e1500"),
            level: data?.gupgrade7?.level || 0,
            pow: data?.gupgrade7?.pow || 1,
        };

        this.settings = {
            showPerTick: true,
        };

        this.ip = {
            total: data?.ip?.total || new OmegaNum("0"),
            earn: data?.ip?.earn || new OmegaNum("0"),
            reset: data?.ip?.reset || new OmegaNum("0"),
        }
    };
};

var game = new Game();

function addPoints() {
    game.points.total = OmegaNum.add(game.points.perTick, game.points.total);
    game.points.perTick = OmegaNum.times(0.02, game.PrestigeUpgrade1.effectiveness).times(game.points.upgradebonus).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness).times(game.generator.translate);
    game.Ppoints.time = OmegaNum.add(0.02, game.Ppoints.time);
    if (game.PrestigeUpgrade5.level == "MAX") {
        game.PrestigeUpgrade5.effectiveness = OmegaNum.div(game.Ppoints.earn, 4);
    }
    game.Ppoints.total = OmegaNum.add(game.Ppoints.total, game.PrestigeUpgrade5.effectiveness)
    game.generator.translate = OmegaNum.pow(game.generator.total, game.generator.exponent);
};

function addPPoints() {
    if (OmegaNum.compare(game.points.total, 1e16) >= 0) {
        game.Ppoints.total = OmegaNum.add(game.Ppoints.earn, game.Ppoints.total);
        game.points.total = 0;
        game.points.perTick = OmegaNum.times(game.PrestigeUpgrade1.effectiveness, 0.02).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness);
        game.upgrade1.cost = new OmegaNum("10");
        game.upgrade1.level = new OmegaNum("0");
        game.upgrade2.cost = new OmegaNum("100");
        game.upgrade2.level = new OmegaNum("0");
        game.points.upgradebonus = new OmegaNum("1");
        game.Ppoints.reset += 1;
        game.Ppoints.time = 0;
        game.upgrade1.increase = 1.1;
    } else {
        alert("You can't prestige now!");
    };
};

function notate(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    let s = "";
    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        let m = n.array[0] / 10 ** e;
        return e < 3 ? n.toPrecision(3) : `${m.toPrecision(3)}e${e}`;
    }
    else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}x10<sup>${Math.floor(n.array[0]).toLocaleString("pt-BR")}</sup>`;
    }
    else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    }
}

window.addEventListener('keyup', function(e) {
    switch (e.key) {
        case "p":
            addPPoints()
}})

window.addEventListener('keyup', function(e) {
    switch (e.key) {
        case "m":
            upgrade1();
            upgrade2()
}})

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
    if (OmegaNum.compare(game.points.total, game.points.max) >= 0) {
        game.points.max = game.points.total;
    };
}, 1);

var mainGameLoop = window.setInterval(function() {
    if (OmegaNum.compare(game.Ppoints.total, game.Ppoints.max) >= 0) {
        game.Ppoints.max = game.Ppoints.total;
    };
}, 1);

function recalculate() {
    if (OmegaNum.cmp(game.time, 100) >= 0) {
        game.PrestigeUpgrade1.effectiveness =  OmegaNum.pow(1.0006, game.time).pow(OmegaNum.pow(game.PrestigeUpgrade1.level, 0.6666));
    }
    game.PrestigeUpgrade2.effectiveness = OmegaNum.pow(OmegaNum.add(game.Ppoints.time, 1), 0.55).pow(game.PrestigeUpgrade2.level);
    if (OmegaNum.compare(game.points.total, 1e16) >= 0 || (OmegaNum.compare(game.Ppoints.reset, 0) == 1)) {
        game.Ppoints.earn = OmegaNum.pow(10, OmegaNum.log10(game.points.total) / 27 - 0.7).times(1.292388889);
    }
    game.points.upgradebonus = OmegaNum.times(OmegaNum.pow(game.upgrade1.increase2, game.upgrade1.level), OmegaNum.pow(1.3333333333333333333333333, game.upgrade2.level));
    game.upgrade1.level = new OmegaNum(game.upgrade1.level);
    game.upgrade2.level = new OmegaNum(game.upgrade2.level);
    game.gupgrade1.level = new OmegaNum(game.gupgrade1.level);
    game.gupgrade4.level = new OmegaNum(game.gupgrade4.level);
};

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


function ui() {
    document.getElementById("points").innerHTML = `You have ${notate(game.points.total)} points.`;
    document.querySelector("#PPS").innerHTML = `You are earning ${notate(OmegaNum.times(game.points.perTick, 50))} points per second.`;
    if (OmegaNum.compare(game.PrestigeUpgrade4.level, 0) == -1) {
        document.getElementById("increase1").innerHTML = `Receive 10% more points.`
    } else if ((OmegaNum.compare(game.upgrade1.increase2, 1.1) >= 0) && OmegaNum.compare(game.upgrade1.increase2, 2) == -1) {
        document.getElementById("increase1").innerHTML = `Receive ${OmegaNum.sub(game.upgrade1.increase2, 1).times(100).toFixed(2)}% more points.`
    } else {
        document.getElementById("increase1").innerHTML = `Receive ${notate(game.upgrade1.increase2)} times more points.`
    }
    document.getElementById("upgrade1").innerHTML = `Cost: ${notate(game.upgrade1.cost)} (${notate(OmegaNum.divide(game.upgrade1.cost, OmegaNum.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade1.level}`;
    if (OmegaNum.compare(game.upgrade1.increase, 2) <= 0) {
        document.getElementById("buy1").innerHTML = `Buy (+${(OmegaNum.sub(game.upgrade1.increase, 1).times(100).toFixed(2))}%)`;
    } else {
        document.getElementById("buy1").innerHTML = `Buy (x${notate(game.upgrade1.increase)})`;
    }

    if (OmegaNum.compare(game.upgrade2.level, 100) <= 0) {
        document.getElementById("buy2").innerHTML = `Buy`;
    } else {
        document.getElementById("buy2").innerHTML = `Buy (x${notate(OmegaNum.divide(OmegaNum.pow(game.upgrade2.cost, 1.015), game.upgrade2.cost))})`;
    }

    document.getElementById("upgrade2").innerHTML = `Cost: ${notate(game.upgrade2.cost)} (${notate(OmegaNum.divide(game.upgrade2.cost, OmegaNum.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade2.level}`;
    if ((OmegaNum.compare(game.Ppoints.reset, 0) > 0) || (OmegaNum.compare(game.points.total, 1e16) >= 0)) {
        document.getElementById("Ppoints").innerHTML = `You have <strong>${notate(game.Ppoints.total)}</strong> Prestige Points.`;
    } else {
        document.getElementById("Ppoints").innerHTML = `This space will be unlocked when you have 1.00e16 Points.`;
    };

    if (OmegaNum.compare(game.points.total, 1e16) < 0) {
        document.getElementById("Ppointsreset").innerHTML = `${(OmegaNum.divide(OmegaNum.log10(game.points.total), 16).times(100)).toFixed(2)}% completed.`;
    } else if (OmegaNum.compare(game.PrestigeUpgrade5.level, 0) == 0) {
        document.getElementById("Ppointsreset").innerHTML = `Prestige to gain ${notate(game.Ppoints.earn)} Prestige Points.`;
    } else {
        document.getElementById("Ppointsreset").innerHTML = `You are earning ${notate(OmegaNum.times(game.PrestigeUpgrade5.effectiveness, 50))} Prestige Points per second.`
    };

    if (OmegaNum.compare(game.Ppoints.reset, 1) >= 0) {
        document.getElementById("upgrade3").innerHTML = `Increase points multiplier income based on time played. <br> <br> ${notate(game.PrestigeUpgrade1.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade1.cost)} Prestige Points.`;
        if (OmegaNum.compare(game.PrestigeUpgrade2.cost, 1e3) == -1) {
            document.getElementById("upgrade4").innerHTML = `Increase points multiplier income based on time played during this prestige. <br> <br> ${notate(game.PrestigeUpgrade2.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade2.cost)} Prestige Points.`;
        } else {
            document.getElementById("upgrade4").innerHTML = `Increase points multiplier income based on time played during this prestige. <br> <br> ${notate(game.PrestigeUpgrade2.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade2.cost)} PP.`;
        }
        document.getElementById("upgrade5").innerHTML = `Earn ${notate(game.PrestigeUpgrade3.multiplier)}x more points. <br> <br> ${notate(game.PrestigeUpgrade3.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade3.cost)} Prestige Points.`;
        document.getElementById("upgrade7").innerHTML = `First points upgrade is stronger. <br> <br> Cost: ${notate(game.PrestigeUpgrade4.cost)} Prestige Points.`;
    } else {
        document.getElementById("upgrade3").innerHTML = `???`;
        document.getElementById("upgrade4").innerHTML = `???`;
        document.getElementById("upgrade5").innerHTML = `???`;
        document.getElementById("upgrade7").innerHTML = `???`;
    };

    if ((OmegaNum.compare(game.Ppoints.total, 1000) >= 0) || (OmegaNum.compare(game.PrestigeUpgrade5.level, 1) >= 0)) {
        if (game.PrestigeUpgrade5.level == "MAX") {
            document.getElementById("upgrade9").innerHTML = `You earn 25% of your Prestige Points receivement from resets per second. <br> <br>  Level: MAX.`;
        } else {
            document.getElementById("upgrade9").innerHTML = `You earn 25% of your Prestige Points receivement from resets per second. <br> <br>  Cost: ${notate(game.PrestigeUpgrade5.cost)} Prestige Points.`;
        }
        } else {
        document.getElementById("upgrade9").innerHTML = `??? <br> <br> Unlocked at 10.000 Prestige Points and viewable at 1.000 Prestige Points.`;
    }

    if (OmegaNum.cmp(game.generator.multiplier, 1.004472844) >= 0) {
        document.getElementById("generatornumber").innerHTML = `You have <strong style="font-size: 125%;">${notate(game.generator.total)}</strong> generator points, translating to <strong style="font-size: 125%;">${notate(game.generator.translate)} </strong>times more points. <br> <br style="font-size: 75%"> You are earning ${notate(OmegaNum.pow(game.generator.multiplier, 50))} times more generator points per second. <p style="font-size: 75%;" color="grey"> ${OmegaNum.div(OmegaNum.log10(OmegaNum.div(game.generator.limit, game.generator.total)), OmegaNum.log10(OmegaNum.pow(game.generator.multiplier, 50))).toFixed(1)} seconds until the limit (${(OmegaNum.div(OmegaNum.log10(game.generator.total), OmegaNum.log10(game.generator.limit)).times(100)).toFixed(2)}%). </p>`
    } else {
        document.getElementById("generatornumber").innerHTML = `You have <strong style="font-size: 125%;">${notate(game.generator.total)}</strong> generator points, translating to <strong style="font-size: 125%;">${notate(game.generator.translate)} </strong>times more points. <br> <br style="font-size: 75%"> You are earning ${notate(OmegaNum.times((OmegaNum.pow(game.generator.multiplier, 50)), 100).sub(100))}% more generator points per second. <p style="font-size: 75%;" color="grey"> ${OmegaNum.div(OmegaNum.log10(OmegaNum.div(game.generator.limit, game.generator.total)), OmegaNum.log10(OmegaNum.pow(game.generator.multiplier, 50))).toFixed(1)} seconds until the limit (${(OmegaNum.div(OmegaNum.log10(game.generator.total), OmegaNum.log10(game.generator.limit)).times(100)).toFixed(2)}%). </p>`
    }
    document.getElementById("gup1").innerHTML = `Increase generator points receivement. <br> <br> Cost: ${notate(game.gupgrade1.cost)} GP (${notate(OmegaNum.divide(OmegaNum.log10(game.gupgrade1.cost), OmegaNum.log10(OmegaNum.pow(game.generator.multiplier, 50))))}s).`
    document.getElementById("gup2").innerHTML = `Improves generator bonus formula. <br> Effect: x<sup>${notate(game.generator.exponent)}</sup> -> x<sup>${notate(OmegaNum.times(game.generator.exponent, 1.025))}<br> <br>Cost: ${notate(game.gupgrade2.cost)} GP (${notate(OmegaNum.divide(OmegaNum.log10(game.gupgrade2.cost), OmegaNum.log10(OmegaNum.pow(game.generator.multiplier, 50))))}).`;
    document.getElementById("gup4").innerHTML = `Point Generation is better based on your second points upgrade. <br> <br> Cost: ${notate(game.gupgrade4.cost)} Points.`;
    document.getElementById("gup5").innerHTML = `3rd Prestige Points Upgrade is stronger. <br> <br> Cost: ${notate(game.gupgrade5.cost)} Points.`;
    document.getElementById("gup6").innerHTML = `Generator's points limit increases. <br> Limit: ${notate(game.generator.limit)} -> ${notate(OmegaNum.pow(game.generator.limit, 1.25))}<br> Cost: ${notate(game.gupgrade6.cost)} GP.`;
    document.getElementById("gup7").innerHTML = `Multiplier increases even more. <br> Effect: x<sup>${notate(game.gupgrade7.pow)}</sup> -> x<sup>${notate(OmegaNum.times(game.gupgrade7.pow, 1.02))}</sup><br> Cost: ${notate(game.gupgrade7.cost)} Points.`;
    document.getElementById("time").innerHTML = `Total time played: ${(game.time).toFixed(0)} seconds.`;
    document.getElementById("total").innerHTML = `Total points income: ${notate(OmegaNum.times(game.PrestigeUpgrade1.effectiveness, game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness).times(game.generator.translate))}x`;
    document.getElementById("max").innerHTML = `Maximum points reached: ${notate(game.points.max)}`;
    document.querySelector(".show").innerHTML = (game.settings.showPerTick ? 'Hide' : 'Show');
};

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

function time() {
    game.time = OmegaNum.add(0.02, game.time);
    if (OmegaNum.compare(game.gupgrade4.level, 1) >= 0) {
        game.generator.multiplier = (OmegaNum.pow(40, OmegaNum.div(game.upgrade2.level, 16000000).div(40)).pow(Math.pow(game.gupgrade1.level, 2.2))).pow(OmegaNum.pow(game.gupgrade4.level, 0.3).pow(game.gupgrade7.pow));
    } else {
        game.generator.multiplier = OmegaNum.pow(1.06, game.gupgrade1.level).times(0.0002).add(1).pow(game.gupgrade7.pow);
    }
}

var mainGameLoop = window.setInterval(function () {
    time();
}, 20);

var mainGameLoop = window.setInterval(function () {
    if (OmegaNum.compare(game.generator.total, game.generator.limit) >= 0) {
        game.generator.total = game.generator.limit;
    }
}, 1);

Load();

function ResetProgress() {
    var txt;
    var r = confirm("Do you really want to reset your progress?");
    if (r == true) {
        txt = "You pressed OK!";
        game.time = 0;
        game.points.total = 0;
        game.points.perTick = 0.02;
        game.points.upgradebonus = 1;
        game.points.max = 0;
        game.upgrade1.cost = 10;
        game.upgrade1.level = 0;
        game.upgrade1.increase = 1.1;
        game.upgrade1.increase2 = 1.1;
        game.upgrade2.cost = 100;
        game.upgrade2.level = 0;
        game.Ppoints.total = 0;
        game.Ppoints.earn = 0;
        game.Ppoints.reset = 0;
        game.Ppoints.time = 0;
        game.Ppoints.max = 0;
        game.PrestigeUpgrade1.cost = 1;
        game.PrestigeUpgrade2.cost = 10;
        game.PrestigeUpgrade3.cost = 100;
        game.PrestigeUpgrade4.cost = 1000;
        game.PrestigeUpgrade5.cost = 100000;
        game.PrestigeUpgrade1.level = 0;
        game.PrestigeUpgrade1.effectiveness = 1;
        game.PrestigeUpgrade2.level = 0;
        game.PrestigeUpgrade2.effectiveness = 1;
        game.PrestigeUpgrade3.level = 0;
        game.PrestigeUpgrade3.effectiveness = 1;
        game.PrestigeUpgrade3.multiplier = 10;
        game.PrestigeUpgrade4.level = 0;
        game.PrestigeUpgrade4.effectiveness = 1;
        game.PrestigeUpgrade5.level = 0;
        game.PrestigeUpgrade5.effectiveness = 0;
        game.generator.total = 1;
        game.generator.multiplier = 1.0002;
        game.generator.translate = 1;
        game.generator.exponent = 0.3333333333333333333;
        game.generator.limit = 1e300;
        game.gupgrade1.cost = 1.75;
        game.gupgrade1.level = 0;
        game.gupgrade2.cost = 3.16227766e7;
        game.gupgrade2.level = 0;
        game.gupgrade4.cost = new OmegaNum("1e500");
        game.gupgrade4.level = 0;
        game.gupgrade5.cost = 1e100;
        game.gupgrade5.level = 0;
        game.gupgrade6.cost = 1e150;
        game.gupgrade6.level = 0;
        game.gupgrade7.level = 0;
        game.gupgrade7.cost = new OmegaNum("1e1500");
        game.gupgrade7.pow = 1;
        game.ip.total = 0;
        game.ip.earn = 0;
        game.ip.reset = 0;
    };
};
