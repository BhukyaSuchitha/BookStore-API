
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

git clone https://github.com/your-username/book-store-api.git

cd book-store-api

```


2. Install dependencies:


```bash

npm install

```


3. Set up environment variables:


Create a `.env` file in the root directory and provide the following variables:


```plaintext

DATABASE_URL = mongodb://localhost:27017/book_store_db


SECRET = bookstoreSkeps


JWT_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYm9va3N0b3JlIiwidHlwZSI6ImF1dGhvcml6YXRpb24ifQ.IDHn305W8nhWhuxzXytFQBE4

```


Replace `SECRET` with a strong secret key for JWT token signing.


4. Start the server:


```bash

npm start

```


## API Endpoints


### User Endpoints


- `POST /auth/signup`: Register a new user. Payload should include `name`, `role` , `email` and `password`.


- `POST /auth/login`: Login as an existing user. Payload should include `email` , `role` and `password`. 


### Book Endpoints


- `GET /books`: Get the list of all books. Add the params like title, author,genre and stock availability(true/false) for filtersing the books


- `GET /books/:id`: Get a specific book by its ID.


- `POST /books`: Add a new book. Payload should include `email`, `title`, `author`, `genre`, `price` and `stock`. Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).


- `PUT /books/:id`: Update an existing book by its ID. Payload should include `email`, `title`, `author`, `price` and `stock`.Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).


- `DELETE /books/:id`: Delete a book by its ID. Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).


## Authentication and Authorization


To access protected endpoints (add, update, delete books), include the JWT token in the `Authorization` header as follows:


```plaintext

Authorization: Bearer JWT_TOKEN

```


---

Replace `your-username` in the repository URL with your actual GitHub username. Also, customize the MongoDB URI, JWT secret key, and other configurations according to your specific setup.
