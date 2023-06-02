function renderDepotList() {
  const depotListDOM = document.querySelector('#page')

  depotListDOM.innerHTML = state.depots.map(depot => `
    <section class="depot" data-id="${depot.depot_id}">
      <header>
        <h2 onClick="renderDepotInfo(${depot.depot_id})">${depot.depot_name}</h2>
      </header>
      <p>${depot.postcode}</p>
      <p>${depot.region}</p>
    </section>
`).join('')
}

function renderSearch() {
  document.querySelector('#page').innerHTML = `
  <form class="search-bar" action="" onSubmit="renderSearchResult(event)">
    <input type="text" name="postcode" placeholder="Please input your Postcode...">
    <button>Search Depots</button>
  </form>
  `
}

function renderSearchResult(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form))
  let postcodeInput = data.postcode
  const filteredDepot = state.depots.filter(depot => depot.postcode == postcodeInput);

  const depotListDOM = document.querySelector('#page')

  depotListDOM.innerHTML = filteredDepot.map(depot => `
  <section class="depot" data-id='${depot.depot_id}>
    <header>
      <h2 onClick="renderDepotInfo(${depot.depot_id})" >${depot.depot_name}</h2>
    </header>
    <p>${depot.postcode}</p>
    <p>${depot.region}</p>
    <p>${depot.depot_id}</p>
  </section>
`).join('')
}