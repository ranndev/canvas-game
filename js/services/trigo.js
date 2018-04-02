function Trigo() {
	let rotate = (distance, degree) => {
		let degreeDiff = (90 - degree) * Math.PI / 180;
		let degreeOrg = degree * Math.PI / 180;
		let depressionY = distance * Math.sin(degreeDiff);
		let depressionX = depressionY * Math.tan(degreeOrg);

		return { x: depressionX, y: depressionY };
	};

	let randomRange = (from, to) => from + (Math.random() * (to - from));

	return { rotate, randomRange };
}

angular
	.module('App')
	.service('Trigo', Trigo);
