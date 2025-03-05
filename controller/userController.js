const register=(req,res)=>{
    res.send("user registered");
}

const login = (req, res) => {
  res.send("user loggedin");
};

const checkUser = (req, res) => {
  res.send("user checked");
};

module.exports = { register, login, checkUser };