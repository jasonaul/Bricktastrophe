//==============================================================
// Storing a reference to the HTML canvas element to the canvas variable. Then creating a ctx variable to store the 2d renders.
//==============================================================



const canvas = document.getElementById("brickCanvas"); 
const ctx = canvas.getContext("2d");

//==============================================================
// Global Variables
//==============================================================

const brickWidth = 75;   //BRICK_W
const brickHeight = 20;  // BRICK_H
const brickPadding = 10;  // BRICK_GAP
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickColumns = 3; //BRICK_COLS
const brickRows = 12; // BRICK_ROWS
var brickGrid = new Array(brickColumns * brickRows);
var brickCount = 0;
var numChoice = 0;
var status = 1;
ballX = 75;
ballY = 75;





//==============================================================
// Brick class
//==============================================================

class Brick {
    constructor (position, status){
        let numeral = [1, 2, 3]
        //health of 1,2 or 3)
        /* this.numChoice = 0; */
        
        var hp = 1  + Math.floor(Math.random() * numeral[numChoice]); 
        this.status = hp;
        this.colorArray = ["#ff0000" , "#FFA500", "#0095DD"];

        /* this.brick = null; */

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


        }

        brickReset () {
            brickCount = 0;
            var i;
            /* for (var i = 0; i < 3 * brickColumns; i++){
                brickGrid[i] = false;
            } */
            for (; i < brickColumns * brickRows; i++){
                if(Math.random() < 0) {
                    brickGrid[i] = true;
                    console.log("SLKDFJLSKDJFLKSJDFLKSJDFLSJDKF", brickGrid[i])
                } else {
                    brickGrid[i] = false;
                }
                brickGrid[i] = true;
                brickCount ++;
            }
        }
       
        reDraw() {
                /* ctx.clearRect(0, 0, this.width, this.height); */
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = this.colorArray[this.status - 1];  
                ctx.fill();
                ctx.closePath();
        }
}

var brickles = new Brick (1)


//==============================================================
// gameManager Class
//==============================================================

class gameManager {
    constructor (startingRows, numColumns){
        this.numberOfColumns = numColumns;

        

        //Gives us flexibility to dynamically scale rows
        this.brickGrid = [];

        //start game with assigned number of rows:
        for (let i = 0; i < startingRows; i++){
            /* console.log(i); */

            //Create a brick for each column

            var rowArray = [];


            for (let j = 0; j < numColumns; j++){
                //create brick and store in array for traceability
                var brick = new Brick([i,j],);
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

        console.log(rowPosition);
        var rowCollection = this.brickGrid[rowPosition];
        for (let i = 0; i < rowCollection.length; i++){
            var myBrick = rowCollection[i];

            if (myBrick.status > 0) {
                rowDepleted = false; {
                    
                }
        
            } 
        }

        

        /* console.log('ROWDEPLETED', rowDepleted); */
        return rowDepleted;
        

        
    }

    collisionDetection() {

        var bricksMatrix = manager.brickGrid;
    
        for (let r = 0; r < bricksMatrix.length; r++){
            for (let c = 0; c < bricksMatrix[r].length; c++) {
                let b = bricksMatrix[r][c]
              
                if (b.status >= 1) {
                    if (x > b.x && x < b.x+b.width && y > b.y && y < b.y+b.height){
                        ballSpeedY = -ballSpeedY;
                        b.status = b.status - 1;
    
                        console.log('MANAGER HERE', manager)

    
                        //IS ROW GONE?
                        var isRowDepleted = manager.isRowDepleted(b);
    

                        score ++;
                        brickCount --;
                        console.log("BRIRRIRIRIRIRIRIRIRIRIRIRIRIR", brickCount)
    
                        

                       
                    }
                }
            }
        }
    }

    

}





//==============================================================
// Global Variables
//==============================================================


    var interval = setInterval(draw, 10); 
        // draw() will be executed within setInterval every 10 miliseconds.
        // All the above does is draw the ball every 10 milliseconds. Below will make it move.

    let x = canvas.width/2;
    let y = canvas.height-30;

    let ballSpeedX = 10;   
    let ballSpeedY = -10;
        // The above two lines, dx and dy, affect speed, for the game.

    let score = 0;

    const paddleHeight = 10;
    const paddleWidth = 300;
    let paddleX = (canvas.width-paddleWidth) / 2;
        // Defining a paddle to hit the ball    

    const ballRadius = 10; //Setting this as the radius for use above.


    var manager = new gameManager(12,3);
    /* draw(); */

//==============================================================
// Draw Functions
//==============================================================

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
    manager.collisionDetection()
    /* ballBrickColl() */

     var bricksMatrix = manager.brickGrid;

    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            var brick = bricksMatrix[r][c];
            brick.draw();
           
        }
    }

    
    drawScore()
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

    //You've used the things below in the if brickCount == - 36 statement
    
/* brickles.brickReset(); */
/* brickles.draw(); */
/* manager.collisionDetection */

    if (brickCount == -36) {
        
        /* numChoice++; */
        
        let brickCount = 0;
        
        new gameManager(12,3);
        newCollision
        console.log("NEW BRICK COUNT", brickCount)
        
        
        
    }
   
}

var newCollision = draw();



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



/// Score - drawing the score on the canvas. 

function drawScore () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
