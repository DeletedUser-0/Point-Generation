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
        };

        this.PrestigeUpgrade1 = {
            cost: data?.PrestigeUpgrade1?.cost || 1,
            level: data?.PrestigeUpgrade1?.level || 0,
            effectiveness: data?.PrestigeUpgrade1?.effectiveness || 1
        };

        this.PrestigeUpgrade2 = {
            cost: data?.PrestigeUpgrade2?.cost || 5,
            level: data?.PrestigeUpgrade2?.level || 0,
            effectiveness: data?.PrestigeUpgrade2?.effectiveness || 1
        };

        this.PrestigeUpgrade3 = {
            cost: data?.PrestigeUpgrade3?.cost || 3,
            level: data?.PrestigeUpgrade3?.level || 0,
            effectiveness: data?.PrestigeUpgrade3?.effectiveness || 1
        };

        this.PrestigeUpgrade4 = {
            cost: data?.PrestigeUpgrade4?.cost || 1,
            level: data?.PrestigeUpgrade4?.level || 0,
            effectiveness: data?.PrestigeUpgrade4?.effectiveness || 1
        };

        this.PrestigeUpgrade5 = {
            cost: data?.PrestigeUpgrade5?.cost || 2,
            level: data?.PrestigeUpgrade5?.level || 0,
            effectiveness: data?.PrestigeUpgrade5?.effectiveness || 1
        };

        this.PrestigeUpgrade7 = {
            cost: data?.PrestigeUpgrade7?.cost || 10000,
            level: data?.PrestigeUpgrade7?.level || 0,
            effectiveness: data?.PrestigeUpgrade7?.effectiveness || 0,
        };

        this.IP = {
            total: data?.IP?.total || 0,
            earn: data?.IP?.earn || 0,
            time: data?.IP?.time || 0,
        }
    }
}

var game = new Game();

function addPoints() {
    game.points.total = OmegaNum.add(game.points.perTick, game.points.total);
    game.points.perTick = OmegaNum.times(0.02, game.PrestigeUpgrade1.effectiveness).times(game.points.upgradebonus).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness);
    game.time = OmegaNum.add(0.02, game.time);
    game.Ppoints.time = OmegaNum.add(0.02, game.Ppoints.time);
    game.PrestigeUpgrade7.effectiveness = (OmegaNum.times(game.Ppoints.earn, OmegaNum.divide(game.PrestigeUpgrade7.level, 250)));
    game.Ppoints.total = OmegaNum.add(game.Ppoints.total, game.PrestigeUpgrade7.effectiveness)
};

function addPPoints() {
    if (OmegaNum.compare(game.points.total, 1e9) >= 0) {
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
        return n.array[0].toPrecision(3); 
    }
    else if (OmegaNum.compare(game.points.max, 1000) >= 0) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}e${Math.floor(n.array[0])}`;
    }
    else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    }
}

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
    game.PrestigeUpgrade1.effectiveness = OmegaNum.pow(game.time, 0.5).pow(game.PrestigeUpgrade1.level);
    game.PrestigeUpgrade2.effectiveness = OmegaNum.pow(OmegaNum.add(game.Ppoints.time, 1), 0.55).pow(game.PrestigeUpgrade2.level);
    if (OmegaNum.compare(game.points.total, 1e9) >= 0 || (OmegaNum.compare(game.Ppoints.reset, 0) == 1)) {
        game.PrestigeUpgrade4.effectiveness = (OmegaNum.pow(10, OmegaNum.log10(game.points.max) / 100 - 0.7).times(1.3725).add(1)).pow(OmegaNum.divide(game.PrestigeUpgrade4.level, 0.5));
        game.Ppoints.earn = OmegaNum.pow(10, OmegaNum.log10(game.points.total) / 27 - 0.7).times(2.3263);
    }
    game.points.upgradebonus = OmegaNum.times(OmegaNum.pow(game.upgrade1.increase2, game.upgrade1.level), OmegaNum.pow(1.3333333333333333333333333, game.upgrade2.level));
    game.upgrade1.level = new OmegaNum(game.upgrade1.level);
    game.upgrade2.level = new OmegaNum(game.upgrade2.level);
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
