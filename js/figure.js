'use strict'

class Figure {
    constructor(pCanvas, pX, pY, pWith, pHeight, pSpeed, pImg){
        this.canvas = pCanvas;
        this.context = this.canvas.getContext('2d');
        this.centerX = pX;
        this.centerY = pY;
        this.width = pWith;
        this.height = pHeight;
        this.x = this.centerX - (this.width / 2);
        this.y = this.centerY - (this.height / 2);
        this.direction = '';
        this.speed = pSpeed;
        this.img = pImg ? pImg : new Image();
        this.collisionToWall = false;
        this.rotationDegrees = 0;
    }
    update(){
        switch(this.direction){
            case 'ArrowLeft':
                this.centerX -= this.speed;
                this.rotationDegrees = this.rotationDegrees===-360 ? 0 : (this.rotationDegrees-10);
                break;
            case 'ArrowRight':
                this.centerX += this.speed;
                this.rotationDegrees = this.rotationDegrees===360 ? 0 : (this.rotationDegrees+10);
                break;
            case 'ArrowUp':
                this.centerY -= this.speed;
                this.rotationDegrees = this.rotationDegrees===360 ? 0 : (this.rotationDegrees+10);
                break;
            case 'ArrowDown':
                this.centerY += this.speed;
                this.rotationDegrees = this.rotationDegrees===360 ? 0 : (this.rotationDegrees+10);
                break;
        }
        //Controlling figure don't go out of board.
        if ((this.centerX-(this.width/2)) < 0){
            this.centerX = (this.width/2);
            this.setDirection('');
        } else if ((this.centerX+(this.width/2)) > this.canvas.width) {
            this.centerX = this.canvas.width - (this.width/2);
            this.setDirection('');
        } else if ((this.centerY-(this.height/2)) < 0){
            this.centerY = (this.height/2);
            this.setDirection('');
        } else if ((this.centerY+(this.height/2)) > this.canvas.height) {
            this.centerY = this.canvas.height - (this.height/2);
            this.setDirection('');
        }
        this.x = this.centerX - (this.width / 2);
        this.y = this.centerY - (this.height / 2);
    }
    draw(rounded){
        this.context.save();
        this.context.translate(this.centerX, this.centerY);
        if (rounded){
            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.width/2, 0, Math.PI *2);
            this.context.arc(0, 0, this.width/2, 0, Math.PI *2);
            this.context.closePath();
            this.context.clip();
        }
        if (this.speed > 0){
            this.context.rotate(this.rotationDegrees*Math.PI/180);
        }
        // this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.context.drawImage(this.img, (this.width/2)*-1, (this.height/2)*-1, this.width, this.height);
        this.context.restore();
    }
    setDirection(pDirection){
        //console.log(`${this.constructor.name}: {x: ${this.x}, y: ${this.y}, direction:${this.direction}}`);
        this.direction = pDirection;
    }
    checkCollision(pFigure){
        const collideRight = this.centerX + (this.width / 2) + this.speed > pFigure.centerX - (pFigure.width / 2) + this.speed;
        const collideLeft = this.centerX - (this.width / 2) - this.speed < pFigure.centerX + (pFigure.width / 2) - this.speed;
        const collideTop = this.centerY + (this.height / 2) + this.speed > pFigure.centerY - (pFigure.height / 2) + this.speed;
        const collideBottom = this.centerY - (this.height / 2) - this.speed < pFigure.centerY + (pFigure.height / 2) - this.speed;
    
        if (collideRight && collideLeft && collideTop && collideBottom) {
            switch(this.direction){
                case 'ArrowLeft':
                    this.centerX += this.speed;
                    break;
                case 'ArrowRight':
                    this.centerX -= this.speed;
                    break;
                case 'ArrowUp':
                    this.centerY += this.speed;
                    break;
                case 'ArrowDown':
                    this.centerY -= this.speed;
                    break;
            }
            
            // this.centerX  += collideLeft ? this.speed : 0;
            // this.centerX  -= collideRight ? this.speed : 0;
            // this.centerY  += collideTop ? this.speed : 0;
            // this.centerY  -= collideBottom ? this.speed : 0;

            this.x = this.centerX - (this.width / 2);
            this.y = this.centerY - (this.height / 2);

            return true;
        }
    
        return false;
    }
}
