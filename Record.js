
function Record() {


  this.showWheel = function(l) {
    for(let i = 0; i < 360; i+= 1){
      let color = map(i, 0, 360, 0, 255);
      stroke(color, 255, 255);

      rotate(i);
      line(0, l/2.9, 0, l);
      rotate(-i);
    }
    stroke(0);
    ellipse(0, 0, l * 2);

  }

  this.showImage = function(img, l) {
    tint(255, 80);
  	image(img, 0, 0, l*2, l*2);
  }
}
