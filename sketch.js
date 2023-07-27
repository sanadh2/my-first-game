let drive;
let car;
let route_left;
let route_right;
let border;
let route;
let zebra;
let z_img;
let obstacle;
let obs_img;
let obstaclesGroup;
let crash;
let crash_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
let gOver;
let gOver_img;
let score = 0;
function preload() {
  drive = loadImage("car.png");
  border = loadImage("border.png");
  z_img = loadImage("Zebracross.png");
  obs_img = loadImage("obstacle.png");
  crash_img = loadImage("crashed.png");
  gOver_img = loadImage("gameover.png");
}

function setup() {
  createCanvas(480, 640);
  car = createSprite(150, 360, 0, 0);
  car.addImage(drive);
  //car.debug = true;
  route_left = createSprite(5, 10, 5, 2000);
  route_left.visible = false;
  route_right = createSprite(475, 10, 5, 2000);
  route_right.visible = false;
  route = createSprite(240, 360, 0, 0);
  route.addImage(border);
  route.scale = 0.666;
  car.scale = 0.05;
  car.depth = route.depth;
  car.depth += 3;
  obstaclesGroup = new Group();
  gOver = createSprite(240, 200, 100, 100);
  gOver.addImage(gOver_img);
}

function draw() {
  background("black");
  car.velocityX = 0;
  if (gameState == PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    if (keyDown("Left") && car.x >= 80) {
      car.velocityX = -10;
    } else if (keyDown("Right") && car.x <= 400) {
      car.velocityX = 10;
    } else if (keyDown("Up") && car.y >= 80) {
      car.velocityY = -10;
    } else if (keyDown("Down") && car.y <= 560) {
      car.velocityY = 10;
    } else {
      car.velocityY = 0;
      car.velocityX = 0;
    }
    if (obstaclesGroup.isTouching(car)) {
      gameState = END;
    }
    gOver.visible = false;
    spawnZebras();
    //zebra.lifetime = 200;
    spawnObstacles();
    //obstacle.lifetime = 500;
  } else if (gameState == END) {
    zebra.velocityY = 0;
    car.velocityX = 0;
    car.velocityY = 0;
    obstaclesGroup.setVelocityYEach(0);
    car.addImage(crash_img);
    car.scale = 0.275;
    gOver.visible = true;
  }
  fill("white");
  drawSprites();
}

function spawnZebras() {
  if (frameCount % 60 == 0) {
    zebra = createSprite(240, -100, 0, 0);
    zebra.addImage(z_img);
    zebra.scale = 0.2;
    zebra.depth = car.depth;
    zebra.depth = car.depth - 2;
    zebra.velocityY = 10;
    zebra.lifetime = 200;
  }
}
function spawnObstacles() {
  if (frameCount % 80 == 0) {
    let obstacle = createSprite(-150, -360, 0, 0);
    obstacle.setCollider("rectangle", 0, 0, 120, 360, 0);
    obstacle.addImage(obs_img);
    obstacle.scale = 0.3;
    obstacle.x = Math.round(random(60, 420));
    obstacle.velocityY = 4;
    obstacle.lifetime = 500;
    obstacle.depth = car.depth;
    obstacle.depth -= 1;
    //obstacle.debug = true;
    obstaclesGroup.add(obstacle);
  }
}
