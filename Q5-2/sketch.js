// 吹き出し
function setup(){
  createCanvas(400, 400);
  textSize(16);
}

function draw(){
  background(220);
  balloon("関数は難しい？", 100, 100);
  balloon("関数は便利？", mouseX, mouseY);
}

function balloon(t, x, y){
  const w = textWidth(t); // テキストの幅
  const h = textAscent() + textDescent(); // テキストの高さ
  const p = 8; // 余白の大きさ (padding)
  const radius = 8; // 角丸の半径

  push();

  // 背景（角丸矩形）
  noStroke();
  fill(60, 130, 200); // 吹き出しの背景色（お好みで変更可）
  rect(x, y, w + p * 2, h + p * 2, radius);

  // しっぽ（三角形）：下中央から伸ばす
  // 三角形の幅と高さ
  const tailW = 18;
  const tailH = 12;
  const cx = x + (w + p * 2) / 2; // 吹き出し下辺の中央 x 座標
  const tailTopY = y + h + p * 2; // 吹き出し下辺の y 座標

  // 三角形を背景色で描く（矩形と同じ色にする）
  triangle(cx - tailW/2, tailTopY, cx + tailW/2, tailTopY, cx, tailTopY + tailH);

  // optional: 枠線を付けたいときはここで描画（薄い黒）
  stroke(0, 30);
  strokeWeight(1);
  noFill();
  // 矩形の枠
  rect(x, y, w + p * 2, h + p * 2, radius);
  // しっぽの枠（パスで描く）
  line(cx - tailW/2, tailTopY, cx, tailTopY + tailH);
  line(cx + tailW/2, tailTopY, cx, tailTopY + tailH);

  // テキストを描く
  noStroke();
  fill(255); // 文字色（背景に対して見やすい白）
  textAlign(LEFT, CENTER);
  text(t, x + p, y + h / 2 + p);

  pop();
}