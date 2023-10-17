import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Bail";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Colision";

import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'

//level 
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
}  
 from './setup'


 //hepler
import { createBricks } from "./helpers";

 let gameOver = false;
 let score = 0;
 function setGameOver(view:CanvasView){
    view.drawInfo('game over!');
    gameOver = false;
 }

 function setGameWin(view:CanvasView){
    view.drawInfo("game win!");
    gameOver = false;
 }

 function gameLoop(
    view:CanvasView,
    bricks: Brick[],
    paddle:Paddle,
    ball:Ball,
    collision:Collision  )
    {
      console.log("draw")
      view.clear();
      view.drawBricks(bricks);
      view.drawSprite(paddle);
      view.drawSprite(ball);
      //move ball
      ball.moveBall();

      //move paddle
      if((paddle.isMovingLeft && paddle.pos.x > 0) || (paddle.isMovingRigth && paddle.pos.x < view.canvas.width - paddle.width)){
         paddle.movePaddle()
      }

      collision.checkBallCollision(ball, paddle,view);
      const collidingBrick = collision.isCollidingBricks(ball, bricks);
      if(collidingBrick){
         score += 1;
         view.drawScore(score)

      }
      //gameOver
      if(ball.pos.y > view.canvas.height) gameOver = true;
      //game Win!
      if(bricks.length === 0 ) return setGameWin(view)
      if(gameOver) return setGameOver(view)


      requestAnimationFrame(()=> gameLoop(view, bricks, paddle, ball, collision))
    }

    function startGame(view:CanvasView){
      //reset display
      score = 0;
      view.drawInfo('');
      view.drawScore(0);
      //collision
      const collision = new Collision();
      const bricks = createBricks();
      //create ball
      const ball = new Ball (
         BALL_SPEED,
         BALL_SIZE,
         {
            x: BALL_STARTX, y:BALL_STARTY
         },
         BALL_IMAGE
      )
      //paddle new
      const paddle = new Paddle(
         PADDLE_SPEED,
         PADDLE_WIDTH,
         PADDLE_HEIGHT,
         {
            x:PADDLE_STARTX,
            y:view.canvas.height - PADDLE_HEIGHT - 5
         },
         PADDLE_IMAGE
      )

      gameLoop(view,bricks, paddle, ball, collision)

    }

    const view = new CanvasView('#playField');
    view.initStartButton(startGame);

