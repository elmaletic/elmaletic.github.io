/*************************************************************************
	
	Some background about the game:
	
	"Lights Out" is a puzzle that was released as a handheld electronic game in the 1990s. The goal is to set all squares in the grid to the same state (off). The challenge is that changing the state of one square will also change the state of its neighbors. We can't generate a random starting state for our puzzles, because not all of them will have a solution. Figuring out which puzzles can be solved, as well as finding a solution, is a great linear algebra problem!
	
	The grid for a Lights Out puzzles is typically 5x5 (five rows and five columns), for a total of 25 squares. In the original game, a square was 'on' or 'off', and the goal was to turn all squares to 'off'. We'll have that same goal in this game, but instead of just changing the color, we'll make it aquarium-themed by drawing the 'off' state as a clean square, and the 'on' state as a square with algae. When the entire board is clean, all states are 'off' and the game is over.
	
	
	The strategy
	
	We have a few options for setting up our code, but here's the plan for today: an array called AllSquares of 25 objects, each representing a square. Each object will have a property called 'state' that will be a boolean value: true if it's on/dirty, and false if it's off/clean (again, the goal will be for all objects to have a 'false' value for 'state'). The objects will also have a property called 'neighbors' that will be an array which holds the index of its neighbors. This will make it easier to look up the neighbors when we change the state of a square. We can look up each object by its index in the AllSquares array, using the map of our board below:
	
				0	1	2	3	4
				
				5	6	7	8	9
				
				10	11	12	13	14
				
				15	16	17	18	19
				
				20	21	22	23	24
	
	Since we'll use Canvas for the puzzle, we'll need to set an event listener on the canvas itself so we know when the user clicks on it. We'll also need to calculate the coordinates of the click, so we can figure out which square the user selected. Once we've done that, we'll change the state of the square and its neighbors, then completely erase and redraw the board to show the current state of the game. To do this, we'll look up each square's object by its	index in the AllSquares array, check its state, and draw the square as 'clean' or 'dirty'.	
	*/
	
// 0A. The AllSquares array definition, to avoid typing in class. All states are set to false; we'll change that later:

var AllSquares = [
	// Row 1:
	{ state: false, neighbors: [1,5] },
	{ state: false, neighbors: [0,2,6] },
	{ state: false, neighbors: [1,3,7] },
	{ state: false, neighbors: [2,4,8] },
	{ state: false, neighbors: [3,9] },
 	// Row 2:
	{ state: false, neighbors: [0,6,10] },
	{ state: false, neighbors: [1,5,7,11] },
	{ state: false, neighbors: [2,6,8,12] },
	{ state: false, neighbors: [3,7,9,13] },
	{ state: false, neighbors: [4,8,14] },
	// Row 3:
	{ state: false, neighbors: [5,11,15] },
	{ state: false, neighbors: [6,10,12,16] },
	{ state: false, neighbors: [7,11,13,17] },
	{ state: false, neighbors: [8,12,14,18] },
	{ state: false, neighbors: [9,13,19] },
	// Row 4:
	{ state: false, neighbors: [10,16,20] },
	{ state: false, neighbors: [11,15,17,21] },
	{ state: false, neighbors: [12,16,18,22] },
	{ state: false, neighbors: [13,17,19,23] },
	{ state: false, neighbors: [14,18,24] },
	// Row 5:
	{ state: false, neighbors: [15,21] },
	{ state: false, neighbors: [16,20,22] },
	{ state: false, neighbors: [17,21,23] },
	{ state: false, neighbors: [18,22,24] },
	{ state: false, neighbors: [19,23] },
]

//  The starting puzzles are hard coded, because generating a random one will require a lot of math (not all will be solvable). Each puzzle is stored as an array, with the indices of the squares we want to turn 'on' at the beginning. 

var AllPuzzles = [
	[13,17,18,24],	// puzzle 0
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],	//puzzle 1
	[10,12,14],		// original Tiger Electronics Puzzle 1!
	[0,1,2,4,7,11,12,13,16,19,20]
];

	
// Create the canvas and its context
var canvas = document.getElementById('tankCanvas');
var context = canvas.getContext("2d");

