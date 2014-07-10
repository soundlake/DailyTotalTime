/*
 * clock animation
 */
function Stopwatch () {
  this.canvas = document.getElementById('cvs');
  this.canvas.addEventListener('click', this.toggle.bind(this));
  this.context = this.canvas.getContext('2d');
  
  this.total = 3600;
  this.partial = 0;
  this.isActive = false;
  this.init = 0;
  this.now = 0;
  
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height / 2;
  this.radius = this.canvas.width / 4;
  
  this.foreground_color = '#ffd36d';
  this.background_color = '#ffaf00';
  
  this.aBegin = Math.PI * -0.5;
}
Stopwatch.prototype = {
  get ratio () { return this.partial / this.total; },
  get aEnd () { return Math.PI * (2 * this.ratio - 0.5); }
}
Stopwatch.prototype.toggle = function () {
  this.isActive = !this.isActive;
  this.init = Date.now();
}
Stopwatch.prototype.update = function () {
  var interval = 1000, // millisecond
      delta;
  if (this.ratio < 1 && this.isActive) {
    this.now = Date.now();
    delta = this.now - this.init;
    if (delta > interval) {
      this.partial += delta / interval;
      delta %= interval;
      this.init = this.now - delta;
    }
  }
}
Stopwatch.prototype.drawBack = function () {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius * 1.99, 0, Math.PI * 2);
  this.context.fillStyle = this.background_color;
  this.context.fill();
}
Stopwatch.prototype.drawWatch = function () {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, this.aBegin, this.aEnd, false);
  this.context.lineWidth = this.radius * 2;
  this.context.strokeStyle = this.foreground_color;
  this.context.stroke();
}
Stopwatch.prototype.draw = function () {
  this.drawBack();
  this.drawWatch();
}
Stopwatch.prototype.animate = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.update();
  this.draw();
  
  window.requestNextAnimationFrame(this.animate.bind(this));
}

var sw = new Stopwatch();
sw.animate();
