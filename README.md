# PLP Bookstore MongoDB Assignment

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation Steps

1. **Initialize the Project**
   ```bash
   npm init -y
   npm install mongodb
Run the Scripts

bash
# First, insert the sample books
node insert_books.js

# Then run the queries
node queries.js
Database Structure
Database: plp_bookstore

Collection: books

Using: MongoDB Atlas (cloud)

Connection
The scripts use MongoDB Atlas connection string

Book Document Structure
Each book document contains:

title (string)

author (string)

genre (string)

published_year (number)

price (number)

in_stock (boolean)

pages (number)

publisher (string)

Files Included
insert_books.js - Populates the database with sample books

queries.js - Contains all MongoDB queries for the assignment

package.json - Project dependencies

README.md - This file

Queries Demonstrated
Basic CRUD operations (Create, Read, Update, Delete)

Advanced queries with filtering and projection

Sorting and pagination

Aggregation pipelines

Index creation

Notes
The scripts automatically connect to MongoDB Atlas

No local MongoDB installation required

Make sure you have internet connection to access MongoDB Atlas

text

Now run the updated files:

```bash
node insert_books.js
node queries.js