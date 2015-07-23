'use strict'

var ballSpeed = 250;

function Ball(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'ball');
    game.add.existing(this);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.create= function() {
    this.anchor.setTo(.5);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);

    this.emitter = new BallHitPlayer(game, 0, 0);
}

Ball.prototype.hitPlayer = function(_player) {

	var diff = 1, pc;

    if (this.y < _player.y)
    {
        //  Ball is on the half top of player
        diff = _player.y - this.y;
        pc = ballSpeed * diff * 1.1;
        this.body.velocity.y = (- pc) / (_player.height / 2);

    }
    else if (this.y > _player.y)
    {
        //  Ball is on the half bottom of player
        diff = this.y -_player.y;
        pc = ballSpeed * diff * 1.1;
        this.body.velocity.y = ( pc) / (_player.height / 2);
    }
    else
    {
        //  Ball is in the middle
        this.body.velocity.y = 2 + Math.random() * 8;
    }

    var emitterX = this.x + ((_player.x - this.x) / 2);
    var emitterY = this.y;
    this.emitter.ballHitPlayer(_player, emitterX, emitterY);
}

Ball.prototype.release = function(velocityX, velocityY) {
    this.body.velocity.x = ballSpeed * velocityX;
    this.body.velocity.y = ballSpeed * velocityY;

    // avoid 'blocked in the middle' ball
    if(this.body.velocity.x < 20 && this.body.velocity.x > 0){
        this.body.velocity.x = 20;
    }

    if(this.body.velocity.x > -20 && this.body.velocity.x <= 0){
        this.body.velocity.x = -20;
    }
}