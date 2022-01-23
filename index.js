let rawInput = `XW-ed
cc-tk
eq-ed
ns-eq
cc-ed
LA-kl
II-tk
LA-end
end-II
SQ-kl
cc-kl
XW-eq
ed-LA
XW-tk
cc-II
tk-LA
eq-II
SQ-start
LA-start
XW-end
ed-tk
eq-JR
start-kl
ed-II
SQ-tk`

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
    return cave.toLowerCase() === cave
}

function* walk(cave, visitedSmallCaves) {
    if (cave === 'end') {
        yield [cave]
    } else {
        if (isSmallCave(cave)) {
            visitedSmallCaves.add(cave)
        }
        let connections = map.get(cave)
        for (let nextCave of connections) {
            if (
                isSmallCave(nextCave) &&
                visitedSmallCaves.has(nextCave)
            ) {
                continue
            }
            let nextPaths = walk(nextCave, new Set([...visitedSmallCaves]))
            for (let nextPath of nextPaths) {
                yield [cave, ...nextPath]
            }
        }
    }
}

let paths = [...walk('start', new Set())]
console.log(paths);