var x;
var g;

function setup(){
  g = true;
  x = new Creation(g);
}

function draw(g){
  x.draw(g);
}

function mousePressed(){
  x.spawn();
}

function keyPressed() {
  x.despawn();
}
