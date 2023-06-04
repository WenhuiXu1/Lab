function addComment (event, depot_Id){
    event.preventDefault()
    const form = document.querySelector(".comment-form")
    const data = Object.fromEntries(new FormData(form))
    console.log(depot_Id)
    console.log(data)
    data.depot_id = depot_Id
    console.log(data)
    fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(comment => {
            state.comments.push(comment)
            renderFilteredCommentsList(depot_Id);
        });
    console.log('add comment successful!')
  }