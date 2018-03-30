function CollisionChecker(SceneStack, ScreenWatcher, BulletStack, EnemyStack, Cannon, Trigo) {
	let getDistance = (x1, y1, x2, y2) => {
		let xDistance = x2 - x1;
		let yDistance = y2 - y1;

		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	};

	let check = () => {
		SceneStack.add('check-collided', () => {
			let explode = new Audio('../assets/sounds/explode.mp3');
			let screen =  ScreenWatcher.getScreen();

			BulletStack.set(BulletStack.getAll().filter(bullet => {
				let collided = false;

				EnemyStack.set(EnemyStack.getAll().filter(enemy => {
					let depression = Trigo.rotate(bullet.originY - bullet.y, bullet.degree);
					depression.y = bullet.originY - depression.y;
					depression.x = screen.width / 2 + depression.x;

					let distance = getDistance(depression.x, depression.y, enemy.x, enemy.y);
					if (!collided) collided = distance < (bullet.radius + enemy.radius);

					if ((distance < (bullet.radius + enemy.radius))) explode.play();
					return !(distance < (bullet.radius + enemy.radius));
				}));

				return !collided;
			}));
		});
	};

	return { check };
}

angular
	.module('App')
	.service('CollisionChecker', CollisionChecker);
