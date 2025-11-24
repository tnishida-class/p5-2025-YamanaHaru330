// チェッカー
function setup() {
  createCanvas(400, 400);
  noStroke();
  let size = 50; // 1マスの大きさ
  let rows = height / size; // 総行数（例: 400÷50=8）

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      // 偶数・奇数で白とグレーを交互に
      if ((x / size + y / size) % 2 == 0) {
        fill(255); // 白
      } else {
        fill(200); // グレー
      }
      rect(x, y, size, size);

      // グレーのマスだけ丸を描く
      if ((x / size + y / size) % 2 == 1) {
        let centerX = x + size / 2;
        let centerY = y + size / 2;

        // 上3列に赤い丸
        if (y < size * 3) {
          fill(255, 0, 0);
          ellipse(centerX, centerY, size / 2);
        }
        // 下3列に黒い丸
        else if (y >= size * 5) {
          fill(0);
          ellipse(centerX, centerY, size / 2);
        }
        // 真ん中2列（yが3〜5の範囲）は丸を描かないss
      }
    }
  }
}