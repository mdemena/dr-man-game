'use strict';

class Game {
  constructor(pCanvas, pImgDRMAN, pImgCOVID, pImgPILL) {
    this.canvas = pCanvas;
    this.context = this.canvas.getContext("2d");
    this.speed = 5;
    this.drMan = new DrMan(this.canvas, (this.canvas.width/2), 615, 40, this.speed, pImgDRMAN);
    this.board = new Board(this.canvas, this.speed, pImgPILL, pImgCOVID);
    this.isGameOver = false;
  }

  startLoop() {

    const loop = () => {

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.board.update();
    this.drMan.update();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
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

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}