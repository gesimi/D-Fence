export default class Grid {
	constructor(gameWidth, gameHeight) {
		this.width = 450;
		this.hight = 300;

		this.position = {
			x: 1,
			y: 1,
		}
	}

	draw(ctx) {
		ctx.fillStyle = '#ccc';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.hight);
	}
}