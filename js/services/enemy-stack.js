function EnemyStack($interval, Enemy, Playground, SceneStack, ScreenWatcher) {
	let enemies = [];
	let enemyRate = 2800;
	let healthBar = { width: 60, height: 5, gap: 20 };

	let init = () => {
		let playground = Playground.getContext();
		let screen = ScreenWatcher.getScreen();

		SceneStack.add('update-enemies', () => {
			enemies = enemies.filter(enemy => {
				// Health bar
				if (enemy.maxHealth - enemy.health) {
					playground.fillStyle = 'silver';
					playground.fillRect(
						enemy.x - healthBar.width / 2,
						enemy.y - enemy.radius - healthBar.height - healthBar.gap,
						healthBar.width,
						healthBar.height
					);
					playground.fillStyle = 'green';
					playground.fillRect(
						enemy.x - healthBar.width / 2,
						enemy.y - enemy.radius - healthBar.height - healthBar.gap,
						(enemy.health / enemy.maxHealth * 100) / 100 * healthBar.width,
						healthBar.height
					);
				}

				// Enemy
				playground.fillStyle = 'blueviolet';
				playground.beginPath();
				playground.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
				playground.fill();
				playground.closePath();

				let deduction = enemy.speed * .7;
				enemy.y += (enemy.speed - deduction) + (enemy.health / enemy.maxHealth * deduction);

				if ((enemy.y - enemy.radius) > screen.height) enemy = false;
				return enemy;
			});
		});

		$interval(() => {
			let enemyRadius = 30;
			let entrance = (Math.random() * (screen.width - enemyRadius * 2)) + enemyRadius;
			enemies.push(new Enemy(entrance, -enemyRadius, enemyRadius, 120, .8));
		}, enemyRate);
	};

	let getAll = () => enemies;
	let set = newEnemies => enemies = newEnemies;
	let add = enemy => { enemies.push(enemy) };

	return { init, getAll, set, add };
}

angular
	.module('App')
	.service('EnemyStack', EnemyStack);
