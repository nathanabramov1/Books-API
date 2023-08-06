// Modules and Globals
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const app = express();
// Express Settings
// app.set('views', __dirname + '/views')
// app.set('view engine', '')
// app.engine('jsx', require('express-react-views').createEngine())
// app.use(express.static('public'))
app.use("/books", express.urlencoded({ extended: true }));
app.use("/books", methodOverride("_method"));
app.use('/books', require('body-parser').json())
const mongoose = require("mongoose");

// Initialize the app object.
app.use("/books", require("./controllers/books_controller"));
app.use(express.json());
// Create a homepage route.
app.get("/", function (req, res) {
  // This gets sent to the client
  // (your web browser most likely!)
  res.send("Hello Rivkale");
});

// Listen for Connections
// Listen for connections.
app.listen(process.env.PORT);