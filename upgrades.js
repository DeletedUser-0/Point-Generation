function upgrade1() {
    if (Decimal.compare(game.points.total, game.upgrade1.cost) >= 0) {
        game.points.total = Decimal.sub(game.points.total, game.upgrade1.cost);
        game.upgrade1.cost = Decimal.times(game.upgrade1.cost, 1.125);
        game.points.upgradebonus = Decimal.times(game.points.upgradebonus, 1.1);
        game.upgrade1.level = Decimal.add(game.upgrade1.level, 1);
    };
};

function upgrade2() {
    if (Decimal.compare(game.points.total, game.upgrade2.cost) >= 0) {
        game.points.total = Decimal.sub(game.points.total, game.upgrade2.cost);
        game.upgrade2.cost = Decimal.times(game.upgrade2.cost, 10);
        game.points.upgradebonus = Decimal.times(game.points.upgradebonus, 1.333333333333333333);
        game.upgrade2.level = Decimal.add(game.upgrade2.level, 1);
    }
}

function upgrade3() {
    if (Decimal.compare(game.Ppoints.total, game.PrestigeUpgrade1.cost) >= 0) {
        game.PrestigeUpgrade1.cost = Decimal.times(game.PrestigeUpgrade1.cost, 2);
        game.PrestigeUpgrade1.level = Decimal.add(game.PrestigeUpgrade1.level, 1);
    };
};
