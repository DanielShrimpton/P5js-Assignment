var x

function setup(){
  x = new Creation()
}

function draw(){
  x.draw();
}

function mousePressed(){
  x.spawn();
}

function keyPressed() {
  x.despawn();
}
