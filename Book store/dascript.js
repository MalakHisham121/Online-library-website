


let books = JSON.parse(localStorage.getItem('AvailableBook'));

const AvailableBook = document.getElementById('AvailableBook');


function displayBooks() {
    if (!AvailableBook) {
        AvailableBook.innerHTML = '';
        books.forEach((book, index) => {
            let bookItem = document.createElement('div');
            bookItem.classList.add('Available');

            bookItem.innerHTML = `
                <h3 class="title"><b>${book.title}</b></h3>
                <p><b>Id:</b> ${book.ID}</p>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Category:</b> ${book.Category}</p>
                <p><b>Description:</b> ${book.Description}</p>
                <p><b>Status:</b> Available</p>`;

            AvailableBook.appendChild(bookItem);
        });
    } else {
       AvailableBook.innerHTML = '<h2>No Books Found</h2>';
    }}

displayBooks();

