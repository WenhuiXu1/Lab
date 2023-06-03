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
`).join('');
  renderEmptyCommentList ();
}

function renderSearch() {
  document.querySelector('#page').innerHTML = `
  <form action="" class="search-bar" onsubmit="renderSearchResult(event)">
  <input type="text" name="postcode" placeholder="Please input your Postcode...">
  <button>Search Depots</button>
  </form>
  `;
  renderEmptyCommentList ();
}

function renderSearchResult(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form))
  let postcodeInput = data.postcode
  console.log(postcodeInput)
  const prefix = postcodeInput.split('').slice(0, 3).join('');

  console.log(prefix)

  const filteredDepot = state.depots.filter(depot => depot.postcode.toString().split('').slice(0, 3).join('') === prefix);

  console.log(filteredDepot)

  const depotDOM = document.querySelector('#page')
  depotDOM.innerHTML = filteredDepot.map(depot => `
  <section class="depot" data-id='${depot.depot_id}'>
    <header>
      <h2 onClick="renderDepotInfo(${depot.depot_id})" >${depot.depot_name}</h2>
    </header>
    <p>${depot.postcode}</p>
    <p>${depot.region}</p>
    <p>${depot.depot_id}</p>
  </section>
`).join('');
  renderEmptyCommentList ();
  console.log("This point is reached!")
}