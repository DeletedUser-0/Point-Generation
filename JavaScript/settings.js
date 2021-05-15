function showPPS() {
    game.settings.showPerTick ^= true;
    document.querySelector('#PPS').style.display = (game.settings.showPerTick ? 'block' : 'none');
    document.querySelector('#tab1').style.bottom = (game.settings.showPerTick ? '0cm' : '1.25cm');
    document.querySelector('#tab2').style.bottom = (game.settings.showPerTick ? '0cm' : '1.25cm');
    document.querySelector('#tab3').style.bottom = (game.settings.showPerTick ? '0cm' : '1.25cm');
    document.querySelector('#tab4').style.bottom = (game.settings.showPerTick ? '0cm' : '1.25cm');
    document.querySelector('#tab5').style.bottom = (game.settings.showPerTick ? '0cm' : '1.25cm');
};
