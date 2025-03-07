require("dotenv").config();
const express = require("express");

// create an extance of express
const app = express();

// db connection
const dbConnection = require("./model/dbModel");

//authentication middleware
const authMiddleware = require("./middleware/authMiddleware");
//routes middleware file
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");


// middleware to parse json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware ?
app.use("/api/questions",authMiddleware,questionRoutes);

// answer routes middleware ?

// route to check if the server is running
app.get("/", (req, res) => res.send("Up and running!"));

const PORT = 3000;

// Listen to the server
if (app.listen(PORT)) {
  console.log(`Server is running on port http://localhost:${PORT}`);
} else {
  console.log("Server is not running!");
}
