
function DurationBar(w, h) {
  this.x = 0;
  this.h = h;
  this.w = w;


  this.show = function() {
    line(this.x, 0, this.x, this.h);
  };

  this.update = function(song) {
    
    this.x = map(song.duration() - song.currentTime(), song.duration(), 0, 0, this.w);
  };
}
