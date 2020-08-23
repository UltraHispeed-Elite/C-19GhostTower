var gamestate = "play";
var towerImg, tower;
var door,doorImg,doorGroups;
var climber, climberImg, climberGroup;
var ghost, ghostImg, ghostImg1;
var invisibleBlock, invisibleBlockGroup;
var spookySound;

function preload(){
towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostImg1 = loadImage("ghost-jumping.png");
spookySound = loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300,10,10);
  tower.addImage(towerImg);
  tower.velocityY = 4;
  
  doorGroups = new Group();
  climberGroup = new Group();  
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5
}

function draw(){
  background("red")
  if(gamestate === "play"){
    
  if(tower.y>400){
    tower.y = 300
  }
  
  spawnDoors();
  
  if(keyDown("space")){
    ghost.velocityY = -5;
    ghost.addImage(ghostImg1);
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+3;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gamestate = "end";

  }
  
  drawSprites();
}
if(gamestate === "end"){
  fill("yellow");
  textSize(30);
  text("gameover",250,250);
}
}

function spawnDoors(){
  if(frameCount % 150 === 0){
  door = createSprite(200,-50);
    door.x = Math.round(random(80,300));
    door.addImage(doorImg);
    
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=6;
    climber.lifetime = 100;
    climber.x = door.x;
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=6;
    invisibleBlock.x=door.x;
    door.velocityY=6
    door.lifetime = 100;
    
    ghost.depth = door.depth;
    ghost.depth = climber.depth;
    ghost.depth = ghost.depth+1;
    
    doorGroups.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

