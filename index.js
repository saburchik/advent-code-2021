let rawInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

let pairs =
    rawInput.split('\n')
        .map(line => line.split('-'))

let map = new Map()

function recordConnection(from, to) {
    if (!map.has(from)) {
        map.set(from, new Set())
    }
    let set = map.get(from)
    set.add(to)
}
for (let [a, b] of pairs) {
    recordConnection(a, b)
    recordConnection(b, a)
}

function isSmallCave(cave) {
    return cave.toLowerCase() === cave[0]
}

function* walk(cave, visitedSmallCaves) {
    if (cave === 'end') {
        return []
    }
    if (isSmallCave(cave)) {
        visitedSmallCaves.add(cave)
    }
    let connection = map.get(cave)
    for (let nextCave of connection) {
        if (
            isSmallCave(nextCave) &&
            visitedSmallCaves.has(nextCave)
        ) {
            continue
        }
        let nextPaths = walk(nextCave, visitedSmallCaves)
        for (let nextPath of nextPaths) {
            yield [nextCave, ...nextPath]
        }
    }
}

let paths = [...walk('start', new Set())]
console.log(paths);