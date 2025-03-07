const dbConnection = require("../model/dbModel");
const bycrypt = require("bcrypt");
 const { StatusCodes } = require('http-status-codes');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all required information"}); 
  }

  try {
    const [user] = await dbConnection.query("SELECT userid,username FROM users WHERE username =? or email = ?", [username, email]);

    if(user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }

    if (password.length < 6) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password should be at least 6 characters" });
    }

    // encrypt the password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    await dbConnection.query(
      `INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`,
      [username, firstname, lastname, email, hashedPassword]
    );
    res.status(StatusCodes.CREATED).json({ msg: "user registered successfully"});
    
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong,try again later!"});
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all required information"});
  }

  try {
    const [user] = await dbConnection.query("SELECT username,userid,password FROM users WHERE email = ? ", [email]);

   
    if (user.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credentials" });
    }

    // compare the password
    await bycrypt.compare(password, user[0].password);

    const isMatch = await bycrypt.compare(password, user[0].password);
    if (!isMatch) { return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credentials" });
    }

    const username = user[0].username;
    const userid = user[0].userid;
    
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: "1d",
    }); 
     return res.status(StatusCodes.OK).json({msg:"user registerd succesfully", token });
    
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong,try again later!"});
  }
};

const checkUser = (req, res) => {
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({msg:"checked user",username,userid});
 
};

module.exports = { register, login, checkUser };