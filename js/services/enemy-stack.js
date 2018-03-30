function EnemyStack($interval, Enemy, Playground, SceneStack, ScreenWatcher) {
	let enemies = [];
	let enemyRate = 1000;

	let init = () => {
		let playground = Playground.getContext();
		let screen = ScreenWatcher.getScreen();

		SceneStack.add('update-enemies', () => {
			enemies = enemies.map(enemy => {
				playground.beginPath();
				playground.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
				playground.fill();
				playground.closePath();

				enemy.y++;
				return enemy;
			});

			// Destroy enemies which is out of bounds
			enemies = enemies.filter(enemy => (enemy.y - enemy.radius) > screen.height ? false : true);
		});

		$interval(() => {
			let enemyRadius = 15;
			let entrance = (Math.random() * (screen.width - enemyRadius * 2)) + enemyRadius;
			enemies.push(new Enemy(entrance, -enemyRadius, enemyRadius));
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
