const express = require("express");

// create an extance of express
const app = express();

// Route to check if the server is running
app.get("/", (req, res) => res.send("Up and running!"));

const PORT = 3000;

// register Routes
app.post("/api/users/register", (req, res) => {
  res.send("user registered");
});

// login Routes
app.post("/api/users/login", (req, res) => {
  res.send("user loggedin");
});


// check user Routes
app.get("/api/users/check", (req, res) => {
  res.send("user checked");
});


// Listen to the server
if (app.listen(PORT)) {
  console.log(`Server is running on port http://localhost:${PORT}`);
} else {
    console.log("Server is not running!");
    }