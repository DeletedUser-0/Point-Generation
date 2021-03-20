function upgrade1() {
    if (game.points.total >= game.upgrade1.cost) {
        game.points.total -= game.upgrade1.cost;
        game.upgrade1.cost *= 1.058;
        game.points.perTick *= 1.04;
        game.upgrade1.level += 1;
    };
};

function upgrade2() {
    if (game.points.total >= game.upgrade2.cost) {
        game.points.total -= game.upgrade2.cost;
        game.upgrade2.cost *= 10;
        game.points.perTick *= 1.25;
        game.upgrade2.level += 1;
    }
}