import { Vector } from "~/types";
export class Paddle {
    private paddleImage:HTMLImageElement = new Image();
    private moveLeft: boolean;
    private moveRigth: boolean;

    constructor(
        private speed:number,
        private paddleWidth:number,
        private paddleHeight:number,
        private position:Vector,
        image:string
    ){
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.moveLeft = false;
        this.moveRigth = false;
        this.paddleImage.src = image;


        //keys

        document.addEventListener("keydown", this.handleKeyDown)
        document.addEventListener("keyup", this.handleKeyUp)
    }

    get width():number {
        return this.paddleWidth
    }
    get height():number {
        return this.paddleHeight
    }
    get pos():Vector {
        return this.position
    }
    get image():HTMLImageElement {
        return this.paddleImage
    }
    get isMovingLeft():boolean {
        return this.moveLeft
    }
    get isMovingRigth():boolean {
        return this.moveRigth
    }

    movePaddle():void {
        if(this.moveLeft) this.pos.x -= this.speed;
        if(this.moveRigth) this.pos.x += this.speed;
    }

    handleKeyUp =(e:KeyboardEvent):void => {
        if(e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
        if(e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRigth = false;
    }
    handleKeyDown =(e:KeyboardEvent):void => {
        if(e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
        if(e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRigth = true;
    }
}