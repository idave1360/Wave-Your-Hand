// matter.js
var Engine = Matter.Engine;
var Runner = Matter.Runner;
var World = Matter.World;
var Bodies = Matter.Bodies;
// var Constraint = Matter.Constraint;
var Vertices = Matter.Vertices;
var Svg = Matter.Svg;
var Vector = Matter.Vector;
var Events = Matter.Events;

let engine;
let world;
let runner;
let puppy;
let hand;
let floor1
let floor2;
let floor3;
let elements = [];

// ml5.js
let handpose;
let detections = [];

// qrcode.js
let capturedImage;
let qrCodeImage;

// p5.js
let canvasElem;
let off = {x: 0, y: 0};
let dim = {w: 3200, h: 720};
let font;
let title;
let bothInActive;
let bothActive;
let leftActive;
let rightActive;
let ball;
let meat_1;
let meat_2;
let meat_3;
let meat_4;
let handGuide;
let handGuide2;
let stage0_1;
let stage0_2;
let stage0_3;
let stage0backgroundimage;
let stage1_1;
let stage1_2;
let stage1_3;
let stage1backgroundimage;
let stage2_1;
let stage2_2;
let stage2_3;
let stage2backgroundimage;
let stage2groundimage;
let stage3backgroundimage;
let rotatedelement;
let stage4image;
let stage4backgroundimage;
let stage5image;
let stage5image2;
let cam;
let gamecontroller;
let angle = 0;
// let avgX = -10;
// let avgY = -10;
// let distance = 5;

function preload() {
    font = loadFont("assets/UI/neodgm_code.ttf");

    title = loadImage("assets/UI/title.PNG");
    bothInActive = loadImage("assets/UI/key/bothInActive.png");
    bothActive = loadImage("assets/UI/key/bothActive.png");
    leftActive = loadImage("assets/UI/key/leftActive.png");
    rightActive = loadImage("assets/UI/key/rightActive.png");
    ball = loadImage("assets/UI/ball.png");
    meat_1 = loadImage("assets/UI/meat_1.PNG");
    meat_2 = loadImage("assets/UI/meat_2.PNG");
    meat_3 = loadImage("assets/UI/meat_3.PNG");
    meat_4 = loadImage("assets/UI/meat_4.PNG");
    handGuide = loadImage("assets/UI/handGuide.png");
    handGuide2 = loadImage("assets/UI/handGuide2.png");
    stage0_1 = loadImage("assets/character/stage0/stage0_1.png");
    stage0_2 = loadImage("assets/character/stage0/stage0_2.png");
    stage0_3 = loadImage("assets/character/stage0/stage0_3.png");
    stage0backgroundimage = loadImage("assets/map/s0_background.png");

    stage1_1 = loadImage("assets/character/stage1/stage1_1.PNG");
    stage1_2 = loadImage("assets/character/stage1/stage1_2.PNG");
    stage1_3 = loadImage("assets/character/stage1/stage1_3.PNG");
    stage1backgroundimage = loadImage("assets/map/stage1.jpg");

    stage2_1 = loadImage("assets/character/stage2/stage2_1.PNG");
    stage2_2 = loadImage("assets/character/stage2/stage2_2.PNG");
    stage2_3 = loadImage("assets/character/stage2/stage2_3.PNG");
    stage2backgroundimage = loadImage("assets/map/stage2_test.png");

    stage3backgroundimage = loadImage("assets/map/stage3_test.png");

    stage4image = loadImage("assets/UI/stage4_goal.PNG");
    stage4backgroundimage = loadImage("assets/map/stage4_background.PNG");

    stage5image = loadImage("assets/UI/stage5_goal.png");
    stage5image2 = loadImage("assets/UI/stage5_obstacle.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');
  
  canvasElem = document.getElementById('thecanvas');
  
  // matter.js default setting
  engine = Engine.create();
  world = engine.world;

  Runner.run(engine);

  cam = createCapture(VIDEO);
  // console.log(cam.width, cam.height);
  cam.hide();
  
  // ml5.js handpose default setting
  const options = {
    flipHorizontal: true,
    maxContinuousChecks: Infinity,
    detectionConfidence: 0.8,
    scoreThreshold: 0.75,
    iouThreshold: 0.3
  }
  handpose = ml5.handpose(cam, options, modelReady);
  
  gamecontroller = new Game();
}

function modelReady() {
  console.log("Model ready!");
  handpose.on('predict', results => {
    detections = results;
  });
}

function scrollEndless(point) {
  off = { x: Math.min(Math.max(0, point.x - windowWidth / 2), dim.w -  windowWidth), y: Math.min(Math.max(0, point.y - windowHeight / 2), dim.h -  windowHeight) };
  canvasElem.style.left = Math.round(off.x) + 'px';
  canvasElem.style.top = Math.round(off.y) + 'px';
  translate(-off.x, -off.y);
  window.scrollTo(off.x, off.y);
}

function draw() {
  clear();
  
  switch (gamecontroller.stage) {
    case 0:
        gamecontroller.stage0();
        break;

    case 1:
        gamecontroller.stage1();
        break;
    
    case 2:
        gamecontroller.stage2();
        break;
      
    case 3:
        gamecontroller.stage3();
        break;

    case 4:
      gamecontroller.stage4();
      break;

    case 5:
      gamecontroller.stage5();
      break;

    case 6:
      gamecontroller.stage6();
      break;
  }

  
}

// function keyPressed(event) {
function keyPressed() {
    if (keyCode === 82) {
      switch (gamecontroller.stage) {
        case 1:
          gamecontroller.resetstage1();
          break;
        
        case 2:
          gamecontroller.resetstage2();
          break;

        case 3:
          gamecontroller.resetstage3();
          break;

        case 4:
          gamecontroller.resetstage4();
          break;

        case 5:
          gamecontroller.resetstage5();
          break;
      }
    }
    if (keyCode === 32) {
        switch (gamecontroller.stage) {   
          case 0:
            if(gamecontroller.spacecount == 0) gamecontroller.spacecount++;
            break;
        }
    }
}

function calculateAngle() {
    for (let i=0; i<detections.length; i++) {
      let pX = detections[i].landmarks[0][0];
      let pY = detections[i].landmarks[0][1];
  
      let mX = detections[i].landmarks[12][0];
      let mY = detections[i].landmarks[12][1];
  
      dX = mX - pX;
      dY = mY - pY;
  
      angle = atan2(dY, dX) + 0.5*PI;
    }
  }
