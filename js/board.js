'use strict'

class Board {
    constructor(pCanvas, pSpeed, pImgPILLS, pImgCOVID){
        this.canvas = pCanvas;
        this.context = this.canvas.getContext("2d");
        this.walls = [];
        this.pills = [];
        this.covids = [];
        this.imgPILLS = pImgPILLS;
        this.imgCOVID = pImgCOVID;
        this.speed = pSpeed;
        this.init();
    }
    init(){
        //Creating internal walls
        //Inital box for COVIDs
        this.walls.push(new Wall(this.canvas, 340, 355, 40, 10));
        this.walls.push(new Wall(this.canvas, 325, 395, 10, 80));
        this.walls.push(new Wall(this.canvas, 400, 435, 160, 10));
        this.walls.push(new Wall(this.canvas, 475, 395, 10, 80));
        this.walls.push(new Wall(this.canvas, 460, 355, 40, 10));
        //Drawing start 3 x COVIDs
        this.covids.push(new Covid(this.canvas, 355, 390, 40, this.speed, this.imgCOVID));
        this.covids.push(new Covid(this.canvas, 400, 390, 40, this.speed, this.imgCOVID));
        this.covids.push(new Covid(this.canvas, 445, 390, 40, this.speed, this.imgCOVID));
    }
    update(){
        
    }
    draw(){
        this.context.clearRect(0,0, this.canvas.Width, this.canvas.height);
        this.walls.forEach(wall => wall.draw());
        this.covids.forEach(covid => covid.draw());
    }
}