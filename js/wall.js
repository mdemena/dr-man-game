'use strict'
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  }
class Wall extends Figure {
    constructor(pCanvas, pX, pY, pWidth, pHeight){
        super(pCanvas, pX, pY, pWidth, pHeight, 0, new Image());
    }
    draw(){
        this.context.save();
        this.context.fillStyle ='orange'; 
        this.context.roundRect(this.x, this.y, this.width , this.height, 7).fill();
        this.context.restore();
    }
}