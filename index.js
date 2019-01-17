var x;
var g;

function setup(){
  g = document.getElementById("use_p5").checked;
  x = new Creation(g);
}

function draw(g){
  g = document.getElementById("use_p5").checked;
  x.draw(g);
}

function mousePressed(){
  x.spawn();
}

function keyPressed() {
  x.despawn();
}
