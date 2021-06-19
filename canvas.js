var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function getRandomRGB() {
  var num = Math.floor(Math.random() * 16777216);

  return "#" + num.toString(16);
}

/*for (var x = 0; x < canvas.width; x += 20) {
  for (var y = 0; y < canvas.width; y += 20) {
    c.fillStyle = getRandomRGB();
    c.fillRect(x, y, 20, 20);
  }
}*/

function Tile(x, y, size, rgb_center, offsets) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.rgb_center = rgb_center;
  this.offsets = offsets

  this.current_red = 0;
  this.current_green = 0;
  this.current_blue = 0;

  this.time = 0;

  this.draw = function() {
    c.fillStyle = "rgb(" + this.current_red + ", " + this.current_green + ", " + this.current_blue + ")";
    c.fillRect(this.x, this.y, this.size, this.size);
  }

  this.update = function() {
    this.current_red = rgb_center[0] + Math.sin(this.time / 10 + this.offsets[0]) * 50;
    this.current_green = rgb_center[1] + Math.sin(this.time / 10 + this.offsets[1]) * 50;
    this.current_blue = rgb_center[2] + Math.sin(this.time / 10 + this.offsets[2]) * 50;

    this.draw();
    this.time += 1;
  }
}

var tiles = [];

for (var x = 0; x < canvas.width; x += 20) {
  for (var y = 0; y < canvas.width; y += 20) {
    var red_center = Math.random() * 255;
    var green_center = Math.random() * 255;
    var blue_center = Math.random() * 255;
    var red_offset = Math.random() * 5;
    var green_offset = Math.random() * 5;
    var blue_offset = Math.random() * 5;

    var tile = new Tile(x, y, 20, [red_center, green_center, blue_center], [red_offset, green_offset, blue_offset]);
    tiles.push(tile);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < tiles.length; i++) {
    tiles[i].update();
  }
}

animate();
