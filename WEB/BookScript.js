document.addEventListener('DOMContentLoaded',() => {
    const BookInfo = document.getElementById('bookInfo')
    const BookList = document.getElementById('book-list')

    let books = JSON.parse(localStorage.getItem('books'));
    if(!books){
        books = [
            {ID: 1, title: "Harry Potter and the Philosopher's Stone" , author : "J.K. Rowling"
             ,category: "Fantasy / Young Adult Fiction" , Description:
             "Follow Harry Potter's journey as he discovers his magical heritage,attends Hogwarts, and confronts dark forces in a tale of magic, friendship, and bravery.",
              available:true}
        ];
        localStorage.setItem('books' ,JSON.stringify(books));
    }

    function displayBooks() {
        BookList.innerHTML = '';
        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p><b>Id:</b> ${book.ID}</p>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Title:</b> ${book.title}</p>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Category:</b> ${book.Category}</p>
                <p><b>Description:</b> ${book.Description}</p>
                <p><b>Status:</b> ${book.available ? 'Available' : 'Not Available'}</p>
                <button onclick="toggleAvailability(${index})">${book.available ? 'Borrow' : 'Return'}</button>
                <button onclick="removeBook(${index})">Remove</button>
            `;
            BookList.appendChild(bookItem);
        });
       
    }
    
    window.toggleAvailability = function(index) {
        books[index].available = !books[index].available;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    };

    window.removeBook = function(index) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    };

   

displayBooks(); 
})