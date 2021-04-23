function points() {
    game.points.total = OmegaNum.exp(game.points.total, 2.5);
};

function Ppoints() {
    game.Ppoints.total = OmegaNum.pow(game.Ppoints.total, 1.25).times(3).add(1);
    game.Ppoints.reset += 1;
};
