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

Phaser.Scene.prototype.restartStage = function() {
	this.add.text(WIDTH * 0.5, HEIGHT * 0.5, 'YOU\'RE DEAD', {fontSize: '32px', fontFamily: FONTS.PRESS_START_2P }).setOrigin(0.5);
	const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x000000).setOrigin(0).setAlpha(0);
    this.tweens.add({ targets: rect, duration: 1000, alpha: 1, delay: 500 });
	this.time.delayedCall(2000, () => this.scene.start('stage1'));
}

const clearStage = (currentScene, nextScene, condition) => {
	if (!condition()) return;
	console.log('Congratullation!');
	console.log(currentScene.player.getItems());
	currentScene.scene.start('map', { stageName: nextScene, stageProps: currentScene.player.getItems() });
};