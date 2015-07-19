'use strict'

var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.script('player.js', 'js/player.js');
	game.load.script('ball.js', 'js/ball.js');

	game.load.image('player', '../img/player.png');
	game.load.image('ball', '../img/ball.png');
}

var ball;
var player;

function create() {

	player = new Player(game, 20, game.world.centerY);
    game.add.existing(player);

	ball = new Ball(game, game.world.centerX, game.world.centerY);
	game.add.existing(ball);

	player.create();
	ball.create();
}

function update() {
    game.physics.arcade.collide(ball, player, ball.ballHitPlayer, null, this);
    game.physics.arcade.collide(ball.emitter, player);
}