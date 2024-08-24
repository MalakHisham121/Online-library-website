
booksContainer = document.getElementById('Bookcontainer');
let books = JSON.parse(localStorage.getItem('books'));
const linkOfTheWebsiteUserCame = document.referrer;
loggedin = 'false';
Admin = 'false';
localStorage.setItem('isAdmin',Admin);
localStorage.setItem('isLoggedin',loggedin);
function displayFeatured(books){

    for(i=0;i<=1;i++){
        divItem = document.createElement("p");
        divItem.classList.add('Featured-Books');
        divItem.innerHTML = ` <h3 class = "title">${books[i].title}</h3>\n <p><b>author:</b> ${books[i].author} </p> <p><b>category:</b> ${books[i].Category} </p> <p><b>description:</b> ${books[i].Description} </p>`;
        booksContainer.appendChild(divItem);
    }


}
displayFeatured(books);
/*
let viewMore = document.getElementById("ViewMore1");

viewMore.addEventListener('click',()=>{
    window.location.href = "books dashboard.html";

});
*/


if(linkOfTheWebsiteUserCame =="http://127.0.0.1:5500/instucrtions.html" ||linkOfTheWebsiteUserCame =="http://127.0.0.1:5500/books%20dashboard.html"  ){
       loggedin = 'true';
        Admin = 'true';
        localStorage.setItem('isAdmin',Admin);
        localStorage.setItem('isLoggedin',loggedin);
        booksContainer.appendChild(divItem);
        console.log( document.getElementById('navigate'));
        document.getElementById('navigate').innerHTML=`<ul >
        <li><a href="Book store/search.html">🔍</a></li
        <li><a href="Book store/aboutlibrary.html">About us</a></li>
        <li><a href="contact_us.html">Contact us</a></li>
        <li><a href="book reviews/book reviews.html">book reviews</a></li>
    </ul>
    `
       

}





