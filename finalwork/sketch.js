// 最終課題：鼓動するハートとマリオ風キャラクター移動

// --- プレイヤー関連 ---
let playerX, playerY;     // 位置
let playerVX, playerVY;   // 速度
let groundY;              // 地面の高さ
let gravity = 0.6;        // 重力
let baseSpeed = 3;        // 通常スピード
let boostSpeed = 6;       // ダッシュ時スピード
let onGround = false;     // 地面にいるかどうか

// --- ハート（鼓動）関連 ---
let heartSize;            // ハートの大きさ
let heartMin = 40;
let heartMax = 80;
let heartGrowing = true;  // 大きくなり中か小さくなり中か
let slowBeat = 0.5;       // ゆっくりの時のサイズ変化量
let fastBeat = 1.5;       // 速い時のサイズ変化量
let heartSpeed;           // 今フレームの鼓動スピード

// --- 背景エフェクト用（配列を使う例） ---
let bubbles = [];         // ふわっと浮かぶ丸
let numBubbles = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 地面の位置
  groundY = height * 0.8;

  // プレイヤー初期位置
  playerX = width / 2;
  playerY = groundY;
  playerVX = 0;
  playerVY = 0;

  // ハート初期値
  heartSize = (heartMin + heartMax) / 2;
  heartSpeed = slowBeat;

  // 配列を使って背景エフェクトを用意
  initBubbles();
}

function draw() {
  background(160, 192, 255);

  // 背景の丸たちを更新＆描画（配列＋繰り返し）
  updateBubbles();
  drawBubbles();

  // 地面
  drawGround();

  // プレイヤーの更新＆描画（重力・ジャンプ・左右移動）
  updatePlayer();
  drawPlayer();

  // ハートの更新＆描画（鼓動アニメーション）
  updateHeart();
  drawHeart(playerX, playerY - 80, heartSize); // プレイヤーの上で鼓動
}

// ウィンドウサイズが変わったときの処理
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  groundY = height * 0.8;
  if (playerY > groundY) {
    playerY = groundY;
    playerVY = 0;
  }
}

// ===================================
// 自作関数たち
// ===================================

// 背景の丸を初期化（配列＋for文）
function initBubbles() {
  for (let i = 0; i < numBubbles; i++) {
    bubbles[i] = {
      x: random(width),
      y: random(height),
      r: random(10, 30),
      vy: random(-0.5, -2)
    };
  }
}

// 背景の丸を更新（アニメーション）
function updateBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    b.y += b.vy;
    if (b.y + b.r < 0) { // 画面上から消えたら下から出し直す
      b.y = height + b.r;
      b.x = random(width);
    }
  }
}

// 背景の丸を描画
function drawBubbles() {
  noStroke();
  fill(255, 255, 255, 120);
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    ellipse(b.x, b.y, b.r * 2);
  }
}

// 地面を描画
function drawGround() {
  noStroke();
  fill(80, 200, 120);
  rect(0, groundY, width, height - groundY);
}

// プレイヤーの更新（重力＋キーボード入力＋床判定）
function updatePlayer() {
  // キーボード入力処理
  handleInput();

  // 物理計算
  playerX += playerVX;
  playerY += playerVY;
  playerVY += gravity;

  // 地面で止める
  if (playerY > groundY) {
    playerY = groundY;
    playerVY = 0;
  }

  // 地面にいるかどうか判定（ジャンプ制御用）
  onGround = (playerY === groundY);

  // 画面端の処理（はみ出ないように）
  playerX = constrain(playerX, 20, width - 20);
}

// プレイヤーの描画（シンプルなマリオっぽい人）
function drawPlayer() {
  push();
  translate(playerX, playerY);

  // 体
  noStroke();
  fill(255, 200, 0);
  rectMode(CENTER);
  rect(0, -25, 30, 40);     // 体
  fill(255, 220, 180);
  ellipse(0, -55, 28);      // 頭

  // 帽子っぽいの
  fill(200, 0, 0);
  rect(0, -63, 32, 10);
  pop();
}

// キーボード入力の処理
function handleInput() {
  // 左右キー＋ダッシュキーで速度変化（要件１＋２）
  let speed = keyIsDown(SHIFT) ? boostSpeed : baseSpeed;
  playerVX = 0;

  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerVX = speed;
  }
}

// ジャンプ（スペースキー、空中ジャンプ不可）
function keyPressed() {
  if (key === ' ' && onGround) {
    playerVY = -12;
  }
}

// ハートの鼓動を更新（要件１＆２）
function updateHeart() {
  // 何かキーが押されている間だけ鼓動を速くする
  if (keyIsPressed) {
    heartSpeed = fastBeat;
  } else {
    heartSpeed = slowBeat;
  }

  // 大きくなる／小さくなるを条件分岐で切り替え
  if (heartGrowing) {
    heartSize += heartSpeed;
    if (heartSize > heartMax) {
      heartSize = heartMax;
      heartGrowing = false;
    }
  } else {
    heartSize -= heartSpeed;
    if (heartSize < heartMin) {
      heartSize = heartMin;
      heartGrowing = true;
    }
  }
}

// ハートを描く自作関数（円＋三角で簡易ハート）
function drawHeart(x, y, s) {
  push();
  translate(x, y);
  noStroke();
  fill(255, 100, 150);

  let r = s * 0.3;
  ellipse(-r, -r, r * 2);
  ellipse(r, -r, r * 2);
  triangle(-2 * r, -r, 2 * r, -r, 0, 2 * r);
  pop();
}

