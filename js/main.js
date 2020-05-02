let imgPILL = new Image();
imgPILL.src = './img/pill.jpg';
let imgCOVID = new Image();
imgCOVID.src = './img/covid.jpg';
let imgDRMAN = new Image();
imgDRMAN.src = './img/drman.png';

const main = () => {
    
    const buildGameScreen = () => {
        const canvasHeader = document.querySelector('.top-screen');
        const canvasGame = document.querySelector('.game-screen');
        const canvasFooter = document.querySelector('.bottom-screen');

        const game = new Game(canvasGame, canvasHeader, canvasFooter, imgDRMAN, imgCOVID, imgPILL);

        const setDrManDirection = (event) => {
            game.drMan.setDirection(event.code);
            if (game.isGameOver){
                game.init(imgDRMAN, imgCOVID, imgPILL);
            }
            if(!game.isRunning){
                game.gameStart();
            } 
        };

        document.addEventListener('keydown', setDrManDirection);
    };

    buildGameScreen();
};

window.addEventListener('load', main);