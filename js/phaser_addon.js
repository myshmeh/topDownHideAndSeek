// add a button to a scene
// similar to buttons in Phaser v2
Phaser.Scene.prototype.addButton = function(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
{
		// add a button
		var btn = this.add.sprite(x, y, key, outFrame).setInteractive();
		// https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#on
		// ptr is btn object, x and y seem to be the coord of btn
		btn.on('pointerover', function (ptr, x, y) { this.setFrame(overFrame) } );
		btn.on('pointerout',  function (ptr)       { this.setFrame(outFrame) } );
		btn.on('pointerdown', function (ptr)       { this.setScale(0.9, 0.9) } );
		btn.on('pointerup', callback.bind(callbackContext));
		
		return btn;
};

// NOTE: world.collideSpriteVsGroup() is opinionated in passing args
Phaser.Scene.prototype.arrestPlayer = (player, enemy) => {
	console.log(enemy);
	console.log(player);
	player.play('idle');
	player.disableBody(true);
	enemy.play('enemyIdle');
	enemy.disableBody(true);
	player.setTint(0xff0000);
	console.log('Player was Arrested!');
};

Phaser.Scene.prototype.obtainItem = (player, item) => {
	console.log('obtained item!');
	item.disableBody(true, true);
	player.addItem(item);
}

const clearStage = (currentScene, nextScene, clearConditionChecker) => {
	if (!clearConditionChecker()) return;
	console.log('Congratullation!');
	currentScene.scene.start(nextScene, { powderCount: currentScene.player.getItems().powder });
};
