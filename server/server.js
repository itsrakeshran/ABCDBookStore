const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
const PORT=500;
const DBURL='mongodb://127.0.0.1:27017/bookstore'



app.use(express.json());
app.use(cors());

// Db connection
mongoose.connect(DBURL)
.then("Database is connected sucesfully")
.catch("Database connection failed")

const bookShema=new mongoose.Schema({
    title:String,
    author:String,
    genre: String,
    description:String,
    price:Number,
    image:String
})

// model genrally create a collection
const Book=mongoose.model('Book',bookShema)

//seed initial database
const seedDatabase=async()=>{
   try{

        await Book.deleteMany({})//this will rmove all existion data

        const books=[
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg' },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 255, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 220, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 1115, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 125, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg'},
        ]

        await Book.insertMany(books);
        console.log("Databse Seed sucessfully")
   }catch(err){console.log('Eroor Database Seeding',err)}
} 

// Seed the database on server startup
seedDatabase();

//define api edn point to get all books data
app.get('/api/books',async(req,res)=>{
    try{
        const books= await Book.find({})
        res.json(books)
    }catch(err){
        console.log(err);
        res.status(500).json({'Error':'Internal Server'})
    }
})

app.get('/',(req,res)=>{
    res.send("this is home for bookd data go to /api/books")
})


app.listen(PORT, ()=>{console.log(`Server is start on Port no:${PORT}`)})