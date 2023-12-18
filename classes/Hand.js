class Hand {
  constructor(x, y, r) {
    let options = {
      friction: 0.3,
      restitution: 0.6
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.avgX = -1000;
    this.avgY = -1000;
    World.add(world, this.body);
  }

  update(x, y, r) {
    World.remove(world, this.body);
    let options = {
      friction: 0.3,
      restitution: 0.6
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  track() {
    for (let i=0; i<detections.length; i++) {
      let tX = detections[i].landmarks[4][0];
      let tY = detections[i].landmarks[4][1];
    
      let iX = detections[i].landmarks[8][0];
      let iY = detections[i].landmarks[8][1];
  
      let mX = detections[i].landmarks[12][0];
      let mY = detections[i].landmarks[12][1];
  
      let rX = detections[i].landmarks[16][0];
      let rY = detections[i].landmarks[16][1];
  
      let pX = detections[i].landmarks[20][0];
      let pY = detections[i].landmarks[20][1];
  
      this.avgX = (tX + iX + mX + rX + pX) / 5;
      this.avgY = (tY + iY + mY + rY + pY) / 5;
    }
  }

  inflate() {
    for (let i=0; i<detections.length; i++) {
      let tX = detections[i].landmarks[4][0];
      let tY = detections[i].landmarks[4][1];
    
      let iX = detections[i].landmarks[8][0];
      let iY = detections[i].landmarks[8][1];
  
      let mX = detections[i].landmarks[12][0];
      let mY = detections[i].landmarks[12][1];
  
      let rX = detections[i].landmarks[16][0];
      let rY = detections[i].landmarks[16][1];
  
      let pX = detections[i].landmarks[20][0];
      let pY = detections[i].landmarks[20][1];
  
      let avgX = (tX + iX + mX + rX + pX) / 5;
      let avgY = (tY + iY + mY + rY + pY) / 5;
  
      let dt = dist(tX, tY, avgX, avgY);
      let it = dist(iX, iY, avgX, avgY);
      let mt = dist(mX, mY, avgX, avgY);
      let rt = dist(rX, rY, avgX, avgY);
      let pt = dist(pX, pY, avgX, avgY);
  
      let distance = max(dt, it, mt, rt, pt);
      
      // if (this.r < distance) this.r += 3;
      // else this.r -= 3;
      // this.update(map(avgX, 0, cam.width, 0, width) + off.x, map(avgY, 0, cam.height/2, 0, height) + off.y + 100, this.r);

      this.update(map(avgX, 0, cam.width, 0, width) + off.x, map(avgY, 0, cam.height, 0, height) + off.y + 100, distance);
    }
  }

  // show() {
  //   let pos = this.body.position;
  //   let angle = this.body.angle;

  //   push();
  //   translate(pos.x, pos.y);
  //   rotate(angle);
  //   rectMode(CENTER);
  //   strokeWeight(1);
  //   stroke(0);
  //   fill(255, 255, 255);
  //   ellipse(0, 0, this.r * 2);
  //   pop();
  // }

  ballshow() {
    let pos = this.body.position;

    calculateAngle();

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(ball, 0, 0, this.r * 2, this.r * 2);
    // ellipse(0, 0, this.r * 2);
    pop();
  }

  puppyshow() {
    let pos = this.body.position;

    calculateAngle();

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(stage0_1, 0, 0, this.r * 2, this.r * 2);
    // ellipse(0, 0, this.r * 2);
    pop();
  }
}
