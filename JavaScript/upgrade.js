function upgrade1() {
    while (OmegaNum.compare(game.points.total, game.upgrade1.cost) >= 0) {
        if (OmegaNum.compare(game.points.total, 1e33) == -1) {
            game.points.total = OmegaNum.sub(game.points.total, game.upgrade1.cost);
        }
        game.upgrade1.cost = OmegaNum.times(game.upgrade1.cost, game.upgrade1.increase);
        game.points.upgradebonus = OmegaNum.times(game.points.upgradebonus, game.upgrade1.increase2);
        game.upgrade1.level = OmegaNum.add(game.upgrade1.level, 1);
        game.upgrade1.increase = OmegaNum.pow(game.upgrade1.increase, 1.0025);
    };
};

function upgrade2() {
    while (OmegaNum.compare(game.points.total, game.upgrade2.cost) >= 0) {
        if (OmegaNum.compare(game.points.total, 1e33) == -1) {
            game.points.total = OmegaNum.sub(game.points.total, game.upgrade2.cost);
        }
        if (OmegaNum.compare(game.upgrade2.cost, 1e100) >= 0) {
            game.upgrade2.cost = OmegaNum.pow(game.upgrade2.cost, 1.015);
        } else {
            game.upgrade2.cost = OmegaNum.times(game.upgrade2.cost, 10);
        }
        game.points.upgradebonus = OmegaNum.times(game.points.upgradebonus, 1.333333333333333333);
        game.upgrade2.level = OmegaNum.add(game.upgrade2.level, 1);
    }
}

function upgradeMax() {
    upgrade1();
    upgrade2();
    upgrade10();
}

var mainGameLoop = window.setInterval(function () {
    if (OmegaNum.compare(game.points.total, 1e32) >= 0) {
        upgradeMax()
    }
}, 1);

function upgrade3() {
    while (OmegaNum.compare(game.Ppoints.total, game.PrestigeUpgrade1.cost) >= 0) {
        game.Ppoints.total = OmegaNum.sub(game.Ppoints.total, game.PrestigeUpgrade1.cost);
        if (OmegaNum.compare(game.points.max, 1.8e308) >= 0) {
            game.PrestigeUpgrade1.cost = OmegaNum.pow(game.PrestigeUpgrade1.cost, 1.15);
        } else {
            game.PrestigeUpgrade1.cost = OmegaNum.pow(2.5, game.PrestigeUpgrade1.level).pow(1.03, game.PrestigeUpgrade1.level);
        }
        game.PrestigeUpgrade1.level = OmegaNum.add(game.PrestigeUpgrade1.level, 1);
    };
};

function upgrade4() {
    while (OmegaNum.compare(game.Ppoints.total, game.PrestigeUpgrade2.cost) >= 0) {
        game.Ppoints.total = OmegaNum.sub(game.Ppoints.total, game.PrestigeUpgrade2.cost);
        if (OmegaNum.compare(game.points.max, 1.8e308) >= 0) {
            game.PrestigeUpgrade2.cost = OmegaNum.pow(game.PrestigeUpgrade2.cost, 1.175);
        } else {
            game.PrestigeUpgrade2.cost = OmegaNum.pow(2.5, game.PrestigeUpgrade2.level).pow(1.025, game.PrestigeUpgrade2.level);
        }
        game.PrestigeUpgrade2.level = OmegaNum.add(game.PrestigeUpgrade2.level, 1);
    };
};

function upgrade5() {
    while (OmegaNum.compare(game.Ppoints.total, game.PrestigeUpgrade3.cost) >= 0) {
        game.Ppoints.total = OmegaNum.sub(game.Ppoints.total, game.PrestigeUpgrade3.cost);
        if (OmegaNum.compare(game.points.max, 1.8e308) >= 0) {
            game.PrestigeUpgrade3.cost = OmegaNum.pow(game.PrestigeUpgrade1.cost, 1.12);
            game.PrestigeUpgrade3.level = OmegaNum.add(game.PrestigeUpgrade3.level, 1);
            game.PrestigeUpgrade3.effectiveness = OmegaNum.times(game.PrestigeUpgrade3.multiplier, game.PrestigeUpgrade3.effectiveness);
        } else {
            game.PrestigeUpgrade3.cost = OmegaNum.pow(2, game.PrestigeUpgrade3.level).pow(1.2).times(2.5).pow(1.1, game.PrestigeUpgrade1.level).times(50);
            game.PrestigeUpgrade3.level = OmegaNum.add(game.PrestigeUpgrade3.level, 1);
            game.PrestigeUpgrade3.effectiveness = OmegaNum.times(game.PrestigeUpgrade3.multiplier, game.PrestigeUpgrade3.effectiveness);
        }
    };
};

function upgrade7() {
    if (OmegaNum.compare(game.points.total, 1.8e308) >= 0) {
        game.PrestigeUpgrade4.cost = "MAX"
    } else {
        while (OmegaNum.compare(game.Ppoints.total, game.PrestigeUpgrade4.cost) >= 0) {
            game.Ppoints.total = OmegaNum.sub(game.Ppoints.total, game.PrestigeUpgrade4.cost);
            game.PrestigeUpgrade4.level = OmegaNum.add(game.PrestigeUpgrade4.level, 1);
            game.PrestigeUpgrade4.cost = OmegaNum.pow(game.PrestigeUpgrade4.cost, 1.2).times(3).pow(1.04, game.PrestigeUpgrade1.cost);
            game.upgrade1.increase2 = OmegaNum.pow(game.upgrade1.increase2, 1.15);
            if (OmegaNum.cmp(game.upgrade1.increase2, 1.5) >= 0) {
                game.PrestigeUpgrade4.cost = OmegaNum.pow(game.PrestigeUpgrade4.cost, 1.075);
            }
        }
    };
};

function upgrade9() {
    if (OmegaNum.compare(game.Ppoints.total, 100000) >= 0) {
        if (game.PrestigeUpgrade5.level !== "MAX") {
            game.Ppoints.total = OmegaNum.sub(game.Ppoints.total, 100000);
            game.PrestigeUpgrade5.level = "MAX";
            game.PrestigeUpgrade5.cost = "MAX";
        };
    };
};

function upgradeMax2() {
    upgrade3()
    upgrade4()
    upgrade5()
    upgrade7()
    upgrade9()
}

var mainGameLoop = window.setInterval(function () {
    if (OmegaNum.compare(game.Ppoints.total, 1e50) >= 0) {
        upgradeMax2()
    }
}, 1);



function upgrade10() {
    while (OmegaNum.compare(game.points.total, game.upgrade3.cost) >= 0) {
        game.upgrade3.cost = OmegaNum.pow(game.upgrade3.cost, 1.07);
        game.upgrade3.level = OmegaNum.add(game.upgrade3.level, 1);
        game.upgrade1.cost = OmegaNum.pow(game.upgrade1.cost, 0.975);
        game.upgrade2.cost = OmegaNum.pow(game.upgrade2.cost, 0.975);
    };
};
