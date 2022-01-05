let rawInput = `4,3,3,5,4,1,2,1,3,1,1,1,1,1,2,4,1,3,3,1,1,1,1,2,3,1,1,1,4,1,1,2,1,2,2,1,1,1,1,1,5,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,5,1,4,2,1,1,2,1,3,1,1,2,2,1,1,1,1,1,1,1,1,1,1,4,1,3,2,2,3,1,1,1,4,1,1,1,1,5,1,1,1,5,1,1,3,1,1,2,4,1,1,3,2,4,1,1,1,1,1,5,5,1,1,1,1,1,1,4,1,1,1,3,2,1,1,5,1,1,1,1,1,1,1,5,4,1,5,1,3,4,1,1,1,1,2,1,2,1,1,1,2,2,1,2,3,5,1,1,1,1,3,5,1,1,1,2,1,1,4,1,1,5,1,4,1,2,1,3,1,5,1,4,3,1,3,2,1,1,1,2,2,1,1,1,1,4,5,1,1,1,1,1,3,1,3,4,1,1,4,1,1,3,1,3,1,1,4,5,4,3,2,5,1,1,1,1,1,1,2,1,5,2,5,3,1,1,1,1,1,3,1,1,1,1,5,1,2,1,2,1,1,1,1,2,1,1,1,1,1,1,1,3,3,1,1,5,1,3,5,5,1,1,1,2,1,2,1,5,1,1,1,1,2,1,1,1,2,1`

// rawInput = `3,4,3,1,2`

let seed = rawInput.split(',').map(Number)


function toMap(seed) {
    let map = new Map()
    for (let timer of seed) {
        incrementMap(map, timer, 1)
    }
    return map
}

function incrementMap(map, key, increment) {
    if (!map.has(key)) {
        map.set(key, 0)
    }
    map.set(
        key,
        map.get(key) + increment)
}

let state = toMap(seed)
for (let i = 0; i < 256; i++) {
    let nextState = new Map()
    for (let [timer, count] of state) {
        if (timer > 0) {
            incrementMap(nextState, timer - 1, count)
        } else if (timer === 0) {
            incrementMap(nextState, 6, count)
            incrementMap(nextState, 8, count)
        } else throw Error('nooo')
    }
    state = nextState
}

let fishCount = 0
for (let [timer, count] of state) {
    fishCount += count
}

alert(fishCount)