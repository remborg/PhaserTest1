'use strict'

function Key(game, x, y, char){
    Phaser.Sprite.call(this, game, x, y, 'key');
	game.add.existing(this);
    this.anchor.set(0.5);

    var style = { font: "25px Arial", fill: "#ff0044", align: "center" };
    this.text = game.add.text(x, y, char, style);
    this.text.anchor.set(0.5);
}

Key.prototype = Object.create(Phaser.Sprite.prototype);
Key.prototype.constructor = Key;

Key.prototype.hide = function() {
	this.visible = false;
	this.text.visible = false;
}