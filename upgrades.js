function upgrade1() {
    while (Decimal.compare(game.points.total, game.upgrade1.cost) >= 0) {
        game.points.total = Decimal.sub(game.points.total, game.upgrade1.cost);
        game.upgrade1.cost = Decimal.times(game.upgrade1.cost, 1.12);
        game.points.upgradebonus = Decimal.times(game.points.upgradebonus, 1.1);
        game.upgrade1.level = Decimal.add(game.upgrade1.level, 1);
    };
};

function upgrade2() {
    while (Decimal.compare(game.points.total, game.upgrade2.cost) >= 0) {
        game.points.total = Decimal.sub(game.points.total, game.upgrade2.cost);
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
        game.PrestigeUpgrade3.cost = Decimal.times(game.PrestigeUpgrade3.cost, 4);
        game.PrestigeUpgrade3.level = Decimal.add(game.PrestigeUpgrade3.level, 1);
        game.PrestigeUpgrade3.effectiveness = Decimal.times(game.PrestigeUpgrade3.effectiveness, 2.2);
    };
};
