/**********************************************/
/*                                            */
/*  Code from January 30th - introToObjects   */
/*                                            */
/**********************************************/

// Fish object constructor:
function newFish( spec, common, size, color, cost, diff ) {
	// use this function to set properties of the object passed to it	
	this.species = spec;
	this.cost = cost; 
	this.commonname = common;
	this.colorarray = color;
	this.difficulty = diff;
	this.maxsize = size;
}


var table = document.getElementById('fishTable');
	
function addFishRow( obj ) {
	var newRow = table.insertRow(-1); 	// add a new row to the table. Use -1 to append to end, 0 for beginning

	var nameCell = newRow.insertCell(0);
    	nameCell.innerHTML = obj.commonname; 
    	nameCell.style.textAlign = "left";
	var specCell = newRow.insertCell(1);
    	specCell.innerHTML = obj.species;
    	specCell.style.textAlign = "left";
	var sizeCell = newRow.insertCell(2);
   	 	sizeCell.innerHTML = obj.maxsize;
   	 	sizeCell.style.textAlign = "center";
	var colorCell = newRow.insertCell(3);
   	 	colorCell.innerHTML = obj.colorarray.toString();	 
   	 	colorCell.style.textAlign = "left";
	var diffCell = newRow.insertCell(4);
   	 	diffCell.innerHTML = obj.difficulty;
   	 	diffCell.style.textAlign = "left";
	var priceCell = newRow.insertCell(5);
   		priceCell.innerHTML = '$' + obj.cost;
   		priceCell.style.textAlign = "right";
}




/**********************************************/
/*                                            */
/*  Start February 1st Class Notes.           */
/*                                            */
/**********************************************/

// Current fish 'stock'
var allFish = [
	new newFish( 'Amphiprion ocellaris', 'Clownfish', 3, ['orange', 'black', 'white'], 18, "Easy"),
	new newFish( 'Centropyge bispinosa', 'Coral Beauty Angelfish', 4, ['blue','orange','red'], 35, "Moderate"),
	new newFish( 'Pomacanthus imperator', 'Emperor Angelfish', 15, ['blue','yellow','white'], 189, "Moderate"),
	new newFish( 'Centropyge flavissima', 'Lemonpeel Angelfish', 6, ['yellow','blue'], 42, "Moderate"),
	new newFish( 'Chrysiptera hemicyanea', 'Azure Damsel', 3, ['orange', 'blue'], 6, "Easy"),
	new newFish( 'Synchiropus picturatus', 'Spotted Mandarin', 4, ['blue','green','orange','black'], 18, "Difficult"),
	new newFish( 'Nemateleotris magnifica', 'Firefish', 3, ['red', 'white'], 14, "Easy"),
	new newFish( 'Pomacanthus imperator', 'Emperor Angelfish', 15, ['blue', 'yellow','black', 'white'], 170, 'Moderate'),
	new newFish( 'Lactoria cornuta', 'Longhorn Cowfish', 20, ['white', 'yellow'], 30, 'Difficult'),
	new newFish( 'Echidna nebulosa', 'Snowflake Eel', 24, ['black','white','yellow'], 60, 'Easy'),
	new newFish( 'Pterois volitans', 'Volitan Lionfish', 15, ['red', 'black', 'white'], 50, "Easy"),
	new newFish( 'Pseudocheilinus hexataenia', 'Six Line Wrasse', 3, ['orange', 'blue', 'purple'], 20, "Easy"),
	new newFish( 'Rhinecanthus aculeatus', 'Humu Picasso Triggerfish', 10, ['blue', 'black', 'white', 'yellow'], 32, "Moderate"),
	new newFish( 'Serranus tortugarum', 'Chalk Basslet', 3, ['blue', 'white'], 19, "Easy"),
	new newFish( 'Chaetodon lunula', 'Raccoon Butterflyfish', 8, ['yellow', 'black', 'white'], 50, "Easy"),
	new newFish( 'Paracanthurus hepatus', 'Blue Tang', 12, ['blue', 'yellow'], 55, "Moderate"),
	new newFish( 'Diodon holocanthus', 'Porcupine Puffer', 12, ['brown',  'white'], 60, "Moderate")
]

for (let i=0; i < allFish.length; i++){
	addFishRow(allFish[i]);
}

// addFishRow( allFish[0] );

function update() {
	// check that it works:
	//console.log( 'update working' )
	/* This function will:
		1. get max price the user wants to spend
		2. get max size user wants 
		3. get all checked boxes for the difficulty
		4. compare each fish object's properties to these requirements
		5. empty the table
		6. add any objects that do meet the criteria 
	*/
	//get the max price the user can spend
	var userPrice = Number( document.getElementById('userprice').value );
		//console.log(typeof userPrice)
		
	var userSize = Number(document.getElementById('usersize').value);
	console.log(userPrice, userSize);
	
	//create an array of the difficulties selected by user
	var allCareCheckboxes = document.getElementsByName('care');
	console.log(allCareCheckboxes);
	var checkedCareCheckboxes = [];
	for (var i = 0; i < allCareCheckboxes.length; i++){
		if (allCareCheckboxes[i].checked == true){
			//checkbox is checked, so get its value
			//and add to the checkbox list
			var careLevel = allCareCheckboxes[i].value;
			//add value of checkbox (as a string, like 'Easy', to the array at the end)
			checkedCareCheckboxes.push(careLevel);
		}
	}
	
	console.log(checkedCareCheckboxes);
	
	//get all old rows out of table
	var allTableRows = table.getElementsByTagName('tr');
	// ^this creates and array of all table rows with <tr>
	//console.log(allTableRows);
	
	var numberOfRows = allTableRows.length; //number of rows in table
	
	//clear entire table, looping backwards from last row
	for (let i = numberOfRows - 1; i > 0; i--){
		table.deleteRow(i);
	}
	
	for (let i=0; i < allFish.length; i++){
		//this will loop over all fish objects
		//set a variable to refer to each one as we loop
		var thisFish = allFish[i];
		//get its props
		var thisCost = thisFish.cost; //number
		var thisSize = thisFish.maxsize; //number
		var thisDifficulty = thisFish.difficulty; //string
		
		
		//set up boolean to use for testing
		//set it to true, but if any tests fail, it's false
		//if after all tests it's still true, then show the fish
		
		var showThisFish = true;
		
		if (thisCost > userPrice){
			//addFishRow(thisFish);
			showThisFish = false;
		}
		
		if (thisSize > userSize){
			showThisFish = false;
		}
		
		//check that care level is ok
		//check if difficulty of this fish is in array of checked boxes
		//arrayName.indexOf(example) returns index of "example"
		//in the array arrayName, or -1 if item not found
		if (checkedCareCheckboxes.indexOf(thisDifficulty) == -1){
			//if we're in this block, the difficulty of this fish was not
			//found in the checkedbox array
			showThisFish = false;
		}
		
		//if all tests pass, show the fish:
		if (showThisFish){
			addFishRow(thisFish);
		}
	}
}

//choose a random image to display

var allImagePaths = ['img/emperorangel.png', 'img/clowns.png'];

var randomIntegerAtLeastZeroLessThanTwo = Math.floor(Math.random() * 2);
document.getElementById('bigPic').src = allImagePaths[randomIntegerAtLeastZeroLessThanTwo];






