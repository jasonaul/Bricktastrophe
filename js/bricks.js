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

//==============================================================
// Brick class
//==============================================================

class Brick {
    constructor (position){
        let numeral = [1, 2, 3]
        //health of 1,2 or 3)
        /* this.numChoice = 0; */
        
        var hp = 1  + Math.floor(Math.random() * numeral[numChoice]); 
        this.status = hp;
        this.colorArray = ["#ff0000" , "#FFA500", "#0095DD"];

        this.brick = null;

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

/*         brickReset () {
            brickCount = 0;
            var i;
            for (var i = 0; i < 3 * brickColumns; i++){
                brickGrid[i] = false;
            }
            for (; i < brickColumns * brickRows; i++){
                if(Math.random() < 0.5) {
                    brickGrid[i] = true;
                    console.log("SLKDFJLSKDJFLKSJDFLKSJDFLSJDKF", brickGrid[i])
                } else {
                    brickGrid[i] = false;
                }
                brickGrid[i] = true;
                brickCount ++;
            }
        } */
       
        reDraw() {
                /* ctx.clearRect(0, 0, this.width, this.height); */
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = this.colorArray[this.status - 1];  
                ctx.fill();
                ctx.closePath();
        }
}


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
            console.log(i);
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
    
   /*  newEverything () {
        Brick.numChoice = 2
        new gameManager(12, 3)
 
    }
 */
    createNewRow(){
       /* brickGrid.rowArray[11,0] */ 
       /* var moveRow = this.brickGrid.push[11] */
       var newRow = this.brickGrid[11]
       this.brickGrid.unshift[newRow]
       for (let i = 0; i < newRow.length; i++) {
           var myBrick = newRow[i]
           myBrick.reDraw();
       }
       /* this.brickGrid.unshift(0,0)   */   
    }

}



function brickReset () {
    brickCount = 0;
    var i;
  /*   for (var i = 0; i < 3 * brickColumns; i++){
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
        console.log("BRIRRIRIRIRIRIRIRIRIRIRIRIRIR", brickCount)
    }
    /* new Brick */
}




//==============================================================
// Global Variables
//==============================================================


    var interval = setInterval(draw, 10); 
        // draw() will be executed within setInterval every 10 miliseconds.
        // All the above does is draw the ball every 10 milliseconds. Below will make it move.

    let x = canvas.width/2;
    let y = canvas.height-30;

    let dx = 10;   
    let dy = -10;
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

     var bricksMatrix = gameManager.brickGrid;

    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            var brick = bricksMatrix[r][c];
            brick.draw();
           
        }
    }





    if (brickCount == -36) {
        numChoice ++;
        new gameManager(12,3);
        draw();
        
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


/// Ball collision detection
function collisionDetection() {

    var bricksMatrix = gameManager.brickGrid;

    for (let r = 0; r < bricksMatrix.length; r++){
        for (let c = 0; c < bricksMatrix[r].length; c++) {
            let b = bricksMatrix[r][c]
          
            if (b.status >= 1) {
                if (x > b.x && x < b.x+b.width && y > b.y && y < b.y+b.height){
                    dy = -dy;
                    b.status = b.status - 1;

                    console.log('MANAGER HERE', gameManager)
                  /*   console.log ("BRICK GRID", manager.rowArray) */

                    //IS ROW GONE?
                    var isRowDepleted = gameManager.isRowDepleted(b);


                    //LETS ADD MORE ROWS

                  
                    /*manager.brickGrid // This is the grid for the game
                    manager.isRowDepleted // Boolean

                    manager.brickGrid.unshift("VARIABLE") // The variable you want to go here. This will be how you add a new row. */


                  /*   for (let b = 0; b < bricksMatrix.length; b++){
                        if (b.status < 1) {
                            new gameManager(12, 12)
                        }
                    } */

/*                     const isTrue = manager.brickGrid.every(obj => obj.status == 0);
                    console.log ("IS TRUE TRUE TRUE", isTrue); */

/*                     const isTrue = bricksMatrix.every(obj => obj.status == 0)
                    console.log ("IS TRUE TRUE TRUE", isTrue);
                    
                    if (b.status == 0){
                        console.log ("THE STATUS IS ZEERRRRRROOOO")
                    } */

                    

/*                     let statuses = [];
                    console.log("SDKLJFHSLKDJFHLSKDJHFLKSJDHFKSJHDF", statuses)
                    for (let i = 0, j = 0; i < bricksMatrix.length, j < bricksMatrix.length; i ++, j ++) {
                        if (statuses.indexOf(bricksMatrix[i].status) === 0 && (bricksMatrix[j].status) === 0)
                        console.log("CHECHCHCEHECHCEHEHCECHECCHE", bricksMatrix[i].status)
                        statuses.push(bricksMatrix[i].status);}
                        if (statuses.length === 1){
                            console.log("THEY ARE ALL THE SAME")
                        } */
                        
                    


                    if (r == 11 &&  isRowDepleted == true){
                        console.log("THE LAST ROW HAS BEEN DESTROYED.")
                       
                         /* manager.newEverything() ; */
                        
                        
                       /*  new gameManager.rowArray.push(0) */
                        /* manager.brickGrid.unshift(0)  */

                    }
                
                    console.log("Brick hit belonged to row: " + r + " | Is row depleted? " + isRowDepleted);

                 
                    score ++;
                    brickCount --;
                    console.log("BRIRRIRIRIRIRIRIRIRIRIRIRIRIR", brickCount)
                     // this adds to the score function we have below
                   /*  if(score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN!");
                        document.location.reload();
                        clearInterval(interval);
                    } */
                   
                }
            }
        }
    }
}




/// Score - drawing the score on the canvas. 

function drawScore () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}