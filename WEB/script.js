document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.querySelector('input[name="name"]');
    const errorBox = document.getElementById('errorBox');

    usernameInput.addEventListener('input', function() {
        const username = this.value.trim();
        const validUsernameRegex = /^[a-zA-Z]+$/; 

        if (!validUsernameRegex.test(username)) {
            errorBox.textContent = "Username can only contain letters.";
            errorBox.style.display = "block";
        } else {
            errorBox.textContent = "";
            errorBox.style.display = "none";
        }
    });
});
