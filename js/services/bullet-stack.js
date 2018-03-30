function BulletStack(Playground, SceneStack, ScreenWatcher, Trigo) {
	let bullets = [];

	let init = () => {
		let playground = Playground.getContext();
		let screen = ScreenWatcher.getScreen();

		SceneStack.add('update-bullets', () => {
			bullets = bullets.map(bullet => {
				let depression = Trigo.rotate(bullet.originY - bullet.y, bullet.degree);
				depression.y = bullet.originY - depression.y;
				depression.x = screen.width / 2 + depression.x;

				playground.beginPath();
				playground.fillStyle = 'orange';
				playground.arc(depression.x, depression.y, bullet.radius, 0, Math.PI * 2);
				playground.fill();
				playground.closePath();

				bullet.y -= bullet.speed;
				return bullet;
			});

			// Destroy bullets which is out of bounds
			bullets = bullets.filter(bullet => bullet.y < -(screen.width + screen.height) ? false : true);
		});
	};

	let getAll = () => bullets;
	let set = newBullets => { bullets = newBullets };
	let add = bullet => { bullets.push(bullet) };
	let remove = index => { bullets.splice(index, 1) };

	return { init, getAll, set, add, remove };
}

angular
	.module('App')
	.service('BulletStack', BulletStack);
