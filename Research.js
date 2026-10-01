class Research {
    
    constructor(ctx, x, y, r, c = "#FFF", f = "#FFF") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.f = f;
        this.hidden = false;
        
        this.dependencies = []
    }

    draw() {
        if (this.hidden) return;

        this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

        this.ctx.moveTo(this.x, this.y)
        for (let i = Math.PI/3; i < 3 * Math.PI; i += Math.PI/3) {
            const vertexX = this.x + this.r * Math.cos(i);
            const vertexY = this.y + this.r * Math.sin(i);
            
            this.ctx.lineTo(vertexX, vertexY)
        }
        
        this.ctx.strokeStyle = this.c;
        this.ctx.fillStyle = this.f;
        this.ctx.stroke();
        this.ctx.fill();
    }

    hide() {
        this.hidden = true;
    }


    show() {
        this.hidden = false;
    }
}