function generator() {
    game.generator.total = OmegaNum.times(game.generator.total, game.generator.multiplier);
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
        game.generator.exponent = OmegaNum.pow(1.025, game.gupgrade2.level).times(0.333333333333);
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

function gupgrade6() {
    if (OmegaNum.compare(game.generator.total, game.gupgrade6.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade6.cost);
        game.gupgrade6.level = OmegaNum.add(game.gupgrade6.level, 1);
        game.gupgrade6.cost = OmegaNum.pow(1e150, OmegaNum.pow(1.25, game.gupgrade6.level));
        game.generator.limit = OmegaNum.pow(1e300, OmegaNum.pow(1.25, game.gupgrade6.level));
    };
};

function gupgrade7() {
    if (OmegaNum.compare(game.points.total, game.gupgrade7.cost) >= 0) {
        game.gupgrade7.level = OmegaNum.add(game.gupgrade7.level, 1);
        game.gupgrade7.cost = OmegaNum.pow(new OmegaNum("1e1500"), OmegaNum.pow(1.08, game.gupgrade7.level));
        game.gupgrade7.pow = OmegaNum.times(0.025, game.gupgrade7.level).add(1);
    };
};

var mainGameLoop = window.setInterval(function() {
    generator();
}, 20);
