const commentsubbtn = document.getElementById("commentsubbtn");




const commentHandler = async (event) => {
    event.preventDefault();
    const user_comment = document.getElementById("Textarea1").value.trim();
  
if (event.target.hasAttribute('data-id')) {
    const blog_id = event.target.getAttribute('data-id')
console.log(user_comment, blog_id);
    if (user_comment, blog_id) {
      const response = await fetch(`/api/profile/comment`, {
        method: 'POST',
        body: JSON.stringify({ user_comment, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }}
  };

  const updateHandler = async (event) => {
    event.preventDefault();
    console.log("hi");
    const title = document.querySelector('#title').value.trim();
    const comment = document.querySelector('#comment').value.trim();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id);
    if (title ,comment) {
      const response = await fetch(`/api/profile/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title ,comment}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }}
  };
     const submitbtn = document.getElementById("submitbtn");
  if(submitbtn){
  
  submitbtn.addEventListener("click", updateHandler);
  }
 

  if (commentsubbtn){

commentsubbtn.addEventListener("click", commentHandler)
  }