'use strict'

var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.script('player.js', 'js/player.js');
	game.load.script('ball.js', 'js/ball.js');
	game.load.script('ballHitPlayerEmitter.js', 'js/ballHitPlayerEmitter.js');

	game.load.spritesheet('player', '../img/player.png', 24, 64);
	game.load.image('ball', '../img/ball.png');
}

var ball;
var player;
var emitter;

function create() {

	player = new Player(game, 20, game.world.centerY);

	ball = new Ball(game, game.world.centerX, game.world.centerY);

	//game.add.existing(emitter);

	player.create();
	ball.create();
    // console.log(emitter);
}

function update() {
    game.physics.arcade.collide(ball, player, ballHitPlayer, null, this);
    game.physics.arcade.collide(emitter, player);
    // game.physics.arcade.collide(ball.emitter, player);
}


var ballHitPlayer = function(_ball, _player) {
    console.log('hit');
    var emmiterX = _ball.x - _ball.width / 2 ;
    var emmiterY = _ball.y;

	emitter = new BallHitPlayer(game, emmiterX, emmiterY);
}