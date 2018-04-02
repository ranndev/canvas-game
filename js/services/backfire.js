function Backfire(FlameParticle, SceneStack, Trigo, Playground) {
	let flames = [];
	let directionSpan = 50;
	let widthRange = { min: 4, max: 16 };
	let heightRange = { min: 4, max: 16 };

	let init = () => {
		let playground = Playground.getContext();

		SceneStack.add('update-backfires', () => {
			flames = flames.filter(flame => {
				let depression = Trigo.rotate(flame.distance, flame.direction);

				playground.save();
				playground.translate(flame.originX, flame.originY);
				playground.fillStyle = `rgba(255, 127, 80, ${ flame.opacity })`;
				playground.fillRect(
					depression.x - flame.width / 2,
					-(depression.y) + -(flame.height / 2),
					flame.width, flame.height
				);
				playground.restore();

				flame.opacity -= .01;
				flame.width -= .5;
				flame.height -= .5;
				flame.distance += 2;

				if (flame.width < 0 && flame.height < 0) flame = false;

				return flame;
			});
		});
	};

	let blow = (x, y, degree) => {
		for (let i = 0; i < 5; i++) {
			let direction = degree + Trigo.randomRange(-directionSpan, directionSpan);
			let width = Trigo.randomRange(widthRange.min, widthRange.max);
			let height = Trigo.randomRange(heightRange.min, heightRange.max);

			flames.push(new FlameParticle(x, y, width, height, direction));
			// console.log(Trigo.rotate(10, direction));
		}
	};

	return { init, blow };
}

angular
	.module('App')
	.service('Backfire', Backfire);
