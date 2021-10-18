const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base;
var leftWall,rightWall;
var jointPoint;
var jointLink;
var bridge;
var stones=[];
var bg;
var zombie,zombieImg;
var breakButton;

  function preload(){
    bg=loadImage("./assets/background.png");
    zombieImg=loadImage("./assets/zombie.png");
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    frameRate(80);

    base=new Base(0,height-10,width*2,20);
    leftWall=new Base(35,height/2+50,180,130);
    rightWall=new Base(width-35,height/2+50,180,130);

    jointPoint=new Base(width-200,height/2-70,40,20);
    bridge=new Bridge(25,{x:width/2-850,y:height/2-100});

    Matter.Composite.add(bridge.body,jointPoint);
    jointLink=new Link(bridge,jointPoint);

    zombie=createSprite(width/2-600,height-110);
    zombie.addImage("zombie",zombieImg);
    zombie.scale=0.2;
    zombie.velocityX=5;

    breakButton=createImg("./assets/axe.png");
    breakButton.position(width-175,height/2-5);
    breakButton.size(50,50);
    breakButton.mouseClicked(handleButtonPress);

    for(var i=0; i<=8 ; i++){
      var x = random(width/2-200,width/2+300);
      var y = random(-10,140);
      var stone = new Stone(x,y,80,80);
      stones.push(stone);
    }
  }     


function draw() {
    background(bg);
    Engine.update(engine);

    base.show();
    //leftWall.show();
    //rightWall.show();
  
    bridge.show();

    for (var stone of stones) {
      stone.show();
    }

    drawSprites();
  } 

 function handleButtonPress() {
   jointLink.detach();
   setTimeout(() => {
     bridge.break();
   }, 1500);
 }
