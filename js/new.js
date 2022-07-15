console.log("hello")

//General Brick class
class Bricks {
    constructor (position){

        //health of 1,2 or 3)
        var hp = 1 + Math.floor(Math.random() * 3);
        this.status = hp;
        this.colorArray = ["#ff0000", "#FFA500", "#0095DD"];

/*         let brickRowCount = 15;
        let brickColumnCount = 7; */
        let brickWidth = 75;
        let brickHeight = 20;
        let brickPadding = 10
        let brickOffsetTop = 30;
        let brickOffsetLeft = 30;

        this.width = brickWidth;
        this.height = brickHeight;
        this.position = position;

        let brickX = (this.position[1]*(this.width + brickPadding)) + brickOffsetLeft;
        let brickY = (this.position[0]*(this.height + brickPadding)) + brickOffsetTop;

        this.x = brickX;
        this.y = brickY;

    }

        draw() {

            if(this.status >= 1){
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = this.colorArray[this.status - 1];  
                ctx.fill();
                ctx.closePath();
        }

            //debugger;
        }
       
   
}
//End Brick Class

class gameManager {
    constructor (startingRows, numColumns){
        this.numberOfColumns = numColumns;

        //Gives us flexibility to dynamically scale rows
        this.brickGrid = [];

        //start game with assigned number of rows:
        for (let i = 0; i < startingRows; i++){
            console.log(i);
            //Create a brick for each column

            var rowArray = [];

            for (let j = 0; j < numColumns; j++){
                //create brick and store in array for traceability
                var brick = new Bricks([i,j],);
                brick.draw();

                rowArray.push(brick);
            }

            this.brickGrid.push(rowArray);
        }
    }
       
        isRowDepleted(brick){

            var rowPosition = brick.position[0];
            //Check all bricks in this row:
            console.log(brick.position[0])

            var rowDepleted = true;

            var rowCollection = this.brickGrid[rowPosition];
            for (let i = 0; i < rowCollection.length; i++){
                var myBrick = rowCollection[i];

                if (myBrick.status > 0) {
                    rowDepleted = false; {
                        
                    }
                } 
            }

         

            return rowDepleted;

            
        }    
        if (rowDepleted = true) {
            brick.draw();
            /* rowArray.push(brick); */
        }

}

///Rendering the graphics requres use of the Canvas element. Referencing it here in Javascript.

const canvas = document.getElementById("brickCanvas"); // Storing a reference to the HTML canvas element to the canvas variable. Then creating a ctx variable to store the 2d renders.
const ctx = canvas.getContext("2d");

var interval = setInterval(draw, 10); // draw() will be executed within setInterval every 10 miliseconds.
// All the above does is draw the ball every 10 milliseconds. Below will make it move.

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 5;   ///THESE TWO, dx and dy, affect speed, for the game.
let dy = -5;

let score = 0;

// Defining a paddle to hit the ball
const paddleHeight = 10;
const paddleWidth = 175;
let paddleX = (canvas.width-paddleWidth) / 2;

// Collission detection:

const ballRadius = 10; //Setting this as the radius for use above.


var manager = new gameManager(12,3);
draw();


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



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); /// THIS LINE OF CODE IS ESSENTIAL - IT CLEARS THE CANVAS BEFORE EACH FRAME, meaning the ball won't leave a train
    drawBall()
    drawPaddle()

     var bricksMatrix = manager.brickGrid;

    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            var brick = bricksMatrix[r][c];
            brick.draw();
        }
    }


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

    var bricksMatrix = manager.brickGrid;

    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            let b = bricksMatrix[r][c]
            if (b.status >= 1) {
                if (x > b.x && x < b.x+b.width && y > b.y && y < b.y+b.height){
                    dy = -dy;
                    b.status = b.status - 1;

                    //IS ROW GONE?
                    var isRowDepleted = manager.isRowDepleted(b);

                    //LETS ADD MORE ROWS OF SHIT
                   

                    console.log("Brick hit belonged to row: " + r + " | Is row depleted? " + isRowDepleted);

                 /*
                    score ++; // this adds to the score function we have below
                    if(score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                    */
                }
            }
        }
    }
}


/// Score - drawing the score on the canvas. Try finding a different method after you learn this.

function drawScore () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}