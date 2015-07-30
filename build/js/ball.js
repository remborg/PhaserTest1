'use strict'

var ballSpeed = 250;
var isLocked = true;
var maxBounceAngle = Math.PI / 3;

function Ball(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'ball');
    this.defaultX = x;
    this.defaultY = y;
    game.add.existing(this);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.create= function() {
    this.anchor.setTo(.5);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.set(1);

    this.emitter = new BallHitPlayer(game, 0, 0);

    this.soundBip = game.add.audio('bip');
}

Ball.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
    var halfHeight = this.height / 2;

    var ballHitWorldBottom = this.y > game.world.height - halfHeight && this.body.velocity.y > 0;
    var ballHitWorldTop = this.y < halfHeight && this.body.velocity.y < 0;

    var ballLeaveWorldLeft = this.x < - halfHeight;
    var ballLeaveWorldRight = this.x > game.world.width + halfHeight;

    if(ballHitWorldBottom || ballHitWorldTop) {
        this.body.velocity.y *= -1;
        this.soundBip.play();
    }

    if(ballLeaveWorldRight && this.body.velocity.x > 0) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        game.player1Won();
        isLocked = true;
    } else if(ballLeaveWorldLeft && this.body.velocity.x < 0) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        game.player2Won();
        isLocked = true;
    }
}

Ball.prototype.hitPlayer = function(_player) {

	var diff = _player.y - this.y;
    var pc = (diff * 100) / (_player.height / 2);
    var rotation = maxBounceAngle * pc / 100;
    if(this.body.velocity.x > 0) {
        this.rotateTo(- rotation);
    } else {
        this.rotateTo(Math.PI + rotation);
    }

    var emitterX = this.x + ((_player.x - this.x) / 2);
    var emitterY = this.y;
    this.emitter.ballHitPlayer(_player, emitterX, emitterY);
}

Ball.prototype.release = function(rotation) {
    isLocked = false;
    this.rotateTo(rotation);

    // avoid 'blocked in the middle' ball
    if(this.body.velocity.x < 20 && this.body.velocity.x > 0){
        this.body.velocity.x = 20;
    }

    if(this.body.velocity.x > -20 && this.body.velocity.x <= 0){
        this.body.velocity.x = -20;
    }
}

Ball.prototype.isLocked = function(){
    return isLocked;
}

Ball.prototype.reInit = function () {
    this.x = this.defaultX;
    this.y = this.defaultY;
    game.add.tween(this.scale).from({ x: 5, y:5 }, 250, Phaser.Easing.Sinusoidal.In, true);
}

Ball.prototype.rotateTo = function(rotation){

    this.body.velocity.x = ballSpeed * Math.cos(rotation);
    this.body.velocity.y = ballSpeed * Math.sin(rotation);
}