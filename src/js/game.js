'use strict'

var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.script('player.js', 'js/player.js');
	game.load.script('ball.js', 'js/ball.js');
	game.load.script('ballHitPlayerEmitter.js', 'js/ballHitPlayerEmitter.js');
	game.load.script('arrow.js', 'js/arrow.js');
	game.load.script('key.js', 'js/key.js');

	game.load.spritesheet('player', '../img/player.png', 24, 64);
	game.load.image('ball', '../img/ball.png');
	game.load.image('arrow', '../img/arrow.png');
	game.load.image('key', '../img/key.png');

    game.load.audio('hit', ['../sounds/hit.ogg', '../sounds/hit.mp3']);
    game.load.audio('bip', ['../sounds/bip.ogg', '../sounds/bip.mp3']);
    game.load.audio('flutter', ['../sounds/flutter.ogg', '../sounds/flutter.mp3']);
    game.load.audio('squeak', ['../sounds/squeak.ogg', '../sounds/squeak.mp3']);

	game.player1Won = player1Won;
	game.player2Won = player2Won;
}

var debug = false;
var ball;
var player;
var player2;
var player1Score = 0;
var player2Score = 0;
var arrow;
var spaceKey;
var keys = {};

var text;

var sounds = {};

function create() {
    var style = { font: "45px Arial", fill: "#ff0044", align: "center" };
    text = game.add.text(game.world.centerX, game.world.centerY - 50, "Press space to start", style);
    text.anchor.set(0.5);

	player = new Player(game, 30, game.world.centerY);
	player2 = new Player(game, game.world.width - 30, game.world.centerY);

    keys.Q = new Key(game, player.x, player.y - player.height * 2, 'S');
    keys.A = new Key(game, player.x, player.y + player.height * 2, 'X');
    keys.UP = new Key(game, player2.x, player2.y - player2.height * 2, '▲');
    keys.DOWN = new Key(game, player2.x, player2.y + player2.height * 2, '▼');

	ball = new Ball(game, game.world.centerX, game.world.centerY);
	arrow = new Arrow(game, game.world.centerX, game.world.centerY, ball);

	player.create(Phaser.Keyboard.S, Phaser.Keyboard.X);
	player2.create(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);
	ball.create();

	arrow.create();

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    sounds.hit = game.add.audio('hit');
    sounds.squeak = game.add.audio('squeak');
}

function update() {
    game.physics.arcade.collide(ball, player, ballHitPlayer, null, this);
    game.physics.arcade.collide(ball, player2, ballHitPlayer, null, this);

    if (spaceKey.isDown && ball.isLocked() && !arrow.isReleasing())
    {
    	hideIntroKeys();
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
    sounds.hit.play();
	_ball.hitPlayer(_player);
	_player.reduce();
}

var player1Won = function()	{
	player1Score++;
	reInitGame();
}

var player2Won = function()	{
	player2Score++;
	reInitGame();
}
var reInitGame = function() {
	updateScoreText();
	player.resetSize();
	player2.resetSize();
	ball.reInit();
	arrow.reInit();
	sounds.squeak.play();
}

var updateScoreText = function(){
    text.text = player1Score + " : " + player2Score;
}

var hideIntroKeys = function() {
		keys.A.hide();
		keys.Q.hide();
		keys.UP.hide();
		keys.DOWN.hide();
}
