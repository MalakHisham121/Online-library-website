document.addEventListener('DOMContentLoaded', () => {
    const BookInfo = document.getElementById('bookInfo');
    const BookList = document.getElementById('book-list');

    BookInfo.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchType = document.getElementById('searchType').value;
        const searchTerm = document.getElementById('Searchtxt').value;

        fetch(`/search/?search_type=${searchType}&search_term=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
        })
        .then(response => response.json())
        .then(data => {
            BookList.innerHTML = '';
            data.books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <h3>${book.name}</h3>
                    <p><b>Id:</b> ${book.id}</p>
                    <p><b>Author:</b> ${book.author}</p>
                    <p><b>Category:</b> ${book.category}</p>
                    <p><b>Description:</b> ${book.description}</p>
                    <p><b>Status:</b> ${book.status}</p>`;
                BookList.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error:', error));
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
