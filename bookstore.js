document.addEventListener('DOMContentLoaded', async () => {

    // Get the access token from localStorage

    const accessToken = localStorage.getItem('tokenid');

     // Check if the access token does not exist

    if (!accessToken) {

      window.location.href = 'login.html';

    } else {

      try {

        const response = await fetch('http://localhost:3000/books')

        const booksResponse  = await response.json();
        
        const books = booksResponse.books

    
        const bookList = document.getElementById('Book-table');


        books.forEach((book) => {

          const row = document.createElement('tr');

          row.innerHTML = `

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.genre}</td>

            <td>${book.price}</td>

          `;

          bookList.appendChild(row);

        });

      } catch (error) {


        console.error('Error:', error);

        alert('Error occurred while fetching books. Please try again.');

      }

    }

  });