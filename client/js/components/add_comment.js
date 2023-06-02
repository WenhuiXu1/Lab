function addComment (event, depot_id){
    event.preventDefault()
    const form = document.querySelector(".comment-form")
    const data = Object.fromEntries(new FormData(form))
    data[depot_id]=depot_id
    console.log(data)
    fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(comment => {
            state.comments.push(comment)
            renderCommentList();
        });
    
    console.log('add comment successful!')
  }