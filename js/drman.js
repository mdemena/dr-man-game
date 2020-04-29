'use strict'

class DrMan extends Figure{
    constructor(pCanvas, pX, pY, pSize, pSpeed, pImg){
        super(pCanvas, pX, pY, pSize, pSize, pSpeed, pImg);
    }
    update(){
        super.update();
        if (this.direction!=''){
            this.collisionToWall = false;
        }
    }
}