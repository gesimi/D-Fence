
let canvas = document.querySelector("#gameScreen");

let ctx = canvas.getContext("2d");


const GAME_WIDTH = 600;

const GAME_HEIGHT = 400;

class playZone {
	constructor(game) {
		this.width = 480;
		this.height = 288;

		this.position = {
			x: 120,
			y: 0,
		}
	}

	draw(ctx) {
		ctx.fillStyle = '#ccc';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

class Grid {
	constructor(game) {
		this.rows = 20;
		this.cols = 10;

		this.width = 24;
		this.height = 24;

		this.position = {
			x: 120,
			y: 0,
			number: 1,
		}

	}

	init() {
		for (var i = 0; i <= this.rows - 1; i++) {		
				for (var j = 0; j <= this.cols - 1; j++) {
					this.position.number = 1 + i * 10 + j;
					//console.log(this.position.number);
				}
		}		

	}

	draw(ctx) {
		ctx.fillStyle = '#ccc';
		for (var i = 0; i <= this.rows - 1; i++) {		
				for (var j = 0; j <= this.cols - 1; j++) {
					ctx.strokeStyle = "#131313";
					ctx.strokeRect(this.position.x + i * 24, this.position.y + j * 24, this.width, this.height);
				}
		}
	}
}

class Tower {
	constructor(game) {
		this.game = game;

		this.position = {
			x: 360,
			y: 120,
		}

		this.size = 20;	

		this.center = {
			x: this.position.x + 12,
			y: this.position.y + 12,
		}

		this.range = {
			short: 100,
			medium: 200,
			long: 300 }

		this.atkrate = 10;


	}

	draw(ctx) {
		ctx.fillStyle = "white";
		ctx.fillRect(this.position.x + 2, this.position.y + 2, this.size, this.size);
		ctx.strokeStyle = "yellow";
		ctx.beginPath();
		ctx.arc(this.position.x + 12, this.position.y + 12, this.range.medium, 0, 2 * Math.PI);
		ctx.stroke();
	}
	attack(ctx, game) {
		//let enemycenter = this.game.enemy.position;
		// console.log(enemyedge);
		let asqr = (this.center.x - this.game.enemy.position.x) * (this.center.x - this.game.enemy.position.x);
		//let a = Math.sqrt(asqr);
		//console.log(a);
		let bsqr = (this.center.y - this.game.enemy.position.y) * (this.center.y - this.game.enemy.position.y);
		//let b = Math.sqrt(bsqr);
		//console.log(b);
		let distance = Math.sqrt(asqr + bsqr);
		//console.log(distance);
		if (distance <= this.range.medium) {
			//console.log(this.range.medium);
			ctx.strokeStyle = "#45468";
			ctx.moveTo(this.center.x, this.center.y);
			ctx.lineTo(this.game.enemy.position.x, this.game.enemy.position.y);
			ctx.stroke();			
		}
	}

	update(deltaTime) {
		if (!deltaTime) return;
		
	}

}

class Enemy {
	constructor() {
		this.enemy = [
			{x: 132, y: 156, hitpoints: 100, speed: 8,},
			{x: 132, y: 156, hitpoints: 100, speed: 8,},
			{x: 132, y: 156, hitpoints: 100, speed: 8,}
		]; 
		this.radius = 8;
		this.position = {
			x: 132,
			y: 156,
		}
		this.speed = 8;

		this.hitpoints = 100;

		this.wavelength = 8;
		this.wave = [];

	}

	draw() {
		for (var i = this.wavelength - 1; i >= 0; i--) {
			ctx.fillStyle = "red";
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.arc(this.position.x - i * 24, this.position.y, this.radius, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
		
	}

	update(deltaTime) {
		if (!deltaTime) return;
		this.position.x += this.speed / deltaTime;
	} 
}

class Wave {
	constructor(game) {
		this.game = game;
		//this enemy = game.enemy;

		this.length = 10;

		this.enemies = [];

		for (var i = this.length - 1; i >= 0; i--) {
			let enemy = new Enemy();
			this.enemies.push(enemy);
		}
		console.log(this.enemies);
	}



	draw(ctx, deltaTime) {
		this.enemies.forEach (drawWave);
		function drawWave() {
			console.log(this.enemies.enemy);
		}

		/*for (var i = 0 ; i <= this.length - 1; i = i * 10000 / deltaTime) {
			this.enemy.draw(ctx);
		}*/
	}

	update(deltaTime) {
		if (!deltaTime) return;
		this.enemies.forEach (moveWave);
		function moveWave() {
			this.enemy.position.x += this.speed / deltaTime;
		}
	} 

}


class Mouse {
	constructor() {
		//console.log(game.tower);
		//console.log(canvas);
		canvas.addEventListener("click", event => {
			let x = event.clientX - canvas.offsetLeft;
			let y = event.clientY - canvas.offsetTop;
			if (x >= game.tower.position.x && x <= game.tower.position.x + 24 && y >= game.tower.position.y && y <= game.tower.position.y + 24 ) {
				alert("aha");	
			}
			//console.log(x,y);
		}); 
	}
}

class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
	}

	start() {
		this.playzone = new playZone(this);
		this.grid = new Grid(this);
		this.enemy = new Enemy(this);
		this.tower = new Tower(this);

		this.gameObjects = [this.playzone, this.grid, this.enemy, this.tower];

		//this.wave.draw(this);
		this.grid.init();
		console.log(this.enemy.enemy);

	}

	update(deltaTime) {
		this.enemy.update(deltaTime);
		this.tower.attack(ctx);
	}
	draw(ctx) {
		this.enemy.draw(ctx);
		this.tower.draw(ctx);
		this.grid.draw(ctx);
	}

}

let game = new Game(GAME_WIDTH,GAME_HEIGHT);

ctx.clearRect(0, 0, 600, 400);

game.start();

let ingametime = 0;
let clock = setInterval(timer, 1000);

//new Mouse();

function timer() {
	ingametime++;
	console.log(ingametime);
}

let lastTime = 0;

function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	//console.log(timestamp);
	ctx.clearRect(0, 0, 600, 400);
	new Mouse();
	ctx.fillText(ingametime, 10, 10);
	game.draw(ctx);
	game.update(deltaTime);
	
	requestAnimationFrame(gameLoop);
} 

gameLoop();
