let rawInput = `4836484555
4663841772
3512484556
1481547572
7741183422
8683222882
4215244233
1544712171
5725855786
1717382281`

let grid = rawInput.split('\n').map(line => line
    .split('').map(Number))


let flashes = 0
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
            grid[i][j]++
        }
    }
    let flashedCoords = new Set()
    let needsMoreWork
    do {
        console.group('inner iteration start');
        needsMoreWork = false
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (flashedCoords.has(i + '-' + j)) {
                    continue
                }
                if (grid[i][j] > 9) {
                    needsMoreWork = true
                    flashedCoords.add(i + '-' + j)
                    for (let [ni, nj] of getNeighbors(i, j)) {
                        grid[ni][nj]++
                    }
                }
            }
        }
    } while (needsMoreWork)
    for (let coord of flashedCoords) {
        let [i, j] = coord.split('-').map(Number)
        grid[i][j] = 0
        flashes++
    }
    if (flashedCoords.size === ROWS * COLS) {
        return true
    }
    return false
}

for (let i = 0; i < 1000; i++) {
    if (evolve()) {
        alert(i + 1)
        break
    }
}
