'use strict'

var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.script('player.js', 'js/player.js');
	game.load.script('ball.js', 'js/ball.js');
	game.load.script('ballHitPlayerEmitter.js', 'js/ballHitPlayerEmitter.js');
	game.load.script('arrow.js', 'js/arrow.js');

	game.load.spritesheet('player', '../img/player.png', 24, 64);
	game.load.image('ball', '../img/ball.png');
	game.load.image('arrow', '../img/arrow.png');
}

var ball;
var player;
var player2;
var arrow;
var spaceKey;

function create() {

	player = new Player(game, 20, game.world.centerY);
	player2 = new Player(game, game.world.width - 20, game.world.centerY);

	ball = new Ball(game, game.world.centerX, game.world.centerY);
	arrow = new Arrow(game, game.world.centerX, game.world.centerY, ball);

	player.create(Phaser.Keyboard.Q, Phaser.Keyboard.A);
	player2.create(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);
	ball.create();

	arrow.create();

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.physics.arcade.collide(ball, player, ballHitPlayer, null, this);
    game.physics.arcade.collide(ball, player2, ballHitPlayer, null, this);

    if (spaceKey.isDown)
    {
        arrow.releaseBall();
    }
}

var ballHitPlayer = function(_ball, _player) {
	_ball.hitPlayer(_player);
	_player.reduce();
}