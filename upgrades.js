function upgrade1() {
    if (Decimal.compare(game.points.total, game.upgrade1.cost) >= 0) {
        game.points.total = Decimal.sub(game.points.total, game.upgrade1.cost);
        game.upgrade1.cost = Decimal.times(game.upgrade1.cost, 1.0625);
        game.points.perTick = Decimal.times(game.points.perTick, 1.05);
        game.upgrade1.level = Decimal.add(game.upgrade1.level, 1);
    };
};

function upgrade2() {
    if (Decimal.compare(game.points.total, game.upgrade2.cost) >= 0) {
        game.points.total = Decimal.sub(game.points.total, game.upgrade2.cost);
        game.upgrade2.cost = Decimal.times(game.upgrade2.cost, 10);
        game.points.perTick = Decimal.times(game.points.perTick, 1.333333333333333333);
        game.upgrade2.level = Decimal.add(game.upgrade2.level, 1);
    }
}