// Rather than fixed dimensions, set variables to store the width and height of the canvas. This will make it easier to resize the board later if we choose to.
var w = 400;
var h = 400;

// calculate the size of the squares on the board:
var squareWidth = w/5;	
var squareHeight = h/5;

// Perform some scaling magic so the game looks better on HD displays - 
canvas.width = w*2;
canvas.height = h*2;			
canvas.style.width = w+"px";
canvas.style.height = h+"px";	
canvas.getContext('2d').scale(2,2)


// Draw a test rectangle to make sure everything is working. Try changing the values of w and h above.
context.fillStyle = 'red';
context.beginPath(); 
context.rect(0,0,w,h);	// rectangle with top left corner at position (0,0) width w, height h
context.fill();
context.closePath();

//variables for the game:
var moves = 0; //counter for the moves


// We have a few puzzles to start with - there are 4 in the array AllPuzzles
// But to start, we'll just use the first one. 

var currentPuzzleIndex = 0;		// index of current puzzle to play
var currentPuzzle = AllPuzzles[ currentPuzzleIndex ];	// [13,17,18,24]


	//give it a variable name so we can cancel as needed (when game is over)
	var timer;

//if we want to start another puzzle, we'll need a function that randomly
//selects a new puzzle from the allpuzzles array & redraws the board
// Change the state to true for any objects that are listed in the currentPuzzle array:
function startNewGame() {
	// we want to select a random puzzle from our list with each new game.
	// find the number of puzzles available
	var noPuzzle = AllPuzzles.length;
	// select a random index between 0 and that length (not including length)
	currentPuzzleIndex = Math.floor( noPuzzle * Math.random() );
	currentPuzzle = AllPuzzles[ currentPuzzleIndex ];
	
	var time = 0; //keep track of number of secs elapsed during game
	clearInterval(timer);
	var timer = setInterval(increaseTime, 1000);
	
	function increaseTime() {
		// increase the current time by 1 second
		time++;
		// console.log(time);
	
		// convert 'time' to a string of minutes and seconds
	
		let mins = Math.floor( time/60 );
		let secs = time - mins*60;
		secs = ( secs < 10 ) ? '0'+secs : secs;
	
		document.getElementById('timer').innerHTML = 'Time: '+mins+':'+secs;
	
	
	}

	
	// clear all old values each time we start a new game:
	
	for ( let i = 0; i < 25; i++ ) {
		AllSquares[ i ].state = false;
	}
	moves=0;
	document.getElementById('moveCounter').innerHTML = 'Moves: 0';
	document.getElementById('status').innerHTML = '';
	
	for ( let i = 0; i < currentPuzzle.length; i++ ) {
		let currentSquare = currentPuzzle[i];	// first loop equal to 13, then 17, then 18, then 24
		AllSquares[ currentSquare ].state = true;
	}
	
	drawGame();
}

startNewGame(); //get the game started, also want to use this when we click "new game"

document.getElementById('newGameButton').addEventListener('click', startNewGame);

// Starting state for the game is now set, check in console:
//console.log(AllSquares);

// Draw the board, with the state of each square reflected graphically.
// We'll have to do redraw the board every time the user clicks on it.
// We need a function that draws the current state based on the state of the objects in the AllSquares array.

