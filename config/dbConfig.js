// core modules to be imported
const mysql2 = require("mysql2");

// Create a connection pool to the database
const dbconnection = mysql2.createPool({
  host: "localhost",
  user: "Hussein_Md",
  password: "123456",
  database: "evangadi_forum",
  connectionLimit: 10,
});

//  check connected to the MySQL database
dbconnection.getConnection((err) => {
  if (err) {
    console.log(err.message);
    return err;
  } else console.log("Connected to the mysql server!");
});

// Function to create tables one by one
const createTables = async () => {
  try {
    await dbconnection.promise().query(`
      CREATE TABLE IF NOT EXISTS users (
          userid INT(20) NOT NULL AUTO_INCREMENT,
          username VARCHAR(20) NOT NULL,
          firstname VARCHAR(20) NOT NULL,
          lastname VARCHAR(20) NOT NULL,
          email VARCHAR(40) NOT NULL,
          password VARCHAR(100) NOT NULL,
          PRIMARY KEY (userid)
      )
    `);

    await dbconnection.promise().query(`
      CREATE TABLE IF NOT EXISTS questions (
          id INT(20) AUTO_INCREMENT NOT NULL,
          questionid VARCHAR(100) NOT NULL UNIQUE,
          userid INT(20) NOT NULL,
          title VARCHAR(50) NOT NULL,
          description VARCHAR(200) NOT NULL,
          tag VARCHAR(20),
          PRIMARY KEY (id, questionid), 
          FOREIGN KEY (userid) REFERENCES users(userid) 
      )
    `);

    await dbconnection.promise().query(`
      CREATE TABLE IF NOT EXISTS answers (
          answerid INT(20) AUTO_INCREMENT NOT NULL,
          userid INT(20) NOT NULL,
          questionid VARCHAR(100) NOT NULL,
          answer VARCHAR(255) NOT NULL,
          PRIMARY KEY (answerid),
          FOREIGN KEY (questionid) REFERENCES questions(questionid) ,
          FOREIGN KEY (userid) REFERENCES users(userid) 
      )
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.log("Error creating tables:", err.message);
  }
};
// Run the function to create tables
createTables();
