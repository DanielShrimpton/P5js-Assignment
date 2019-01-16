class Creation{

  constructor(){
    this.planets = []; // This is a list of all the planets
    createCanvas(500, 500, WEBGL); // Creates a 3D canvase of size 500x500 using p5.rendererGL
    var planet1 = new Planet(); // Creating a first initial planet calling the class Planet
    planet1.s, planet1.c = 0.002; // Setting the speed and constant to 0.002
    planet1.r = 35; // Setting the radius to 35
    this.planets.push(planet1); // Adding it to the list of planets
  }

  draw() {
    var locX = mouseX - width/2; // Creating a variable for the mouse X coordinates
    var locY = mouseY - height/2; // Creating a variable for the mouse Y coordinates
    var red = document.getElementById("red").value; // Getting value of red slider from HTML
    var green = document.getElementById("green").value; // Getting value of green slider from HTML
    var blue = document.getElementById("blue").value; // Getting value of blue slider from HTML
    var rotation = document.getElementById("angle1").value; // Getting the value of angle slider from HTML
    var Orbit = document.getElementById("orbit").value; // Getting the value of orbit slider from HTML
    var multiplier = document.getElementById("speed").value; // Getting the value of speed slider from HTML

    background(233); // Setting the background to near white
    pointLight(250,250,250, locX, locY, 50); // Setting a point light in 3D space to follow the mouse
    ambientLight(50); // Adding an ambient light so it is visible


    push(); // Only affects this shape inside the push pop,.
    specularMaterial(red,green,blue); // Creating a material that reflects light with the variables RGB
    sphere(100, 100, 100); //Creating the center sphere with radius 100 and detail in the x and y of 100
    translate(0,0,0); // Moving it into the center of the canvas
    pop(); // Ending the encapsulation of the previous 3 lines

    camera(500*sin(PI*rotation/180),0,500*cos(PI*rotation/180),0,0,0,1,1,0); // This is taking the variable rotation and moving the camera around in 3D space depending on the value of the slider

    for (var i = 0; i < this.planets.length; i++) // This for loop cycles through every item in planets
    {
      this.planets[i].s = this.planets[i].c * multiplier; //  and sets the speed of each planet to the constant x the multiplier
      this.planets[i].setCoords(millis(), Orbit); // and then calls setCoords to move it
      this.planets[i].display(red,green,blue); // and then displays them with the colour 
    }
    Ring(Orbit,red,green,blue);

    function Ring(r,red,green,blue){
      push();
      specularMaterial(255-red,green,255-blue);
      torus(r/2,5,100,100);
      pop();
    }
  }

  spawn() {
    var planet1 = new Planet();
    planet1.s, planet1.c = random(0.0001, 0.004);
    planet1.r = random(20, 70);
    this.planets.push(planet1);
  }


  despawn(){
    this.planets = [];
  }

}

class Planet{
  constructor(x,y,r,s) {
    this.r = r/2;

    }
  setCoords(millis, rOrbit) {
    this.x = sin(millis * this.s) * rOrbit/2;
    this.y = cos(millis * this.s) * rOrbit/2;
  }
  display(red,green,blue) {
    push();
    specularMaterial(255-red,255-green,255-blue);
    translate(this.x, this.y, 0);
    sphere(this.r/3, 100, 100);
    pop();
  }
}
