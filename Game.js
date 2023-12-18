class Game {
    constructor() {
      this.stage = 0;
      this.spacecount = 0;
      this.leftsnack = false;
      this.rightsnack = false;
      this.sizecheck = false;
      this.count = 0;
      this.c0 = true;
      this.c1 = true;
      this.c2 = true;
      this.c3 = true;
      this.c4 = true;
      this.c5 = true;
      this.c6 = true;
    }

    gameover()  {
        if(puppy.body.position.y > dim.h || puppy.body.position < 0 || puppy.body.position.x < 0 || puppy.body.position.x > dim.w) {
            return true;
        }
    }

    resetstage1() {
        World.clear(world);
        elements = [];
        this.c1 = true;
    }

    resetstage2() {
        World.clear(world);
        elements = [];
        this.c2 = true;
    }

    resetstage3() {
        World.clear(world);
        elements = [];
        this.c3 = true;
    }

    resetstage4() {
        World.clear(world);
        elements = [];
        this.c4 = true;
    }

    resetstage5() {
        World.clear(world);
        elements = [];
        this.c5 = true;
    }

    
    nextstage() {
        World.clear(world);
        elements = [];
        this.count = 0;
        this.stage += 1;
    }
    
    stage0() {
        if (this.c0) {
            dim = {w: 1920, h: 1080};
            imageMode(CENTER);

            puppy = new Block(world,
                {x: width/2, y: height/2, w: 50, h: 50, image: loadImage("assets/character/stage0/stage0_1.png")},
                {label: "puppy", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.1});

            hand = new Hand(-10, -10, 5);

            elements.push(new BlockCore(world,
                {x: width/2, y: -50, w: width, h: 50, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: width/2, y: height - 20, w: width, h: 300, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 0, y: height/2, w: 50, h: height, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: width, y: height/2, w: 50, h: height, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            // new BlocksFromSVG(world, 'assets/map/background_test.svg', elements, { isStatic: true });
        }  
 
        this.c0 = false;
        // scrollEndless(puppy.body.position);

        // sound0.play();

        push();
        translate(width + off.x, off.y);
        scale(-1, 1);
        image(cam, 0, 0, width, height);
        pop();
        image(stage0backgroundimage, 0, 0, width, height);

        switch (this.spacecount) {
            case 0:
                image(title, width/2 - 150, height/2 - 150, 300, 300);

                fill(0);
                textFont(font);
                textSize(50);
                textAlign(CENTER, CENTER);
                text("스페이스바를 눌러 시작하세요", width/2, height - 90);
                // text("스페이스바를 눌러 시작하세요", width/2, height/2);
                break;

            case 1:
                if (keyIsDown(68) && keyIsDown(65)) {
                    image(bothActive, 50, 50, 176, 83);
                } else if (keyIsDown(68) && !keyIsDown(65)) {
                    image(rightActive, 50, 50, 176, 83);
                } else if (!keyIsDown(68) && keyIsDown(65)) {
                    image(leftActive, 50, 50, 176, 83);
                } else {
                    image(bothInActive, 50, 50, 176, 83);
                }

                if (!this.leftsnack) {
                    imageMode(CENTER);
                    image(meat_3, 100, height - 200, 100, 100);
                    imageMode(CORNER);

                }

                if (!this.rightsnack) {
                    imageMode(CENTER);
                    image(meat_3, width - 100, height - 200, 100, 100);
                    imageMode(CORNER);
                }

                if (puppy.body.position.x < 120) {
                    this.leftsnack = true;
                } else if (puppy.body.position.x > width - 120) {
                    this.rightsnack = true;
                }

                fill(0);
                textFont(font);
                textSize(50);
                textAlign(CENTER, CENTER);
                text("좌우로 움직여 간식을 먹으세요", width/2, height - 90);

                if (this.leftsnack && this.rightsnack) {
                    this.spacecount += 1;
                }

                break;

            case 2:
                if (detections.length > 0) hand.inflate();
                else hand.update(-100, -100, 5);

                imageMode(CENTER);
                image(handGuide, width/2, height/2, 2*width, 2*height);
                imageMode(CORNER);

                hand.ballshow();

                // if (detections.length > 0) {
                //     if (puppy.body.position.x < hand.body.position.x) {
                //         puppy.body.position.x += 0.5;
                //     } else {
                //         puppy.body.position.x -= 0.5;
                //     }
                // }

                fill(0);
                textFont(font);
                textSize(40);
                textAlign(CENTER, CENTER);
                if (!this.sizecheck) {
                    text("술떡이가 장난감을 가지고 왔다! 손바닥을 펼쳐서 장난감을 보여주자", width/2, height - 100);
                    text("스페이스 바를 눌러 계속", width/2, height - 50);
                } else {
                    text("손 모양에 손 크기를 맞춰주세요", width/2, height - 100);
                    text("손을 넓게 펴거나 화면에 가까이 하면 공이 커집니다", width/2, height - 50);
                }

                if (this.sizecheck){
                // console.log(hand.body.circleRadius);
                    if (hand.body.circleRadius > 180) {
                        this.spacecount += 1;
                        this.sizecheck = false;
                    }
                }

                break;

            case 3:
                if (detections.length > 0) hand.inflate();
                else hand.update(-100, -100, 50);

                imageMode(CENTER);
                image(handGuide2, width/2, height/2, 0.8*width, 0.8*height);
                imageMode(CORNER);

                hand.ballshow();

                fill(0);
                textFont(font);
                textSize(40);
                textAlign(CENTER, CENTER);
                if (!this.sizecheck) {
                    text("말랑말랑한 것 같은데?, 손을 오므려보자", width/2, height - 100);
                    text("스페이스 바를 눌러 계속", width/2, height - 50);
                } else {
                    text("손 모양에 손 크기를 맞춰주세요", width/2, height - 100);
                    text("손을 오므리거나 화면에서 멀리 하면 공이 작아집니다", width/2, height - 50);
                }

                if (this.sizecheck){
                // console.log(hand.body.circleRadius);
                    if (hand.body.circleRadius < 50) {
                        this.spacecount += 1;
                        this.sizecheck = false;
                    }
                }

                break;

            case 4:
                if (keyIsDown(68) && keyIsDown(65)) {
                    image(bothActive, 50, 50, 176, 83);
                } else if (keyIsDown(68) && !keyIsDown(65)) {
                    image(rightActive, 50, 50, 176, 83);
                } else if (!keyIsDown(68) && keyIsDown(65)) {
                    image(leftActive, 50, 50, 176, 83);
                } else {
                    image(bothInActive, 50, 50, 176, 83);
                }

                if (detections.length > 0) hand.inflate();
                else hand.update(-100, -100, 50);

                hand.ballshow();

                imageMode(CENTER);
                image(meat_0, width/2 - 300, 100, 100, 100);
                imageMode(CORNER);
                
                fill(0);
                textFont(font);
                textSize(40);
                textAlign(CENTER, CENTER);
                text("우와 간식이다 뽀숑", width/2, height - 100);
                text("간식이 먹고 싶어? 공 위로 올라가봐", width/2, height - 50);

                if ((puppy.body.position.x > width/2 - 350 && puppy.body.position.x < width/2 - 250) && ((puppy.body.position.y < 100) && (puppy.body.position.y > 0))) {
                    World.clear(world);
                    elements = [];
                    puppy;
                    hand;
                    this.spacecount += 1;
                }
                break;

            case 5:
                fill(0);
                rect(0, 0, width, height);

                fill(255);
                textFont(font);
                textSize(50);
                textAlign(CENTER, CENTER);
                text("앗 기분이 이상해..! 내 몸이 변하고 있는 것 같아", width/2, height/2 + 200);
                // text(">>>>>", width/2, height/2 + 300);

                // hand.ballshow();
                // if (puppy.body.position.x > width - 100) this.nextstage();

                imageMode(CENTER);
                if (this.count < 30) {
                    image(stage0_1, width/2, height/2, 100, 100);
                    this.count += 1;
                } else if (this.count < 60) {
                    image(stage5, width/2, height/2, 100, 100);
                    this.count += 1;
                } else if (this.count < 90) {
                    image(stage4, width/2, height/2, 100, 100);
                    this.count += 1;
                } else if (this.count < 120) {
                    image(stage3, width/2, height/2, 100, 100);
                    this.count += 1;
                } else if (this.count < 150) {
                    image(stage2_1, width/2, height/2, 100, 100);
                    this.count += 1;
                } else if (this.count < 180) {
                    image(stage1_1, width/2, height/2, 100, 100);
                    this.count += 1;
                } else if (this.count < 720) {
                    this.nextstage();
                }
                imageMode(CORNER);

                // console.log(this.count);

                break;

                // case 6:
                //     this.nextstage();
                //     break;
        }

        // image(stage0image, 0, 0, 3200, 720);

        // console.log(this.spacecount, hand.body.circleRadius);

        puppy.move();
        elements.forEach(element => {
            element.draw()

        if (puppy.isMoving()) puppy.drawMove(stage0_1, stage0_2, stage0_3);
        else puppy.draw();
        }
        );
    }

    stage1() {  
        if (this.c1) {
            World.clear(world);
            dim = {w: 3200, h: 720};

            puppy = new Block(world,
              {x: 150, y: 450, w: 50, h: 50, image: loadImage("assets/character/stage1/stage1_1.PNG")},
              {label: "puppy", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.1});
        
            hand = new Hand(-10, -10, 5);

            elements.push(new BlockCore(world,
                {x: dim.w/2, y: -50, w: dim.w, h: 50, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 0, y: dim.h/2, w: 50, h: dim.h, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: dim.w, y: dim.h/2, w: 50, h: dim.h, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
        
            elements.push(new BlockCore(world,
                {x: 150, y: 600, w: 500, h: 200, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 820, y: 610, w: 300, h: 200, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 1220, y: 700, w: 600, h: 200, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 1250, y: 340, w: 100, h: 370, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 1700, y: 500, w: 500, h: 500, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            elements.push(new BlockCore(world,
                {x: 2900, y: 600, w: 700, h: 300, color: (0, 0, 0, 0)},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
        }
      
      this.c1 = false;
      
      scrollEndless(puppy.body.position);

      if (detections.length > 0) hand.inflate();
      else hand.update(-10, -10, 5);

      image(stage1backgroundimage, 0, 0, 3200, 720);

      fill(0);
      textFont(font);
      textSize(16);
      textAlign(CENTER, CENTER);
      text("내 모습이 왜 이러지?", 250, 350);
      text("원래대로 돌아가게 도와줘!", 250, 370);

      if (this.count < 3) {
        textSize(20);
        text("여긴 어떻게 지나가지..", 545, 480);
      } else {
        textSize(20);
        text("날 위해 길을 만들어줘", 545, 480);
      }
      console.log(this.count);

      puppy.move();
      hand.ballshow();
      elements.forEach(element => element.draw());

      if (puppy.isMoving()) puppy.drawMove(stage1_1, stage1_2, stage1_3);
      else puppy.draw();

      if (this.gameover()) {
          this.resetstage1();
          this.count += 1;
      }

      if (puppy.body.position.x > 3000 && puppy.body.position.y > 300) {
            World.remove(world, hand);
            this.nextstage();
      }

    //   fill(255, 0, 0);
    //   ellipse(3050, 400, 50, 50);

        imageMode(CENTER);
        image(meat_1, 3050, 400, 100, 100);
        imageMode(CORNER);
    }
    
    stage2() {
        if (this.c2) {
            puppy = new Block(world,
              {x: 150, y: 450, w: 50, h: 50, image: loadImage("assets/character/stage2/stage2_1.PNG")},
              {label: "puppy", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.1});

            hand = new Hand(-10, -10, 5);

            // ground
            elements.push(new BlockCore(world,
                {x: 237, y: 602, w: 474, h: 236, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 970, y: 350, w: 170, h: 200, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 1450, y: 600, w: 250, h: 240, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 1450, y: 120, w: 180, h: 270, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 2050, y: 700, w: 450, h: 200, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 2626, y: 295, w: 243, h: 51, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 2626, y: 542, w: 243, h: 51, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 2800, y: 244, w: 243, h: 51, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 2800, y: 593, w: 243, h: 51, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 3024, y: 193, w: 352, h: 51, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 3024, y: 643, w: 352, h: 51, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
        }
      
      this.c2 = false;

      scrollEndless(puppy.body.position);

      if (detections.length > 0) hand.inflate();
      else hand.update(-10, -10, 5);

      image(stage2backgroundimage, 0, 0, 3200, 720);

      fill(0);
      textFont(font);
      textSize(16);
      textAlign(CENTER, CENTER);
      text("고기를 먹으니까 조금씩 내 몸으로 돌아오는 것 같아!", 250, 350);
      text("너랑 공놀이를 하니까 즐거워!", 1450, 350);
      text("너를 만나러 가고 싶어!", 1450, 370);
      text("두 가지 길이 있네!", 2050, 350);
      text("둘 중 하나는 너에게 갈 수 있는 길인 것 같아", 2050, 370);

      puppy.move();
      hand.ballshow();
      elements.forEach(element => element.draw());

      if (puppy.isMoving()) puppy.drawMove(stage2_1, stage2_2, stage2_3);
      else puppy.draw();

      if (this.gameover()) {
          this.resetstage2();
      }

    //   fill(0, 255, 0);
    //   ellipse(3130, 100, 50, 50);
    //   ellipse(3130, 560, 50, 50);

      imageMode(CENTER);
      image(meat_3, 3130, 100, 100, 100);
      image(meat_4, 3130, 560, 100, 100);
      imageMode(CORNER);

      if (puppy.body.position.x > 3100 && (puppy.body.position.y > 50 && puppy.body.position.y < 150)) {
            World.remove(world, hand);
            this.nextstage();
      } else if (puppy.body.position.x > 3100 && (puppy.body.position.y > 510 && puppy.body.position.y < 610)) {
            this.resetstage2();
      }
    }
    
    stage3() {
        if (this.c3) {
            dim = {w: 1280, h: 720};

            puppy = new Block(world,
                {x: -640, y: 0, w: 50, h: 50, image: loadImage("assets/character/stage3/stage3.png")},
                {label: "puppy", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.1});

            // ground
            elements.push(new BlockCore(world,
                {x: -700, y: 0, w: 50, h: 720, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -430, y: 281, w: 700, h: 157, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -248, y: -325, w: 1000, h: 70, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            rotatedelement = new BlockCore(world,
                {x: 150, y: -300, w: 720, h: 70, color: (0, 0, 0, 0)},
               {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0});
        }

        this.c3 = false;

        calculateAngle();

        push();
        translate(width/2, height/2);
        rotate(angle);
        // translate(-puppy.body.position.x, -puppy.body.position.y);  

        // scrollEndless(puppy.body.position);

        imageMode(CENTER);
        image(stage3backgroundimage, 0, 0, 2560, 1440);

        image(AD_lock, -600, -200, 176, 82);
        image(handGuide3, -600, -100, 100, 100);

        fill(0);
        textFont(font);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("앗! 움직일 수가 없어", -350, 80);
        text("어떻게 가야 하지?", -350, 100);

        elements.forEach(element => element.draw());
        puppy.draw();

        push();
        rotate(-radians(295));
        rotatedelement.draw();
        pop();

        engine.world.gravity.x = cos(-angle + 0.5*PI);
        engine.world.gravity.y = sin(-angle + 0.5*PI);

        if ((puppy.body.position.y > 360)) {
            this.nextstage();
        }

        pop();
    }

    stage4() {
        if (this.c4) {
            dim = {w: 720, h: 720};

            puppy = new Block(world,
                {x: -250, y: 0, w: 100, h: 70, image: loadImage("assets/character/stage4/stage4.png")},
                {label: "puppy", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0});
            elements.push(puppy);

            // boundary
            elements.push(new BlockCore(world,
                {x: 0, y: -325, w: 700, h: 50, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 0, y: 325, w: 700, h: 50, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -325, y: 0, w: 50, h: 700, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 325, y: 0, w: 50, h: 700, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            // maze
            elements.push(new BlockCore(world,
                {x: -250, y: 50, w: 100, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
                
            elements.push(new BlockCore(world,
                    {x: -300, y: 180, w: 40, h: 20, color: 'black'},   
                    {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -80, y: 40, w: 20, h: 300, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -120, y: -80, w: 100, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -160, y: -140, w: 20, h: 130, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -80, y: -200, w: 280, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 50, y: -260, w: 20, h: 130, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 50, y: 120, w: 20, h: 380, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -120, y: 180, w: 80, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 90, y: -80, w: 100, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 250, y: 50, w: 120, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 100, y: 180, w: 120, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
        }
          
        this.c4 = false;

        calculateAngle();

        push();
        translate(width/2, height/2);
        rotate(angle);
        // translate(-puppy.body.position.x, -puppy.body.position.y);  

        // scrollEndless(puppy.body.position);

        imageMode(CENTER);
        image(stage4backgroundimage, 0, 0, 2048, 2048);

        fill(255);
        rectMode(CENTER);
        rect(0, 0, 700, 700);

        image(stage4image, 100, 250, 50, 50);

        fill(0);
        textFont(font);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("벌써 64동까지 왔어!", -200, 80);
        text("길 찾는 걸 도와줘", -200, 100);

        elements.forEach(element => element.draw());

        engine.world.gravity.x = cos(-angle + 0.5*PI);
        engine.world.gravity.y = sin(-angle + 0.5*PI);

        if ((puppy.body.position.x > 40 && puppy.body.position.x < 150) && (puppy.body.position.y > 190 && puppy.body.position.y < 310)) {
            this.nextstage();
        }

        pop();
    }
    
    stage5() {
        if (this.c5) {
            puppy = new Block(world,
                {x: 100, y: 250, w: 100, h: 70, image: loadImage("assets/character/stage4/stage4.png")},
                {label: "puppy", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0});
            elements.push(puppy);

            // boundary
            elements.push(new BlockCore(world,
                {x: 0, y: -325, w: 700, h: 50, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 0, y: 325, w: 700, h: 50, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -325, y: 0, w: 50, h: 700, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 325, y: 0, w: 50, h: 700, color: 'black'},
                {isStatic: true, label: "ground", density: 0.004, restitution: 0.5, friction: 0.1, frictionAir: 0.0})
            );

            // maze
            elements.push(new BlockCore(world,
                {x: 50, y: 250, w: 20, h: 100, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 115, y: 200, w: 150, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 115, y: 90, w: 380, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -70, y: 130, w: 20, h: 100, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -110, y: 180, w: 100, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -300, y: 180, w: 80, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -150, y: 130, w: 20, h: 100, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -130, y: -60, w: 340, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: -270, y: 250, w: 20, h: 120, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x: 170, y: -50, w: 20, h: 290, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            elements.push(new BlockCore(world,
                {x:80, y: -190, w: 200, h: 20, color: 'black'},   
                {isStatic: true, label: "maze", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0})
            );
            }

        this.c5 = false;

        // calculateAngle();

        push();
        translate(width/2, height/2);
        rotate(angle);
        // translate(-puppy.body.position.x, -puppy.body.position.y);  

        // scrollEndless(puppy.body.position);

        imageMode(CENTER);
        image(stage4backgroundimage, 0, 0, 2048, 2048);

        fill(255);
        rectMode(CENTER);
        rect(0, 0, 700, 700);

        image(stage4image, 100, 250, 50, 50);

        image(stage5image, 240, 40, 100, 60);
        image(stage5image2, -270, -270, 50, 50);
        image(stage5image2, -270, -20, 50, 50);

        fill(0);
        textFont(font);
        textSize(16);
        textAlign(CENTER, CENTER);
        if (this.count < 3) {
            text("3층에 도착했어! 너가 있는 교실은 어디야?", 110, 130);
            text("저 빨간 소화전은 조금 위험해보이는데?", 110, 150);
        } else {
            text("얼른 너를 만나고 싶어", 110, 130);
            text("=키를 누르면 지금 바로 달려갈게", 110, 150);
        }

        elements.forEach(element => element.draw());

        engine.world.gravity.x = cos(-angle + 0.5*PI);
        engine.world.gravity.y = sin(-angle + 0.5*PI);

        if ((puppy.body.position.x > -290 && puppy.body.position.x < -230) && (puppy.body.position.y > -290 && puppy.body.position.y < -230)) {
            this.resetstage5();
            this.count += 1;
        }

        if ((puppy.body.position.x > -290 && puppy.body.position.x < -230) && (puppy.body.position.y > -30 && puppy.body.position.y < 10)) {
            this.resetstage5();
            this.count += 1;
        }


        if ((puppy.body.position.x > 210 && puppy.body.position.x < 270) && (puppy.body.position.y > 10 && puppy.body.position.y < 80)) {
            this.nextstage();
        }

        pop();
    }

    stage6() {
        if (this.c6) {
            hand = new Hand(-10, -10, 5);
        }

        this.c6 = false;

        if (this.count == 0) {
            fill(0);
            rect(0, 0, width, height);
            image(stage0_1, width/2 - 400, height/2 + 100, 200, 200);

            fill(255);
            textFont(font);
            textSize(50);
            textAlign(CENTER, CENTER);
            text("드디어 만나게 돼서 기뻐", width/2, height/2 - 120);
            text("나랑 같이 사진 찍지 않을래?", width/2, height/2 - 60);
            textSize(32);
            text("스페이스 바를 눌러 계속", width/2, height/2);
        } else {
            if (detections.length > 0) hand.inflate();
            else hand.update(-10, -10, 5);

            imageMode(CENTER);
            push();
            translate(width, 0);
            scale(-1, 1);
            image(cam, width/2, height/2 - 50, 640, 480);
            pop();
            fill(0);
            rect(0, 0, width/2 - 240, height);
            rect(width/2 + 240, 0, width/2 - 240, height);
            rect(0, 0, width, height/2 - 320);
            rect(0, height/2 + 320, width, height/2 - 320);
            image(frame, width/2, height/2, 480, 640);

            hand.puppyshow();

            fill(255);
            textFont(font);
            textSize(50);
            textAlign(CENTER, CENTER);
            text("R키를 눌러", width - 200, height - 150);
            text("재시작", width - 200, height - 100);
        }
    }
}
