# Planet
An adapted script based on the p5.js project, based on Santiago Fiorino's [Orbits](https://www.openprocessing.org/sketch/567018), licensed under [CC BY-AS-3.0](https://creativecommons.org/licenses/by-sa/3.0/)

# Methods and parameters
## planet.js
The component consists of 2 classes: **Creation** and **Planet**.
### Creation
**constructor(renderer)**

The constructor takes 1 parameter `renderer` which is a boolean value used to check whether the optional `p5.renderer` is wanting to be used or not. If no value is given, it won't be used as there are checks later in the component for `IF renderer IS undefined`. It stores this value to new a variables of the name `UES_P5` prefixed with `Creation.` so that it is unique to the class and can be accessed when needed. The constructor then goes on to create a variable called `check`, a list called `planets` and a new variable called `planet1` which is the initial planet shown when first loaded. It then sets `planet1`'s speed and constant (denoted by `planet1.s` and `planet1.c` respectively) to starting values and then adds it to the list `planets` so that it can be stored. The last thing that it does is `createCanvas` with the parameters `500,500,WEBGL` which means 500 pixels tall, 500 pixels wide and render using the WEBGL method for 3D objects. All of the variables other than `planet1` follow the convention of being prefixed with `Creation.` so that they can be accessed when needed from anywhere within in the component.
