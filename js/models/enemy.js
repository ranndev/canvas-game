class Enemy {
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}
}

angular
	.module('App')
	.service('Enemy', () => Enemy);
