const express = require("express");

// create an extance of express
const app = express();

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware ?

// answer routes middleware ?



// Route to check if the server is running
app.get("/", (req, res) => res.send("Up and running!"));

const PORT = 3000;



// Listen to the server
if (app.listen(PORT)) {
  console.log(`Server is running on port http://localhost:${PORT}`);
} else {
    console.log("Server is not running!");
    }