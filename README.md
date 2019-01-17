# Planet
An adapted script based on the p5.js project, based on Santiago Fiorino's [Orbits](https://www.openprocessing.org/sketch/567018), licensed under [CC BY-AS-3.0](https://creativecommons.org/licenses/by-sa/3.0/)

# Methods and parameters
## planet.js
The component consists of 2 classes: **Creation** and **Planet**.
### Creation
**constructor(renderer)**

The constructor takes 1 parameter `renderer` which is a boolean value used to check whether the optional `p5.renderer` is wanting to be used or not. If no value is given, it won't be used as there are checks later in the component for `IF renderer IS undefined`. It stores this value to new a variables of the name `UES_P5` prefixed with `Creation.` so that it is unique to the class and can be accessed when needed. The constructor then goes on to create a variable called `check`, a list called `planets` and a new variable called `planet1` which is the initial planet shown when first loaded. It then sets `planet1`'s speed and constant (denoted by `planet1.s` and `planet1.c` respectively) to starting values and then adds it to the list `planets` so that it can be stored. It then does `createCanvas` with the parameters `500,500,WEBGL` which means 500 pixels tall, 500 pixels wide and render using the WEBGL method for 3D objects. The last thing that it does is set `frameRate` to `60` so that it will update 60 times a second and won't be unnecessarily computationally expensive. All of the variables other than `planet1` follow the convention of being prefixed with `Creation.` so that they can be accessed when needed from anywhere within in the component.

`planet.s` is the 'speed' variable for the planet orbiting around the larger planet. `planet.c` is set as the same value when it is created as it is a constant value so that the speed can be changed to the constant times the input of the speed slider every `draw` call without being exponentially increased. `planet.r` is the value of the radius of the initial planet which is used in the `Planet()` class when creating the sphere.

**draw(renderer)**

The `draw` function takes 1 parameter: `renderer` which is passed in to check if `p5.renderer` is being used or not. It is a function that is called every frame, which in this case is 60 times a second. There is first of all a declaration of `Creation.USE_P5` followed by if statement
```javascript
Creation.USE_P5 = renderer || false;
if (Creation.check == 1 & Creation.USE_P5 == true){
    Creation.renderer = createGraphics(500,500, WEBGL);
    Creation.check = 0
  }
  else if (Creation.USE_P5 == false){
    Creation.renderer = undefined;
    Creation.check = 1;
  }
```
which sets `Creation.UES_P5` to the parameter passed into draw (if none given it defaults to `false`) and then checks if `Creation.check` is equal to `1` and the variable `Creation.USE_P5` is `true`. If they both are then it will make a variable `Creation.renderer` to `createGraphics` with parameters `500,500,WEBGL` which are the same dimensions as the canvas as it will be used to project onto a `p5.renderer` object instead of straight onto the canvas. It will also set `Creation.check` to 0 so that it won't continuously create `WEBGL` objects and crash the webpage. If this check doesn't pass then it will do an `else if` statement to see if `Creation.USE_P5` is `false` and if it is then it will make `Creation.renderer` be an `undefined` which is used in checks later in the component. It also resets `Creation.check` to 1 so that it can return to the `p5.renderer`.

The next part of the module is defining various variables and fetching values from interactive sliders and checkboxes that are in the HTML file.
```javascript
Creation.USE_P5 = document.getElementById("use_p5").checked;
var locX = mouseX - width/2;
var locY = mouseY - height/2;
var red = document.getElementById("red").value;
var green = document.getElementById("green").value;
var blue = document.getElementById("blue").value;
var rotation = document.getElementById("angle1").value;
var Orbit = document.getElementById("orbit").value;
var multiplier = document.getElementById("speed").value;
document.getElementById("reset_plan").addEventListener("click", this.despawn);
```
Going through this line by line, `Creation.USE_P5` is being set to the value of the checkbox in the HTML file with the ID of `use_p5` which is an ID used to identify the input required for this. This is using a `getElementById` which is a getter to retrieve the value being sent by the `document`'s interactive element.

