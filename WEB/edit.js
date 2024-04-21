
let books = JSON.parse(localStorage.getItem('books'));
let Params = new URLSearchParams(window.location.search);
let index = parseInt(Params.get('index'))
var form = document.getElementById("form")
    form.addEventListener('submit', function()  {
        const book = books[index];

        const newTitle = document.getElementById("bookname").value;
        const newAuthor = document.getElementById("bookauthor").value;
        const newCategory = document.getElementById("category").value;
        const newDescription = document.getElementById("description").value;
        console.log(newTitle)
        if (newTitle && newAuthor && newCategory && newDescription) {
            books[index] = {
                ...book,
                title: newTitle,
                author: newAuthor,
                Category: newCategory,
                Description: newDescription
            };
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
        } else {
            alert('Please fill in all fields.');
        }
    });



