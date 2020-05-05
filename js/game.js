'use strict';

class Game {
  constructor(pCanvasGame, pCanvasHeader, pCanvasFooter , pImgDRMAN, pImgCOVID, pImgPILL) {
    this.canvas = pCanvasGame;
    this.context = this.canvas.getContext("2d");
    this.canvasH = pCanvasHeader;
    this.contextH = this.canvasH.getContext("2d");
    this.canvasF = pCanvasFooter;
    this.contextF = this.canvasF.getContext("2d");
    this.speed = 3;
    this.drMan = null;
    this.board = null;
    this.isGameOver = false;
    this.isRunning = false;
    this.isWinner = false;
    this.highScore = 0;
    this.score = 0;
    this.drManLives = 3;
    this.isDrManDead = false;
    this.init(pImgDRMAN, pImgCOVID, pImgPILL);
    this.runningAudio = new Sound("main");
    this.deadAudio = new Sound("dead");
    this.winAudio = new Sound("win");
    this.isMuted = false;
  }
  init(pImgDRMAN, pImgCOVID, pImgPILL){
    this.drMan = new DrMan(this.canvas, (this.canvas.width/2), 615, 40, this.speed, pImgDRMAN);
    this.board = new Board(this.canvas, this.speed, pImgPILL, pImgCOVID);
    this.isRunning = this.isGameOver = this.isDrManDead = this.isWinner = false;
    this.score = 0;
    this.highScore = window.localStorage.HighScore ? window.localStorage.HighScore : 0;
    this.draw();
  }
  startLoop() {

    const loop = () => {

      this.checkAllCollisions();
      this.update();
      this.clear();
      this.draw();

      if (this.isRunning){
        if (this.board.pills.length===0){
          this.isWinner = true;
          this.isRunning = false;
          this.runningAudio.stop();
          this.winAudio,play();
          this.showMessage();
        } 
        else {
          window.requestAnimationFrame(loop);
        }
      } else {
        this.showMessage();
      }
    };

    if (this.isRunning) window.requestAnimationFrame(loop);
  }

  update() {
    this.board.update();
    this.drMan.update();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.contextH.clearRect(0, 0, this.canvasH.width, this.canvasH.height);
    this.contextF.clearRect(0, 0, this.canvasF.width, this.canvasF.height);
  }

  draw() {
    if (!this.isRunning){
      this.context.save();
      this.context.fillStyle = 'Yellow';
      this.context.font = "30px 'Press Start 2P'";
      this.context.fillText('Ready?', 320, 490);
      this.context.restore();
    }
    //Header
    this.contextH.font = "20px 'Press Start 2P'"
    this.contextH.fillStyle = 'white'
    this.contextH.fillText(`High Score: ${this.highScore}`,20,40);

    this.contextH.font = "20px 'Press Start 2P'"
    this.contextH.fillStyle = 'white'
    this.contextH.fillText(`Score: ${this.score}`,this.canvasH.width - 250,40);
    //Body
    this.board.draw();
    this.drMan.draw(true);

    //Footer
    for (let d=0; d < this.board.covids.length; d++){
      let dr = new DrMan(this.canvasF, 30 + (d*50), 25, 40, 0, this.drMan.img);
      dr.draw(true);
    }
    this.contextF.font = "20px 'Press Start 2P'"
    this.contextF.fillStyle = 'white'
    this.contextF.fillText(`F7 - Toggle music`,this.canvasF.width - 400,40);
  } 
  drawWelcome() {
    this.clear();
    this.context.font = "30px 'Press Start 2P'"
    this.context.fillStyle = 'green'
    this.context.fillText("¡¡¡ Welcome to DR-MAN !!!", 25, 300);
    this.context.font = "20px 'Press Start 2P'"
    this.context.fillText("A COVID edition of famous PAC-MAN game", 25, 400);
    new DrMan(this.canvas, 380, 480, 40, 0, this.drMan.img).draw(true);
    new Covid(this.canvas, 320, 550, 40, 0, this.board.imgCOVID).draw();
    new Covid(this.canvas, 380, 550, 40, 0, this.board.imgCOVID).draw();
    new Covid(this.canvas, 440, 550, 40, 0, this.board.imgCOVID).draw();
  } 
  checkAllCollisions() {
    this.board.walls.forEach(wall => {
      if (!this.drMan.collisionToWall && this.drMan.checkCollision(wall)) {
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
    this.board.covids.forEach((covid,idx) => {
      if (this.drMan.checkCollision(covid)) {
          this.board.covids.splice(idx,1);
          if (this.board.covids.length===0){
            this.runningAudio.stop();
            this.deadAudio.play();
            this.isGameOver = true;
            this.isRunning = false;
          } else {
            this.runningAudio.stop();
            this.deadAudio.play();
            this.isDrManDead = true;
            this.isRunning = false;
          }
      }
    });
    this.board.pills.forEach((pill, index) => {
      if (this.drMan.checkCollision(pill)) {
        this.board.pills.splice(index, 1);
        this.score += 10;
      }
    });
  }
  gameStart(){
    if (!this.isRunning){
      this.isRunning = true;
      this.isGameOver = this.isDrManDead = false;
      this.board.covids.forEach(covid => covid.setDirection('ArrowUp'));
      this.drMan.setDirection('');
      this.isMuted ? this.runningAudio.stop() : this.runningAudio.play();
      this.startLoop();
    }
  }
  showMessage(){
    this.context.fillStyle = 'black';
    this.context.fillRect(125,200,550,300);
    this.context.strokeStyle = 'orange';
    this.context.lineWidth = '20px';
    this.context.strokeRect(125,200,550,300);
    this.context.font = "30px 'Press Start 2P'"
    if (this.isDrManDead) {
      this.context.font = "30px 'Press Start 2P'"
      this.context.fillStyle = 'red'
      this.context.fillText('¡¡¡ OHHHH !!!',190,300);
      this.context.font = "22px 'Press Start 2P'"
      this.context.fillText('¡¡¡ DR-MAN IS DEAD !!!',150,350);
    } else if (this.isGameOver){
      this.context.fillStyle = 'red'
      this.context.fillText('¡¡¡ GAME OVER !!!',150,300);
    } else {
      this.context.fillStyle = 'green'
      this.context.fillText('¡¡¡ YOU WINS !!!',150,300);
    }
    this.context.font = "30px 'Press Start 2P'"
    if (this.isDrManDead){
      this.context.fillStyle = 'white'
      this.context.fillText(`Lives: ${this.board.covids.length}`,150,400);
      this.context.font = "20px 'Press Start 2P'"
      this.context.fillText('Press a key to continue...',150,450);
    } else {
      this.context.fillStyle = 'white'
      if (this.score > this.highScore){
        this.context.font = "20px 'Press Start 2P'"
        this.context.fillText(`NEW High Score: ${this.score}`,150,400);
        this.highScore = window.localStorage.HighScore = this.score;
      } else {
        this.context.fillText(`Your Score: ${this.score}`,150,400);
      }
      this.context.font = "20px 'Press Start 2P'"
      this.context.fillText('Press a key to restart...',150,450);
    }  
    this.isRunning = false;
  }
}