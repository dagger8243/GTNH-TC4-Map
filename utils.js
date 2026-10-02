const svg = document.getElementById('mySVG');

const BASIC_HEXAGON = [[50.0, 0.0], [25.0, 43.3], [-25.0, 43.3], [-50.0, 0.0], [-25.0, -43.3], [25.0, -43.3]];

// const ctx = canvas.getContext('2d');

// canvas.clear = function () {
//     ctx.save();

//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.clearRect(0, 0, this.width, this.height);

//     ctx.restore();
// }

svg.resize = function () {
    let mult = 0.98

    this.width = window.innerWidth * mult
    this.height = window.innerHeight * mult
}