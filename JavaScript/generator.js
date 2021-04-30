function generator() {
    if (OmegaNum.compare(game.Ppoints.total, 5e6) >= 0) {
        game.generator.total = OmegaNum.times(game.generator.total, game.generator.multiplier);
    };
};

function gupgrade1() {
   if (OmegaNum.compare(game.generator.total, game.gupgrade1.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade1.cost);
        game.gupgrade1.cost = OmegaNum.pow(game.gupgrade1.cost, 1.0732);
        game.gupgrade1.level = OmegaNum.add(game.gupgrade1.level, 1);
    };
};

function gupgrade2() {
    if (OmegaNum.compare(game.generator.total, game.gupgrade2.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade2.cost);
        game.gupgrade2.cost = OmegaNum.pow(game.gupgrade2.cost, 1.08704365);
        game.gupgrade2.level = OmegaNum.add(game.gupgrade2.level, 1);
        game.generator.exponent = OmegaNum.times(game.generator.exponent, 1.033333333333333);
    };
};

function gupgrade3() {
    if (OmegaNum.compare(game.generator.total, game.gupgrade3.cost) >= 0) {
        game.generator.total = OmegaNum.divide(game.generator.total, game.gupgrade3.cost);
        game.gupgrade3.cost = OmegaNum.pow(game.gupgrade3.cost, 1.17);
        game.gupgrade3.level = OmegaNum.add(game.gupgrade3.level, 1);
    };
};

function gupgrade4() {
    if (OmegaNum.compare(game.points.total, game.gupgrade4.cost) >= 0) {
        game.gupgrade4.level = OmegaNum.add(game.gupgrade4.level, 1);
        game.gupgrade4.cost = OmegaNum.pow(game.gupgrade4.cost, 1.2);
    };
};

var mainGameLoop = window.setInterval(function() {
    generator();
}, 20);