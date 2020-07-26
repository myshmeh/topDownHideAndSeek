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
	player.disableBody(true);
	enemy.disableBody(true);
	player.setTint(0xff0000);
	console.log('Player was Arrested!');
};

Phaser.Scene.prototype.obtainItem = (player, item) => {
	console.log('obtained item!');
	item.disableBody(true, true);
	player.addItem(item);
}

Phaser.Scene.prototype.onTrapped = (player, trap) => {
	console.log('player is on trap!');
	if (player.getItems().powder === 0) {
		player.play('idle');
		player.disableBody(true);
		player.setTint(0xff0000);
		console.log('player died...');
	} else {
		player.usePowder();
		trap.play('powdered_slime');// powder on trap
		trap.disableBody(true);
		console.log('player used powder to escape from trap!!');
	}
}

const clearStage = (currentScene, nextScene, condition) => {
	if (!condition()) return;
	console.log('Congratullation!');
	console.log(currentScene.player.getItems());
	currentScene.scene.start(nextScene, { items: currentScene.player.getItems() });
};
