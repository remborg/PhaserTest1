'use strict'

function Arrow(game, x, y, ball){
    Phaser.Sprite.call(this, game, x, y, 'arrow');
    this.ball = ball;
	game.add.existing(this);
}


Arrow.prototype = Object.create(Phaser.Sprite.prototype);
Arrow.prototype.constructor = Arrow;

Arrow.prototype.create= function() {
    game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.setTo(-1, 0.5);
    this.soundFlutter = game.add.audio('flutter');
}

Arrow.prototype.update = function() {
	if(this.releaseCalls === undefined || this.releaseCalls > 0) {
		this.angle += 5;
	}

	if(this.releaseCalls !== undefined && this.releaseCalls > 0) {
		this.releaseCalls--;
		if(this.releaseCalls === 0){
			var self = this;
			var finalAngle = this.angle + 50;
		    var tween = game.add.tween(this).to({angle: finalAngle}, 400, Phaser.Easing.Bounce.Out, true);
		    tween.onComplete.add(function(){
		    	this.ball.release(Math.cos(self.rotation), Math.sin(self.rotation));
		    	self.kill();
		    	self.soundFlutter.play();
		    }, this);
		}
	}
}

Arrow.prototype.releaseBall = function() {
	if(this.releaseCalls === undefined){
		this.releaseCalls = game.rnd.between(25, 75);
	}
}

Arrow.prototype.isReleasing = function() {
	return (this.releaseCalls !== undefined && this.releaseCalls > 0);
}