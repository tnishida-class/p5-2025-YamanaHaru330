let x = 100;     // 位置
let y = 150;
let vx = 0;      // 横の速度
let vy = 0;      // 縦の速度
let onGround = true;

const groundY = 180;
const speed = 2;
const dashSpeed = 4;
const gravity = 0.5;
const jumpPower = -10;
const size = 30;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(160, 192, 255);

  // --- 入力処理 ---
  if (keyIsDown(LEFT_ARROW)) {
    vx = -speed;
    if (keyIsDown(90)) vx = -dashSpeed; // Zキーでダッシュ
  } else if (keyIsDown(RIGHT_ARROW)) {
    vx = speed;
    if (keyIsDown(90)) vx = dashSpeed;
  } else {
    vx = 0;
  }

  // --- 重力 ---
  vy += gravity;

  // --- 位置更新 ---
  x += vx;
  y += vy;

  // --- 地面判定 ---
  if (y + size/2 >= groundY) {
    y = groundY - size/2;
    vy = 0;
    onGround = true;
  } else {
    onGround = false;
  }

  // --- 描画 ---
  fill(0);
  ellipse(x, y, size, size);

  // 地面
  fill(60, 200, 60);
  rect(0, groundY, width, height - groundY);
}

// --- ジャンプ（空中では不可） ---
function keyPressed() {
  if (keyCode === 32 && onGround) { // Space
    vy = jumpPower;
    onGround = false;
  }
}
