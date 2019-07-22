//what to know for exam on 3/1:

//Comments: this is one line 
/*
This is a 
multi line
comment
*/

//VARIABLES:
/* 1. must be declared, but not typed
   2. JS is dynamic, so variable types can change
   3. variable names are our choice, case matters, some symbols restricted, keywords restricted
   4. types: numbers, strings, arrays, objects, function, boolean
*/

var x = 6; //starts as number
x = "hello world"; //now a string

function addTwoNumbers (a,b){
	var atype = typeof(a);
	var btype = typeof(b);
	var sum = 'you are not adding two numbers';
	
	//two ways to test and define a variable
	if (atype == 'number'){
		if (btype == 'number'){
			sum = a+b;
		}
	}
	
	//since the if statement has two requirements, we can use shortcuts from the Math library
	
	if ((atype == 'number') && (btype == 'number')) {
		sum = a+b;
	}
	
	// another shortcut for defining a variable based on an if-else statement
	// variable = (condtion)? defition if condition is true : definition if condition is false
	var sum = (atype == 'number' && btype == 'number') ? a+b : 'Please enter two numbers';
	return sum;
	
	console.log(atype,btype, btype == 'number');
	return sum;
	
}
	
	function logicTest (a,b){
		console.log('a is ' + a);
		console.log('b is ' + b);
		console.log('a and b is ' + (a&&b));
		console.log('a or b is ' + (a||b));
		console.log((a&&b)||(a||b)); //((a&&b)&&(a||b))
	}
	logicTest(true,false);

var mySum = addTwoNumbers(3,7);

//LOOPS:

var anArray = [1,2,3,4,5,6,7,8]; //array has length 8

//for longer arrays, or if we'll be using this loop frequently:
var arrayLength = anArray.length;
for (let i=0; i < arrayLength; i++){
	console.log(i, anArray[i]);
	anArray[i] += 6;
}
console.log(anArray);

//FOR EXAM:
//don't worry about memorizing array methods (minus length)

//OBJECTS vs ARRAYS:
/* distinctions:
1. Arrays are ordered, objects are not. can't access object props using index
2. Arrays can contain any variable type, including other arrays:
	ex: var myArray = [[1,2,3], 'hello', 4, {a:0, b:8}];
3. Arrays surrounded by [], objects by {}
4. objects have properties/keys used to access values, and can also have methods

*/

var sampObject = {
	property1: 10,
	address: 'old main lab',
	arrayProperty: [1,2,3],
	sampleMethod: function(x) {console.log('hello ' + x + ' ' + this.address)} //'this' refers to the object
}

sampObject.sampleMethod('from');

var functionArray = [function(x){return 5*x}, function(x){return 8*x}]; //no name for functions bc they can be referred to by their index

var test = functionArray[0](100); 

var myAddress = sampObject.address; //or sampObject['address'] or sampObject[address]

for (let k in sampObject){
	console.log(k, sampObject[k]);
}

var functionObject = {
	function1: function(x){return 5*x},
	function2: function(x){return 8*x}
}

var test2 = functionObject.function1(87);

//DOCUMENT OBJECT MODEL:

var aSpan = document.getElementById('aSpan');
	aSpan.innerHTML = "I changed the DOM";






