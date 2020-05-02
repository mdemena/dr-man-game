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
        this.initWalls();
        this.initCOVIDS();
        this.initPILLS();
    }
    initWalls(){
        //Creating internal walls
        //Inital box for COVIDs
        this.walls.push(new Wall(this.canvas, 300, 400, 20, 80));
        this.walls.push(new Wall(this.canvas, 397.5, 435, 215, 20));
        this.walls.push(new Wall(this.canvas, 495, 400, 20, 80));

        //Rest of the board
        ///Center
        // U in up board.
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2), 280, 200, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2) + 90, 215, 20, 150)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2) - 90, 215, 20, 150)); 
        //T in up board. 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2), 70, 200, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2), 145, 20, 135));
        //Central Block
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2), 540, 60, 90));
        //T in down board. 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2), 650, 200, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2), 700, 20, 100));

        ///Left
        //Left plain line
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-140, 735, 125, 20));
        //Reverse Left L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-315, 735, 70, 20));
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-280, 695, 20, 100));
        //Left T 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-190, 575, 200, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-190, 615, 20, 100));
        //Left L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-150, 505, 100, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-190, 430, 20, 155));
        //Second Left Reverse L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-315, 360, 70, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-280, 432.5, 20, 165));
        //Left wall box 
        this.walls.push(new Wall(this.canvas, 25, 550, 50, 250)); 
        this.walls.push(new Wall(this.canvas, 50, 290, 160, 20)); 
        //Third Left Reverse L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-215, 220, 70, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-190, 250, 20, 80));
        //Second Left/Mirro L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-250, 150, 150, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-325, 180, 20, 80));
        //Top wall 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)-190, 30, 20, 100));
        this.walls.push(new Wall(this.canvas, 95, 65, 70, 20)); 
        
        ///Right
        //Left plain line
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+140, 735, 125, 20));
        //Reverse Left L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+315, 735, 70, 20));
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+280, 695, 20, 100));
        //Left T 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+190, 575, 200, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+190, 615, 20, 100));
        //Left L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+150, 505, 100, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+190, 430, 20, 155));
        //Second Left Reverse L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+315, 360, 70, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+280, 432.5, 20, 165));
        //Left wall box 
        this.walls.push(new Wall(this.canvas, 800-25, 550, 50, 250)); 
        this.walls.push(new Wall(this.canvas, 800-50, 290, 160, 20)); 
        //Third Left Reverse L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+215, 220, 70, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+190, 250, 20, 80));
        //Second Left/Mirro L 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+250, 150, 150, 20)); 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+325, 180, 20, 80));
        //Top wall 
        this.walls.push(new Wall(this.canvas, (this.canvas.width/2)+190, 30, 20, 100));
        this.walls.push(new Wall(this.canvas, 800-95, 65, 70, 20)); 
    }
    initCOVIDS(){
        this.covids.push(new Covid(this.canvas, 340, 390, 40, this.speed, this.imgCOVID));
        this.covids.push(new Covid(this.canvas, 400, 390, 40, this.speed, this.imgCOVID));
        this.covids.push(new Covid(this.canvas, 455, 390, 40, this.speed, this.imgCOVID));

    }
    initPILLS(){
        let centerWall = new Wall(this.canvas, 400, 450, 200, 350);
        for (let pillY = 25; pillY < this.canvas.height - 15; pillY+=42,40){
            for (let pillX = 25; pillX < this.canvas.width - 10; pillX+=47){
                let pill = new Pill(this.canvas, pillX, pillY, 20, this.imgPILLS);
                if (!centerWall.checkCollision(pill)) {
                    if (!this.walls.some(wall => pill.checkCollision(wall))){
                        this.pills.push(pill);
                    }
                }
            }
        }
    }
    update(){
        this.covids.forEach(covid => {
            covid.update();
            if(!covid.direction || covid.collisionToWall){
                covid.pickNewDirection();
                covid.collisionToWall = false;
            }
        });
    }
    draw(){
        this.context.clearRect(0,0, this.canvas.Width, this.canvas.height);
        this.walls.forEach(wall => wall.draw());
        this.pills.forEach(pill => pill.draw());
        this.covids.forEach(covid => covid.draw());
    }
}