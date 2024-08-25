const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { firstName, lastName, password, email } = req.body;
  console.log(req.body.email, "reqqqqqqqq");
  try {
    // Check if the email already exists in the database
    const existingUser = await USER.findOne({ email: req.body.email });

    // console.log(existingUser, "existingUseribiubuibuiuiuiuib");
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Create a new user if the email does not exist
    await USER.create({
      firstName,
      lastName,
      password,
      email,
    });

    return res.render("login");
  } catch (error) {
    return res.status(500).json({ ERROR: `Internal Server Error ${error}` });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password, "req.body");
  try {
    // Check if the email already exists in the database
    const existingUser = await USER.findOne({
      email: email,
      password: password,
    });

    console.log(existingUser, "existingUseribiubuibuiuiuiuib");
    if (existingUser) {
      // const sessionId = uuidv4();
      // setUser(sessionId, existingUser);
      const token = setUser(existingUser);
      // res.cookie("uid", token);
      return res.json({
        token: token,
      });
    } else {
      return res.render("login");
    }
  } catch (error) {
    return res.status(500).json({ ERROR: `Internal Server Error ${error}` });
  }
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};
