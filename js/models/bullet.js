class Bullet {
	constructor(x, y, radius, speed, damage, degree, originX, originY) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
		this.damage = damage;
		this.degree = degree;
		this.originX = originX;
		this.originY = originY;
	}
}

angular
	.module('App')
	.service('Bullet', () => Bullet);
