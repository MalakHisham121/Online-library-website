document.addEventListener('DOMContentLoaded',() => {
    const BookInfo = document.getElementById('bookInfo');
    const BookList = document.getElementById('book-list');

    const searchedBooks = document.getElementById('searchedBooks');

    const btn = document.getElementById('Searchbtn');
    const inp = document.getElementById('Searchtxt');

    let books = JSON.parse(localStorage.getItem('books'));
   // console.log(books);
    function displayBooks() {
        BookList.innerHTML = '';
        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p><b>Id:</b> ${book.ID}</p>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Category:</b> ${book.Category}</p>
                <p><b>Description:</b> ${book.Description}</p>
                <p><b>Status:</b> ${book.available ? 'Available' : 'Not Available'}</p> `;
            BookList.appendChild(bookItem);
        });
       
}
function displayBooks1() {
    
   
}
btn.addEventListener('click',(event)=>{
    event.preventDefault();
    BookList.innerHTML = '';
    console.log('hi');
    books.forEach((book, index) => {
        if(book.ID==inp.value ||book.title==inp.value || book.author==inp.value ||book.Category==inp.value){
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
        
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p><b>Id:</b> ${book.ID}</p>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Category:</b> ${book.Category}</p>
                <p><b>Description:</b> ${book.Description}</p>
                <p><b>Status:</b> ${book.available ? 'Available' : 'Not Available'}</p> `;
                BookList.appendChild(bookItem);
        }
        
       
    });

});

//displayBooks();

})