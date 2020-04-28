'use strict'

class Wall extends Figure {
    constructor(pCanvas, pX, pY, pWidth, pHeight){
        super(pCanvas, pX, pY, pWidth, pHeight, 0, new Image());
    }
    draw(){
        this.context.save();
        this.context.fillStyle ='orange'; 
        this.context.fillRect(this.x, this.y, this.width , this.height);
        this.context.restore();
    }
}