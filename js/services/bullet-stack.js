function BulletStack(Playground, SceneStack, ScreenWatcher) {
	let bullets = [];

	let init = () => {
		let playground = Playground.getContext();
		let screen = ScreenWatcher.getScreen();

		SceneStack.add('update-bullets', () => {
			bullets = bullets.map(bullet => {
				playground.save();

				// Bullet degree
				playground.translate(bullet.originX, bullet.originY);
				playground.rotate(bullet.degree * Math.PI / 180);

				// Draw bullet
				playground.beginPath();
				playground.arc(0, -(bullet.originY - bullet.y), bullet.radius, 0, Math.PI * 2);
				playground.fill();
				playground.closePath();

				playground.restore();
				bullet.y -= bullet.speed;
				return bullet;
			});

			// Destroy bullets which is out of bounds
			bullets = bullets.filter(bullet => bullet.y < -(screen.width + screen.height) ? false : true);
		});
	};

	let getAll = () => bullets;
	let add = bullet => { bullets.push(bullet) };
	let remove = index => { bullets.splice(index, 1) };

	return { init, getAll, add, remove };
}

angular
	.module('App')
	.service('BulletStack', BulletStack);
