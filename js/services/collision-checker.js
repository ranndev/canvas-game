function CollisionChecker(SceneStack, ScreenWatcher, BulletStack, EnemyStack, Trigo, SoundSystem) {
	let getDistance = (x1, y1, x2, y2) => {
		let xDistance = x2 - x1;
		let yDistance = y2 - y1;

		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	};

	let check = () => {
		SceneStack.add('check-collided', () => {
			let screen =  ScreenWatcher.getScreen();

			EnemyStack.set(EnemyStack.getAll().filter(enemy => {
				BulletStack.set(BulletStack.getAll().filter(bullet => {
					let depression = Trigo.rotate(bullet.originY - bullet.y, bullet.degree);
					depression.y = bullet.originY - depression.y;
					depression.x = screen.width / 2 + depression.x;

					let distance = getDistance(depression.x, depression.y, enemy.x, enemy.y);
					if (distance < (bullet.radius + enemy.radius)) {
						SoundSystem.play('explode');
						enemy.health -= bullet.damage;
						bullet = false;
						if (enemy.health <= 0) enemy = false;
					}

					return bullet;
				}));

				return enemy;
			}));
		});
	};

	return { check };
}

angular
	.module('App')
	.service('CollisionChecker', CollisionChecker);
