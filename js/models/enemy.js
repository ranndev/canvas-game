class Enemy {
	constructor(x, y, radius, health, speed) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.health = health;
		this.maxHealth = health;
		this.speed = speed;
	}
}

angular
	.module('App')
	.service('Enemy', () => Enemy);
