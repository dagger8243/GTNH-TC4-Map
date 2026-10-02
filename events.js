function fixFloat(f) {
    return Math.floor(100 * f);
}

window.onload = function() {
    let z = svgPanZoom('#mySVG', {
        maxZoom: 2,
        minZoom: 0.1,
        zoomScaleSensitivity: 0.5,
        fit: false,
        onZoom: function() {
            document.getElementById("zoom").innerText = `${fixFloat(this.getZoom())}%`;
        },
        onPan: function() {
            let p = this.getPan();
            document.getElementById("pos").innerText = `x: ${Math.floor(p.x)} y: ${Math.floor(p.y)}`;
        },
    });
}

let checkboxes = document.querySelectorAll('.selectCategory');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', e => {
        document.getElementById(e.target.name).style.visibility = e.target.checked ? "" : "hidden";
    })
})