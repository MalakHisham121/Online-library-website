function validateForm(event){
    event.preventDefault();

    var username = document.getElementById("Username").value;
    var password = document.getElementById("password").value;
    var Confirmpassword = document.getElementById("confirm_password").value;
    var error = document.getElementById("error");

    var letters = /^[a-zA-Z]+$/;
    if (!username.match(letters)) {
      error.textContent = "Username must contain only letters";
      return;
    }

    if (password !== Confirmpassword) {
        error.textContent = "Passwords do not match";
        return;
      }

document.getElementById("signupForm").submit();

}