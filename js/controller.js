angular
	.module('App')
	.controller('Main', ($scope, $window, Cannon, BulletStack, EnemyStack) => {
		Cannon.init();
		BulletStack.init();
		EnemyStack.init();
		
		$window.onkeydown = e => {
			if (e.keyCode === 37) Cannon.turnLeft();
			else if (e.keyCode === 39) Cannon.turnRight();
			else if (e.keyCode === 38) Cannon.fireOn();
		};
		
		$window.onkeyup = e => {
			if (e.keyCode === 38) Cannon.fireOff();
		}
	});
