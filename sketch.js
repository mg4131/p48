let ground;
let lander;
var lander_img;
var bg_img;
var obs;  
var obs_img;
var obsG;
var gameState = "PLAY";
var score = 0;
var highscore = 0;
var vyforobss=15;
var roundsplayed=0;
var moonobs;
var moonobs_img;

var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  obs_img = loadImage("junk.png");
  moonobs_img = loadImage("moon.png");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  rectMode(CENTER);
  textSize(15);
  obsG = new Group();
}

function draw() {
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Score: "+score+" ms", 800, 100);
  text("High score: "+highscore+" ms", 800, 125)
  text("Rounds played: "+ roundsplayed, 800, 150);
  text("Obstacle velocity: " + vyforobss, 800, 175)
  pop();
  if (gameState == "PLAY") {
    lander.visible=true

    fnctSPAWNOBS(20);
    if (keyDown("w")){
      lander.velocityY=-12;
    }
    lander.velocityY = lander.velocityY + 0.7;
    if (keyDown("a")) {
      lander.x=lander.x-10;
    }
    if (keyDown("d")) {
      lander.x = lander.x+10;
    }
    if (lander.y>700 || lander.isTouching(obsG)) {
      gameState = "END";
      console.log("Changed")
      roundsplayed++;
    }
    for (var i=0;i<obsG.length;i++) {
      if (obsG.get(i).y>700) { 
        score=score+Math.floor(1*5.152);
      }
    }
  }
  if (gameState == "END") {
    lander.visible=false;
    obs.visible=false;
    if (keyDown("r")) {
      gameState = "PLAY";
      lander.x=100;
      lander.y=50;
      vyforobss=vyforobss+0.25
    if (score>highscore) {
      highscore=score;
    }
    score=0;
    }
  }
  console.log(gameState);
  //fall down
/*  vy +=g;
  lander.position.y+=vy;*/
  drawSprites();
}

function fnctSPAWNOBS(width_height) {
  if (frameCount%60===0 && gameState == "PLAY") {
    obs = createSprite(500, 350.5, width_height, width_height);
    obs.x=Math.round(random(20, 980));``
    obs.y=20;
    obs.addImage(obs_img);
    obs.scale=0.5;
    obs.velocityY=vyforobss;
    obs.lifetime=600;
    obsG.add(obs);
    moon = createSprite(-100, -100, width_height, width_height);
    moon.y=Math.floor(random(0, 700));
    moon.x=-100
    moon.addImage(moonobs_img);
    moon.scale=0.5;
    moon.velocityX=vyforobss;
    
  }
}