The variables `locX` and `locY` are set by using the `mouseX` and `mouseY` features of `p5.js` respectively. They then take away the width/height divided by 2 so that they are where the mouse is on screen. This means that these values can then be used to make an object follow the mouse on the canvas.

The variables `red`, `green` and `blue` also uses the `document.getElementById` to retrieve the values from three different sliders with the ID the same as the name as the variable. These values are used to set the colours of the various objects generated within in the component.

The variables `rotation`, `Orbit` and `multiplier` are again obtained from using the `document.getElementById` method. `rotation` is used to rotate the camera around the scene later on in `draw()`. `Orbit` is used for the radius of the orbital ring and to calculate the path of the smaller planets that orbit around the larger planet. `multiplier` is used to multiply `planet.c` to set `planet.s` to a new speed controlled by the slider.

The next part of `draw()` is another if statement:
```javascript
if (Creation.renderer == undefined){
  background(233);
  pointLight(250,250,250, locX, locY, 600);
  ambientLight(50);
}
else{
  background(0);
  Creation.renderer.background(233);
  Creation.renderer.pointLight(250,250,250,locX,locY,50);
  Creation.renderer.ambientLight(50);
}
```

This is used to check if `Creation.renderer` is `undefined` and if it is then it will draw a `background` of colour `233` on a scale of `0-255`, where `0` is black and `255` is white. It then creates a `pointLight` with the RGB values of `250` and at the XY coordinates of the mouse and Z coordinate of `600`. This means that the point light will follow the mouse in 2D space on the 3D canvas and stay in the same Z plane. It then creates an `ambientLight` which is general light in the scene so things aren't in complete darkness. This has a value of `50`.

Following this is rendering of the central planet:
```javascript
push();
specularMaterial(red,green,blue);
if (Creation.renderer == undefined){
  sphere(100, 100, 100);
}
else{
  Creation.renderer.sphere(100,100,100);
}
translate(0,0,0);
pop();
```

The `push()` and `pop()` create an isolated section of code where a new drawing method is initiated and then afterwards returns to the original drawing state. This means that it can change the materials of objects without changing the default/global settings.  Within this section there is the creation of a `specularMaterial` with `red`, `blue` and `green` as the parameters. This is creating a material that will reflect light with the given colour defined by the RGB values. This material is for the central planet. The if statement is again checking whether to use the `p5.renderer` or not and if it is then it will use `Creation.renderer.sphere` which is creating a sphere on the `renderer` instead of on the 3D canvas (which is in the `else` statement). This sphere is made with parameters `100,100,100` which means radius 100 and detail in X and Y of 100. The final `translate` statement means that it will move this sphere to the centre of the canvas which is what we want. The `pop()` returns to the original drawing style.

The camera movements are defined next:
```javascript
if (Creation.renderer == undefined){
  camera(500*sin(PI*rotation/180),0,500*cos(PI*rotation/180),0,0,0,1,1,0);
}
```

This is contained within another `if` statement to check for the optional `p5.renderer` and if it is `undefined` then it will move the camera around the canvas using a `sine` and `cosine` calculation to give the effect of orbiting the planet. This multiplies `500` (the size of the canvas) by the `sine`/`cosine` of `PI*rotation/180` which just converts it into radians from degrees. These change the `X` and the `Z` location of the camera as this gave the best results. The other 6 parameters are the centre of the camer in the `X`, `Y` and `Z` planes and the 'up' direction of the camera in `X`, `Y` and `Z` respectively. It is only implemented if not using the `p5.renderer` as it would move the camera around the 3D space when using that too which is not the desired result.


```javascript
this.Ring(Orbit,red,green,blue);
```

This calls the function called `Ring` defined below. It is given the parameters `Orbit`, `red`, `green` and `blue`. These are obtained from the sliders from the interaction between the HTML page and `planet.js`. The `this.` prefix is required as it is a function that is part of the `Creation` class. It also means that it can be called from an external `.js` file should anyone want to use the function by itself.

The last part of the `draw()` function is a final if statement:
```javascript
if (Creation.renderer){
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.02);
  texture(Creation.renderer);
  box(250,250);
}
```

