'use strict'

var ballSpeed = 250;
var emitter;
var player;

function Ball(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'ball');
    game.add.existing(this);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.create= function(player) {
    this.anchor.setTo(.5);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.x = - ballSpeed;
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
}

Ball.prototype.hitPlayer = function(_player) {

	var diff = 1, pc;

    if (this.y < _player.y)
    {
        //  Ball is on the half top of player
        diff = _player.y - this.y;
        pc = ballSpeed * diff;
        this.body.velocity.y = (- pc) / (_player.height / 2);

    }
    else if (this.y > _player.y)
    {
        //  Ball is on the half bottom of player
        diff = this.y -_player.y;
        pc = ballSpeed * diff;
        this.body.velocity.y = ( pc) / (_player.height / 2);
    }
    else
    {
        //  Ball is in the middle
        this.body.velocity.y = 2 + Math.random() * 8;
    }

}