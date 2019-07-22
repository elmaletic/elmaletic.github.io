var cardsize = 200;
  
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = canvas.width;
var h = canvas.height;

var context = canvas.getContext("2d");

//set some default drawing options:

context.strokeStyle = 'red'; 	//color of outlines
context.lineWidth = 5; 		    //thickness of outline (in pixels)
context.lineCap = 'round';		//soften endpoints of paths
context.lineJoin = 'round';		//soften connection of paths
context.fillStyle = 'blue';		//fill object color, if any

var spraypaint = false;
function toggleTexture(p){
	//if p is false, we clicked marker
	//if p is true, we clicked spray paint
	spraypaint = p;
}

//function to draw

function draw(e) {
	//console.log(lastX,lastY, drawing);
	
	//to draw a circle, we need its center and radius
	//draw circle with center (lastX,lastY) and radius 15
	//context.arc( lastX, lastY, 15, 0, 2*Math.PI, false );
	
	//note: lastX, lastY refer to starting path vertex
	//we need coordinates for where to end
	
	let newX = e.offsetX;
	let newY = e.offsetY;
	if (drawing) { 
		//this should only run if user is clicking & dragging
		//draw a path from the starting position (lastX, lastY)
		//to ending position. at (newX,newY)
		
		//update strokeStyle to change path color:
		//context.strokeStyle = 'rgb(240,128,128))';
		if (rainbow == false){
			
		}
		else if (rainbow == true){
			//want rainbow pattern
			//this means changing the color for each segment
			
			/*to pick a new random color for each segment
			var randomRed = Math.floor(Math.random()*255);
			var randomGreen = Math.floor(Math.random()*255);
			var randomBlue = Math.floor(Math.random()*255);
			var randomColor = 'rgb(' + randomRed + ',' + randomGreen + ',' + randomBlue + ')';
			context.strokeStyle = randomColor;
			*/
			
			/* for a true rainbow effect: */
			//we need a variable to keep track of last hue we used, defined outside this function
			//but update this variable in the function
			
			hue++;
			context.strokeStyle = 'hsl('+hue+',50%,70%)';
			context.fillStyle = 'hsl('+hue+',50%,70%)';
		}
		
		/*draw with spraypaint */
		/*
		get current mouse position: (newX,newY)
		calculate radius of spray paint (lineWidth)/2
		create some random circles placed within this distance of mouse position
		have option to control density of spray or calculate based on line width
		*/
		
		if (spraypaint == true){
			var density = 40; //how many circles to draw
			var outerRadius = lineWidthSlider.value/2; //how wide of a paint line to draw
			for (let i = 0; i < density; i++){
				//draw a new circle near current position
			
				//distance from current postion to new circle
				let cr = Math.random() * outerRadius;
			
				//define the angle to position this new paint, relative to center
				let ca = Math.random() * 360;
			
				//get the location of the new circle:
				let cx = newX + cr * Math.cos(ca);
				let cy = newY + cr * Math.sin(ca);
				context.beginPath();
				context.arc(cx,cy,2,0,2*Math.PI,false);
				context.fill();
			
		}
		}
		else{
			/* draws the with marker setting*/
			context.beginPath(); 			//put pencil on paper
			context.moveTo(lastX,lastY);	//where to place pencil
			context.lineTo(newX,newY);		//where to drag pencil to
			context.stroke(); 
		}
		
	}
	
	//update the lastX and lastY values to newX, newY
	lastX = newX;
	lastY = newY;
};

//we need to know when the user is touching the screen. We should update the drawing 
//as they move the mouse, and stop drawing when the mouse is released. We'll define a 
//Boolean value to keep track of whether we are drawing or not

var drawing = false;	//not drawing anything at beginning
var lastX;
var lastY;

//add event listener to detect if we're clicking and dragging:

canvas.addEventListener('mousedown', function(e) {
	//set drawing boolean value to true, bc user just clicked on canvas
	drawing = true;
	// console.log(drawing); 	//test to make sure event is heard
	
	//get coordiantes of click:
	lastX = e.offsetX;	//e is for the event itself. offset is a method of it. x position of click
	lastY = e.offsetY;	// y position of click event
	
	//draw();	//move this to mousemove event listener
});

canvas.addEventListener('mousemove', function(e){
	//this is the function that is called when we click and drag
	//this is where we should update our drawing
	
	draw(e);
});

canvas.addEventListener('mouseup', function(){
	//called when mouse button is released but still on canvas
	drawing = false;
});

canvas.addEventListener('mouseout', function(){
	//called when mouse moves off canvas area
	drawing = false;
});

/* OPTIONS */

//create color palette:

	var colors = [];
	//hsl colors have three components: hue saturation light
	//can define as strings in form 'hsl(200,50%, 80%)'
	//creates a color with hue of 200 degrees, 50% saturation, and 80% lightness
	
	for (let i = 30; i <= 360; i+=30){
		let newcolor = 'hsl('+i+',50%,70%)';
		colors.push(newcolor);
	}
	colors.push('black', 'grey', 'white');
	// console.log(colors); //colors array has 12 hsl strings
	
	var palettediv = document.getElementById('palette');
	
	for (let i=0; i < colors.length; i++){
		//for each color in array:
		//create div that displays color
		//add an event listener to div so we know if user clicked it
		//append it to the palettediv area
		var x = document.createElement('div');
		x.style.backgroundColor = colors[i];
		x.style.height = '50px';
		x.addEventListener('click',function(){
			context.strokeStyle = this.id;
			context.fillStyle = this.id;
			rainbow = false;
		});
		x.id = colors[i];
		palettediv.appendChild(x);
	};
	
//create line width option:

var lineWidthSlider = document.getElementById('lineWidth');
	lineWidthSlider.addEventListener('input', function() {
		context.lineWidth = this.value;
	});
	
//create rainbow effect, when selected:

var rainbow = false; //boolean value to keep track of whether rainbow option is selected
var hue = 0; //start rainbow effect with a hue of 0 (red)
document.getElementById('rainbow').addEventListener('click',function() {
	rainbow = true;
});

//erase the canvas:

//problem to fix next time: clearing canvas, regardless of user input
document.getElementById('eraser').addEventListener('click',function() {
	var erase = confirm("Are you sure you want to erase?");
	if (erase){
	context.clearRect(0,0,canvas.width,canvas.height);
	}
});

//download option

function downloadCanvas(link,filename){
	link.href = canvas.toDataURL();
	link.download = filename;
};

document.getElementById('download').addEventListener('click', function() {
	//call another function to perform download as png
	downloadCanvas(this,'test.png');
});




















