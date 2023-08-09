const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");
const { connectToDB } = require("./config/database"); 
const { router } = require("./routes/authRoute");
// require .env file
require("dotenv").config();

const app = express();

// Call the Database
connectToDB();

// CORS Middleware
app.use(cors());

// Middleware to parse request body
app.use(bodyParser.json());

//routes
app.use('/api', router);

port = process.env.PORT || 3333;

// Start the server
app.listen(port, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
