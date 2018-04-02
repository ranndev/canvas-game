function Cannon($interval, $timeout, ScreenWatcher, Playground, SceneStack, Backfire, BulletStack, Bullet, SoundSystem, Trigo) {
	let isReady = true;
	let power = 24;
	let damage = 14;
	let rate = 200;
	let accuracy = 3;
	let degree = 0;
	let bullets = 10;
	let onFire = null, onTurn = {};
	let body = { width: 60, height: 40 };
	let turret = {
		width: 30,
		height: 90,
		turnSpeed: 3.6,
		image: new Image()
	};

	let init = () => {
		Backfire.init();
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
			turret.image.src = '../assets/images/turret.png';
			playground.drawImage(
				turret.image,
				-(turret.width / 2),
				-turret.height + (turret.height / 6),
				turret.width,
				turret.height
			);
		});
	};

	let getAttributes = () => { return { power, rate, accuracy, degree, bullets, body, turret } };

	let fireOn = () => {
		let screen = ScreenWatcher.getScreen();

		onFire = onFire || $interval(() => {
			// Random degree
			let halfAccuracy = accuracy / 2;
			let randDeg = Trigo.randomRange(-halfAccuracy, halfAccuracy);

			if (isReady) {
				let backfireOrigin = Trigo.rotate(turret.height - (turret.height / 6), degree);

				BulletStack.add(new Bullet(
					screen.width / 2,
					screen.height - ((body.height / 2) + turret.height),
					3, power, damage, degree + randDeg,
					screen.width / 2,
					screen.height - body.height / 2
				));

				$timeout(() => { isReady = true }, rate);
				Backfire.blow(
					(screen.width / 2) + backfireOrigin.x,
					screen.height - ((body.height / 2) + backfireOrigin.y),
					degree
				);
				isReady = false;
				SoundSystem.play('fire');
			}
		}, 0);
	};

	let fireOff = () => {
		$interval.cancel(onFire);
		onFire = null;
	};

	let turnRight = () => {
		onTurn.right = onTurn.right || $interval(() => {
			if (degree < 70) degree += turret.turnSpeed
		}, 50);
	};

	let turnLeft = () => {
		onTurn.left = onTurn.left || $interval(() => {
			if (degree > -70) degree -= turret.turnSpeed
		}, 50);
	};

	let turnStop = side => {
		$interval.cancel(onTurn[side]);
		onTurn[side] = null;
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
