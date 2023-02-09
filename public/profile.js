const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const comment = document.querySelector('#comment').value.trim();
  
    if (title && comment) {
        console.log( title, comment);
      const response = await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify({ title, comment }),
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
  
  const delButtonHandler = async (event) => {
    console.log("deleged");
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/profile/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
 const submitcomment = document.querySelector('#submitcomment')
 if(submitcomment){
     submitcomment.addEventListener('click', newFormHandler);
 }
  
  document.querySelector('.project-list').addEventListener('click', delButtonHandler);
  
// const logout = async () => {
//     const response = await fetch('/api/users/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
//   };
  
//  document.querySelector('#logout')
//  .addEventListener('click', logout);