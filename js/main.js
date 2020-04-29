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
        game.gameOverCallback(buildGameOver);
        game.drawCanvas();

        const setDrManDirection = (event) => {
            game.drMan.setDirection(event.code);
            if(!game.board.start){
                game.gameStart();
            }
        };

        document.addEventListener('keydown', setDrManDirection);
    };

    const buildGameOver = () => {
        buildDom(`
            <section class="game-over">
                <h1>Game Over Screen</h1>
                <button>Restart</button>
            </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    };

    buildGameScreen();

};

window.addEventListener('load', main);