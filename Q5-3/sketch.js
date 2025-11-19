// カレンダーを描画しよう (p5.js)
function setup(){
  createCanvas(420, 300);
  textSize(16);
  noLoop(); // 一回描けばOK（動的にしたければ remove）
  drawCalendar(2025, 10);
}

function drawCalendar(year, month){
  background(240);

  // 曜日見出し
  const cols = 7;
  const headerH = 30;
  const margin = 10;
  const cellW = (width - margin*2) / cols;

  for(let i = 0; i < cols; i++){
    const x = margin + i * cellW + cellW/2;
    const y = margin + headerH/2;
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text(dayOfWeekAsString(i), x, y);
  }

  // 月の情報
  let startDow = dayOfWeek(year, month, 1); // 0=Sun ... 6=Sat
  const ndays = daysInMonth(year, month);

  // 行数計算
  const totalCells = startDow + ndays;
  const rows = Math.ceil(totalCells / cols);
  const cellH = (height - margin*2 - headerH) / rows;

  // グリッドと日付描画
  for(let d = 1; d <= ndays; d++){
    const idx = startDow + (d - 1);
    const r = Math.floor(idx / cols);
    const c = idx % cols;

    const x0 = margin + c * cellW;
    const y0 = margin + headerH + r * cellH;

    // セル背景（交互色や薄い枠などお好みで）
    stroke(200);
    strokeWeight(1);
    fill(255);
    rect(x0, y0, cellW, cellH);

    // 日付の色：日曜赤、土曜青、平日黒
    noStroke();
    if(c === 0){
      fill(200, 30, 30); // 日曜：赤
    } else if(c === 6){
      fill(40, 80, 200); // 土曜：青
    } else {
      fill(30);
    }

    textAlign(CENTER, CENTER);
    text(d, x0 + cellW/2, y0 + cellH/2);
  }

  // 月タイトル (年-月)
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  text(year + "年 " + month + "月", margin, height - margin - 18);
}

// -------------------- ユーティリティ関数 --------------------

function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

function daysInYear(y){
  // BLANK[1] : 閏年なら366、そうでなければ365
  return isLeapYear(y) ? 366 : 365;
}

function daysInMonth(y, m){
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

function dayOfWeek(y, m, d){
  // BLANK[2]
  // 基準日：1970-01-01 は木曜日 -> 4
  const baseY = 1970;
  const baseDow = 4; // 木曜日

  // 日数差 = target - base (正なら未来、負なら過去)
  let days = 0;
  if (y >= baseY){
    // 年単位で足す
    for(let yr = baseY; yr < y; yr++){
      days += daysInYear(yr);
    }
    // その年のうちの通算日数 (1日目が0日差)
    days += dayOfYear(y, m, d) - 1;
  } else {
    // y < baseY の場合は負を作る
    for(let yr = y; yr < baseY; yr++){
      days -= daysInYear(yr);
    }
    // y 年の中での通算日数（-1 を足して基準と同様に）
    days += dayOfYear(y, m, d) - 1;
  }

  // 結果の曜日
  const dow = ((baseDow + days) % 7 + 7) % 7; // 正の剰余にする
  return dow; // 0=日曜 ... 6=土曜
}

function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土"];
  return a[dow];
}
