const state = {
    depots: []
}

fetch('/api/depots')
    .then(res => res.json())
    .then(depots => {
        state.depots = depots
        renderDepotList()
    })

