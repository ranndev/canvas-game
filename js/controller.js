angular
	.module('App')
	.controller('Main', ($scope, $window, Cannon, BulletStack, EnemyStack, CollisionChecker, SoundSystem) => {
		CollisionChecker.check();
		EnemyStack.init();
		Cannon.init();
		BulletStack.init();

		SoundSystem.setRootDirectory('../assets/sounds/');
		SoundSystem.add('fire', 'fire.mp3');
		SoundSystem.add('explode', 'explode.mp3');

		$window.onkeydown = e => {
			if (e.keyCode === 37) Cannon.turnLeft();
			else if (e.keyCode === 39) Cannon.turnRight();
			else if (e.keyCode === 32) Cannon.fireOn();
		};
		
		$window.onkeyup = e => {
			if (e.keyCode === 32) Cannon.fireOff();
			else if (e.keyCode === 37) Cannon.turnStop('left');
			else if (e.keyCode === 39) Cannon.turnStop('right');
		}
	});
