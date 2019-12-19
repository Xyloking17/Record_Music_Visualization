let ang = 0;
let len = 300;
let mySong;
let myImage;
let amp;


let durBar;
let record;

////////////////////////////////////////////////////////////////////////////////
function preload() {
	mySong = loadSound('song.mp3');
	myImage = loadImage('record.png');
}

////////////////////////////////////////////////////////////////////////////////
function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	angleMode(DEGREES);
	imageMode(CENTER);
	textAlign(CENTER, CENTER);



	durBar = new DurationBar(width, height);
	record = new Record();
	amp = new p5.Amplitude();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
////////////////////////////////////////////////////////////////////////////////
function mousePressed() {
	if(!mySong.isPlaying() && mySong.isLoaded()){
		mySong.loop();
	} else {
		mySong.pause();
	}
}

////////////////////////////////////////////////////////////////////////////////
function showText() {
		stroke(0);
		strokeWeight(2);
		fill(255);
		textSize((width*height)/19200);
		text("Click Anywhere To Play", 0, 0);
}

////////////////////////////////////////////////////////////////////////////////
function draw() {
	background(51);
	strokeWeight(10);
	stroke(255);
	noFill();

	//duration bar
	durBar.show();
	if(mySong.isPlaying()) {
		durBar.update(mySong);
	}

	//translate to the center of the screen
	//for the record
	translate(width/2, height/2);

	//music control
	let vol = amp.getLevel();
	width > height ?
	len = map(vol, 0, 0.3, (height/2) - 50, height/2) :
	len = map(vol, 0, 0.3, (width/2) - 50, width/2);


	//color wheel
	rotate(ang);
	record.showWheel(len);
	//record image
 	rotate(-ang);
	record.showImage(myImage, len);

	//if playing, rotate record, otherwise show text
	mySong.isPlaying() ? ang += 1.5 : showText();

}
