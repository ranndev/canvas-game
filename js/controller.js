angular
	.module('App')
	.controller('Main', ($scope, $window, Cannon, BulletStack, EnemyStack, CollisionChecker) => {
		Cannon.init();
		CollisionChecker.check();
		BulletStack.init();
		EnemyStack.init();

		$window.onkeydown = e => {
			if (e.keyCode === 37) Cannon.turnLeft();
			else if (e.keyCode === 39) Cannon.turnRight();
			else if (e.keyCode === 32) Cannon.fireOn();
		};
		
		$window.onkeyup = e => {
			if (e.keyCode === 32) Cannon.fireOff();
			else if (e.keyCode === 37 || e.keyCode === 39) Cannon.turnStop();
		}
	});
