console.log("hello")

//General Brick class
class Bricks {
    constructor (type, hp){
        this.type = type;
        this.hp = hp;
    }
}
//End Brick Class

// Class extends

class FirstBrick extends Bricks {
    constructor (type, hp){
        super(type, hp)
        this.type = type;
        this.hp = 1;
    }
}




///Rendering the graphics requres use of the Canvas element. Referencing it here in Javascript.

const canvas = document.getElementById("brickCanvas"); // Storing a reference to the HTML canvas element to the canvas variable. Then creating a ctx variable to store the 2d renders. 
const ctx = canvas.getContext("2d");


//For my own learning (BELOW), below is the canvas creation of a red square.

/* ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false); //For drawing purposes, false = clockwise, true = counter-clockwise. Probably not necessary to have here. 
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();


///blue stroked empty rectangle
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath(); */

/// THE ABOVE SECTION CAN BE DELETED IF NEED BE.



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); // the first 2 numbers are the x/y coordinates on the screen, the 3rd is size/radius. The 4th is...fill? Maybe? x was originally 50, y was originally 50. They are replaced here as 'x' and 'y' to help make them move. See below.
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); /// THIS LINE OF CODE IS ESSENTIAL - IT CLEARS THE CANVAS BEFORE EACH FRAME, meaning the ball won't leave a train
    drawBall()
    x += dx;
    y += dy;
}
setInterval(draw, 10); // draw() will be executed within setInterval every 10 miliseconds. 
// All the above does is draw the ball every 10 milliseconds. Below will make it move.

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

// Collission detection:

const ballRadius = 10;


