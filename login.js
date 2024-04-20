let password = document.getElementById('password');
let email =  document.getElementById('Email');
const loginbtn = document.getElementById('LoginButton');

loginbtn.addEventListener('click',(event)=>{
    event.preventDefault()
    let redirect = true;
    if(password.value.length < 6){
       document.getElementById('PasswordError').innerHTML='password length should be greater than 6 characters';
       redirect = false;
     
    }
   if(email.value.length <=0){
   document.getElementById('EmailError').innerHTML='The email is required';
    redirect=false;
    }

    const Admin =  document.getElementById('Admin');
    const User = document.getElementById('User');
    if(redirect && Admin.checked )
        window.location.href = "instucrtions.html"
    else if(redirect && User.checked )
        window.location.href = "books dashboard.html"
});



