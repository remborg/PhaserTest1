'use strict'
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	
	game.load.image('ball', 'img/ball.png');

	game.load.script('player.js', 'js/player.js');
}

var ball;
var player;
var ballSpeed = 250;
var emitter;

function create() {


	// player = game.add.sprite(50, game.world.centerY,'player');
	player = new Player(game);
	// player.anchor.setTo(.5);
	// player.scale.setTo(1, 2);
	player.create();

	ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
	ball.anchor.setTo(.5);


    // ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);
	ball.body.velocity.x = -ballSpeed;
	ball.body.collideWorldBounds = true;
	ball.body.bounce.set(1);

	//game.physics.arcade.checkCollision.down = false;

	// ball.body.collides(player, ballHitPlayer, this);


    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);

    emitter.makeParticles('ball', "0");
	emitter.minParticleSpeed.setTo(-300, -400);
    emitter.maxParticleSpeed.setTo(300, 400);
    emitter.gravity = 0;
    emitter.setScale(0.2, 0.3, 0.2, 0.3);
    emitter.bounce.setTo(1, 1);
    // emitter.stop();
}

function update() {
	// game.physics.arcade.collide(ball, player, ballHitPlayer, null, this);
	// game.physics.arcade.collide(ball, player, ballHitPlayer, null, this);
    // game.physics.arcade.collide(emitter, player);

    player.update(ball);

	emitter.forEachAlive(function(p){
		p.alpha= p.lifespan / emitter.lifespan;
	});


}