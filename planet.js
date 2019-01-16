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
    document.getElementById("reset_plan").addEventListener("click", function Despawn(){
      this.planets = [];
    });
    background(233); // Setting the background to near white
    pointLight(250,250,250, locX, locY, 50); // Setting a point light in 3D space to follow the mouse
    ambientLight(50); // Adding an ambient light so it is visible


    push(); // Only affects this shape inside the push pop
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
    Ring(Orbit,red,green,blue); // This is calling the function below with the variables

    function Ring(r,red,green,blue){ // This function draws the orbital ring
      push(); // This makes sure that it only effects what is inside the push, pop part
      specularMaterial(255-red,green,255-blue); // Setting up the material of the torus to be different to the planet
      torus(r/2,5,100,100); // Torus where the parameters are radius, thickness, detail-in-x and detail-in-y
      pop(); // Ending the encapsulation of the previous 2 lines
    }
  }

  spawn() { // This function is called when an event happens in the index.js e.g. mousepressed, it spawns a new planet
    var planet1 = new Planet(); // This is creating a new planet using the class Planet
    planet1.s, planet1.c = random(0.0001, 0.004); // This is setting the speed and constant to a random number
    planet1.r = random(20, 70); // Setting the radius to a random number in that range
    this.planets.push(planet1); // Adding it to the list of planets
  }


  despawn(){ // This function is called on an event in index.js e.g. keypressed. It removes all the orbiting planets
    this.planets = []; // Making the list of planets empty again
  }

}

class Planet{ // This class is called to create a new orbiting planet
  constructor(x,y,r,s) { // This is the constructor so what is done automatically
    this.r = r/2; // This sets the radius value to be halved as it is given as a diameter

    }
  setCoords(millis, rOrbit) { // This function is what is called for every planet on every draw call
    this.x = sin(millis * this.s) * rOrbit/2; // Sets the x coordinates for the planet by using a sine function
    this.y = cos(millis * this.s) * rOrbit/2; // Sets the y coordinates for the planet by using a cosine function
  }
  display(red,green,blue) { // This is the function that makes the planets appear in the new positions
    push(); // Encapsualtes the next 3 lines so that they only effect this one object
    specularMaterial(255-red,255-green,255-blue); // Setting a material that is different to other two whilst still using the sliders
    translate(this.x, this.y, 0); // This moves the sphere in 3D space by using the previously calculated x and y coordinates
    sphere(this.r/3, 100, 100); // Creates a sphere of radius this.r/3 so it is the right size on screen and of quality 100 in x and y.
    pop(); // Ends the encapsulation of the previous 3 lines.
  }
}
