const imgPILL = new Image();
imgPILL.src = './img/medicine.png';
const imgCOVID = new Image();
imgCOVID.src = './img/coronavirus.png';
let arrImgDrMan = ['./img/drman.png','./img/RobertDr1.png','./img/RobertDr3.png','./img/pacman.png']
arrImgDrMan = arrImgDrMan.map(src => {
    let pImg = new Image();
    pImg.src = src;
    return pImg;
});
const directionKeys = ['ArrowUp','ArrowDown','ArrowLeft', 'ArrowRight'];

const main = () => {
    const canvasHeader = document.querySelector('.top-screen');
    const canvasGame = document.querySelector('.game-screen');
    const canvasFooter = document.querySelector('.bottom-screen');

    const game = new Game(canvasGame, canvasHeader, canvasFooter, arrImgDrMan[0], imgCOVID, imgPILL);
    game.drawWelcome(arrImgDrMan, imgCOVID);

    const buildGameScreen = (event) => {
        let imgDRMAN = new Image();
        switch (event.key){
            case "2":
                imgDRMAN = arrImgDrMan[1]
                break;
            case "3":
                imgDRMAN = arrImgDrMan[2]
                break;
            case "4":
                imgDRMAN = arrImgDrMan[3]
                break;
            default:    
                imgDRMAN = arrImgDrMan[0]
        }
        game.init(imgDRMAN, imgCOVID, imgPILL);
        game.clear();
        game.draw();
        
        document.removeEventListener('keydown', buildGameScreen);

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

    document.addEventListener('keydown', buildGameScreen);
};

window.addEventListener('load', main);