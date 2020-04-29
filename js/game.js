'use strict';

class Game {
  constructor(pCanvas, pImgDRMAN, pImgCOVID, pImgPILL) {
    this.canvas = pCanvas;
    this.context = this.canvas.getContext("2d");
    this.speed = 3;
    this.drMan = new DrMan(this.canvas, (this.canvas.width/2), 615, 40, this.speed, pImgDRMAN);
    this.board = new Board(this.canvas, this.speed, pImgPILL, pImgCOVID);
    this.isGameOver = false;
    this.isStarted = false;
  }

  startLoop() {

    const loop = () => {

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (this.isStarted && !this.isGameOver) {
        window.requestAnimationFrame(loop);
      }
    };

    if (this.isStarted) window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.board.update();
    this.drMan.update();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
    if (!this.isStarted){
      this.context.save();
      this.context.fillStyle = 'Yellow';
      this.context.font = '40px Arial';
      this.context.fillText('Ready?', 340, 480);
      this.context.restore();
    }
    this.board.draw();
    this.drMan.draw();
  }

  checkAllCollisions() {
    this.board.walls.forEach((wall) => {
        if (!this.drMan.collisionToWall && this.drMan.checkCollision(wall)) {
            console.log('Collision with a Wall!!')
            this.drMan.collisionToWall = true;
            this.drMan.setDirection('');
        }
        this.board.covids.forEach(covid => {
          if (covid.checkCollision(wall)){
            covid.collisionToWall = true;
            covid.setDirection('');
          }
        });
    });
    this.board.covids.forEach((covid) => {
        if (this.drMan.checkCollision(covid)) {
            console.log('Collision with a COVID!!')
            this.isGameOver = true;
            this.onGameOver();
        }
    });
    this.board.pills.forEach((pill, index) => {
        if (this.drMan.checkCollision(pill)) {
          this.board.pills.splice(index, 1);
        }
    });
  }
  gameStart(){
    if (!this.isStarted){
      this.isStarted = true;
      this.board.covids.forEach(covid => covid.setDirection('ArrowUp'));
      this.startLoop();
    }
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}