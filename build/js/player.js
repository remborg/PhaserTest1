'use strict'

function Player(game, x, y){
	this.upKey;
	this.downKey;
    Phaser.Sprite.call(this, game, x, y, 'player');
	game.add.existing(this);
}


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create= function(keyUp, keyDown) {

    game.physics.enable(this, Phaser.Physics.ARCADE);

	this.anchor.setTo(.5);
	this.body.collideWorldBounds = true;
    this.body.bounce.set(0);
    this.body.immovable = true;

    this.scale.setTo(1, 2);

	this.animations.add('default', [5,4,3,2,1,0,0,0,0,0,0,0,0,0,0]);
    this.animations.play('default', 20, true);

    this.upKey = game.input.keyboard.addKey(keyUp);
    this.downKey = game.input.keyboard.addKey(keyDown);
}

Player.prototype.update = function() {

	if(this.body.velocity.y > 0)
		this.body.velocity.y -= 10;

	if(this.body.velocity.y < 0)
		this.body.velocity.y += 10;

    if (this.upKey.isDown)
    {
        this.body.velocity.y = -150;
    }
    else if (this.downKey.isDown)
    {
        this.body.velocity.y = 150;
    }
}

Player.prototype.reduce = function() {
	if (this.scale.y > 1){
		game.add.tween(this.scale).to( { y: this.scale.y - .2 }, 500, "Linear", true);
	}
}

