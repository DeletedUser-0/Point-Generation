function upgrade1() {
    while (Decimal.compare(game.points.total, game.upgrade1.cost) >= 0) {
        if (Decimal.compare(game.points.total, 1e33) == -1) {
            game.points.total = Decimal.sub(game.points.total, game.upgrade1.cost);
        }
        game.upgrade1.cost = Decimal.times(game.upgrade1.cost, game.upgrade1.increase);
        game.points.upgradebonus = Decimal.times(game.points.upgradebonus, game.upgrade1.increase2);
        game.upgrade1.level = Decimal.add(game.upgrade1.level, 1);
        game.upgrade1.increase = Decimal.pow(game.upgrade1.increase, 1.003);
    };
};

function upgrade2() {
    while (Decimal.compare(game.points.total, game.upgrade2.cost) >= 0) {
        if (Decimal.compare(game.points.total, 1e33) == -1) {
            game.points.total = Decimal.sub(game.points.total, game.upgrade2.cost);
        }
        game.upgrade2.cost = Decimal.times(game.upgrade2.cost, 10);
        game.points.upgradebonus = Decimal.times(game.points.upgradebonus, 1.333333333333333333);
        game.upgrade2.level = Decimal.add(game.upgrade2.level, 1);
    }
}

function upgradeMax() {
    upgrade1()
    upgrade2()
}

var mainGameLoop = window.setInterval(function () {
    if (Decimal.compare(game.points.total, 1e33) >= 0) {
        upgradeMax()
    }
}, 1);

function upgrade3() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade1.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade1.cost);
        game.PrestigeUpgrade1.cost = Decimal.times(game.PrestigeUpgrade1.cost, 5);
        game.PrestigeUpgrade1.level = Decimal.add(game.PrestigeUpgrade1.level, 1);
    };
};

function upgrade4() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade2.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade2.cost);
        game.PrestigeUpgrade2.cost = Decimal.times(game.PrestigeUpgrade2.cost, 2.5)
        game.PrestigeUpgrade2.level = Decimal.add(game.PrestigeUpgrade2.level, 1);
    };
};

/* 
game.points.total = new Decimal("1e9")
game.Ppoints.total = new Decimal("any value you want")
*/

function upgrade5() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade3.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade3.cost);
        game.PrestigeUpgrade3.cost = Decimal.times(game.PrestigeUpgrade3.cost, 2);
        game.PrestigeUpgrade3.level = Decimal.add(game.PrestigeUpgrade3.level, 1);
        game.PrestigeUpgrade3.effectiveness = Decimal.pow(3, game.PrestigeUpgrade3.level);
    };
};

function upgrade6() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade4.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade4.cost);
        game.PrestigeUpgrade4.level = Decimal.add(game.PrestigeUpgrade4.level, 1);
        game.PrestigeUpgrade4.cost = Decimal.times(game.PrestigeUpgrade4.cost, Decimal.add(game.PrestigeUpgrade4.level, 1));
    };
};

function upgrade7() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade5.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade5.cost);
        game.PrestigeUpgrade5.level = Decimal.add(game.PrestigeUpgrade5.level, 1);
        game.PrestigeUpgrade5.cost = Decimal.pow(game.PrestigeUpgrade5.cost, 1.15).times(3);
        game.upgrade1.increase2 = Decimal.pow(game.upgrade1.increase2, 1.075);
    };
};

function upgrade8() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade6.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade6.cost);
        game.PrestigeUpgrade6.level = Decimal.add(game.PrestigeUpgrade6.level, 1);
        game.PrestigeUpgrade6.cost = Decimal.times(game.PrestigeUpgrade6.cost, 3.16227766016838);
        game.Ppoints.generatortick = Decimal.pow(1.5, game.PrestigeUpgrade6.level);
    };
};

function upgrade9() {
    while (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade7.cost) >= 0) {
        game.Ppoints.total = Decimal.sub(game.Ppoints.total, game.PrestigeUpgrade7.cost);
        game.PrestigeUpgrade7.level = Decimal.add(game.PrestigeUpgrade7.level, 1);
        game.PrestigeUpgrade7.cost = Decimal.pow(1.75, game.PrestigeUpgrade7.level).times(500);
    };
};

/*
16.865
*/
