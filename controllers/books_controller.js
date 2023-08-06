const router = require("express").Router();
// const express = require("express");
// const app = express();
require("dotenv").config();
const books = require("../models/books.js");

//list all books

router.get("/", (req, res) => {
  books
    .find()
    .limit(40)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

// CREATE needed to install body-parser
router.post("/", (req, res) => {
  books
    .create(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      // if (err && err.name == 'ValidationError') {
      //   let message = 'Validation Error: '
      //   for (var field in err.errors) {
      //       message += `${field} was ${err.errors[field].value}. `
      //       message += `${err.errors[field].message}`
      //   }
      //   console.log('Validation error message', message)
      //   res.status(401).json({ message, prev: req.body })
      // } else

      console.log(err);
      res.status(500).send("Internal server error.");
    });
});

router.get("/:id", (req, res) => {
  books
    .findById(req.params.id)
    // .populate({ path: 'comments', options: { limit: 10 } })
    .then((book) => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  books
    .findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((book) => {
      res.redirect(`/books/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

router.delete("/:id", (req, res) => {
  books
    .findByIdAndDelete(req.params.id)
    .then((book) => {
      if (book) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

const db = require("../models");
module.exports = router;