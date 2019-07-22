//Create constants to use throughout application
var APP_MAX_HEIGHT = 276;
var APP_MAX_WIDTH = 276;
var APP_CENTER_WIDTH = 100;
var APP_CENTER_HEIGHT = 85;

//Create alias objects (allows for easier updates if Pixi API changes)
let Application = PIXI.Application,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite;

//initialize Pixi library, display confirmation message in console
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
	type = "canvas"
}

//display confirmation message in the console to confirm Pixi library initialized
PIXI.utils.sayHello(type);

//Create a Pixi application
let app = new Application({
	width: APP_MAX_WIDTH, 
	height: APP_MAX_HEIGHT
	}
);

//Add canvas created by Pixi to HTML document
document.getElementById('kat').appendChild(app.view);

//Load images/kitty_kat.png into texture cache
PIXI.loader
	.add("img/kitty_kat.png")
	.load(setup);

//Define object for kitty_kat.png sprite and initialize
let kittyKat;	
function setup(){

	// Instantiate kitty sprite
	kittyKat = new Sprite(resources["img/kitty_kat.png"].texture);

	// Make kitty kat a little bigger
	kittyKat.scale.set(1.5,1.5) // scaling the x and y coordiantes by a factor of 1.5 (150% bigger than the sprite image file)

	// Move kitty kat to center stage
	kittyKat.position.set(APP_CENTER_WIDTH, APP_CENTER_HEIGHT); // first argument is x-coordinate, second is y-coordinate

	// Add kitty kat to Pixi stage
	app.stage.addChild(kittyKat);
}

//Game loop functions (these are called repeatedly until kitty kat moves to the desired positon)
function gameLoopMoveKittyKat(){
	// add byeKittyKat function to Pixi "ticker" object
	app.ticker.add(delta => byeKittyKat());

	// restart the Pixi shared ticker object
	app.ticker.start();
}
function gameLoopBringKittyKatBack(){
	// add bringKittykatBack function to Pixi "ticker" object
	app.ticker.add(delta => bringKittyKatBack());

	// restart the Pixi shared ticker object
	app.ticker.start();
}

//Utility functions (these define which direction for kitty kat to move)
function byeKittyKat(){
	// Move kitty kat off the stage
	if(kittyKat.y != APP_MAX_HEIGHT){
		kittyKat.y += 1;
	}
	else{
		// stop the Pixi shared ticker object
		app.ticker.stop();
	}
}
function bringKittyKatBack(){
	// Bring kitty kat back to center stage
	if(kittyKat.y != APP_CENTER_HEIGHT){
		kittyKat.y -= 1;
	}
	else{
		// stop the Pixi shared ticker object
		app.ticker.stop();
	}			
}