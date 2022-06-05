const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

mongoose.connect(
  "mongodb+srv://kirk:gUV1IHpZY5LB3iKP@cluster0.c64ng.mongodb.net/test?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.post("/loginWithUsername", async (req, res) => {
  const { username, password } = req.body;

  // check for user username
  const user = await UserModel.findOne({ username });
  if (user === null) {
    res
      .status(200)
      .json({ status: 406, message: "Invalid username or password" });
  } else if (user.username !== username || user.password !== password) {
    res
      .status(200)
      .json({ status: 406, message: "Invalid username or password" });
  } else {
    let authenticationCode = 0;
    while (authenticationCode.length !== 6) {
      authenticationCode = (Math.random() * 1000000).toFixed(0);
    }
    res.status(200).json({
      user,
      authenticationCode,
      status: 200,
      message: "Login Success!",
      logginType: "username",
    });
  }
});

app.post("/loginWithEmail", async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await UserModel.findOne({ email });
  if (user === null) {
    res.status(200).json({ status: 406, message: "Invalid email or password" });
  } else if (user.email !== email || user.password !== password) {
    res.status(200).json({ status: 406, message: "Invalid email or password" });
  } else {
    let authenticationCode = 0;
    while (authenticationCode.length !== 6) {
      authenticationCode = (Math.random() * 1000000).toFixed(0);
    }
    res.status(200).json({
      user,
      authenticationCode,
      status: 200,
      message: "Login Success!",
      logginType: "email",
    });
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const { name, username, password } = req.body;

  if (!username || !name || !password) {
    res.status(200).json({ status: 400, message: "Please fill all fields" });
  }
  // Check if user exists
  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.status(200).json({ status: 404, message: "User already exists" });
  } else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(200).json({ status: 200, message: "User created successfully" });
  }
});

app.listen(5000, () => {
  console.log("Server listening!");
});
