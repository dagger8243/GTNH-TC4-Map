const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.clear = function () {
    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.restore();
}

canvas.resize = function () {
    let mult = 0.98

    this.width = window.innerWidth * mult
    this.height = window.innerHeight * mult
}