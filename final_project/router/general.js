const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
//const axios = require ('axios').default;



const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    const get_users = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books[req.params.isbn]),null, 4));
      });

    get_users.then(() => console.log("Promise for Task 11 resolved"));
  return ;
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    const get_author = new Promise((resolve, reject) => {

        let bookbyauthor = {
            "isbn":0,
            "title":"",
            "reviews":""
        }
    
        let isbn;
        bookauthors=[];
        for (isbn in books) {
            
            if ( books[isbn].author === req.params.author)
            {
                bookbyauthor.isbn = isbn;
                bookbyauthor.title = books[isbn].title;
                bookbyauthor.reviews = books[isbn].reviews;
                bookauthors.push(bookbyauthor);
            }
        }
    
        resolve(res.send(JSON.stringify({bookauthors})));
        });


    get_author.then(() => console.log("Promise for Task 12 resolved"));
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    const get_title = new Promise((resolve, reject) => {

    let bookbytittle = {
        "isbn":0,
        "author":"",
        "reviews":""
    }

    let isbn;
    booktittles=[];
    for (isbn in books) {
        
        if ( books[isbn].title === req.params.title)
        {
            bookbytittle.isbn = isbn;
            bookbytittle.author = books[isbn].author;
            bookbytittle.reviews = books[isbn].reviews;
            booktittles.push(bookbytittle);
        }
    }

    resolve(res.send(JSON.stringify({booktittles})));
    });

    get_title.then(() => console.log("Promise for Task 13 resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    return res.send(JSON.stringify(books[req.params.isbn].reviews));
});

module.exports.general = public_users;