function drawGame() {
	context.clearRect(0,0,w,h);	// clear the entire canvas
	
	context.fillStyle = 'rgb(160,180,220)';
	context.beginPath(); 
	context.rect(0,0,w,h);	// rectangle with top left corner at position (0,0) width w, height h
	context.fill();
	context.closePath();


	// draw a "dirty" square for each square with a state of true
	// We need to loop over the AllSquares objects and draw them differently
	// if their state is set to true.
	
	// Instead of looping directly over this array, we'll loop over the rows and columns of the grid forming the game - these don't really exist!
	
	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 5; col++) {
			var indexOfSquare = row*5 + col;
			var stateOfSquare = AllSquares[ indexOfSquare].state;
			
			//console.log( AllSquares[ indexOfSquare ].state, indexOfSquare );
			
			// if state is false, don't draw anything (leave it 'clean')
			// if true, draw a 'dirty' square
			/*
			context.fillStyle = 'rgb(190,220,150)';
			
			if ( stateOfSquare == true ) {
				context.beginPath();
				context.rect( col * squareWidth, row * squareHeight, squareWidth, squareHeight );
				context.fill();
				context.closePath();
			}
			*/
			//make it look like algae:
			if (stateOfSquare == true){
				for (let i=0; i < 200; i++){
					let x = col*squareWidth + Math.random()*squareWidth;
					let y = row*squareHeight + Math.random()*squareHeight;
					
					//colors can be in format rgb(200,180,100)
					let color = 'rgb('+Math.floor(180+Math.random()*30)+','+Math.floor(180+Math.random()*60)+',210)';
					context.fillStyle = color;
					context.beginPath();
					context.arc(x,y,Math.random()*10,0,2*Math.PI,true);
					context.fill();
					context.closePath;
				}
			}
		}
	}
	
}

drawGame();


function getMousePos( canvas, event ) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,	// left position of click, relative to canvas
		y: event.clientY - rect.top	// top position of click, relative to canvas
	}
}


canvas.addEventListener('click', function( event ){
	let clickPos = getMousePos( canvas, event );	// get an object with x and y coordinates of the click, relative to canvas
	// use a function that may come in helpful later
	
	console.log( clickPos );
	
	//figure out which square of board was clicked
	var clickCol, clickRow;
	
	if ( clickPos.x < squareWidth ) { clickCol = 0 }
	else if ( clickPos.x < 2 * squareWidth) {clickCol = 1}
	else if ( clickPos.x < 3 * squareWidth) {clickCol = 2}
	else if ( clickPos.x < 4 * squareWidth) {clickCol = 3} 
	else { clickCol = 4 }
	
	if ( clickPos.y < squareHeight ) { clickRow = 0 }
	else if ( clickPos.y < 2 * squareHeight) {clickRow = 1}
	else if ( clickPos.y < 3 * squareHeight) {clickRow = 2}
	else if ( clickPos.y < 4 * squareHeight) {clickRow = 3} 
	else { clickRow = 4 }
	
	//console.log( clickRow, clickCol );
	
	//we need to call a function that will change the state of the square we clicked as well as its neighbors
	//since this function will only be needed on a click event, we can include the code here.
	
	//calculate the index of box that was clicked
	var currentSquareIndex = clickRow*5+clickCol;
	var currentSquare = AllSquares[currentSquareIndex];
	//currentSquare is an object with a state property that is true or false and a neighbor property that's an array,
	//the array includes the indices of the square's closest neighbors
	
	//change the state of the current square
	currentSquare.state = !currentSquare.state; //set it equal to what it wasn't
	
	/* not a good way to change boolean values:
		if (state==true){
			state = false;
		}
		else{
			state = true;
		}
	*/
	
	//change the state of its neighbors
	var newNeighbors = currentSquare.neighbors;
	//console.log(newNeighbors);
	
	for (let i=0; i<newNeighbors.length; i++){
		AllSquares[newNeighbors[i]].state = !AllSquares[newNeighbors[i]].state;
	}
	
	//console.log(AllSquares);
	
	//redraw the board after changing states
	drawGame();
	
	moves++; //increase moves by 1
	document.getElementById('moveCounter').innerHTML = 'Moves: '+moves;
	
	//we need to check if the game is over after every move 
	//the game is over (won) if state of every square is false.
	//so we can loop over the array of objects and check their states
	//if any are true, the game is not over
	
	var weWon = true; //assume we won
	for (let i=0; i<25; i++){
		if (AllSquares[i].state == true){
			//we haven't won yet
			weWon = false;
		}
	}
	if (weWon){
		//weWon is still true, so we won the game
		document.getElementById('status').innerHTML = 'You won!';
	}
	clearInterval(timer);
	
})


