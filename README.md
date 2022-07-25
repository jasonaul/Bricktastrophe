# Bricktastrophe!

## Bricktastrophe! - An Endless Breakout Clone

### Description
This is a modified clone of the classic Breakout game, with other clones often called "brick breaker." Traditionally, the goal of the game is for the user to control the paddle at the botto mof the screen by moving it left to right to bounce the ball up to destroy the bricks. If the player misses the ball and it hits the bottom of the screen, the player traditionally loses a life and/or loses the game. The goal of the game is to beat all the pre-designed levels. 

In "Bricktastrophe!", the concept is similar but the goal is changed. Bricktastrophe has been designed to be played "endlessly", with the goal of reaching a new high score each time the game is played. After each screen of bricks is destroyed, a new screen of bricks is randomly generated with progressively difficult bricks. Each color brick has a unique hitpoint (Red = 1 hp, Orange = 2 hp, etc.). As the higher hp bricks are hit, they revert to the color of the brick with the next lowest hitpoint, and can be hit again until their hitpoints are zero. 

After a certain pre-determined score has been reached, each new screen of bricks randomly generates with the maximum difficulty level. The objective for the player is to stay alive as long as possible!


## Initial Wire Frames
> Copy and paste or drag and drop your images here.
![image](https://media.git.generalassemb.ly/user/43083/files/4cba3c45-ce36-4a78-aa20-621d3bec790c)

## Final Product



## User Stories
> Add user stories following the _As a [type of user], I want [what the user wants], so that [what it helps accomplish]_ format.

- As a user, I want to click a "Start" button to begin playing. 
- As a player, I want the ability to view instructions and/or rules at any time.
- As a player, I want to be able to quickly and intuitively control the paddle.
- As a player, I want the game to recognize my input for moving the paddle.
- As a player, I want each brick to be destroyed when the ball hits it (or when the block's HP reaches zero) and for points to be registered.
- As a player, I want new blocks to be generated as they are destroyed.
- As a player, I want the game to get progressively harder.

### MVP Goals

- START button being clicked will start a countdown for the game to begin.
- A brick is destroyed when hit by a ball (when brick's HP = 0). 
- As bricks are destroyed, a new array of bricks is generated.
- Game is OVER if the ball misses the paddle and hits the bottom of the screen. 