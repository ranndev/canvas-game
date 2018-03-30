function Trigo() {
	let rotate = (distance, degree) => {
		let degreeDiff = (90 - degree) * Math.PI / 180;
		let degreeOrg = degree * Math.PI / 180;
		let depressionY = distance * Math.sin(degreeDiff);
		let depressionX = depressionY * Math.tan(degreeOrg);

		return { x: depressionX, y: depressionY };
	};

	return { rotate };
}

angular
	.module('App')
	.service('Trigo', Trigo);
