

let canHeight;
let canWidth;

const side = 50;
const cols = 10;
const rows = 10;

let grid = []


function setup() {
    canWidth = side * cols;
    canHeight = side * rows;
    createCanvas(canWidth, canHeight)

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++) {
            let cell = new Cell(x, y);
            grid.push(cell)
        }
    }

}

function draw() {
    background(51);
    for (let index = 0; index < grid.length; index++) {
        grid[index].show()
    }
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = {
        tp: true,
        lt: true,
        bm: true,
        rt: true,
    }

    this.show = function () {
        const x = this.i * side;
        const y = this.j * side;

        stroke(255)

        if (this.walls.tp === true) line(x, y, x + side, y)
        if (this.walls.rt === true) line(x + side, y, x + side, y + side)
        if (this.walls.bm === true) line(x + side, y + side, x, y + side)
        if (this.walls.lt === true) line(x, y + side, x, y)

    }
}