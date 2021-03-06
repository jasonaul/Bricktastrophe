//==============================================================
// Storing a reference to the HTML canvas element to the canvas variable. Then creating a ctx variable to store the 2d renders.
//==============================================================
let score = 0;
var highscore = 0;

function doAllTheThings() {
    const element = document.getElementById("button-id")
    element.remove();

const canvas = document.getElementById("brickCanvas"); 
const ctx = canvas.getContext("2d");



//==============================================================
// Power Ups
//==============================================================

const powerupChance = 1; // probability of a powerup per brick hit (between 0 and 1)
const powerupSpeed = 0.15;

const powerupType = {
    EXTENSION: {color: "black", symbol: "="},
    STICKY: {color: "green", symbol: "~"}
}

let powerups = [];
var powerExtension, powerSticky, powerSuper


//==============================================================
// Global Variables
//==============================================================

        /**********
        Brick Variables
        ***********/
const brickWidth = 75;   
const brickHeight = 20;  
const brickPadding = 10;  
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickColumns = 3; 
const brickRows = 12; 
var brickGrid = new Array(brickColumns * brickRows);
var brickCount = 0;
var numChoice = 0;
/* var status = 1; */

var timer;
let timeStart = 0;

        /**********
        Ball Variables
        ***********/
ballX = 75;
ballY = 75;
const ballRadius = 12; 
let ballSpeedX = 5 ;   
let ballSpeedY = -5;


var interval = setInterval(draw, 10); 
// draw() will be executed within setInterval every 10 miliseconds.
// All the above does is draw the ball every 10 milliseconds. Below will make it move.

        /**********
        Paddle Variables
        ***********/

let x = canvas.width/2;
let y = canvas.height-30;
const paddleHeight = 20;
const paddleWidth = 125;
let paddleX = (canvas.width-paddleWidth) / 2;
// Defining a paddle to hit the ball    



//==============================================================
// Brick class
//==============================================================

class Brick {

    constructor (position, status){
        let numeral = [1, 2, 3, 4, 5, 6, 7, 8]
        //health of 1,2 or 3)

        
        var hp = 1  + Math.floor(Math.random() * numeral[numChoice]); 

        this.status = hp;
        this.colorArray = ["#ff0000" , "#FFA500", "#0095DD", "#ddff00", "#000000", "#16e038", "#e534eb", "#c9e6b3"];



        this.width = brickWidth;
        this.height = brickHeight;
        this.position = position;

        let brickX = (this.position[1]*(this.width + brickPadding)) + brickOffsetLeft;
        let brickY = (this.position[0]*(this.height + brickPadding)) + brickOffsetTop;

        this.x = brickX;
        this.y = brickY;

    }

    getColor() {
        return this.color
    }

    getHP() {
        return this.status
    }

    draw() {

        if(this.status >= 1){
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.colorArray[this.status - 1];  
            ctx.stroke();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.closePath();
        }


    }
}

let totalHP = [];


var brickles = new Brick (1)

//==============================================================
// gameManager Class
//==============================================================


class gameManager {
    constructor (startingRows, numColumns){
        this.numberOfColumns = numColumns;
        this.bricks = 0;
        this.brickGrid = [];
        this.brickHP = 0;

        //start game with assigned number of rows:
        for (let i = 0; i < startingRows; i++){

            //Create a brick for each column

            var rowArray = [];
            /* console.log("ROW ARRRRAAAAAYYYYY", rowArray) */

            for (let j = 0; j < numColumns; j++){
                //create brick and store in array for traceability
                var brick = new Brick([i,j],);
                this.bricks++;
                /* brick.getHP; */
                this.brickHP = this.brickHP + brick.getHP()

                /* console.log("BRICKS", this.brickHP) */
                brick.draw();

                rowArray.push(brick);
              
            }



            this.brickGrid.push(rowArray);
            
        }
    }
       
    isRowDepleted(brick){

        var rowPosition = brick.position[0];
        //Check all bricks in this row:


        var rowDepleted = true;


        var rowCollection = this.brickGrid[rowPosition];
        for (let i = 0; i < rowCollection.length; i++){
            var myBrick = rowCollection[i];

            if (myBrick.status > 0) {
                rowDepleted = false; {
                    
                }
        
            } 
            
        }

/*         function allAreTrue(myBrick){
            return myBrick.every(element => element === true);
        }
        console.log(allAreTrue(myBrick))

        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%", rowDepleted) */
        return rowDepleted;
  
    }
    stop() {
        console.log('stop game')
    }
}

//==============================================================
// Global Draw Functions
//==============================================================

var manager = new gameManager(12,3);


var soundHit = new Audio('../sounds/hit.wav')
var soundPaddle = new Audio ('../sounds/clap.wav')


function collisionDetection() {

    var bricksMatrix = manager.brickGrid;
    
    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            let b = bricksMatrix[r][c]



          
            if (b.status >= 1) {
                if (x > b.x && x < b.x+b.width && y > b.y && y < b.y+b.height){
                    ballSpeedY = -ballSpeedY;
                    b.status = b.status - 1; 
                    soundHit.play();
                    
                    


                    //IS ROW GONE?
                    var isRowDepleted = manager.isRowDepleted(b);


                    score ++;
                    brickCount --;
                    manager.brickHP--;
                    console.log(manager.brickHP)
                }

        /**********
        Grid Repeat / Redraw
        ***********/

                if (manager.brickHP == 0) {
        
                    if (score >=700) {
                        let numChoice = 7;
                        manager = new gameManager(12,3);
                    }
                    else{
                    numChoice ++
                    brickCount = 0;
                    drawBall2();
                    
                    manager = new gameManager(12,3);}
                    

                                       
                    
                }


            }
        }
    }
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); // the first 2 numbers are the x/y coordinates on the screen, the 3rd is size/radius. The 4th is...fill? Maybe? x was originally 50, y was originally 50. They are replaced here as 'x' and 'y' to help make them move. See below.
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function drawBall2() {
    ctx.beginPath();
    ctx.arc(x+1, y-1, ballRadius, 0, Math.PI*2); // the first 2 numbers are the x/y coordinates on the screen, the 3rd is size/radius. The 4th is...fill? Maybe? x was originally 50, y was originally 50. They are replaced here as 'x' and 'y' to help make them move. See below.
    ctx.fillStyle = "#00ff08";
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
    /* drawPowerUps() */
    collisionDetection()

     var bricksMatrix = manager.brickGrid;

    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            var brick = bricksMatrix[r][c];
            brick.draw();
           
        }
    }

    
    drawScore()
    drawTimer()
    x += ballSpeedX;
    y += ballSpeedY;

    if (x + ballSpeedX > canvas.width-ballRadius || x + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
       
    }///adding in the ballRadius means the ball doesn't "disappear" into the wall as it hits

    if (y + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    } else if (y + ballSpeedY > canvas.height-ballRadius || y + ballSpeedY < ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY; ///this else-if is for collission detection with the paddle.
            soundPaddle.play();
        }
        else {alert("GAME OVER");
       /*  document.location.reload(); */
       window.location.reload(false);
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




//==============================================================
// Player Controls
//==============================================================

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



//==============================================================
// Score
//==============================================================

function drawScore () {
    ctx.font = "700 22px Arial";
    ctx.strokeStyle = "#dd0000";
    ctx.strokeFill = "#0062ff";
    ctx.lineWidth = 2;
    ctx.strokeText("Score: " + score, 8, 20);
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + score, 8, 20);
    
    
}

function updateTimer(){
    timeStart = timeStart + 1;
}

timer = setInterval(updateTimer, 1000);
updateTimer();

function drawTimer () {
    ctx.font = "700 22px Arial";
    ctx.strokeStyle = "#1c09ed";
    ctx.strokeFill = "#0062ff";
    ctx.lineWidth = 2;
    ctx.strokeText("Timer: " + timeStart, 220, 20);
    ctx.fillStyle = 'white';
    ctx.fillText("Timer: " + timeStart, 220, 20);
}





    }
let startButton = document.getElementById("button-id");
startButton.addEventListener("click", doAllTheThings)

