function Cannon($interval, $timeout, ScreenWatcher, Playground, SceneStack, BulletStack, Bullet) {
	let isReady = true;
	let power = 12;
	let rate = 100;
	let accuracy = 8;
	let degree = 0;
	let bullets = 10;
	let onFire = null, onTurn = null;
	let body = { width: 40, height: 20 };
	let turret = { width: 10, height: 50, turnSpeed: 3.6 };

	let init = () => {
		SceneStack.add('update-cannon', () => {
			let playground = Playground.getContext();
			let screen = ScreenWatcher.getScreen();

			// Body
			playground.fillStyle = '#333';
			playground.fillRect(
				(screen.width / 2) - (body.width / 2),
				screen.height - body.height,
				body.width,
				body.height
			);

			// Turret degree
			playground.translate(screen.width / 2, screen.height - (body.height / 2));
			playground.rotate(degree * Math.PI / 180);

			// Turret
			playground.strokeStyle = '#4e4e4e';
			playground.lineWidth = turret.width;
			playground.lineCap = 'round';
			playground.beginPath();
			playground.moveTo(0, 0);
			playground.lineTo(0, -turret.height);
			playground.stroke();
		});
	};

	let getAttributes = () => { return { power, rate, accuracy, degree, bullets, body, turret } };

	let fireOn = () => {
		let screen = ScreenWatcher.getScreen();

		onFire = onFire || $interval(() => {
			// Random degree
			let randDeg = Math.random() * accuracy;
			randDeg = randDeg - (accuracy / 2);

			if (isReady) {
				let sound = new Audio('../assets/sounds/fire.mp3');
				sound.play();
				isReady = false;

				BulletStack.add(new Bullet(
					screen.width / 2,
					screen.height - ((body.height / 2) + turret.height),
					4,
					power,
					degree + randDeg,
					screen.width / 2,
					screen.height - body.height / 2
				));
				$timeout(() => { isReady = true }, rate);
			}
		}, 0);
	};

	let fireOff = () => {
		$interval.cancel(onFire);
		onFire = null;
	};

	let turnRight = () => {
		onTurn = onTurn || $interval(() => {
			if (degree < 70) degree += turret.turnSpeed
		}, 50);
	};

	let turnLeft = () => {
		onTurn = onTurn || $interval(() => {
			if (degree > -70) degree -= turret.turnSpeed
		}, 50);
	};

	let turnStop = () => {
		$interval.cancel(onTurn);
		onTurn = null;
	};

	return {
		init,
		getAttributes,
		turnRight,
		turnLeft,
		turnStop,
		fireOn, fireOff
	}
}

angular
	.module('App')
	.service('Cannon', Cannon);
