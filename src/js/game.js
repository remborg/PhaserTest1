'use strict'

var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.script('player.js', 'js/player.js');
	game.load.script('ball.js', 'js/ball.js');
	game.load.script('ballHitPlayerEmitter.js', 'js/ballHitPlayerEmitter.js');
	game.load.script('arrow.js', 'js/arrow.js');

	game.load.spritesheet('player', '../img/player.png', 24, 64);
	game.load.image('ball', '../img/ball.png');
	game.load.image('arrow', '../img/arrow.png');

	game.player1Won = player1Won;
	game.player2Won = player2Won;
}

var debug = true;
var ball;
var player;
var player2;
var player1Score = 0;
var player2Score = 0;
var arrow;
var spaceKey;

var text;

function create() {
    var style = { font: "45px Arial", fill: "#ff0044", align: "center" };
    text = game.add.text(game.world.centerX, game.world.centerY, "Press space to start", style);
    text.anchor.set(0.5);

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
    	updateScoreText();
        arrow.releaseBall();
    }
}

function render() {
	if(debug) {
        game.debug.bodyInfo(ball, 32, 32);
        game.debug.body(ball);
    }
}

var ballHitPlayer = function(_ball, _player) {
	_ball.hitPlayer(_player);
	_player.reduce();
}

var player1Won = function()	{
	player1Score++;
	updateScoreText();
}

var player2Won = function()	{
	player2Score++;
	updateScoreText();
}

var updateScoreText = function(){
    text.text = player1Score + " : " + player2Score;
}