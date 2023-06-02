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

  function renderEditComment(commentId) {
    // console.log(commentId)
    document.querySelector('#comments').innerHTML =`
    <form class="comment-form1" action="" onSubmit="editComment(event, ${commentId})">
      <input type="textarea" name="comment" placeholder="">
      <button>Edit Comment</button>
    </form>
    `
  }

  function editComment(event, commentId){
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
        renderCommentList();
      })
  }
  
  function deleteComment(event) {
    const deleteBtn = event.target
    const commentDOM = deleteBtn.closest('.comment')
    const commentId = commentDOM.dataset.id
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    })
      .then(() => {
        state.comments = state.comments.filter(d => d.id != commentId)
        renderCommentList()
      })
  }

