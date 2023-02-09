const loginFormHandler = async (event) => {
    event.preventDefault();
  console.log("yeyay");
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
        console.log(email, password);
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        let password2 = document.querySelector('#password')     
        password2.classList = "form-control is-invalid";
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        let password3 = document.querySelector('#password')
        password3.classList = "form-control is-invalid";
        alert(response.statusText);
      }
    }
  };
  const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  
//   document
//     .getElementById('login')
//     .addEventListener('submit', loginFormHandler);

    const login = document.getElementById('login')
    if(login){
            login.addEventListener("click", loginFormHandler)

    }
   const sighup = document.getElementById('sighup');
 if (sighup){
  sighup.addEventListener("click", signupFormHandler) 

 }
   const logoutbutton = document.querySelector('#logout')

 if (logoutbutton){
    logoutbutton.addEventListener('click', logout);
 }
  