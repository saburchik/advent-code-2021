let rawInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

let flashes = 0
let grid = rawInput.split('\n').map(line => line
    .split('').map(Number))

let ROWS = grid.length
let COLS = grid[0].length

function getNeighbors(i, j) {
    return [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
    ].filter(([ni, nj]) =>
        ni >= 0 &&
        nj >= 0 &&
        ni <= ROWS - 1 &&
        nj <= COLS - 1
    )
}

function evolve() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            grid[i][j]
        }
    }
    let flashedCoords = new Set()
    let currentFlashes = 0
    do {
        flashes += currentFlashes
        currentFlashes = 0
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (flashedCoords.has(i + '-' + j)) {
                    continue
                }
                if (grid[i][j] > 9) {
                    currentFlashes++
                }
                grid[i][j] = 0
                flashedCoords.add(i + '-' + j)
                for (let [ni, nj] of getNeighbors(i, j)) {
                    grid[i][j]++
                }
            }
        }
    } while (currentFlashes > 0)
    for (let coord of flashedCoords) {
        let [i, j] = coord.split('-').map(Number)
        grid[i][j] = 0
    }
}

for (let i = 0; i < 2; i++) {
    evolve()
}

console.log(flashes);