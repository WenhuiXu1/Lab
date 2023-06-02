function renderLogout() {
    document.querySelector('#page').innerHTML = `
      <section class='log-out'>
        <h2>Are you sure you want to log out?</h2>
        <button onClick="logOut()">Log out</button>
      </section>
    `
  }
  
  function logOut() {
    fetch('/api/sessions', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Clear-Site-Data': '"*"' }
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
    state.loggedInUser = null
    renderLogin()
    } else {
    renderError(res.error)
    }
    })
    }