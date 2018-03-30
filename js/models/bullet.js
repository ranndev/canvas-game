class Bullet {
	constructor(x, y, radius, speed, degree, originX, originY) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
		this.degree = degree;
		this.originX = originX;
		this.originY = originY;
	}
}

angular
	.module('App')
	.service('Bullet', () => Bullet);
