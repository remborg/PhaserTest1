'use strict'


var BallHitPlayer = function(game, x, y){
    Phaser.Particles.Arcade.Emitter.call(this, game, x, y, 250);

    this.makeParticles('ball');
    this.minParticleSpeed.setTo(-300, -400);
    this.maxParticleSpeed.setTo(300, 400);
    this.gravity = 0;
    this.setScale(0.2, 0.3, 0.2, 0.3);
    this.bounce.setTo(1, 1);

    game.add.existing(this);
}

BallHitPlayer.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
BallHitPlayer.prototype.constructor = BallHitPlayer;

BallHitPlayer.prototype.update = function() {
	Phaser.Particles.Arcade.Emitter.prototype.update.call(this);
    game.physics.arcade.collide(this, this.player);

	var self = this;
    this.forEachAlive(function(p){
        p.alpha= p.lifespan / self.lifespan;
    });

}

BallHitPlayer.prototype.ballHitPlayer = function (_player, posX, posY) {
	this.player = _player;
    this.x = posX;
    this.y = posY;
    this.start(true, 500, 100, 10);
}