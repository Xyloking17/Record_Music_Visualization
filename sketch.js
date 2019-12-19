var ang = 0;
var len = 300;
var mySong;
var myImage;
var amp;


function preload() {
	mySong = loadSound('song.mp3');
	myImage = loadImage('record.png');
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	angleMode(DEGREES);
	imageMode(CENTER);


	mySong.loop();
	amp = new p5.Amplitude();

}

function draw() {
	background(51);

	strokeWeight(10);
	stroke(255);
	noFill();

	//duration bar
	let lineX = map(mySong.duration() - mySong.currentTime(), mySong.duration(), 0, 0, width);
	line(lineX, 0, lineX, height);

	translate(width/2, height/2);

	////mouse controls
	//len = map(mouseY, 0, height, (height/2) - 50, height/2);
	//let ang = map(mouseX, 0, width,  0, 360);

	////automatic control
	//len = map(sin(ang), -1, 1, (height/2) - 50, height/2);

	//music control
	let vol = amp.getLevel();
	len = map(vol, 0, 0.3, (height/2) - 50, height/2);
	let c = map(len, (height/2) - 50, height/2, 50, 200)


	rotate(ang);
	//color wheel
	for(let i = 0; i < 360; i+= 1){
		let color = map(i, 0, 360, 0, 255);
		stroke(color, 255, 255);

		rotate(i);
		line(0, len/2.9, 0, len);
		rotate(-i);
	}
	stroke(0);
	ellipse(0, 0, len * 2);
	//ellipse(0, 0, (len/2.9) * 2);


	//image(change stroke alpha to zero witout)
	rotate(-ang);
	tint(255, 80);
	image(myImage, 0, 0, len*2, len*2);


	ang += 1.5;


}
