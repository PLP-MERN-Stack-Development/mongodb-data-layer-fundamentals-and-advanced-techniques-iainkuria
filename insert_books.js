const { MongoClient } = require('mongodb');
require('dotenv').config();

async function insertBooks() {
    // Use environment variable for security
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
        console.error("MONGODB_URI environment variable is not set");
        console.log("Please create a .env file with your MongoDB connection string");
        return;
    }
    
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        
        const database = client.db("plp_bookstore");
        const books = database.collection("books");
        
        // First, clear any existing books to start fresh
        await books.deleteMany({});
        console.log("Cleared existing books");
        
        // Insert sample books (same as before)
        const bookData = [
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
                published_year: 1925,
                price: 12.99,
                in_stock: true,
                pages: 180,
                publisher: "Scribner"
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
                published_year: 1960,
                price: 14.50,
                in_stock: true,
                pages: 281,
                publisher: "J.B. Lippincott & Co."
            },
            {
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
                published_year: 1949,
                price: 10.99,
                in_stock: false,
                pages: 328,
                publisher: "Secker & Warburg"
            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                published_year: 1937,
                price: 15.75,
                in_stock: true,
                pages: 310,
                publisher: "George Allen & Unwin"
            },
            {
                title: "Harry Potter and the Sorcerer's Stone",
                author: "J.K. Rowling",
                genre: "Fantasy",
                published_year: 1997,
                price: 18.99,
                in_stock: true,
                pages: 309,
                publisher: "Bloomsbury"
            },
            {
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                genre: "Fiction",
                published_year: 1951,
                price: 11.25,
                in_stock: true,
                pages: 234,
                publisher: "Little, Brown and Company"
            },
            {
                title: "The Hunger Games",
                author: "Suzanne Collins",
                genre: "Young Adult",
                published_year: 2008,
                price: 13.50,
                in_stock: true,
                pages: 374,
                publisher: "Scholastic"
            },
            {
                title: "Dune",
                author: "Frank Herbert",
                genre: "Science Fiction",
                published_year: 1965,
                price: 17.25,
                in_stock: true,
                pages: 412,
                publisher: "Chilton Books"
            },
            {
                title: "The Girl on the Train",
                author: "Paula Hawkins",
                genre: "Thriller",
                published_year: 2015,
                price: 14.99,
                in_stock: true,
                pages: 336,
                publisher: "Riverhead Books"
            }
        ];
        
        const result = await books.insertMany(bookData);
        console.log(`${result.insertedCount} books inserted successfully`);
        
    } catch (error) {
        console.error("Error inserting books:", error);
    } finally {
        await client.close();
    }
}

insertBooks();