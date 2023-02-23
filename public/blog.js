const commentsubbtn = document.getElementById("commentsubbtn");




const commentHandler = async (event) => {
    event.preventDefault();
    const user_comment = document.getElementById("Textarea1").value.trim();
  const id = document.getElementById("id").textContent;

console.log(id);

    if (user_comment) {
        console.log(user_comment);
      const response = await fetch(`/api/profile/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ user_comment}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }
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
  submitbtn.addEventListener("click", updateHandler);

  if (commentsubbtn){

commentsubbtn.addEventListener("click", commentHandler)
  }