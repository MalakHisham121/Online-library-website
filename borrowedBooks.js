
let UserBooks = JSON.parse(localStorage.getItem('borrowedBooks'));
//console.log(UserBooks);

const BorrowedList = document.getElementById('borrowedBook')


if(UserBooks.length!=0){
    function displayBooks() {
        BorrowedList.innerHTML = '';
        UserBooks.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('borrowed-item');
            bookItem.innerHTML = `
                <h3 class = "title"><b>${book.title}</b></h3>
                <p><b>Id:</b> ${book.ID}</p>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Category:</b> ${book.Category}</p>
                <p><b>Description:</b> ${book.Description}</p>
                <p><b>Status:</b>Borrowed</p>`
            BorrowedList.appendChild(bookItem);
        });


    
    }
    
    displayBooks();

}
else{
    document.getElementById('borrowedBook').innerHTML='<h2>No Books Found</h2>'
}