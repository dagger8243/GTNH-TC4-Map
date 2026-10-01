let camera = { x: 0, y: 0 };
let zoom = 1;

let pan = { x: 0, y: 0 }
let start = { x: 0, y: 0 }


const MIN_ZOOM = 0.1;
const MAX_ZOOM = 20;
const SCROLL_SENSITIVITY = 0.0015;

let isDragging = false;

const tree = new Tree();

// function line(x1, y1, x2, y2, f = "#FFFFFF") {
//     ctx.beginPath();
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.strokeStyle = f;
//     ctx.stroke();
// }

function draw() {
    // 1. Clear the canvas view using the default transformation matrix

    ctx.save()

    // 2. Apply Camera Pan and Zoom transformations
    ctx.translate(camera.x, camera.y);
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    tree.draw()
    ctx.restore()
}

const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
let previousTimeMs = 0;

function update() {
    if (canvas.width < innerWidth * 0.98) canvas.resize();
    console.log(canvas.height, canvas.width, innerHeight, innerHeight); // for some reason this makes it update more properly ? ...
    canvas.clear()
    draw();
}

canvas.resize();
tree.addResearches(ctx);
update();