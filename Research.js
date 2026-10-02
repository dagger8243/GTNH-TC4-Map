class Research {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.hidden = false;        
        this.dependencies = []
    }

    getPath() {
        let h = BASE_HEXAGON.map(pair => `${pair[0] + this.x},${pair[1] + this.y}`)
        return `M${h[0]} L${h[1]} L${h[2]} L${h[3]} L${h[4]} L${h[5]} Z`;
    }

    allocatePath() {
        let path = document.getElementById(this.category);
        path.setAttribute("d", `${path.getAttribute("d")} ${this.getPath()}`)
    }

    hide() {
        this.hidden = true;
    }

    show() {
        this.hidden = false;
    }
}