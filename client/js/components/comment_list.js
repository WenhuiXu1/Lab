function renderCommentList() {
    document.querySelector('#comments').innerHTML = `
      <section class="comment-list">
        ${renderComments()}
      </section>
    `
  }
  
function renderComments() {
  return state.comments.map(comment => `
  <section class="comment" data-id='${comment.id}'>
      <p>UserID ${comment.user_id} commented:</p> 
      <h4>${comment.comment}</h4>
      <span class="material-symbols-outlined delete" onClick="deleteComment(event)">delete</span>
      <span onclick="renderEditComment(${comment.id})">edit</span>
  </section><br>
`).join('')
}

function renderFilteredCommentsList (depot_id) {
  document.querySelector('#comments').innerHTML = `
    <section class="comment-list">
      ${renderFilteredComments (depot_id)}
    </section>
  `
}

function renderFilteredComments (depot_id) {
  const filteredComments = state.comments.filter(c => c.depot_id == depot_id)
  console.log(filteredComments)
  return filteredComments.map(comment => `
  <section class="comment" data-id='${comment.id}'>
      <p>UserID ${comment.user_id} commented:</p> 
      <h4>${comment.comment}</h4>
      <span class="material-symbols-outlined delete" onClick="deleteComment(event,${depot_id} )">delete</span>
      <span onclick="renderEditComment(${comment.id}, ${depot_id})">edit</span>
  </section><br>
`).join('')
}

function renderEmptyCommentList () {
  document.querySelector('#comments').innerHTML = ``
}

function renderEditComment(commentId, depotId) {
  const filteredDepot = state.depots.filter(depot => depot.depot_id == depotId)
  const filteredComment = state.comments.filter(c => c.id == commentId)
  const filteredCommentCotent = filteredComment.comment
  console.log("filteredCommentCotent")
  const depot = filteredDepot[0]
  const depotDOM = document.querySelector('#page')
  depotDOM.innerHTML= `
    <section class="depot" data-id="${depot.depot_id}">
      <header>
        <h2>${depot.depot_name}</h2>
      </header>
      <p>${depot.address}</p>
      <p>${depot.suburb} ${depot.postcode}</p>
      <p>${depot.region}</p>
    </section>
    <form class="comment-form1" action="" onSubmit="editComment(event, ${commentId}, ${depotId})">
    <input type="textarea" name="comment" placeholder=" ">
    <button>Edit Comment</button>
  </form>
`;
renderEmptyCommentList ()
}

function editComment(event, commentId, depotId){
  event.preventDefault()
  const form = document.querySelector(".comment-form1")
  const data = Object.fromEntries(new FormData(form))
  console.log(data)
  fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(comment => {
    console.log(comment)
    state.comments = state.comments.filter(c => c.id != comment.id)
      state.comments.push(comment)
      renderFilteredCommentsList (depotId);
    })
}

function deleteComment(event, depot_id) {
  const deleteBtn = event.target
  const commentDOM = deleteBtn.closest('.comment')
  const commentId = commentDOM.dataset.id
  fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  })
    .then(() => {
      state.comments = state.comments.filter(d => d.id != commentId)
      renderFilteredCommentsList (depot_id)
    })
}

