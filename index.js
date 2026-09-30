
let camera = { x: 0, y: 0 };
let zoom = 1;
const MAX_ZOOM = 20;
const MIN_ZOOM = 0.1;
const SCROLL_SENSITIVITY = 0.0015;


let panX = 0;
let panY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');



function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw();
}

function circle(x, y, r = 20, c = "#FFFFFF", f = "#FFFFFF") {
    ctx.beginPath();                
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = c;        
    ctx.fillStyle = f;
    ctx.stroke();
    ctx.fill();
}

function line(x1, y1, x2, y2, f = "#FFFFFF") {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = f;
    ctx.stroke();
}

function drawCircles() {
    let r = 20;

    circle(canvas.width/2, canvas.height/2, r)

    r += 40

    for (let i = Math.PI; i < 3 * Math.PI; i += Math.PI/4) {
        
        let x = r * Math.cos(i) + canvas.width/2;
        let y = r * Math.sin(i) + canvas.height/2;

        line(canvas.width/2, canvas.height/2, x, y)
        circle(x, y)
    }

    r += 60

    for (let i = Math.PI; i < 3 * Math.PI; i += Math.PI/8) {
        
        let x = r * Math.cos(i) + canvas.width/2;
        let y = r * Math.sin(i) + canvas.height/2;

        circle(x, y)
    }

    r += 100

    for (let i = Math.PI; i < 3 * Math.PI; i += Math.PI/16) {
        
        let x = r * Math.cos(i) + canvas.width/2;
        let y = r * Math.sin(i) + canvas.height/2;

        circle(x, y)
    }
}

function draw() {
    // 1. Clear the canvas view using the default transformation matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save()

    // 2. Apply Camera Pan and Zoom transformations
    ctx.translate(camera.x, camera.y);
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    // // 3. Draw your elements (using regular grid coordinates)
    // ctx.fillStyle = '#3498db';
    // ctx.fillRect(100, 100, 150, 150);

    // ctx.fillStyle = '#e74c3c';
    // ctx.beginPath();
    // ctx.arc(400, 300, 75, 0, Math.PI * 2);
    // ctx.fill();

    // // // Draw a grid reference line
    // // ctx.strokeStyle = '#ddd';
    // // ctx.lineWidth = 1;
    // // for (let i = 0; i < 2000; i += 100) {
    // //     ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 2000); ctx.stroke();
    // //     ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(2000, i); ctx.stroke();
    // // }

    drawCircles()

    ctx.restore()
}

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();

    // Get mouse coordinates relative to the canvas bounding box
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    // Calculate coordinates relative to the current zoom/pan state
    const canvasX = (mouseX - camera.x) / zoom;
    const canvasY = (mouseY - camera.y) / zoom;

    // Determine new zoom factor
    let zoomFactor = 1 - e.deltaY * SCROLL_SENSITIVITY;
    let newZoom = zoom * zoomFactor;

    // Restrict zoom limits
    if (newZoom > MAX_ZOOM) newZoom = MAX_ZOOM;
    if (newZoom < MIN_ZOOM) newZoom = MIN_ZOOM;

    // Adjust camera positioning so the cursor remains the focal point
    camera.x = mouseX - canvasX * newZoom;
    camera.y = mouseY - canvasY * newZoom;
    zoom = newZoom;

    draw();
}, { passive: false });


canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Store the mouse position relative to where the drag started
    startX = e.clientX - panX;
    startY = e.clientY - panY;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Calculate new total pan offset based on cursor movement
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    
    // Redraw the screen with the updated offsets
    draw();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();