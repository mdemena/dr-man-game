# DR-MAN game!!

My first development project in the Full Stack Web Development bootcamp of Ironhack.

I will implement DR-MAN Game.

## Description
**DR-MAN** must eat all balls in board without found a **COVID** in their path. 

If **DR-MAN** found a **COVID**, he dies and **LOST GAME!!!**
If **DR-MAN** eat all balls in board, he **WINS!!**

## How to play?
**DR-MAN** can move in 4 directions using once of arrow keys. When we use an arrow key, **DR-MAN** move automatically in selected direction to found a wall, don't need press permanently an arrow key.

**COVID** move in randomize directions, can change their movement.

## MVP's
### User need an start game board to start playing!!
### User need a DR-MAN to move it!!
### COVIDs appears in board an try to attack PAC-MAN
### User or COVIDs WINS!!!

## Backlog
### User need an start game board to start playing!!
- Draw board game, all walls.
- Draw all eating ball.

### User need a PAC-MAN to move it!!
- Draw **DR-MAN** in initial position and can move it.
- Implment **DR-MAN** movement.
- Implements stops with **DR-MAN** found a wall.

### GHOSTs appears in board an try to attack PAC-MAN
- Draw **COVIDs** in start room.
- Draw eating balls in board.
- Implements randomize movement of **COVIDs**.
- Hidden eaten balls by **DR-MAN** and set points in Board point

## User or COVIDs WINS!!!
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

### DR-MAN
Class used to control propierties of PAC-MAN 

### COVID
Class used to manage Ghost