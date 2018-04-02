class FlameParticle {
	constructor(originX, originY, width, height, direction) {
		this.originX = originX;
		this.originY = originY;
		this.width = width;
		this.height = height;
		this.direction = direction;
		this.distance = 0;
		this.opacity = 1;
	}
}

angular
	.module('App')
	.service('FlameParticle', () => FlameParticle);
