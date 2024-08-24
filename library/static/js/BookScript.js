
document.addEventListener('DOMContentLoaded',() => {
    const BookInfo = document.getElementById('bookInfo')
    const BookList = document.getElementById('book-list')
  
    let books = JSON.parse(localStorage.getItem('books'));
    if(!books){
        books = [
            {ID: 1, title: "Harry Potter and the Philosopher's Stone" , author : "J.K. Rowling"
             , Category: "Fantasy/Young Adult Fiction" , Description:
             "Follow Harry Potter's journey as he discovers his magical heritage,attends Hogwarts, and confronts dark forces in a tale of magic, friendship, and bravery.",
              available:true},

              
              {ID: 2, title: "FUNDAMENTALS OF DATABASE SYSTEMS" , author : "Ramez Elmasri, Shamkant Navathe"
             , Category: "Computer Science" , Description:
             "Explore the core principles of database systems, covering data modeling, relational databases, query languages, transaction processing, and security. Ideal for students and professionals seeking a solid understanding of database fundamentals.",
              available:true},
              
              {ID: 3, title: "Data Structures and Algorithm Analysis in C++" , author : "Mark A. Weiss"
              , Category: "Computer Science/Data Structures" , Description:
              "Delve into data structures and algorithm analysis in C++, covering essential topics such as data organization, algorithm efficiency, and problem-solving techniques. Perfect for students and professionals aiming to master the fundamentals of data structures and algorithms in the C++ programming language.",
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
                <p><b>Category:</b> ${book.Category}</p>
                <p><b>Description:</b> ${book.Description}</p>
                <p><b>Status:</b> ${book.available ? 'Available' : 'Not Available'}</p>
                <button onclick="toggleAvailability(${index})">${book.available ? 'Borrow' : 'Return'}</button>
                <button onclick="removeBook(${index})">Remove</button>
                <button onclick="editBook(${index})">Edit</button>
            `;
            BookList.appendChild(bookItem);
        });
       
    }
    
    window.toggleAvailability = function(index) {
        let inArr=false;
        books[index].available = !books[index].available;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks'));
        //console.log(borrowedBooks);
        if(borrowedBooks.length !=0){
          //console.log(borrowedBooks.length)
            borrowedBooks.forEach((book,index)=>{
                if(books.id != undefined && book.id===books[index].id)
                    inArr = true;
            });
        }
       //console.log("before:");
       // console.log(borrowedBooks);
        if(books[index].available === false && !inArr){
            borrowedBooks.push(books[index]);
            localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        }
        else if(books[index].available === true && !inArr){
            //console.log(`now deleting index: ${index}`);
            const ind = borrowedBooks.indexOf(books[index]);
            
            const x = borrowedBooks.splice(index, 1);
            console.log(borrowedBooks);
            localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
            inArr=false
        }
        
        //console.log("seperator")
       
      

    };

    window.editBook = function(index) {
        const book = books[index];
        const newTitle = prompt("Enter new title:", book.title);
        const newAuthor = prompt("Enter new author:", book.author);
        const newCategory = prompt("Enter new category:", book.Category);
        const newDescription = prompt("Enter new description:", book.Description);
    
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
    };

    window.removeBook = function(index) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    };

    function addBook(ID,title, author, Category ,Description) {
        const newBook = { ID,title, author, Category ,Description, available: true };
        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
    BookInfo.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('Id').value.trim();
        const title = document.getElementById('Title').value.trim();
        const author = document.getElementById('Author').value.trim();
        const Category = document.getElementById('Category').value.trim();
        const Description = document.getElementById('Description').value.trim();
        if (id && author && title &&Category&&Description ) {
            addBook(id,title, author,Category,Description);
            BookInfo.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
   

displayBooks(); 

})