function renderDepotList() {
    const depotListDOM = document.querySelector('#page')

    depotListDOM.innerHTML = state.depots.map(depot => `
<section class="depot" data-id='${depot.depot_id}>
  <header>
    <h2 onClick="renderDepotInfo()">${depot.depot_name}</h2>
  </header>
  <p>${depot.postcode}</p>
  <p>${depot.region}</p>
</section>
`).join('')
}

