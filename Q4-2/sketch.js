// 折れ線グラフ
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 20〜100のランダムな数
  }

  // 横線を引く
  const n = 10;
  stroke(180);
  for(let i = 0; i < n; i++){
    line(0, height * i / n, width, height * i / n);
  }

  // 折れ線グラフを描く
  fill(0);
  stroke(0);
  const dx = width / (scores.length - 1);
  let px, py;

  for(let i = 0; i < scores.length; i++){
    let x = i * dx;
    let y = height - map(scores[i], 0, 100, 0, height);

    // 点を描く
    ellipse(x, y, 8, 8);

    // 一つ前の点と線でつなぐ
    if(i > 0){
      line(px, py, x, y);
    }

    // 現在の点を次回のために保存
    px = x;
    py = y;
  }
}
