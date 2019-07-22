var imgHolder = document.getElementById('albumImageDiv');

var captionHolder = document.getElementById('albumInfo');

var dotDiv = document.getElementById('albumDots');

var playButton = document.getElementById('albumPlay');

/* change the background image of the imgHolder */

//imgHolder.style.backgroundImage = 'http://math.mercyhurst.edu/~lwilliams/mis370/classNotes/fishShop/img/slideshow_img/image1.png';

/* Create objects that will store image path and associated caption */

//we don't want to do this every time:
/*var newImageObject = {
	path: 'http://math.mercyhurst.edu/~lwilliams/mis370/classNotes/fishShop/img/slideshow_img/image2.png',
	caption: 'This is a caption'
}

Instead, use a constructor to make multiple similar objects */

function albumObject (path,caption){
	this.path = 'http://math.mercyhurst.edu/~lwilliams/mis370/classNotes/fishShop/img/slideshow_img/' + path + '.png';
	this.caption = caption;
}

//create a new object:
/* var newImageObject = new albumObject('image3', 'This is another caption'); 

Instead of creating indivual objects with variable names, we'll put them into an array */

//create empty array to store the image objects:
var allImages = [];

allImages.push(new albumObject('image0', 'All corals are grown in our store'));
allImages.push(new albumObject('image1', 'New fish arriving daily'));
allImages.push(new albumObject('image2', 'We can help you get started with your new tank'));
allImages.push(new albumObject('image3', 'We carry lots of supplies for a healthy tank'));
allImages.push(new albumObject('image4', 'This is not a real store'));

//need to keep track of which image is being displayed:
var currentImage =  0; //update as we change images
//we need to know how many images we have:
var numImages = allImages.length;

/* FUNCTION TO CHANGE THE IMAGE
this will called by a timer, or the user by clicking a dot under slideshow */

function nextImage(){
	//get the path to the image we need:
	//based on the current image to be displayed:
	var pathToImage = allImages[currentImage].path;
	imgHolder.style.backgroundImage = 'url("' + pathToImage + '")';
	
	//change the captions:
	captionHolder.innerHTML = allImages[currentImage].caption;
	
	//increase value of currentImage to display next image
	currentImage = (currentImage + 1) % 5; //modular. currentImage mod 5. distance from a multiple of 5 (18 mod 5 is three because 
	//it's three more than a multiple of 5 (15))
}

nextImage();

var slideshowTimer = setInterval(nextImage, 3000);

/* APPEND DOTS TO CONTROL WHICH IMAGE IS BEING DISPLAYED
the dots should have a click listener, jump to associated picture */

for (let i = 0; i < numImages; i++){
	var newDot = document.createElement('label');
	newDot.id = 'dot' + i; //first will be dot0, then dot1, dot2, etc.
	newDot.className = 'dot'; //add css style from fishstore.css 
	newDot.addEventListener('click', selectImage);
	dotDiv.appendChild(newDot);
}

function selectImage(){
	var dotId = this.id; //'this' is the dot that was clicked
	console.log(dotId);
	//get the number part of id, which will be the last digit:
	var dotIndex = parseInt(dotId.slice(-1)); //gets last character of string
	currentImage = dotIndex;
	
	//clearInterval(slideshowTimer);
	toggleAutoplay();
	
	nextImage();
}

/* TOGGLE TIMER */

var autoplay = true; //boolean: true if timer is running
playButton.addEventListener('click', toggleAutoplay);
function toggleAutoplay() {
	if (autoplay){
		//what to do if autoplay is running (true) -- turn it off
		clearInterval(slideshowTimer);
		playButton.innerHTML = '&#9658';
	}
	else{
		//what to do if autoplay is off (false) -- turn it on
		slideshowTimer = setInterval(nextImage, 3000);
		playButton.innerHTML = '&#2405';
	}
	
	//toggle value of autoplay
	autoplay = !autoplay;
}