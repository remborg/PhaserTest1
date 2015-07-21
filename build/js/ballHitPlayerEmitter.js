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

    // this.start(true, 500, 100, 10);
}


BallHitPlayer.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
BallHitPlayer.prototype.constructor = BallHitPlayer;


BallHitPlayer.prototype.update = function() {
	Phaser.Particles.Arcade.Emitter.prototype.update.call(this);

	// console.log('update');
	var self = this;
// Phaser.Group.prototype.update.call(this);

	// console.log(self);
    this.forEachAlive(function(p){
// console.log('lifespan',p, self.lifespan);
        p.alpha= p.lifespan / self.lifespan;
    });

}

BallHitPlayer.prototype.testFn = function (posX, posY) {
    this.x = posX;
    this.y = posY;
    this.start(true, 500, 100, 10);
}