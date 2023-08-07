
# Book Store API


## Overview


The Book Store API is a RESTful web service that provides endpoints for managing books and user authentication. It utilizes bcrypt for password hashing, JWT tokens for authorization, and allows users to perform CRUD operations on books. This document provides information on how to set up and use the API.


## Features


- User registration: Users can create an account by providing their name, role (either admin or customer) ,email and password.

- User login: Registered users can log in with their credentials to access secured endpoints.

- Authentication: Passwords are hashed using bcrypt to ensure secure storage.

- Authorization: JWT tokens are used to authenticate users and control access to protected resources.

- Add Book: Authenticated users can add new books to the store.

- Delete Book: Authenticated users can delete books from the store.

- Update Book: Authenticated users can update book information.

- View Books: Unauthenticated users can view the list of available books. 


## Technologies Used


- Node.js: The server-side runtime environment for running the API.

- Express.js: A minimal and flexible Node.js web application framework.

- MongoDB: A NoSQL database used for storing user and book information.

- bcrypt: A library for password hashing.

- jsonwebtoken: A library for handling JWT tokens.

- joi: A library for validation of the request bodies.


## Installation


1. Clone the repository:


```bash

git clone https://github.com/BhukyaSuchitha/BookStore-API.git

cd BookStore-API

```


2. Install dependencies:


```bash

npm install

```


3. Set up environment variables:


Create a `.env` file in the root directory and provide the following variables:


```plaintext

DATABASE_URL = mongodb://localhost:27017/books-store-api

SECRET = SuchithaBookstoreAPI 

JWT_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VjaGl0aGEiLCJlbWFpbCI6ImFkbWluQGdhbWlsLmNvbSIsInBhc3N3b3JkIjoidGVzdEAxMjM0Iiwicm9sZSI6ImFkbWluIn0.pUSnWjgiqYEqrOA5Fabvr48Hv3PnDvlW4eesPr9Bo98

(I have created the jwt token using the SECRET from jwt.io website)

```

4. Start the server:


```bash

npm start

```


## API Endpoints


### User Endpoints


- `POST /auth/signup`: Register a new user. Payload should include `name`, `role` , `email` and `password`.


- `POST /auth/login`: Login as an existing user. Payload should include `email` , `role` and `password`. 


### Book Endpoints


- `GET /books`: Get the list of all books. Add the params like title, author,genre and stock availability(true/false) for filtering the books.
For example: filtering by title : localhost:3000/books?title=test
Can also add the values such as page and limit to access the books.
 For example : localhost:3000/book?page=1&limit=2 


- `GET /books/:id`: Get a specific book by its ID.


- `POST /books`: Add a new book. Payload should include `email`, `title`, `author`, `genre`, `price` and `stock`. Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).


- `PUT /books/:id`: Update an existing book by its ID. Payload should include `email`, `title`, `author`, `price` and `stock`.Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).


- `DELETE /books/:id`: Delete a book by its ID. Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).


## Authentication and Authorization


To access protected endpoints (add, update, delete books), include the JWT token in the `Authorization` header as follows:


```plaintext

Authorization: Bearer JWT_TOKEN

```
Mock Server URL
https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process

docker
6d1bee507579 : container id 
6d1bee50757911ed5317f6fbfdcb7fac804277df87d014fc8118faf59df7ed1c

Login.html URL : file:///Users/bhukya.suchitha/Documents/bookstore-main/login.html
for books URL : file:///Users/bhukya.suchitha/Documents/bookstore-main/books.html