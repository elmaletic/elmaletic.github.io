var products = {
   	tank: {
	   	item: "Tank",
	   	info: "A new home for your fish",
	   	price: 180,
	   	no: '0001',
	   	image: 'img/tank.png'
   	   },
   	heater: {
	   	item: "Heater",
	   	info: "Keep your fish warm and cozy",
	   	price: 30,
	   	no: '0002',
	   	image: 'img/heater.png'
   	   },
   	filter: {
	   	item: "Filter",
	   	info: "For sparkling clean water",
	   	price: 50,
	   	no: '0003',
	   	image: 'http://via.placeholder.com/200x100'
   	   },
   	light: {
	   	item: "Light",
	   	info: "Show off your colorful new fish",
	   	price: 80,
	   	no: '0004',
	   	image: 'http://via.placeholder.com/200x100'
   	   },
   	sand: {
	   	item: "Sand",
	   	info: "Add some natural decor",
	   	price: 20,
	   	no: '0005',
	   	image: 'http://via.placeholder.com/200x100'
   	   },
   	salt: {
	   	item: "Marine Salt",
	   	info: "Just mix with water for a miniature ocean",
	   	price: 25,
	   	no: '0006',
	   	image: 'http://via.placeholder.com/200x100'
   	   }
}

// get the empty div to store the products/info/pictures

var catalogDiv = document.getElementById('productDiv');


// looping over arrays: Depends on index

/* 
	var fakearray = [0,1,2,3,4]
	
	for ( let i = 0; i < fakearray.length; i++ ) {
		console.log( 2*fakearray[i] )
	}
	
	// returns 0,2,4,6,8
	*/


// objects don't have indices - they are not ordered
// instead, we refer to object contents by their property/ methods names


// products is the name of the object that contains our products for sale
// 'property' is a made up variable, it refers to the various properties in the products object, just as i refers to the index when looping over an array

for ( var property in products ) {
	/*
	console.log( property )
	console.log( products[property] )
	
	// these are equivalant
	console.log( products[property]['item'])
	console.log( products[property].item )
	
	// this won't work:
	console.log( products.property )
	*/
	
	
	// Since we'll be refering to the object returned by each of these properties throughout the code,
	// we can give it a variable name for quick reference
	
	let e = products[property];		// e is an object, with properties item, info, price, etc
	
	// create an empty div for each item for sale:
	let prodDiv = document.createElement('div');
		prodDiv.style.height = '240px';
		// console.log(prodDiv.style);  // see what styles we can change
		
	let img = document.createElement('img');
		img.setAttribute( 'src', e.image );
		img.style.width = '200px';
		img.style.height = '150px';
		
	
	
	let title = document.createElement('div');
	let titleText = document.createTextNode( e.item + ' - $' + e.price );
		title.appendChild( titleText );
		title.style.color = "#406969";
		title.style.fontWeight = 'bold';
		
	let info = document.createElement('div');
	let infoText = document.createTextNode( e.info );
		info.appendChild( infoText );	
	
	prodDiv.appendChild( img );	
	prodDiv.appendChild( title );
	prodDiv.appendChild( info );
	
	let button = document.createElement( 'button' );
		button.innerHTML = "Add to Cart";
		button.id = 'button'+e.no;
		
		// this is one way to create custom attributes, but is not 'safe'
		// button.itemnumber = e.no;
		// instead, use the setAttribute method
		button.setAttribute( 'itemnumber', e.no );
		button.setAttribute( 'itemname', e.item );
		button.setAttribute( 'itemcost', e.price );
		button.setAttribute( 'itemquantity', 0 );
		button.setAttribute( 'itemprop', property );  // property of products object: tank, heater, salt, etc.
		
		button.addEventListener( 'click', function() {
			// add product to cart when this button is clicked
			// this will be longer code, so we'll create it in another function
			// this function will be created later, for now we'll make
			//  sure that this click event is working
			// console.log('a button was clicked');
			// console.log( this.id );
			console.log( button.getAttribute('itemname') );
			
			// update the quantity of each item - count button clicks
			let currentQuantity = Number(this.getAttribute('itemquantity'));
				
				currentQuantity += 1;
				
				this.setAttribute( 'itemquantity', currentQuantity );
			
			console.log(currentQuantity);
			
			/* The function that will add the product to the cart will need
				certain parameters for the related item: cost, item name, item number, how many of each item they want, etc. 
				This means we need to know which button was clicked, or get the relevant information for each item, and pass it from this click function.
				This requires setting custom attributes for each button.*/
				
			// when we click a button, it should display the relevant product info in the shopping cart table below.
			// call this function to add product to our shopping cart table:
			
			let itemNo = this.getAttribute('itemnumber');
			let itemPrice = this.getAttribute('itemcost');
			let itemName = this.getAttribute('itemname');
			let itemProp = this.getAttribute('itemprop');
			
			addToCart( currentQuantity, itemNo, itemPrice, itemName, itemProp );
			}
		
		)
		
	prodDiv.appendChild( button );

	// add product div to page:
	catalogDiv.appendChild( prodDiv );
	
	
}

