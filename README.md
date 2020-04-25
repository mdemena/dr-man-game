# PAC-MAN game!!

My first development project in the Full Stack Web Development bootcamp of Ironhack.

I will implement PAC-MAN Game.

## Description
**PAC-MAN** must eat all balls in board without found a **GHOST** in their path. 

If **PAC-MAN** found a **GHOST**, he dies and **LOST GAME!!!**
If **PAC-MAN** eat all balls in board, he **WINS!!**

## How to play?
**PAC-MAN** can move in 4 directions using once of arrow keys. When we use an arrow key, **PAC-MAN** move automatically in selected direction to found a wall, don't need press permanently an arrow key.

**GHOSTs** move in randomize directions, can change their movement.

## BackLog

### User need an start game board to start playing!!
- Draw board game, all walls.
- Draw all eating ball.

### User need a PAC-MAN to move it!!
- Draw **PAC-MAN** in initial position and can move it.
- Implment **PAC-MAN** movement.
- Implements stops with **PAC-MAN** found a wall.

### GHOSTs appears in board an try to attack PAC-MAN
- Draw **GHOSTS** in start room.
- Draw eating balls in board.
- Implements randomize movement of **GHOSTS**.
- Hidden eaten balls by **PAC-MAN** and set points in Board point

## User or GHOSTs WINS!!!
- Implements WIN or GAME OVER status...


## BONUS:
- Implement bonus balls.
- Implement logical of bonus points.

## Classes:
### Game:
Class to manage all items need in game: Board, PAC-MAN and Ghost. And to managing status of game: Points, WIN or GAME OVER!!

### Board
A class to manage all walls and draw it.

### Figure
Abstract class for difine attributes and functions to use in PAC-MAN and Ghost classes

### PAC-MAN
Class used to control propierties of PAC-MAN 

### Ghost
Class used to manage Ghost