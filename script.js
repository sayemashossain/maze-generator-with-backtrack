let canHeight;
let canWidth;

const side = 20;
const cols = 40;
const rows = 40;

let grid = []
let backtrackStack = [];

let current;
let itterations = 1;


function setup() {
    canWidth = side * cols;
    canHeight = side * rows;
    createCanvas(canWidth, canHeight)
    frameRate(50)

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++) {
            let cell = new Cell(x, y);
            grid.push(cell)
        }
    }
    current = grid[0]
}

function draw() {
    background(51);
    for (let index = 0; index < grid.length; index++) {
        grid[index].show()
        grid[index].checkNeighbours()
    }
    current.visited = true;
    const next = current.checkNeighbours();
    if (next != undefined) {
        next.visited = true;
        backtrackStack.push(current)
        knockDownWalls(current, next)
        current = next;
    }
    else if (backtrackStack.length > 0) {
        current = backtrackStack.pop()
    }
    else {
        noLoop()
    }


}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = {
        tp: true,
        rt: true,
        bm: true,
        lt: true,
    }
    this.visited = false;
    this.checkNeighbours = () => {
        const unvisitedNeighbours = [];
        const allNeighbours =
        {
            t: grid[getIndex(i, j - 1)],
            r: grid[getIndex(i + 1, j)],
            b: grid[getIndex(i, j + 1)],
            l: grid[getIndex(i - 1, j)]
        }

        for (const [key, value] of Object.entries(allNeighbours)) {
            if (value != undefined && value.visited == false) unvisitedNeighbours.push(value)
        }

        if (unvisitedNeighbours.length > 0) return unvisitedNeighbours[floor(random(0, unvisitedNeighbours.length))]
        else return undefined
    }

    this.show = () => {
        const x = this.i * side;
        const y = this.j * side;

        stroke(255)

        if (this.walls.tp === true) line(x, y, x + side, y)
        if (this.walls.rt === true) line(x + side, y, x + side, y + side)
        if (this.walls.bm === true) line(x + side, y + side, x, y + side)
        if (this.walls.lt === true) line(x, y + side, x, y)

        if (this.visited) {
            noStroke()
            fill(0, 255, 255, 100)
            rect(x, y, side, side)
        }

    }
}

// Helper functions
function getIndex(i, j) {
    if (i < 0 || j < 0 || i >= rows || j >= cols) { return -1 }
    return i + j * cols;
}

function knockDownWalls(a, b) {
    const x = a.i - b.i;
    const y = a.j - b.j;

    if (x === 1) {
        a.walls.lt = false
        b.walls.rt = false
    }
    if (x === -1) {
        a.walls.rt = false
        b.walls.lt = false
    }
    if (y === 1) {
        a.walls.tp = false
        b.walls.bm = false
    }
    if (y === -1) {
        a.walls.bm = false
        b.walls.tp = false
    }
}