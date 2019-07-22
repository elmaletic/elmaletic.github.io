//this is an external js file
//it does not need script tags

//console.log("this is coming from another file");

//OBJECT CONSTRUCTION
//in these examples, we'll create custom objects with properties and methods
//don't use newObject();
//we can build them directly or through functions

var anObject = {
	//propertyName : value,
	this_is_a_property: 4,
	another_property: 'this is a string with property another_property',
	three: 7,
	array_prop: [1,2,"I'm in an array in an object"]
};
//we can't use the index of an object property, as objects are NOT indexed

//we can access property names to get their values:

	console.log(anObject.three); //dot notation
	console.log(anObject['array_prop']); //square bracket notation requires string form
		//square bracket better for JSON
		
	//redefine values using same notation
	
	anObject.this_is_a_property = 6;
	console.log(anObject);
	
	//we can also build objects by adding properties later:
	var anotherObject = {};
		anotherObject.aProperty = 'a';
		anotherObject.prop2 = "testing";
		anotherObject['prop3'] = 5;
		
	console.log(anotherObject);
	
	//create objects using a function - good idea if you have a ot of similar objects
	
	function newFish(spec, common, size, color, cost, diff){
		console.log("i'm in a function")
		//use this function to set properties of the object passed to it
		
		//this refers to whatever calls it - the object that we're making
		this.species = spec;
		this.cost = cost;
		this.commonName = common;
		this.colorArray = color;
		this.difficulty = diff;
		this.maxSize = size;
	}
	
	var clownfishObject = new newFish('Amphiprion ocellaris', 'Clownfish', 3, ['orange', 'black', 'white'], 18, "Easy");
	console.log(clownfishObject);
	
	//BUILD TABLE ROWS WITH JS OBJECTS
	
	//we can make this a function (below) so we don't have to type it for each fish/table row
		
	var table = document.getElementById('fishTable');
	/*
	var newRow = table.insertRow(-1); //add a new row to the table use -1 to append to end, 0 for beginning
	
	var nameCell = newRow.insertCell(0);
		nameCell.innerHTML = clownfishObject.commonName;
	var specCell = newRow.insertCell(1);
		specCell.innerHTML = clownfishObject.species;
	var sizeCell = newRow.insertCell(2);
		sizeCell.innerHTML = clownfishObject.maxSize;
	var colorCell = newRow.insertCell(3);
		colorCell.innerHTML = clownfishObject.colorArray.toString();
	var diffCell = newRow.insertCell(4);
		diffCell.innerHTML = clownfishObject.difficulty;
	var priceCell = newRow.insertCell(5);
		priceCell.innerHTML = '$' + clownfishObject.cost;
	*/
	
	function addFishRow(obj){
		var newRow = table.insertRow(-1); //add a new row to the table use -1 to append to end, 0 for beginning
		
		var nameCell = newRow.insertCell(0);
			nameCell.innerHTML = obj.commonName;
		var specCell = newRow.insertCell(1);
			specCell.innerHTML = obj.species;
		var sizeCell = newRow.insertCell(2);
			sizeCell.innerHTML = obj.maxSize;
		var colorCell = newRow.insertCell(3);
			colorCell.innerHTML = obj.colorArray.toString();
		var diffCell = newRow.insertCell(4);
			diffCell.innerHTML = obj.difficulty;
		var priceCell = newRow.insertCell(5);
			priceCell.innerHTML = '$' + obj.cost;
	}
	
	addFishRow(clownfishObject);
	
	var damselObject = new newFish('Chrysiptera hemicyanea', 'Azure Damsel', 3 , ['orange', 'blue'], 6 , "Easy");
	addFishRow(damselObject);
	
	
	
	

