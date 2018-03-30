
angular
	.module('App')
	.service('Cannon', ($interval, $timeout, ScreenWatcher, Playground, SceneStack, BulletStack, Bullet) => {
		let isReady = true;
		let power = 6;
		let rate = 50;
		let accuracy = 16;
		let degree = 0;
		let bullets = 100;
		let onFire = null;
		let body = { width: 40, height: 20 };
		let turret = { width: 10, height: 50, turnSpeed: 3.6 };

		let init = () => {
			SceneStack.add('update-cannon', () => {
				let playground = Playground.getContext();
				let screen = ScreenWatcher.getScreen();

				// Body
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
				playground.strokeStyle = 'red';
				playground.lineWidth = turret.width;
				playground.lineCap = 'round';
				playground.beginPath();
				playground.moveTo(0, 0);
				playground.lineTo(0, -turret.height);
				playground.stroke();
			});
		};

		return {
			init,
			getAttributes: () => { return { power, rate, accuracy, degree, bullets } },
			turnRight: () => { if (degree < 70) degree += turret.turnSpeed },
			turnLeft: () => { if (degree > -70) degree -= turret.turnSpeed },
			fireOn: () => {
				let screen = ScreenWatcher.getScreen();

				onFire = onFire || $interval(() => {
					// Random degree
					let randDeg = Math.random() * accuracy;
					randDeg = randDeg - (accuracy / 2);

					if (isReady) {
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
			}, fireOff: () => {
				$interval.cancel(onFire);
				onFire = null;
			}
		}
	});
