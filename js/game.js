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
    this.score = 0;
    this.divScore = document.querySelector('.score span');
  }

  startLoop() {

    const loop = () => {

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (this.isStarted && !this.isGameOver) {
        if (this.board.pills.length===0){
          this.gameWinns();
        } else {
          window.requestAnimationFrame(loop);
        }
      } else {
        this.gameOver();
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
      this.context.font = "30px 'Press Start 2P'";
      this.context.fillText('Ready?', 320, 490);
      this.context.restore();
    }
    this.board.draw();
    this.drMan.draw();
  }

  checkAllCollisions() {
    this.board.walls.forEach(wall => {
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
            this.gameOver();
        }
    });
    this.board.pills.forEach((pill, index) => {
        if (this.drMan.checkCollision(pill)) {
          this.board.pills.splice(index, 1);
          this.score += 10;
          this.divScore.innerHTML = this.score;
        }
    });
  }
  gameStart(){
    if (!this.isStarted){
      this.isStarted = true;
      document.querySelector('#btnRestart').style.visibility = 'hidden';
      this.board.covids.forEach(covid => covid.setDirection('ArrowUp'));
      this.startLoop();
    }
  }
  gameOver(){
    this.context.fillStyle = 'black';
    this.context.fillRect(125,200,550,300);
    this.context.strokeStyle = 'orange';
    this.context.lineWidth = '20px';
    this.context.strokeRect(125,200,550,300);
    this.context.font = "30px 'Press Start 2P'"
    this.context.fillStyle = 'red'
    this.context.fillText('¡¡¡ GAME OVER !!!',150,300);
    this.context.font = "30px 'Press Start 2P'"
    this.context.fillStyle = 'white'
    this.context.fillText(`Your Score: ${this.score}`,150,400);
    this.board.start = this.isStarted = false;
    document.querySelector('#btnRestart').style.visibility = 'visible';
  }
  gameWinns(){
    this.context.fillStyle = 'black';
    this.context.fillRect(125,200,550,300);
    this.context.strokeStyle = 'orange';
    this.context.lineWidth = '20px';
    this.context.strokeRect(125,200,550,300);
    this.context.font = "30px 'Press Start 2P'"
    this.context.fillStyle = 'green'
    this.context.fillText('¡¡¡ YOU WINS !!!',150,300);
    this.context.font = "30px 'Press Start 2P'"
    this.context.fillStyle = 'white'
    this.context.fillText(`Your Score: ${this.score}`,150,400);
    this.board.start = this.isStarted = false;
    document.querySelector('#btnRestart').style.visibility = 'visible';
  }
}