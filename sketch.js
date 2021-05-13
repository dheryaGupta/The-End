var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup
var score = 0;
var gameOver;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bgImg, bg



function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImg = loadImage("Game_Over_Text.png");
 
  bgImg = loadImage("bg.png")
}



function setup() {
  createCanvas(600,400);
  bg = createSprite(300,200,600,400);
  bg.addImage(bgImg);
  bg.scale = 2; 

  bg.velocityX = -5
  //bg.x = bg.width /10;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  
  
 
  //console.log(ground.x);
  FoodGroup= new Group();
  obstaclesGroup= new Group();
  
  gameOver = createSprite(300,200,50,50);
  gameOver.addImage(gameOverImg)
  
  
 
}


function draw() {
  
  background("white");
 
  if(gameState === PLAY){
    if(keyDown("space")){
    monkey.velocityY=-12;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  obstacles();
  bananas();
  gameOver.visible = false;
  if(bg.x<300) {
   bg.x= 400 ; 
  }
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
  }
  
  if(score===40){
    text("YOU WIN",200,200);
    
  }
  
 switch (score){
  case 10 : monkey.scale=0.12;
     break;
  case 20 : monkey.scale=0.14;
     break;
  case 30 :monkey.scale=0.16;
     break;
  case 40:monkey.scale=0.2;
     break;
     default:break;
 }
    edges = createEdgeSprites();
  monkey.collide(edges[3]);
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END
  }
  
  
  }
  if(gameState === END){
     gameOver.visible = true
    background("white");
    monkey.velocityX=0;
    obstacle.velocityX=0;
    banana.velocityX=0;
    bg.velocityX =0;
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1); 
    edges = createEdgeSprites();
    monkey.collide(edges[3]);
  }
  drawSprites();
  textSize(15)
  fill("red")
  text("score:"+score,350,30);
}




function bananas (){
  if (frameCount%100===0){
    banana=createSprite(400,265,30,30);
    banana.addImage("bananas",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=110;
    FoodGroup.add(banana);
  }
}

function obstacles () {
  if(frameCount%100===0){
  obstacle=createSprite(400,380,30,30);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-4;
  obstacle.lifetime=110;
  obstaclesGroup.add(obstacle);
}
}
