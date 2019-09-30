// 定义 Canvas 的宽高
let canvas = document.querySelector('#canvas')
console.log(canvas)
let canvasWidth, canvasHeight, xOffset, speed, isDrawCircle = true,
// 初始水位
nowRange=0;

function componentDidMount() {
    canvas.height = 500;
    canvas.width = 500;
    xOffset = 0;
    speed = 0.1;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    requestAnimationFrame(draw);
}

function draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isDrawCircle) {
        drawCircle(ctx)
    }
    // 曲线绘制
    drawSin(ctx, xOffset);
    // drawSin(ctx, xOffset);
    xOffset += speed;
    if (nowRange < 0.6) {
        nowRange += 0.01;
    }
    requestAnimationFrame(draw);
}

function drawCircle(ctx) {
    const r = canvasWidth / 2;
    const lineWidth = 5;
    const cR = r - (lineWidth);
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
}

function drawSin(ctx, xOffset,startX = 0) {
    const points = [];
    const waveWidth = 0.05; // 波浪宽度,数越小越宽
    const waveHeight = 20; // 波浪高度,数越大越高

    ctx.beginPath();
    // 正弦曲线公式：y = A sin(Bx + C) + D   B是相位，C是运动方向
    // x值小于canvas的宽度，之后x进行了一次赋值操作 x = x + 20/canvasWidth  
    // 20/canvasWidth=>进行canvasWidth/20次运算 => 修改为固定值
    for (let x = startX; x < startX + canvasWidth; x += 5) {
        const y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset);
        points.push([x, (1 - nowRange) * canvasHeight + y]);
        ctx.lineTo(x, (1 - nowRange) * canvasHeight + y);
    }
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(startX, canvasHeight);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();
}
componentDidMount();