This is checking if `Creation.renderer` is anything but `undefined` and if it is then it will make a box rotate at a slow rate by the `rotateX` and `rotateY` calls. The `texture` means that what is contained within the parentheses will be projected onto the box in 3D space. In this case it is the `Creation.renderer` which is what has been drawn to previously if the `p5.renderer` is enabled.


**Ring(r, red, green, blue, t)**

The `Ring` function takes five parameters: `r` which is the radius of the orbital path ring, `red`, `green` and `blue` which are RGB values for the colour of the material of the torus, and `t` which is the thickness of the torus.

```javascript
this.t = t || 5;
this.r = r || 250;
this.red = red || 255;
this.green = green || 255;
this.blue = blue || 255;
```

This is the initialisation of the variables in `Ring()`. It takes the given parameters and makes them as `this.` given parameter. If no parameters are passed to the function then there are default values specified by the `||` which means or.

```javascript
push();
specularMaterial(255-this.red,this.green,255-this.blue);
if (Creation.renderer == undefined){
  torus(this.r/2,this.t,100,100);
}
else{
  Creation.renderer.torus(this.rr/2,this.t,100,100);
}
pop();
```

Here there is another `push()` `pop()` clause. This is defining a new drawing section. There is a material for the torus that uses the passed parameters, but does `255-` the given value so that it is different to the main planet. Again, as there is an element being draw, there has to be an if statement to check if the `p5.renderer` is being used or not. If it is then it will be drawn to `Creation.renderer` instead of by itself on the canvas. The `torus` shape takes 4 parameters: the radius of the torus, the thickness of the torus and the detail in the X and Y directions.

**spawn()**

This function is called when a new planet is wanted to be created, e.g. `onMouseClick()` could call `Creation.spawn()` and then a new planet would be made orbiting the larger planet.

```javascript
var planet1 = new Planet()
planet1.s, planet1.c = random(0.0001, 0.004);
planet1.r = random(20, 70);
Creation.planets.push(planet1);
```

This method is the same as in the constructor for `Creation()`. It creates a temporary local var called `planet1` but this time sets `planet1.s` and `planet1.c` to a random value between `0.0001` and `0.004`. The same for `planet1.r` except between `20` and `70`. It then adds it to the list of planets.

**despawn()**

This is the function called to empty the list of planets and remove all from display. It can be called from another file to clear the list.

```javascript
 Creation.planets = [];
 ```

 This is all the code in `despawn()` it redefines the list of planets as an empty list.


### Planet

**setCoords(millis, rOrbit)**

The first function in `Planet` is `setCoords` which is what is called to update the location of the orbiting planets.

```javascript
this.x = sin(millis * this.s) * rOrbit/2;
this.y = cos(millis * this.s) * rOrbit/2;
```

It defines `this.x` and `this.y` by using a sine and cosine function. It uses `millis` which is the number of milliseconds passed between the last call and this call, multiplied with the `speed` of the planet. This inside the sine/cosine is then multiplied by the radius of the orbit over 2 as this is passed as a diameter.

**display(red, green, blue)**

This is the other function within `Planet` and it is used to display the orbiting planet.

```javascript
this.red = red || 0;
this.green = green || 255;
this.blue = blue || 255;
```

It initialises some local variables prefixed with `this.` and then makes them use the given parameters for the RGB values and gives alternate default values if none are passed through.

```javascript
push();
specularMaterial(255-this.red,255-this.green,255-this.blue);
translate(this.x, this.y, 0);
if (Creation.renderer == undefined){
  sphere(this.r/3, 100, 100);
}
else{
  Creation.renderer.sphere(this.r/3, 100, 100);
}
pop();
```

The next part is creating the smaller planets. It uses another `pop()` `push()` section to define new drawing method for this section. It sets up a `specularMaterial` using `255-` the local variabels. This means that it will again be a different colour to the other two `specularMaterial`s used previously. It then uses the `translate` to move them in the X and Y planes by the previously calculated `this.x` and `this.y` respectively. There is a final if statement to check for the use of the optinal `p5.renderer` and again if it is used it will draw it to `Creation.renderer` instead of the 3D canvas. Finally `pop()` to end the new drawing method. 
