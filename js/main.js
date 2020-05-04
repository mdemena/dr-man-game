const imgPILL = new Image();
imgPILL.src = './img/medicine.png';
const imgCOVID = new Image();
imgCOVID.src = './img/coronavirus.png';
const imgDRMAN = new Image();
imgDRMAN.src = './img/drman.png';
const directionKeys = ['ArrowUp','ArrowDown','ArrowLeft', 'ArrowRight'];

const main = () => {
    new Sound("init").play();

    const buildGameScreen = () => {
        const canvasHeader = document.querySelector('.top-screen');
        const canvasGame = document.querySelector('.game-screen');
        const canvasFooter = document.querySelector('.bottom-screen');

        const game = new Game(canvasGame, canvasHeader, canvasFooter, imgDRMAN, imgCOVID, imgPILL);

        const setDrManDirection = (event) => {
            if (event.key==="F7"){
                if (game.isMuted){
                    game.isMuted = false;
                    game.runningAudio.play();
                } else {
                    game.isMuted = true;
                    game.runningAudio.stop();
                }
            } else if (directionKeys.indexOf(event.key)>=0) {
                game.drMan.setDirection(event.code);
            } else {
                if (game.isGameOver || game.isWinner){
                    game.init(imgDRMAN, imgCOVID, imgPILL);
                }
                if(!game.isRunning){
                    game.gameStart();
                }
            }
        };

        document.addEventListener('keydown', setDrManDirection);
    };

    buildGameScreen();
};

window.addEventListener('load', main);