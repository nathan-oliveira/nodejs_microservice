const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended : true }))

const mongoose = require("mongoose");

require("./Book");
const Book = mongoose.model("Book")

mongoose.connect("mongodb://localhost/booksservice", () => {
  console.log("Database is connected!");
});

app.get('/', (req, res) => {
  res.send("url => base");
});

app.post('/book', (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  }

  var book = new Book(newBook)
  book.save()
    .then(() => {
      res.send("new book created!");
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })

  res.send("A new book created with success!");
})

app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books)
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if(book) {
        res.json(book)
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Book removed with success!");
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.listen(4545, () => {
  console.log("API ON => Books service");
});