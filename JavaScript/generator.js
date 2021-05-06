function generator() {
    if (OmegaNum.compare(game.Ppoints.total, 5e6) >= 0) {
        game.generator.total = OmegaNum.times(game.generator.total, game.generator.multiplier);
    };
};

function gupgrade1() {
   if (OmegaNum.compare(game.generator.total, game.gupgrade1.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade1.cost);
        game.gupgrade1.level = OmegaNum.add(game.gupgrade1.level, 1);
        game.gupgrade1.cost = OmegaNum.pow(1.75, OmegaNum.pow(1.0732, game.gupgrade1.level));
    };
};

function gupgrade2() {
    if (OmegaNum.compare(game.generator.total, game.gupgrade2.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade2.cost);
        game.gupgrade2.level = OmegaNum.add(game.gupgrade2.level, 1);
        game.gupgrade2.cost = OmegaNum.pow(3.16227766e7, OmegaNum.pow(1.08704365, game.gupgrade2.level));
        game.generator.exponent = OmegaNum.pow(1.05, game.gupgrade2.level).times(0.5);
    };
};

function gupgrade3() {
    if (OmegaNum.compare(game.generator.total, game.gupgrade3.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade3.cost);
        game.gupgrade3.level = OmegaNum.add(game.gupgrade3.level, 1);
        game.gupgrade3.cost = OmegaNum.pow(1e30, OmegaNum.pow(1.17, game.gupgrade3.level));
    };
};

function gupgrade4() {
    if (OmegaNum.compare(game.points.total, game.gupgrade4.cost) >= 0) {
        game.gupgrade4.level = OmegaNum.add(game.gupgrade4.level, 1);
        game.gupgrade4.cost = OmegaNum.pow(new OmegaNum("1e500"), OmegaNum.pow(1.2, game.gupgrade4.level));
    };
};

function gupgrade5() {
    if (OmegaNum.compare(game.points.total, game.gupgrade5.cost) >= 0) {
        game.gupgrade5.level = OmegaNum.add(game.gupgrade5.level, 1);
        game.gupgrade5.cost = OmegaNum.pow(1e100, OmegaNum.pow(1.1, game.gupgrade5.level));
        game.PrestigeUpgrade3.multiplier = OmegaNum.times(game.PrestigeUpgrade3.multiplier, 1.06);
    };
};

var mainGameLoop = window.setInterval(function() {
    generator();
}, 20);
