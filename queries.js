const { MongoClient } = require('mongodb');
require('dotenv').config();

async function runQueries() {
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
        
        // All your queries here (same as before, but without the connection string)
        console.log("=== TASK 2: BASIC CRUD OPERATIONS ===");
        
        // Find all books in a specific genre
        console.log("\n1. Books in Fantasy genre:");
        const fantasyBooks = await books.find({ genre: "Fantasy" }).toArray();
        console.log(fantasyBooks.map(book => ({ title: book.title, author: book.author })));
        
        // Find books published after a certain year
        console.log("\n2. Books published after 2000:");
        const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
        console.log(recentBooks.map(book => ({ title: book.title, published_year: book.published_year })));
        
        // Find books by a specific author
        console.log("\n3. Books by J.K. Rowling:");
        const rowlingBooks = await books.find({ author: "J.K. Rowling" }).toArray();
        console.log(rowlingBooks);
        
        // Update the price of a specific book
        console.log("\n4. Updating price of 'The Hobbit':");
        const updateResult = await books.updateOne(
            { title: "The Hobbit" },
            { $set: { price: 16.50 } }
        );
        console.log(`Modified ${updateResult.modifiedCount} document`);
        
        // Delete a book by its title
        console.log("\n5. Deleting 'The Da Vinci Code':");
        const deleteResult = await books.deleteOne({ title: "The Da Vinci Code" });
        console.log(`Deleted ${deleteResult.deletedCount} document`);
        
        console.log("\n=== TASK 3: ADVANCED QUERIES ===");
        
        // Books in stock and published after 2010
        console.log("\n6. Books in stock published after 2010:");
        const inStockRecent = await books.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).toArray();
        console.log(inStockRecent.map(book => ({ title: book.title, published_year: book.published_year })));
        
        // Projection - only title, author, price
        console.log("\n7. Books with projection (title, author, price only):");
        const projectedBooks = await books.find({})
            .project({ title: 1, author: 1, price: 1, _id: 0 })
            .toArray();
        console.log(projectedBooks);
        
        // Sorting by price (ascending)
        console.log("\n8. Books sorted by price (ascending):");
        const sortedAsc = await books.find({})
            .sort({ price: 1 })
            .project({ title: 1, price: 1, _id: 0 })
            .limit(5)
            .toArray();
        console.log(sortedAsc);
        
        // Sorting by price (descending)
        console.log("\n9. Books sorted by price (descending):");
        const sortedDesc = await books.find({})
            .sort({ price: -1 })
            .project({ title: 1, price: 1, _id: 0 })
            .limit(5)
            .toArray();
        console.log(sortedDesc);
        
        console.log("\n✅ All queries completed successfully!");
        
    } catch (error) {
        console.error("Error running queries:", error);
    } finally {
        await client.close();
    }
}

runQueries();