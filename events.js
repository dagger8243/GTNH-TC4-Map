// Canvas Events


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

    document.getElementById("zoom").textContent = `${Math.floor(100 * zoom)}%`;

    update();
}, { passive: false });


canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Store the mouse position relative to where the drag started
    start = { x: e.clientX - pan.x, y: e.clientY - pan.y };
});

// Window Events
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Calculate new total pan offset based on cursor movement
    pan = { x: e.clientX - start.x, y: e.clientY - start.y }
    
    update();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('resize', canvas.resize);