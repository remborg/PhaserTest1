'use strict'

var upKey;
var downKey;

function Player(game, x, y){
  	this.game = game;
    Phaser.Sprite.call(this, game, x, y, 'player');
}


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create= function() {

    game.physics.enable(this, Phaser.Physics.ARCADE);

	this.anchor.setTo(.5);
	this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.immovable = true;

    this.scale.setTo(1, 2);

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

Player.prototype.update = function(ball) {

if(this.body.velocity.y > 0)
	this.body.velocity.y -= 10;

if(this.body.velocity.y < 0)
	this.body.velocity.y += 10;

    if (upKey.isDown)
    {
        this.body.velocity.y = -150;
    }
    else if (downKey.isDown)
    {
        this.body.velocity.y = 150;
    }
}

