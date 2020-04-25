# PAC-MAN game!!

My first development project in the Full Stack Web Development bootcamp of Ironhack.

I will implement PAC-MAN Game.

## Description
PAC-MAN can move in 4 directions using once of arrow keys. When we use an arrow key, PAC-MAN move automatically in selected direction to found a wall, don't need press permanently an arrow key.

GHOST move in randomize directions, can change their movement.

When PAC-MAN found a GHOST, he died (snif, snif, ..) GAME OVER!!!
When PAC-MAN eat all balls, he WINS!!!

## MVP 1:
- Draw board game, all walls.
- Draw PAC-MAN in initial position and can move it.

## MVP 2:
- Movement of PAC-MAN.
- Implements stops with PAC-MAN found a wall.
- Draw ghosts in start room.
- Draw eating balls in board.

## MVP 3:
- Implements randomize movement of ghosts.
- Hidden eaten balls by PAC-MAN and set points in Board point

## MVP 4:
- Implements WOIN or GAME OVER status...


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