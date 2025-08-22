const express = require('express');
const public_users = express.Router();
const books = require('./booksdb.js');
const { isValid, users } = require('./auth_users.js');

/**
 * TASK 6 - Register new user
 */
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (isValid(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
});

/**
 * TASK 1 & 10 - Get all books (async callback)
 */
public_users.get("/", (req, res) => {
    setTimeout(() => {
        return res.status(200).json(books);
    }, 100);
});
/**
 * TASK 10 - Get all books (async callback)
 */
public_users.get("/books", (req, res) => {
    // Simulate async operation using setTimeout
    setTimeout(() => {
        return res.status(200).json(books);
    }, 100); // 100ms delay to mimic async behavior
});

/**
 * TASK 2 & 11 - Get book details by ISBN (Promise)
 */
public_users.get("/isbn/:isbn", (req, res) => {
    const getBookByISBN = (isbn) => new Promise((resolve, reject) => {
        const book = books[isbn];
        book ? resolve(book) : reject("Book not found");
    });

    getBookByISBN(req.params.isbn)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(404).json({ message: err }));
});

/**
 * TASK 3 & 12 - Get books by Author (async/await)
 */
public_users.get("/author/:author", async (req, res) => {
    const getBooksByAuthor = (author) => new Promise((resolve) => {
        const filteredBooks = Object.values(books).filter(
            book => book.author.toLowerCase() === author.toLowerCase()
        );
        resolve(filteredBooks);
    });

    try {
        const result = await getBooksByAuthor(req.params.author);
        result.length > 0
            ? res.status(200).json(result)
            : res.status(404).json({ message: "No books found for this author" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * TASK 4 & 13 - Get books by Title (async/await)
 */
public_users.get("/title/:title", async (req, res) => {
    const getBooksByTitle = (title) => new Promise((resolve) => {
        const filteredBooks = Object.values(books).filter(
            book => book.title.toLowerCase() === title.toLowerCase()
        );
        resolve(filteredBooks);
    });

    try {
        const result = await getBooksByTitle(req.params.title);
        result.length > 0
            ? res.status(200).json(result)
            : res.status(404).json({ message: "No books found for this title" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * TASK 5 - Get reviews for a book
 */
public_users.get("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

/**
 * TASK 8 - Add/Modify a book review (Auth required)
 */
public_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.session?.username;
    const review = req.body.review;
    const isbn = req.params.isbn;

    if (!username) {
        return res.status(401).json({ message: "Login required" });
    }

    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: "Review added/updated successfully" });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

/**
 * TASK 9 - Delete a book review (Auth required)
 */
public_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.session?.username;
    const isbn = req.params.isbn;

    if (!username) {
        return res.status(401).json({ message: "Login required" });
    }

    if (books[isbn] && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: "Review deleted successfully" });
    } else {
        return res.status(404).json({ message: "Review not found for this user" });
    }
});

module.exports.general = public_users;
