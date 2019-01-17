class Creation{

  constructor(renderer){
    Creation.USE_P5 = renderer;
    Creation.check = 1;
    Creation.planets = []; // This is a list of all the planets
    var planet1 = new Planet(); // Creating a first initial planet calling the class Planet
    planet1.s, planet1.c = 0.002; // Setting the speed and constant to 0.002
    planet1.r = 35; // Setting the radius to 35
    Creation.planets.push(planet1); // Adding it to the list of planets
    createCanvas(500, 500, WEBGL); // Creates a 3D canvase of size 500x500 using p5.rendererGL
    frameRate(60);
  }

  draw() {
    if (Creation.check == 1 & Creation.USE_P5 == true){
      Creation.renderer = createGraphics(500,500, WEBGL);
      Creation.check = 0
    }
    else if (Creation.USE_P5 == false){
      Creation.renderer = undefined;
      Creation.check = 1;
    }
    Creation.USE_P5 = document.getElementById("use_p5").checked;
    var locX = mouseX - width/2; // Creating a variable for the mouse X coordinates
    var locY = mouseY - height/2; // Creating a variable for the mouse Y coordinates
    var red = document.getElementById("red").value; // Getting value of red slider from HTML
    var green = document.getElementById("green").value; // Getting value of green slider from HTML
    var blue = document.getElementById("blue").value; // Getting value of blue slider from HTML
    var rotation = document.getElementById("angle1").value; // Getting the value of angle slider from HTML
    var Orbit = document.getElementById("orbit").value; // Getting the value of orbit slider from HTML
    var multiplier = document.getElementById("speed").value; // Getting the value of speed slider from HTML
    document.getElementById("reset_plan").addEventListener("click", this.despawn); // This is an eventlistener looking for the click of the button in the HTML to reset the planet list.
    if (Creation.renderer == undefined){
      background(233); // Setting the background to near white
      pointLight(250,250,250, locX, locY, 600); // Setting a point light in 3D space to follow the mouse
      ambientLight(50); // Adding an ambient light so it is visible
    }
    else{
      background(0);
      Creation.renderer.background(233);
      Creation.renderer.pointLight(250,250,250,locX,locY,600);
      Creation.renderer.ambientLight(50);
    }


    push(); // Start new drawing state
    specularMaterial(red,green,blue); // Creating a material that reflects light with the variables RGB
    if (Creation.renderer == undefined){
      sphere(100, 100, 100); //Creating the center sphere with radius 100 and detail in the x and y of 100
    }
    else{
      Creation.renderer.sphere(100,100,100);
    }
    translate(0,0,0); // Moving it into the center of the canvas
    pop(); // Return to original drawing state
    if (Creation.renderer == undefined){
      camera(500*sin(PI*rotation/180),0,500*cos(PI*rotation/180),0,0,0,1,1,0); // This is taking the variable rotation and moving the camera around in 3D space depending on the value of the slider
    }
    for (var i = 0; i < Creation.planets.length; i++) // This for loop cycles through every item in planets
    {
      Creation.planets[i].s = Creation.planets[i].c * multiplier; //  and sets the speed of each planet to the constant x the multiplier
      Creation.planets[i].setCoords(millis(), Orbit); // and then calls setCoords to move it
      Creation.planets[i].display(red,green,blue); // and then displays them with the colour
    }
    Ring(Orbit,red,green,blue); // This is calling the function below with the variables

    function Ring(r,red,green,blue){ // This function draws the orbital ring
      push(); // Start new drawing state
      specularMaterial(255-red,green,255-blue); // Setting up the material of the torus to be different to the planet
      if (Creation.renderer == undefined){
        torus(r/2,5,100,100); // Torus where the parameters are radius, thickness, detail-in-x and detail-in-y
      }
      else{
        Creation.renderer.torus(r/2,5,100,100);
      }
      pop(); // Return to original drawing state
    }
    if (Creation.renderer){
      rotateX(frameCount * 0.01);
      rotateY(frameCount * 0.02);
      texture(Creation.renderer);
      box(200,200);
    }
  }

  spawn() { // This function is called when an event happens in the index.js e.g. mousepressed, it spawns a new planet
    var planet1 = new Planet(); // This is creating a new planet using the class Planet
    planet1.s, planet1.c = random(0.0001, 0.004); // This is setting the speed and constant to a random number
    planet1.r = random(20, 70); // Setting the radius to a random number in that range
    Creation.planets.push(planet1); // Adding it to the list of planets
  }


  despawn(){ // This function is called on an event in index.js e.g. keypressed. It removes all the orbiting planets
    Creation.planets = []; // Making the list of planets empty again
  }

}

class Planet{ // This class is called to create a new orbiting planet
  constructor(x,y,r,s) { // Constructor needed to use the variables this.x, this.y, this.r, this.s
    }
  setCoords(millis, rOrbit) { // This function is what is called for every planet on every draw call
    this.x = sin(millis * this.s) * rOrbit/2; // Sets the x coordinates for the planet by using a sine function
    this.y = cos(millis * this.s) * rOrbit/2; // Sets the y coordinates for the planet by using a cosine function
  }
  display(red,green,blue) { // This is the function that makes the planets appear in the new positions
    push(); // Start new drawing state
    specularMaterial(255-red,255-green,255-blue); // Setting a material that is different to other two whilst still using the sliders
    translate(this.x, this.y, 0); // This moves the sphere in 3D space by using the previously calculated x and y coordinates
    if (Creation.renderer == undefined){
      sphere(this.r/3, 100, 100); // Creates a sphere of radius this.r/3 so it is the right size on screen and of detail 100 in x and y.
    }
    else{
      Creation.renderer.sphere(this.r/3, 100, 100);
    }
    pop(); // Return to original drawing state
  }
}
