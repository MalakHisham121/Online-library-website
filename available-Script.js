document.addEventListener('DOMContentLoaded', () => {
    const availableBookList = document.getElementById('available-book-list');

    function displayAvailableBooks() {
        availableBookList.innerHTML = '';
        const availableBooks = JSON.parse(localStorage.getItem('books')).filter(book => book.available);
        if (availableBooks.length === 0) {
            availableBookList.innerHTML = '<p>No books available.</p>';
        } else {
            availableBooks.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><b>Id:</b> ${book.ID}</p>
                    <p><b>Author:</b> ${book.author}</p>
                    <p><b>Category:</b> ${book.Category}</p>
                    <p><b>Description:</b> ${book.Description}</p>
                    <p><b>Status:</b> Available</p>
                `;
                availableBookList.appendChild(bookItem);
            });
        }
    }

    window.availablebook = function(index) {
        const books = JSON.parse(localStorage.getItem('books'));
        books[index].available = false;
        localStorage.setItem('books', JSON.stringify(books));
        displayAvailableBooks();
    };

    displayAvailableBooks();
});
