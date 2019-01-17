# Planet
An adapted script based on the p5.js project, based on Santiago Fiorino's [Orbits](https://www.openprocessing.org/sketch/567018), licensed under [CC BY-AS-3.0](https://creativecommons.org/licenses/by-sa/3.0/)

# Methods and parameters
## planet.js
The component consists of 2 classes: **Creation** and **Planet**.
### Creation
**constructor(renderer)**

The constructor takes 1 parameter `renderer` which is a boolean value used to check whether the optional `p5.renderer` is wanting to be used or not. If no value is given, it won't be used as there are checks later in the component for `IF renderer IS undefined`. It stores this value to new a variables of the name `UES_P5` prefixed with `Creation.` so that it is unique to the class and can be accessed when needed. The constructor then goes on to create a variable called `check`, a list called `planets` and a new variable called `planet1` which is the initial planet shown when first loaded. It then sets `planet1`'s speed and constant (denoted by `planet1.s` and `planet1.c` respectively) to starting values and then adds it to the list `planets` so that it can be stored. It then does `createCanvas` with the parameters `500,500,WEBGL` which means 500 pixels tall, 500 pixels wide and render using the WEBGL method for 3D objects. The last thing that it does is set `frameRate` to `60` so that it will update 60 times a second and won't be unnecessarily computationally expensive. All of the variables other than `planet1` follow the convention of being prefixed with `Creation.` so that they can be accessed when needed from anywhere within in the component.

`planet.s` is the 'speed' variable for the planet orbiting around the larger planet. `planet.c` is set as the same value when it is created as it is a constant value so that the speed can be changed to the constant times the input of the speed slider every `draw` call without being exponentially increased. `planet.r` is the value of the radius of the initial planet which is used in the `Planet()` class when creating the sphere.

**draw()**

The `draw` function takes no parameters. It is a function that is called every frame, which in this case is 60 times a second. There is first of all an if statement
```javascript
if (Creation.check == 1 & Creation.USE_P5 == true){
    Creation.renderer = createGraphics(500,500, WEBGL);
    Creation.check = 0
  }
  else if (Creation.USE_P5 == false){
    Creation.renderer = undefined;
    Creation.check = 1;
  }
```
which is used to check if `Creation.check` is equal to `1` and the variable `USE_P5` is true. If they both are then it will make a variable `renderer` to `createGraphics` with parameters `500,500,WEBGL` which are the same dimensions as the canvas as it will be used to project onto a `p5.renderer` object instead of straight onto the canvas. It will also set `check` to 0 so that it won't continuously create `WEBGL` objects and crash the webpage.
