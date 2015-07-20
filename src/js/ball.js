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


    emitter = game.add.emitter(0, 0, 250);

    emitter.makeParticles('ball', "0");
    emitter.minParticleSpeed.setTo(-300, -400);
    emitter.maxParticleSpeed.setTo(300, 400);
    emitter.gravity = 0;
    emitter.setScale(0.2, 0.3, 0.2, 0.3);
    emitter.bounce.setTo(1, 1);
}

// Ball.prototype.update = function() {
//     game.physics.arcade.collide(emitter, player);

//     emitter.forEachAlive(function(p){
//         p.alpha= p.lifespan / emitter.lifespan;
//     });

// }


// Ball.prototype.ballHitPlayer = function(_ball, _player) {
// 	var diff = 1, pc;

//     if (_ball.y < _player.y)
//     {
//         //  Ball is on the half top of player
//         diff = _player.y - _ball.y;
//         pc = ballSpeed * diff;
//         _ball.body.velocity.y = (- pc) / (_player.height / 2);

//     }
//     else if (_ball.y > _player.y)
//     {
//         //  Ball is on the half bottom of player
//         diff = _ball.y -_player.y;
//         pc = ballSpeed * diff;
//         _ball.body.velocity.y = ( pc) / (_player.height / 2);
//     }
//     else
//     {
//         //  Ball is in the middle
//         _ball.body.velocity.y = 2 + Math.random() * 8;
//     }

//     emitter.x = _ball.x - _ball.width / 2 ;
//     emitter.y = _ball.y;
//     emitter.start(true, 500, 100, 10);

// }