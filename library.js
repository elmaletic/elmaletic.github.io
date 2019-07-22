function MStoTime( ms ) {
	//expecting a number, in milliseconds
	let sec = Math.floor( ms/1000 );
	let lms = ms - (sec*1000);
	let min = Math.floor( sec/60 );
	let lsec = sec - min*60;
	let hr = Math.floor( min/60 );
	let lmin = min - hr*60;
	let days = Math.floor( hr/24 );
	let lhr = hr - days*24;
 	
	days = ( days < 10 ) ? '0'+days : days.toString();
	//if days are less than 10, add a 0 before it. either way, convert to string.
	//shorthand if/else notation. ? = then (I think)
	lhr = ( lhr < 10 ) ? '0'+lhr : lhr.toString();
	lmin = ( lmin < 10 ) ? '0'+lmin : lmin.toString();
	lsec = ( lsec < 10 ) ? '0'+lsec : lsec.toString();
	lms = ( lms < 10 ) ? '0'+lms : lms.toString();
	
	console.log(days + ' day(s)');
	console.log(lhr + ' hours');
	console.log(lmin + ' minutes');
	console.log(lsec + ' seconds');
	console.log(lms + ' milliseconds');
	
	return ({ day: days, hr: lhr, min: lmin, sec: lsec, ms: lms });//this is what the var will be equal to 
	//because of the return. 
}

//a function that creates an HTML element
function newElement(elementType, parentId, elementId, styles) {
	let x = document.createElement(elementType);	
	
	//for loop to iterate thru styles array
	for(var key in styles){
		if(x.getAttribute('style') != null) //check if any existing properties have been added
			x.setAttribute('style', x.getAttribute('style')+"; "+key +": "+styles[key]);
		else
			x.setAttribute('style', key +": "+styles[key]);
	}
	
	x.id = elementId;	
	
	
	console.log(x);
	document.getElementById(parentId).appendChild(x);
}

//a function that shuffles an array

var myArray = []; 
function unsort(myArray){
	//for loop below found at stackoverflow with some variable changes
	var j, x, i;
    for (i = myArray.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = myArray[i];
		myArray[i] = myArray[j];
		myArray[j] = x;
	}
	
	console.log(myArray);
	
	return myArray;
}


//function to merge 2 arrays

var array1 = [];
var array2 = [];

function mergeArrays(array1,array2){
	let array3 = array1.concat(array2);
	console.log(array3);
	return array3;
}


