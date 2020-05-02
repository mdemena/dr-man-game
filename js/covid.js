'use strict'

class Covid extends Figure{
    constructor(pCanvas, pX, pY, pSize, pSpeed, pImg){
        super(pCanvas, pX, pY, pSize, pSize, pSpeed, pImg);
        this.directions = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
    }
    pickNewDirection(){
        this.direction = this.directions[Math.floor(Math.random() * (this.directions.length*2))]
    }
}
