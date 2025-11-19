// 最終課題を制作しよう

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  if(frameCount % 60 > 30)
    ellipse(random(width), random(height), 50);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
