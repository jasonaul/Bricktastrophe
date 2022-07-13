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

function drawPaddle (){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function drawBricks (){
    for(let c=0; c < brickColumnCount; c++){
        for (let r=0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1){ //this if statement and status refers to the 'status' down below, indicating if the brick should be on screen or not
                let brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); /// THIS LINE OF CODE IS ESSENTIAL - IT CLEARS THE CANVAS BEFORE EACH FRAME, meaning the ball won't leave a train
    drawBall()
    drawPaddle()
    drawBricks()
    collisionDetection()
    drawScore()
    x += dx;
    y += dy;

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }///adding in the ballRadius means the ball doesn't "disappear" into the wall as it hits

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy; ///this else-if is for collission detection with the paddle.
        }
        else {alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
    }  

    if(rightPressed){
        paddleX += 7;
        //the next lines keep the paddle on the screen
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed){
        paddleX -=7;
        //the next lines keep the paddle on the screen
        if (paddleX < 0) {  ///why is this 0? Basically, because of x/y coordinates. an x of 0 means you are all the way to the left as it is. 
            paddleX = 0;
        }
    }
    
}


var interval = setInterval(draw, 10); // draw() will be executed within setInterval every 10 miliseconds. 
// All the above does is draw the ball every 10 milliseconds. Below will make it move.

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 5;   ///THESE TWO, dx and dy, affect speed, for the game.
let dy = -5;

let score = 0;

/// THE BRICK VARIABLES (below) ///

let brickRowCount = 15;
let brickColumnCount = 7;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
    //above, we've defined the number of rows and columns of bricks, their width and height, padding between bricks, etc.

    //below, holding bricks in a two-dimensional array. Will contain columns (c), which in turn contains rows (r), which each contain an object containing the x and y position to paint each brick on the screen.

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1}; //we added a "status" property/parameter to indicate whether we watn to paint each brick on screen or not
    }
}

/// THE BRICK VARIABLES (above) ///


// Defining a paddle to hit the ball

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

// Collission detection:

const ballRadius = 10; //Setting this as the radius for use above.




        //Top wall collission detection. IF ball touches wall, it reverse direction.
        /* if (y + dy < 0) {
            dy = -dy;
        }

        if (y + dy > canvas.height) {
            dy = -dy;
        } */
        /* 
        // The above two if's can be combined into one statement to save on code:

        if (y + dy > canvas.height || y + dy < 0) {
            dy = -dy;
        }


        //For left and right wall detection, its basically the same as above, just repeated for x instead of y.

        if (x + dx > canvas.width || x + dx < 0) {
            dx = -dx;
        } */

        // THE IMMEDIATE CODE ABOVE IS INSERTED INTO THE draw() function FOR IT TO WORK. 



// Paddle in motion

var rightPressed = false;
var leftPressed = false; // False to start, because false = not pressed, and no one starts off the game with something moving.

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false); //These two event listenrs are only looking for if ANY key is pressed down or ANY key is released. You can use these to create functions for specific keys now, and what they do. See below.

function keyDownHandler(e) { // 'e' is simply an event as a parameter, represented as 'e' here.
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }  /// 'Right' and 'Left are specific for IE/edge browsers, where as 'ArrowRight' etc. is for all other browsers. Putting them both in ensures universal compatibility. 
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

//We now need to add paddle moving logic, which will be stored in the draw() function. Look above for rightPressed and leftPressed to see whats going on. 



/// Ball collision detection
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                dy = -dy;
                b.status = 0;
                score ++; // this adds to the score function we have below
                if(score == brickRowCount * brickColumnCount) {
                    alert("YOU WIN!");
                    document.location.reload();
                    clearInterval(interval);
                }
            }
        }
    }
} }



/// Score - drawing the score on the canvas. Try finding a different method after you learn this.

function drawScore () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}