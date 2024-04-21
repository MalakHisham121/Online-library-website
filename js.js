document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchTermInput = document.getElementById('searchTerm');
    
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchTermInput.value.toLowerCase();
        searchBooks(searchTerm);
    });
    function searchBooks(searchTerm) {
        const articles = document.querySelectorAll('article');
        
        articles.forEach(article => {
            const title = article.querySelector('h2').innerText.toLowerCase();
            const author = article.querySelector('p:nth-of-type(1)').innerText.toLowerCase();
            const category = article.querySelector('p:nth-of-type(2)').innerText.toLowerCase();

            if (title.includes(searchTerm) || author.includes(searchTerm) || category.includes(searchTerm)) {
                
                article.style.display = 'block';
            } else {
                
                article.style.display = 'none';
            }
        });
    }
});

