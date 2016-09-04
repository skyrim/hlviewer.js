var $ = require('jquery');
var Game = require('./game.js');
var UI = require('./ui.js');

$(function () {
    var game = new Game();
    game.init();
    game.loop();
    game.hud.replay = new UI.Replay(game.replayController);

    var mapsAndDemos = {
        "kz_a2_godspeed": "kz_a2_godspeed_puppetz_0506.52"
    };

    $(function () {
        var maps = Object.keys(mapsAndDemos);
        var accum = "";
        for (var i = 0, size = maps.length; i < size; ++i) {
            accum += '<li><a href="#' + maps[i] + '">' + mapsAndDemos[maps[i]] + '</a></li>';
        }
        $('ul#demo_list').append(accum);
    });

    var resizeTimeout = 0;
    $(window).on('resize', function () {
        if (game === undefined) {
            return;
        }

        if (resizeTimeout !== 0) {
            clearTimeout(resizeTimeout);
        }

        resizeTimeout = setTimeout(function () {
            game.renderer.setSize(window.innerWidth, window.innerHeight);
            game.camera.aspect = window.innerWidth / window.innerHeight;
            game.camera.updateProjectionMatrix();
        }, Game.RESIZE_DELAY);
    });

    $(window).on('hashchange', function () {
        if (location.hash.length === 0) {
            return;
        }

        var map = location.hash.slice(1);
        if (mapsAndDemos[map] === undefined) {
            return;
        }

        game.loadDemo(mapsAndDemos[map]);
    });
    $(window).trigger('hashchange');
});