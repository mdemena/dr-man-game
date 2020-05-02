let imgPILL = new Image();
imgPILL.src = './img/pill.jpg';
let imgCOVID = new Image();
imgCOVID.src = './img/covid.jpg';
let imgDRMAN = new Image();
imgDRMAN.src = './img/drman.png';

const main = () => {
    
    const buildGameScreen = () => {
        const canvasElement = document.querySelector('canvas');

        const game = new Game(canvasElement, imgDRMAN, imgCOVID, imgPILL);
        game.drawCanvas();

        const setDrManDirection = (event) => {
            game.drMan.setDirection(event.code);
            if(!game.board.start){
                game.gameStart();
            }
        };

        document.addEventListener('keydown', setDrManDirection);
    };

    buildGameScreen();
};

window.addEventListener('load', main);