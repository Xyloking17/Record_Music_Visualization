let ang = 0;
let len = 300;
let mySong;
let myImage;
let amp;

let display = "Click Anywhere to Play \n or Drop a New Audio File";

let durBar;
let record;
let canvas;

////////////////////////////////////////////////////////////////////////////////
function preload() {
	mySong = loadSound('song.mp3');
	myImage = loadImage('record.png');
}

////////////////////////////////////////////////////////////////////////////////
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.drop(changeSong)

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
function showText(words) {
		stroke(0);
		strokeWeight(2);
		fill(255);
		textSize((width*height)/19200);
		text(words, 0, 0);
}

////////////////////////////////////////////////////////////////////////////////
function changeSong(file) {
	if(file.type === 'audio'){
		mySong.stop();
		durBar.x = 0;
		mySong = loadSound(file, success, null, load());
	} else {
		display = 'Incorrect filetype';
	}
}

function success() { display = "Click Anywhere to Play \n or Drop a New Audio File"; }
function load() { display = "Loading..."; }
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
	mySong.isPlaying() ? ang += 1.5 : showText(display);

}
