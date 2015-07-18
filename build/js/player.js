game.load.image('player', '../img/player.png');

// Player = function(game, x, y){
// 	console.log('player');
// 	// Phaser.Sprite.call(this, game, x, y, 'playersheet');
// 	// this.anAttribute = 'whatever';
// 	// this.anotherAttribute = 20;
	
// 	// game.add.sprite(50, game.world.centerY, 'player');
// 	this.anchor.setTo(.5);
// }
// Player.prototype = Object.create(Phaser.Sprite.prototype);
// Player.prototype.constructor = Player;



var upKey;
var downKey;

function Player(game){
  this.game = game;
  this.sprite = null;
  this.anyCustomVariables = 5;
}

Player.prototype.create= function() {
  	this.sprite = this.game.add.sprite(20, game.world.centerY, 'player');

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.setTo(.5);
	this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.sprite.body.immovable = true;

    this.sprite.scale.setTo(1, 2);

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

Player.prototype.update = function(ball) {
  // this.sprite.collide(enemieGroup);
	game.physics.arcade.collide(ball, this.sprite, ballHitPlayer, null, this);

if(this.sprite.body.velocity.y > 0)
	this.sprite.body.velocity.y -= 10;

if(this.sprite.body.velocity.y < 0)
	this.sprite.body.velocity.y += 10;

    if (upKey.isDown)
    {
        // this.sprite.body.deceleration.y = -5;
        this.sprite.body.velocity.y = -150;
    }
    else if (downKey.isDown)
    {
        // this.sprite.body.deceleration.y = 5;
        this.sprite.body.velocity.y = 150;
    }
}


function ballHitPlayer(_ball, _player) {
	// var playerMiddle = _player.y - _player.height / 2;
	var diff = 1, pc;

    if (_ball.y < _player.y)
    {
        //  Ball is on the half top of player
        diff = _player.y - _ball.y;
        pc = ballSpeed * diff;
        _ball.body.velocity.y = (- pc) / (_player.height / 2);

    }
    else if (_ball.y > _player.y)
    {
        //  Ball is on the half bottom of player
        diff = _ball.y -_player.y;
        pc = ballSpeed * diff;
        _ball.body.velocity.y = ( pc) / (_player.height / 2);
        console.log(diff, _player.y, _ball.y, _player.height);
    }
    else
    {
        //  Ball is in the middle
        _ball.body.velocity.y = 2 + Math.random() * 8;
    }

    emitter.x = _ball.x - _ball.width / 2 ;
    emitter.y = _ball.y;
    emitter.start(true, 500, 100, 10);

	// _ball.body.velocity.y = 300;
	// _ball.sprite.alpha -= 0.1;
}