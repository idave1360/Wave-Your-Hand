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
let qrcode;
let supbase64Imagee;

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
let meat_0;
let meat_1;
let meat_2;
let meat_3;
let meat_4;
let handGuide;
let handGuide2;
let stage0;
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
let stage3;
let stage3backgroundimage;
let AD_lock;
let handGuide3;
let handGuide4;
let rotatedelement;
let stage4;
let stage4image;
let stage4backgroundimage;
let stage5;
let stage5image;
let stage5image2;
let frame;
let cam;
let gamecontroller;
let angle = 0;
// let avgX = -10;
// let avgY = -10;
// let distance = 5;

let sound0;
let sound12;
let sound345;
let sound6;
let soundtutorialend;

function preload() {
    font = loadFont("assets/UI/neodgm_code.ttf");

    title = loadImage("assets/UI/title.PNG");
    bothInActive = loadImage("assets/UI/key/bothInActive.png");
    bothActive = loadImage("assets/UI/key/bothActive.png");
    leftActive = loadImage("assets/UI/key/leftActive.png");
    rightActive = loadImage("assets/UI/key/rightActive.png");
    ball = loadImage("assets/UI/ball.png");
    meat_0 = loadImage("assets/UI/meat_0.PNG");
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

    stage3 = loadImage("assets/character/stage3/stage3.png");
    stage3backgroundimage = loadImage("assets/map/stage3_test.png");
    AD_lock = loadImage("assets/UI/key/AD_lock.png");
    handGuide3 = loadImage("assets/UI/key/handGuide3_fill.png");
    handGuide4 = loadImage("assets/UI/key/handGuide3_nofill.png");

    stage4 = loadImage("assets/character/stage4/stage4.png");
    stage4image = loadImage("assets/UI/stage4_goal.PNG");
    stage4backgroundimage = loadImage("assets/map/stage4_background.PNG");

    stage5 = loadImage("assets/character/stage5/stage5.png");
    stage5image = loadImage("assets/UI/stage5_goal.png");
    stage5image2 = loadImage("assets/UI/stage5_obstacle.PNG");

    frame = loadImage("assets/UI/frame.PNG");

    // sound0 = loadSound("assets/sound/sound0.mp3");
    // sound12 = loadSound("assets/sound/sound12.wav");
    // sound345 = loadSound("assets/sound/sound345.mp3");
    // sound6 = loadSound("assets/sound/sound6.mp3");
    // soundtutorialend = loadSound("assets/sound/tutorialend.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, 720);
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

  supabase = createClient(
    "https://khwcdxhwfatpeltdqiqe.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtod2NkeGh3ZmF0cGVsdGRxaXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MjE4ODksImV4cCI6MjAxODQ5Nzg4OX0.rJist0ixf7xPSuyL3NxTeDCDGh2H77-Npw9JkS-jHcg"
  );

  // qrcode = createDiv()
  // qrcode.id('qrcode')
  // qrcode.position(72, 72)
  // new QRCode(document.getElementById("qrcode"), "https://khwcdxhwfatpeltdqiqe.supabase.co/storage/v1/object/public/test/public/test2.jpg");
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

        case 6:
          World.clear(world);
          elements = [];
          gamecontroller = new Game();
      }
    }

    if (keyCode === 32) {
        switch (gamecontroller.stage) {   
          case 0:
            if(gamecontroller.spacecount == 0) gamecontroller.spacecount++;
            if(gamecontroller.spacecount == 2) gamecontroller.sizecheck = true;
            if(gamecontroller.spacecount == 3) gamecontroller.sizecheck = true;
            break;
          case 6:
            if (gamecontroller.count == 0) {
              gamecontroller.count += 1;
            } else {
              // let currentFrameImage = get();
              // let base64Image = currentFrameImage.canvas.toDataURL();
              // uploadImageToSupabase(base64Image);
            }
            break;
        }
    }

    if (keyCode === 187) {
      gamecontroller.nextstage();
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

  // const dataURLtoFile = (dataurl, fileName) => {
  //   var arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  
  //   return new File([u8arr], fileName, { type: mime });
  // };
  
  // async function uploadImageToSupabase(imageData) {
  //   const imageFile = dataURLtoFile(imageData, '.jpg')
  //   const { data, error } = await supabase.storage
  //     .from("test")
  //     .upload("public/test2.jpg", imageFile, {
  //       contentType: "image/jpg",
  //       cacheControl: "3600",
  //       upsert: false,
  //     });
  //   if (error) {
  //     console.error("Error uploading image:", error);
  //   } else {
  //     console.log("Image uploaded successfully:", data);
  //   }
  // }