var table = document.getElementById('cartTable');
var cartObject = {};

function addToCart( itemQuantity, itemNumber, itemPrice, itemName, itemProp ) {
	console.log('add to cart function called');
	console.log('we want '+itemQuantity+' of item number '+itemNumber )
	// this function will display the relevant info for each product
	// in the table with id cartTable (already in html, but mostly empty)
	
	// the table has columns for the item number, item name, unit cost, quantity, and total cost for the product
	
	cartObject[ itemProp ] = {
		quantity: itemQuantity,
		price: Number(itemPrice),
		name: itemName,
		itemnumber: itemNumber,
		totalcost: function () {
			return itemQuantity * itemPrice;
		}
	}
	
	console.log( cartObject )
	
	// now call the function to build the table
	buildCartTable();
}

function buildCartTable() {
	var allTableRows = table.getElementsByTagName('tr');	// array
	
	var numberOfRows = allTableRows.length;
	
	for (let i = numberOfRows - 1; i > 0; i-- ) {
		table.deleteRow(i);
	}
	
	var totalQuantity = 0;
	var totalPrice = 0;
	
	for ( var prop in cartObject ) {
		var newRow = table.insertRow(-1);
		
		var newCell = newRow.insertCell(0);
			newCell.innerHTML = cartObject[prop].itemnumber;
			newCell.style.textAlign = 'center';
		
		var newCell = newRow.insertCell(1);
			newCell.innerHTML = cartObject[prop].name;
			newCell.style.textAlign = 'center';	
		
		var newCell = newRow.insertCell(2);
			newCell.innerHTML = cartObject[prop].price;
			newCell.style.textAlign = 'center';	
			
		var newCell = newRow.insertCell(3);
			newCell.innerHTML = cartObject[prop].quantity;
			newCell.style.textAlign = 'center';	
		
		totalQuantity += cartObject[prop].quantity;
		
		var newCell = newRow.insertCell(4);
			newCell.innerHTML = cartObject[prop].totalcost();
			newCell.style.textAlign = 'center';	
			
		totalPrice += cartObject[prop].totalcost();
			
	}
	
	console.log(totalQuantity, totalPrice);
	
	var newRow = table.insertRow(-1);
		
	var newCell = newRow.insertCell(0);
		newCell.innerHTML = '';
 	
	var newCell = newRow.insertCell(1);
		newCell.innerHTML = '';
 	
	var newCell = newRow.insertCell(2);
		newCell.innerHTML = '';	
		
	var newCell = newRow.insertCell(3);
		newCell.innerHTML = totalQuantity;
		newCell.style.textAlign = 'center';	
		newCell.style.border = '1px solid red';

	var newCell = newRow.insertCell(4);
		newCell.innerHTML = totalPrice;
		newCell.style.textAlign = 'center';	
		newCell.style.border = '1px solid red';
}














