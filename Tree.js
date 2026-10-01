class Tree {
    constructor() {
        this.researches = [];
    }

    addResearches(ctx) {
        if (this.researches.length != 0) return;
        let r = 20;

        this.researches.push(new Research(ctx, canvas.width/2, canvas.height/2, 20));

        r += 40

        for (let i = Math.PI; i < 3 * Math.PI; i += Math.PI/4) {
            
            let x = r * Math.cos(i) + canvas.width/2;
            let y = r * Math.sin(i) + canvas.height/2;

            this.researches.push(new Research(ctx, x,y, 20))
        }

        r += 60

        for (let i = Math.PI; i < 3 * Math.PI; i += Math.PI/8) {
            
            let x = r * Math.cos(i) + canvas.width/2;
            let y = r * Math.sin(i) + canvas.height/2;

            this.researches.push(new Research(ctx, x,y,20))
        }

        r += 100

        for (let i = Math.PI; i < 3 * Math.PI; i += Math.PI/16) {
            
            let x = r * Math.cos(i) + canvas.width/2;
            let y = r * Math.sin(i) + canvas.height/2;

            this.researches.push(new Research(ctx, x,y,20))

        }
    }

    draw() {
        for (const r of this.researches) {
            r.draw();
        }
    }
}